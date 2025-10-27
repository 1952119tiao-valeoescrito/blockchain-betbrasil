// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract InvestBetV2 is ReentrancyGuard {
    IERC20 public immutable stablecoin;
    
    uint256 public constant INVEST_BET_PRICE = 1000 * 10**6; // R$1.000,00
    uint256 public constant BONUS_ZERO_PONTOS = 125 * 10**6; // R$125,00
    
    struct InvestBetAplicacao {
        address jogador;
        uint256[5] prognosticosX;
        uint256[5] prognosticosY;
        uint256 valorPago;
        uint256 pontosFeitos;
    }

    struct InvestBetRodada {
        uint256 id;
        uint256 totalArrecadado;
        uint256 premioTotal;
        InvestBetAplicacao[] aplicacoes;
        uint256[5] resultados;
        mapping(address => uint256) premiosAReceber;
        mapping(address => bool) premioReivindicado;
    }

    mapping(uint256 => InvestBetRodada) public investBetRodadas;
    uint256[5] public percentuaisPremio = [50, 20, 15, 10, 5];

    event InvestBetAplicacaoRealizada(uint256 indexed rodadaId, address indexed jogador);
    event InvestBetPremioReivindicado(uint256 indexed rodadaId, address indexed jogador, uint256 valor);

    constructor(address _blockchainBetBrasil, address _stablecoin) 
        SistemaTodoMundoGanha(msg.sender) 
    {
        blockchainBetBrasil = IBlockchainBetBrasil(_blockchainBetBrasil);
        stablecoin = IERC20(_stablecoin);
        
        // Sobrescreve valores padrão para InvestBet
        bonusZeroPontos = BONUS_ZERO_PONTOS;
        aplicacoesParaFreeAplicacao = 8;
    }

    function aplicarInvestBet(
        uint256 _rodadaId,
        uint256[5] calldata _prognosticosX, 
        uint256[5] calldata _prognosticosY
    ) public whenNotPaused {
        InvestBetRodada storage rodada = investBetRodadas[_rodadaId];
        
        bool usarFreeAplicacao = freeAplicacoesConcedidas[msg.sender] > 0;
        
        if (!usarFreeAplicacao) {
            require(stablecoin.transferFrom(msg.sender, address(this), INVEST_BET_PRICE), "Falha no pagamento");
        } else {
            freeAplicacoesConcedidas[msg.sender]--;
        }

        rodada.aplicacoes.push(InvestBetAplicacao({
            jogador: msg.sender,
            prognosticosX: _prognosticosX,
            prognosticosY: _prognosticosY,
            valorPago: usarFreeAplicacao ? 0 : INVEST_BET_PRICE,
            pontosFeitos: 0
        }));

        if (!usarFreeAplicacao) {
            rodada.totalArrecadado += INVEST_BET_PRICE;
        }

        emit InvestBetAplicacaoRealizada(_rodadaId, msg.sender);
    }

    function processarResultados(uint256 _rodadaId) public onlyOwner {
        InvestBetRodada storage rodada = investBetRodadas[_rodadaId];
        
        (, , uint256[5] memory resultados) = blockchainBetBrasil.getRodadaResultados(_rodadaId);
        rodada.resultados = resultados;
        
        _processarResultadosInvestBet(_rodadaId);
    }

    function _processarResultadosInvestBet(uint256 _rodadaId) internal {
        InvestBetRodada storage rodada = investBetRodadas[_rodadaId];
        uint256[6] memory countVencedores;
        
        for (uint i = 0; i < rodada.aplicacoes.length; i++) {
            InvestBetAplicacao storage aplicacao = rodada.aplicacoes[i];
            uint256 pontos = 0;
            
            for (uint j = 0; j < 5; j++) {
                if (aplicacao.prognosticosX[j] == rodada.resultados[j] && 
                    aplicacao.prognosticosY[j] == rodada.resultados[j]) {
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
        
        _distribuirPremiosInvestBet(_rodadaId, countVencedores);
    }

    function _distribuirPremiosInvestBet(uint256 _rodadaId, uint256[6] memory countVencedores) internal {
        InvestBetRodada storage rodada = investBetRodadas[_rodadaId];
        uint256 valorTaxa = (rodada.totalArrecadado * TAXA_PLATAFORMA_PERCENTUAL) / 100;
        uint256 premioTotal = rodada.totalArrecadado - valorTaxa;
        
        uint256[5] memory premiosPorFaixa = _calcularCascataPremios(
            premioTotal,
            countVencedores,
            percentuaisPremio
        );

        for (uint i = 0; i < rodada.aplicacoes.length; i++) {
            InvestBetAplicacao storage aplicacao = rodada.aplicacoes[i];
            if (aplicacao.pontosFeitos >= 1 && aplicacao.pontosFeitos <= 5) {
                rodada.premiosAReceber[aplicacao.jogador] += premiosPorFaixa[aplicacao.pontosFeitos - 1];
            }
        }
    }

    function reivindicarPremioInvestBet(uint256 _rodadaId) public nonReentrant {
        InvestBetRodada storage rodada = investBetRodadas[_rodadaId];
        uint256 premio = rodada.premiosAReceber[msg.sender];
        
        require(premio > 0, "Nenhum premio para reivindicar");
        require(!rodada.premioReivindicado[msg.sender], "Premio ja reivindicado");
        
        rodada.premioReivindicado[msg.sender] = true;
        totalPremiosRecebidos[msg.sender] += premio;
        
        require(stablecoin.transfer(msg.sender, premio), "Falha na transferencia");
        
        emit InvestBetPremioReivindicado(_rodadaId, msg.sender, premio);
    }
}