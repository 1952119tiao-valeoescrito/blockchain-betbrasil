// app/components/BetForm.tsx
'use client';

import { useState } from 'react';

export default function BetForm() {
  const [betAmount, setBetAmount] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [odds, setOdds] = useState('2.5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de aposta aqui
    console.log({ betAmount, selectedTeam, odds });
    alert('Aposta realizada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Fazer Aposta
          </h1>
          <p className="text-gray-400 text-lg">
            Bolshota: sua carreira para acontecer
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border border-yellow-500/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seleção de Time */}
            <div className="form-group">
              <label className="block text-yellow-400 font-semibold mb-3 text-lg">
                🏆 Selecione o Time:
              </label>
              <select 
                value={selectedTeam} 
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
                required
              >
                <option value="">Escolha uma opção</option>
                <option value="timeA">Flamengo - Odds: 2.1</option>
                <option value="timeB">Palmeiras - Odds: 3.2</option>
                <option value="empate">Empate - Odds: 2.8</option>
              </select>
            </div>

            {/* Valor da Aposta */}
            <div className="form-group">
              <label className="block text-yellow-400 font-semibold mb-3 text-lg">
                💰 Valor da Aposta (ETH):
              </label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.01"
                step="0.001"
                min="0.001"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none"
                required
              />
              <p className="text-gray-400 text-sm mt-2">
                Valor mínimo: 0.001 ETH
              </p>
            </div>

            {/* Resumo da Aposta */}
            {betAmount && selectedTeam && (
              <div className="bg-gray-900 rounded-lg p-4 border border-yellow-500/50">
                <h3 className="text-yellow-400 font-semibold mb-2">Resumo da Aposta:</h3>
                <p>Time: {selectedTeam}</p>
                <p>Valor: {betAmount} ETH</p>
                <p className="text-green-400 font-bold">
                  Possível Retorno: {(parseFloat(betAmount || '0') * 2.5).toFixed(3)} ETH
                </p>
              </div>
            )}

            {/* Botão de Aposta */}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-4 px-6 rounded-lg transition duration-300 text-lg"
            >
              🎯 Confirmar Aposta
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400">
            © 2024 Blockchain Bet Brasil - Plataforma gamificada
          </p>
        </footer>
      </div>
    </div>
  );
}