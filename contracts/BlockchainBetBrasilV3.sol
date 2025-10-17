// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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
    function balanceOf(address account) external view returns (uint256);
}

contract SistemaTodoMundoGanha is Ownable, Pausable {
    uint256 public constant MAX_APLICACOES_POR_RODADA = 1000;
    uint256 public constant LIMITE_APLICACOES_POR_USUARIO = 5;
    
    mapping(address => uint256) public freeAplicacoesConcedidas;
    mapping(address => uint256) public totalAplicacoesZeroPontos;
    mapping(address => uint256) public premiosRecebidos;
    
    event FreeAplicacaoConcedida(address indexed jogador, uint256 quantidade);
    
    constructor(address _owner) Ownable(_owner) {}
    
    function concederFreeAplicacao(address _jogador, uint256 _quantidade) external onlyOwner {
        freeAplicacoesConcedidas[_jogador] += _quantidade;
        emit FreeAplicacaoConcedida(_jogador, _quantidade);
    }
    
    function pausar() external onlyOwner {
        _pause();
    }
    
    function despausar() external onlyOwner {
        _unpause();
    }
}

contract BlockchainBetBrasilV3 is SistemaTodoMundoGanha, ReentrancyGuard {
    VRFCoordinatorV2Interface immutable i_vrfCoordinator;
    uint64 immutable i_subscriptionId;
    bytes32 immutable i_keyHash;
    IERC20 public immutable stablecoin;
    
    uint256 public constant PRECO_APLICACAO = 5 * 10**6;
    uint256 public constant BONUS_ZERO_PONTOS = 625000;
    
    // SISTEMA DE LIMITE POR USUÁRIO IMPLEMENTADO
    mapping(address => mapping(uint256 => uint256)) public aplicacoesPorUsuarioPorRodada;
    uint256 public constant MAX_APLICACOES_POR_USUARIO = 5;

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
        uint256 timestampFechamento;
        uint256 timestampResultadosProcessados;
        uint256 s_requestId;
        uint256[] s_randomWords;
        uint256 poteAcumulado;
    }

    uint256 public rodadaAtualId;
    mapping(uint256 => Rodada) public rodadas;
    uint256[5] public percentuaisPremio = [50, 20, 15, 10, 5];

    event NovaRodadaIniciada(uint256 indexed rodadaId, uint256 timestamp);
    event NovaAplicacaoFeita(uint256 indexed rodadaId, address indexed jogador, uint256[5] prognosticos, uint256 aplicacaoNumero);
    event ResultadosProcessados(uint256 indexed rodadaId, uint256[5] resultados);
    event PremioReivindicado(uint256 indexed rodadaId, address indexed jogador, uint256 valor);
    event LimiteAplicacoesAtingido(address indexed jogador, uint256 rodadaId, uint256 aplicacoesFeitas);
    event RodadaFechada(uint256 indexed rodadaId, uint256 timestamp);
    event SorteioSolicitado(uint256 indexed rodadaId, uint256 requestId);

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
        
        rodadaAtualId = 1;
        rodadas[1].id = 1;
        rodadas[1].status = StatusRodada.INATIVA;
    }

    function abrirRodada() public onlyOwner {
        Rodada storage rodada = rodadas[rodadaAtualId];
        require(rodada.status == StatusRodada.INATIVA, "Rodada ja esta ativa");
        
        rodada.status = StatusRodada.ABERTA;
        rodada.timestampAbertura = block.timestamp;
        rodada.timestampFechamento = block.timestamp + 7 days;
        
        emit NovaRodadaIniciada(rodadaAtualId, block.timestamp);
    }

    function fecharRodada() public onlyOwner {
        Rodada storage rodada = rodadas[rodadaAtualId];
        require(rodada.status == StatusRodada.ABERTA, "Rodada nao esta aberta");
        
        rodada.status = StatusRodada.FECHADA;
        rodada.timestampFechamento = block.timestamp;
        
        emit RodadaFechada(rodadaAtualId, block.timestamp);
    }

    function aplicar(uint256[5] calldata _prognosticos) public whenNotPaused nonReentrant {
        Rodada storage rodada = rodadas[rodadaAtualId];
        require(rodada.status == StatusRodada.ABERTA, "Rodada nao esta aberta");
        require(rodada.aplicacoes.length < MAX_APLICACOES_POR_RODADA, "Limite total de aplicacoes atingido");
        
        // VERIFICAÇÃO DO LIMITE POR USUÁRIO
        uint256 aplicacoesUsuario = aplicacoesPorUsuarioPorRodada[msg.sender][rodadaAtualId];
        require(aplicacoesUsuario < MAX_APLICACOES_POR_USUARIO, "Limite de 5 aplicacoes por rodada atingido");

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

        aplicacoesPorUsuarioPorRodada[msg.sender][rodadaAtualId]++;
        
        emit NovaAplicacaoFeita(rodadaAtualId, msg.sender, _prognosticos, aplicacoesUsuario + 1);
        
        if (aplicacoesUsuario + 1 == MAX_APLICACOES_POR_USUARIO) {
            emit LimiteAplicacoesAtingido(msg.sender, rodadaAtualId, MAX_APLICACOES_POR_USUARIO);
        }
    }

    function getLimiteAplicacoesUsuario(address _usuario) public view returns (uint256 aplicacoesFeitas, uint256 limiteRestante) {
        aplicacoesFeitas = aplicacoesPorUsuarioPorRodada[_usuario][rodadaAtualId];
        limiteRestante = aplicacoesFeitas >= MAX_APLICACOES_POR_USUARIO ? 0 : MAX_APLICACOES_POR_USUARIO - aplicacoesFeitas;
    }

    function avancarProximaRodada() external onlyOwner {
        Rodada storage rodadaAtual = rodadas[rodadaAtualId];
        require(rodadaAtual.status == StatusRodada.PAGA, "Rodada atual nao foi finalizada");
        
        rodadaAtualId++;
        rodadas[rodadaAtualId].id = rodadaAtualId;
        rodadas[rodadaAtualId].status = StatusRodada.INATIVA;
    }

    function getStatusRodada(uint256 _rodadaId) public view returns (
        uint256 id,
        StatusRodada status,
        uint256 totalArrecadado,
        uint256 premioTotal,
        uint256 totalAplicacoes,
        uint256 timestampAbertura,
        uint256 timestampFechamento,
        bool resultadosForamInseridos,
        uint256 poteAcumulado
    ) {
        Rodada storage rodada = rodadas[_rodadaId];
        return (
            rodada.id,
            rodada.status,
            rodada.totalArrecadado,
            rodada.premioTotal,
            rodada.aplicacoes.length,
            rodada.timestampAbertura,
            rodada.timestampFechamento,
            rodada.resultadosForamInseridos,
            rodada.poteAcumulado
        );
    }

    // Placeholder para as funções VRF que precisam ser implementadas
    function solicitarSorteio() external onlyOwner {
        // Implementação do VRF vai aqui
    }

    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal {
        // Implementação do VRF vai aqui
    }

    function reivindicarPremio(uint256 _rodadaId) external nonReentrant {
        // Implementação existente
    }
}