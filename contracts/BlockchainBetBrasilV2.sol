// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./SistemaTodoMundoGanha.sol";

// Interface mínima do Chainlink VRF
interface VRFCoordinatorV2Interface {
    function requestRandomWords(
        bytes32 keyHash,
        uint64 subId,
        uint16 minimumRequestConfirmations,
        uint32 callbackGasLimit,
        uint32 numWords
    ) external returns (uint256 requestId);
}

// Interface mínima do ERC20
interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract BlockchainBetBrasilV2 is SistemaTodoMundoGanha {
    VRFCoordinatorV2Interface immutable i_vrfCoordinator;
    uint64 immutable i_subscriptionId;
    bytes32 immutable i_keyHash;
    IERC20 public immutable stablecoin;
    
    uint256 public constant PRECO_APLICACAO = 5 * 10**6;
    uint256 public constant BONUS_ZERO_PONTOS = 625000;
    
    enum StatusRodada {
        INATIVA,
        ABERTA,
        FECHADA,
        RESULTADO_SOLICITADO,
        RESULTADO_DISPONIVEL,
        PAGA
    }

    struct Aplicacao {
        address jogador;
        uint256[5] prognosticos;
        uint256 valorPago;
        uint256 pontosFeitos;
    }

    struct Rodada {
        uint256 id;
        StatusRodada status;
        uint256 totalArrecadado;
        uint256 premioTotal;
        Aplicacao[] aplicacoes;
        bool resultadosForamInseridos;
        uint256[5] resultadosSorteados;
        mapping(address => uint256) premiosAReceber;
        mapping(address => bool) premioReivindicado;
        uint256 timestampAbertura;
        uint256 timestampFechamentoAplicacoes;
        uint256 timestampResultadosProcessados;
        uint256 s_requestId;
        uint256[] s_randomWords;
        uint256 poteAcumulado;
    }

    uint256 public rodadaAtualId;
    mapping(uint256 => Rodada) public rodadas;
    uint256[5] public percentuaisPremio = [50, 20, 15, 10, 5];

    event NovaRodadaIniciada(uint256 indexed rodadaId, uint256 timestamp);
    event NovaAplicacaoFeita(uint256 indexed rodadaId, address indexed jogador, uint256[5] prognosticos);
    event ResultadosProcessados(uint256 indexed rodadaId, uint256[5] resultados);
    event PremioReivindicado(uint256 indexed rodadaId, address indexed jogador, uint256 valor);

    constructor(
        address _stablecoin,
        address _vrfCoordinator,
        uint64 _subscriptionId,
        bytes32 _keyHash
    ) SistemaTodoMundoGanha(msg.sender) {
        stablecoin = IERC20(_stablecoin);
        i_vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
        i_subscriptionId = _subscriptionId;
        i_keyHash = _keyHash;
    }

    function aplicar(uint256[5] calldata _prognosticos) public whenNotPaused {
        Rodada storage rodada = rodadas[rodadaAtualId];
        require(rodada.status == StatusRodada.ABERTA, "Rodada nao esta aberta");
        require(rodada.aplicacoes.length < MAX_APLICACOES_POR_RODADA, "Limite de aplicacoes atingido");

        bool usarFreeAplicacao = freeAplicacoesConcedidas[msg.sender] > 0;
        
        if (!usarFreeAplicacao) {
            require(stablecoin.transferFrom(msg.sender, address(this), PRECO_APLICACAO), "Falha no pagamento");
        } else {
            freeAplicacoesConcedidas[msg.sender]--;
        }

        rodada.aplicacoes.push(Aplicacao({
            jogador: msg.sender,
            prognosticos: _prognosticos,
            valorPago: usarFreeAplicacao ? 0 : PRECO_APLICACAO,
            pontosFeitos: 0
        }));

        if (!usarFreeAplicacao) {
            rodada.totalArrecadado += PRECO_APLICACAO;
        }

        emit NovaAplicacaoFeita(rodadaAtualId, msg.sender, _prognosticos);
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal {
        uint256 rodadaId = rodadaAtualId;
        Rodada storage rodada = rodadas[rodadaId];
        
        for (uint i = 0; i < 5; i++) {
            rodada.resultadosSorteados[i] = (_randomWords[i] % 25) + 1;
        }
        
        _processarResultados(rodadaId);
    }

    function _processarResultados(uint256 _rodadaId) internal {
        Rodada storage rodada = rodadas[_rodadaId];
        uint256[6] memory countVencedores;
        
        for (uint i = 0; i < rodada.aplicacoes.length; i++) {
            Aplicacao storage aplicacao = rodada.aplicacoes[i];
            uint256 pontos = 0;
            
            for (uint j = 0; j < 5; j++) {
                if (aplicacao.prognosticos[j] == rodada.resultadosSorteados[j]) {
                    pontos++;
                }
            }
            
            aplicacao.pontosFeitos = pontos;
            
            if (pontos == 0) {
                _registrarAplicacaoZeroPontos(aplicacao.jogador);
            }
            
            if (pontos >= 1 && pontos <= 5) {
                countVencedores[pontos]++;
            }
        }
        
        _distribuirPremios(_rodadaId, countVencedores);
    }

    function _distribuirPremios(uint256 _rodadaId, uint256[6] memory countVencedores) internal {
        Rodada storage rodada = rodadas[_rodadaId];
        uint256 valorTaxa = (rodada.totalArrecadado * TAXA_PLATAFORMA_PERCENTUAL) / 100;
        uint256 premioTotal = rodada.totalArrecadado - valorTaxa + rodada.poteAcumulado;
        
        uint256[5] memory premiosPorFaixa = _calcularCascataPremios(
            premioTotal,
            countVencedores,
            percentuaisPremio
        );

        for (uint i = 0; i < rodada.aplicacoes.length; i++) {
            Aplicacao storage aplicacao = rodada.aplicacoes[i];
            if (aplicacao.pontosFeitos >= 1 && aplicacao.pontosFeitos <= 5) {
                rodada.premiosAReceber[aplicacao.jogador] += premiosPorFaixa[aplicacao.pontosFeitos - 1];
            }
        }
        
        rodada.status = StatusRodada.RESULTADO_DISPONIVEL;
        emit ResultadosProcessados(_rodadaId, rodada.resultadosSorteados);
    }

    function reivindicarPremio(uint256 _rodadaId) public nonReentrant {
        Rodada storage rodada = rodadas[_rodadaId];
        uint256 premio = rodada.premiosAReceber[msg.sender];
        
        require(premio > 0, "Nenhum premio para reivindicar");
        require(!rodada.premioReivindicado[msg.sender], "Premio ja reivindicado");
        
        rodada.premioReivindicado[msg.sender] = true;
        totalPremiosRecebidos[msg.sender] += premio;
        
        require(stablecoin.transfer(msg.sender, premio), "Falha na transferencia");
        
        emit PremioReivindicado(_rodadaId, msg.sender, premio);
    }
}