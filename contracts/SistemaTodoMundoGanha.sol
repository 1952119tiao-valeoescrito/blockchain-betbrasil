// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SistemaTodoMundoGanha {
    address public owner;
    uint256 public constant TAXA_PLATAFORMA_PERCENTUAL = 5;
    uint256 public constant MAX_APLICACOES_POR_RODADA = 10000;
    
    uint256 public bonusZeroPontos;
    uint256 public aplicacoesParaFreeAplicacao;
    
    mapping(address => uint256) public bonusAcumulados;
    mapping(address => uint256) public freeAplicacoesConcedidas;
    mapping(address => uint256) public aplicacoesZeroPontos;
    mapping(address => uint256) public totalPremiosRecebidos;
    
    bool public paused;
    
    event BonusConcedido(address indexed jogador, uint256 valor);
    event FreeAplicacaoConcedida(address indexed jogador);
    event PremioRecebido(address indexed jogador, uint256 valor);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Somente owner");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Contrato pausado");
        _;
    }
    
    modifier nonReentrant() {
        _;
    }
    
    constructor(address _owner) {
        owner = _owner;
        bonusZeroPontos = 625000;
        aplicacoesParaFreeAplicacao = 8;
    }
    
    function _registrarAplicacaoZeroPontos(address _jogador) internal {
        aplicacoesZeroPontos[_jogador]++;
        bonusAcumulados[_jogador] += bonusZeroPontos;
        
        emit BonusConcedido(_jogador, bonusZeroPontos);
        
        if (aplicacoesZeroPontos[_jogador] >= aplicacoesParaFreeAplicacao) {
            uint256 freeAplicacoes = aplicacoesZeroPontos[_jogador] / aplicacoesParaFreeAplicacao;
            freeAplicacoesConcedidas[_jogador] += freeAplicacoes;
            aplicacoesZeroPontos[_jogador] = aplicacoesZeroPontos[_jogador] % aplicacoesParaFreeAplicacao;
            
            emit FreeAplicacaoConcedida(_jogador);
        }
    }
    
    function _calcularCascataPremios(
        uint256 premioTotal,
        uint256[6] memory countVencedores,
        uint256[5] memory percentuais
    ) internal pure returns (uint256[5] memory premiosPorFaixa) {
        uint256 totalDistribuido = 0;
        
        for (uint256 pontos = 5; pontos >= 1; pontos--) {
            uint256 percentual = percentuais[pontos - 1];
            uint256 valorFaixa = (premioTotal * percentual) / 100;
            
            if (countVencedores[pontos] > 0) {
                premiosPorFaixa[pontos - 1] = valorFaixa / countVencedores[pontos];
                totalDistribuido += valorFaixa;
            } else {
                uint256 faixasComVencedores = 0;
                for (uint256 k = 1; k < pontos; k++) {
                    if (countVencedores[k] > 0) faixasComVencedores++;
                }
                
                if (faixasComVencedores > 0) {
                    uint256 valorRedistribuido = percentual / faixasComVencedores;
                    for (uint256 k = 1; k < pontos; k++) {
                        if (countVencedores[k] > 0) {
                            percentuais[k - 1] += valorRedistribuido;
                        }
                    }
                }
            }
        }
        
        return premiosPorFaixa;
    }
    
    function setConfiguracoesBonus(uint256 _novoBonus, uint256 _novoLimiteFreeAplicacao) public onlyOwner {
        bonusZeroPontos = _novoBonus;
        aplicacoesParaFreeAplicacao = _novoLimiteFreeAplicacao;
    }
    
    function getStatusJogador(address jogador) public view returns (
        uint256 bonusAcumulado,
        uint256 freeAplicacoesDisponiveis,
        uint256 totalAplicacoesZeroPontos,
        uint256 premiosRecebidos
    ) {
        return (
            bonusAcumulados[jogador],
            freeAplicacoesConcedidas[jogador],
            aplicacoesZeroPontos[jogador],
            totalPremiosRecebidos[jogador]
        );
    }
    
    function pause() public onlyOwner {
        paused = true;
    }
    
    function unpause() public onlyOwner {
        paused = false;
    }
}