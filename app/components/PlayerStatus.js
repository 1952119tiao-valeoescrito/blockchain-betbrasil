// src/components/PlayerStatus.js

import React from 'react';

const PlayerStatus = ({ status }) => {
  if (!status) {
    return (
      <div className="player-status loading">
        <p>Carregando status...</p>
      </div>
    );
  }

  const stats = [
    {
      label: '💰 Bônus Acumulado',
      value: `${status.bonusAcumulado} USDC`,
      icon: '💰'
    },
    {
      label: '🎫 Free Bets',
      value: status.freeAplicacoes,
      icon: '🎫'
    },
    {
      label: '🔴 Apostas Zero',
      value: status.aplicacoesZeroPontos,
      icon: '🔴'
    },
    {
      label: '🏆 Prêmios Recebidos',
      value: `${status.premiosRecebidos} USDC`,
      icon: '🏆'
    }
  ];

  return (
    <div className="player-status">
      <h3>📊 Seu Status</h3>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="status-tips">
        <p>✨ <strong>Bônus:</strong> Ganhe USDC por apostas com zero pontos</p>
        <p>🎁 <strong>Free Bets:</strong> A cada 8 apostas sem pontos, ganhe uma aposta grátis</p>
      </div>
    </div>
  );
};

export default PlayerStatus;