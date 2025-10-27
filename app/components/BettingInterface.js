// src/components/BettingInterface.js

import React, { useState } from 'react';

const BettingInterface = ({ 
  onAposta, 
  loading, 
  preco = "5.0",
  saldo = "0"
}) => {
  const [prognosticos, setPrognosticos] = useState(['', '', '', '', '']);

  const handleInputChange = (index, value) => {
    // Validar se é número entre 1-25
    const num = parseInt(value);
    if ((value === '' || (num >= 1 && num <= 25)) && value.length <= 2) {
      const newPrognosticos = [...prognosticos];
      newPrognosticos[index] = value;
      setPrognosticos(newPrognosticos);
    }
  };

  const handleAposta = async () => {
    // Validar todos os números preenchidos
    if (prognosticos.some(num => num === '')) {
      alert('Por favor, preencha todos os 5 números!');
      return;
    }

    // Converter para números
    const nums = prognosticos.map(num => parseInt(num));
    
    // Verificar duplicatas
    const uniqueNums = new Set(nums);
    if (uniqueNums.size !== 5) {
      alert('Os números não podem se repetir!');
      return;
    }

    const result = await onAposta(nums);
    
    if (result.success) {
      // Limpar formulário após aposta bem-sucedida
      setPrognosticos(['', '', '', '', '']);
    }
  };

  const isFormValid = prognosticos.every(num => num !== '') && !loading;

  return (
    <div className="betting-interface">
      <div className="betting-header">
        <h2>🎯 Fazer Aposta</h2>
        <div className="bet-info">
          <span className="price">💰 Preço: {preco} USDC</span>
          <span className="balance">💳 Saldo: {saldo} USDC</span>
        </div>
      </div>

      <div className="prognosticos-container">
        <h3>Escolha 5 números (1-25):</h3>
        
        <div className="numeros-grid">
          {prognosticos.map((numero, index) => (
            <div key={index} className="numero-input-container">
              <label>Nº {index + 1}</label>
              <input
                type="number"
                min="1"
                max="25"
                value={numero}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="numero-input"
                placeholder="0"
                disabled={loading}
              />
            </div>
          ))}
        </div>

        <div className="selected-numbers">
          <strong>Seus números:</strong> 
          {prognosticos.filter(n => n !== '').join(', ') || 'Nenhum selecionado'}
        </div>
      </div>

      <button
        onClick={handleAposta}
        disabled={!isFormValid}
        className={`bet-button ${!isFormValid ? 'disabled' : ''}`}
      >
        {loading ? '🔄 Processando...' : `🎯 Apostar ${preco} USDC`}
      </button>

      <div className="betting-tips">
        <p>💡 <strong>Dica:</strong> Escolha 5 números diferentes entre 1 e 25</p>
      </div>
    </div>
  );
};

export default BettingInterface;