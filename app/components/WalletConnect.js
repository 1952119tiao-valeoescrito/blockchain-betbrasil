// src/components/WalletConnect.js

import React from 'react';

const WalletConnect = ({ account, loading, error, onConnect }) => {
  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-connect">
      {!account ? (
        <div className="connect-section">
          <h2>🔗 Conectar Carteira</h2>
          <p>Conecte sua carteira MetaMask para começar a apostar</p>
          
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
          
          <button 
            onClick={onConnect}
            disabled={loading}
            className="connect-button"
          >
            {loading ? '🔄 Conectando...' : '🦊 Conectar MetaMask'}
          </button>
        </div>
      ) : (
        <div className="connected-section">
          <div className="wallet-info">
            <div className="status-indicator">✅</div>
            <div className="wallet-details">
              <span className="label">Conectado:</span>
              <span className="address">{formatAddress(account)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;