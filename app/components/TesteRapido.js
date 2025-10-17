// app/components/TesteRapido.js

'use client';
import { useState } from 'react';
import { useAplicar, useRodadaAtual } from '../hooks/useBetBrasil';
import { useAccount, useBalance } from 'wagmi';
import { CONTRACT_ADDRESSES } from '../config/contracts';

export default function TesteRapido() {
  const { address, isConnected } = useAccount();
  const { aplicar, isLoading, isSuccess, isError } = useAplicar();
  const { rodadaAtual } = useRodadaAtual();
  const { data: saldo } = useBalance({ 
    address, 
    token: CONTRACT_ADDRESSES.stablecoin 
  });
  
  const [resultado, setResultado] = useState('');

  const testarAplicacao = async () => {
    try {
      // Gera 5 prognósticos aleatórios (1-625)
      const prognosticos = Array.from({ length: 5 }, () => 
        Math.floor(Math.random() * 625) + 1
      );
      
      console.log('Prognósticos:', prognosticos);
      setResultado(`🎯 Tentando aplicar: ${prognosticos.map(p => {
        const x = Math.floor((p - 1) / 25) + 1;
        const y = ((p - 1) % 25) + 1;
        return `${x}/${y}`;
      }).join(', ')}`);
      
      await aplicar(prognosticos);
    } catch (error) {
      setResultado(`❌ Erro: ${error.message}`);
    }
  };

  if (!isConnected) {
    return (
      <div className="p-4 border rounded bg-yellow-100">
        🔌 Conecte sua carteira primeiro
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">🧪 Teste Rápido</h2>
      
      <div className="mb-4 space-y-2">
        <p><strong>Endereço:</strong> {address?.slice(0, 10)}...</p>
        <p><strong>Saldo USDC:</strong> {saldo?.formatted || '0'}</p>
        <p><strong>Rodada:</strong> {rodadaAtual?.toString() || '0'}</p>
      </div>
      
      <button 
        onClick={testarAplicacao}
        disabled={isLoading}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 hover:bg-blue-600 transition"
      >
        {isLoading ? '🔄 Aplicando...' : '🎲 Testar Aplicação Aleatória'}
      </button>
      
      {isSuccess && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded">
          ✅ <strong>Sucesso!</strong> Aplicação realizada!
        </div>
      )}
      
      {isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded">
          ❌ <strong>Erro!</strong> Verifique o console.
        </div>
      )}
      
      {resultado && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-400 rounded">
          {resultado}
        </div>
      )}
    </div>
  );
}