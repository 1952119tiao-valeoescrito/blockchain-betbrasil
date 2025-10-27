// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IBlockchainBetBrasil {
    // Estruturas básicas
    struct Aposta {
        address jogador;
        uint256[5] prognosticos;
        uint256 valorPago;
        uint256 pontosFeitos;
    }

    // Funções que o InvestBet precisa acessar
    function getRodadaResultados(uint256 _rodadaId) 
        external 
        view 
        returns (
            uint256 totalArrecadado, 
            uint256 premioTotal, 
            uint256[5] memory resultados
        );
    
    function rodadas(uint256) 
        external 
        view 
        returns (
            uint256 id,
            uint256 status,
            uint256 totalArrecadado,
            uint256 premioTotal,
            bool resultadosForamInseridos,
            uint256 timestampAbertura,
            uint256 timestampFechamentoApostas,
            uint256 timestampResultadosProcessados,
            uint256 poteAcumulado
        );
    
    function rodadaAtualId() external view returns (uint256);
    
    // Eventos para o InvestBet escutar
    event ResultadosProcessados(uint256 indexed rodadaId, uint256[5] resultados);
    event NovaApostaFeita(uint256 indexed rodadaId, address indexed jogador, uint256[5] prognosticos);
    
    // Funções auxiliares que podem ser úteis
    function reivindicarPremio(uint256 _rodadaId) external;
    function getStatusJogador(address jogador) 
        external 
        view 
        returns (
            uint256 bonusAcumulado,
            uint256 freeBetsDisponiveis,
            uint256 totalApostasZeroPontos,
            uint256 premiosRecebidos
        );
}