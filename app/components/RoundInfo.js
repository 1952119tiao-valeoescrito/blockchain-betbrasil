// src/components/RoundInfo.js

import React from 'react';

const RoundInfo = ({ rodada }) => {
  if (!rodada) {
    return (
      <div className="round-info loading">
        <p>Carregando informações da rodada...</p>
      </div>
    );
  }

  const getStatusText = (status) => {
    const statusMap = {
      '0': '🟡 Inativa',
      '1': '🟢 Aberta',
      '2': '🔴 Fechada',
      '3': '🟣 Resultado Solicitado', 
      '4': '🔵 Resultado Disponível',
      '5': '⚫ Paga'
    };
    return statusMap[status] || '❓ Desconhecido';
  };

  return (
    <div className="round-info">
      <h3>📅 Rodada Atual</h3>
      
      <div className="round-details">
        <div className="round-item">
          <span className="label">ID:</span>
          <span className="value">#{rodada.id}</span>
        </div>
        
        <div className="round-item">
          <span className="label">Status:</span>
          <span className="value">{getStatusText(rodada.status)}</span>
        </div>
        
        <div className="round-item">
          <span className="label">Arrecadado:</span>
          <span className="value">{rodada.totalArrecadado} USDC</span>
        </div>
        
        <div className="round-item">
          <span className="label">Prêmio Total:</span>
          <span className="value">{rodada.premioTotal} USDC</span>
        </div>
      </div>

      {rodada.status === '1' && (
        <div className="round-active">
          <div className="active-indicator"></div>
          <span>Rodada aberta para apostas! 🎯</span>
        </div>
      )}
    </div>
  );
};

export default RoundInfo;