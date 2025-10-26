// app/admin/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// ✅ ABI COMPLETA do Blockchain Bet Brasil (a mesma que você já usa)
const BLOCKCHAIN_BET_ABI = [
  {
    "inputs": [
      {"internalType": "address","name": "_stablecoin","type": "address"},
      {"internalType": "address","name": "_vrfCoordinator","type": "address"},
      {"internalType": "uint64","name": "_subscriptionId","type": "uint64"},
      {"internalType": "bytes32","name": "_keyHash","type": "bytes32"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {"inputs": [],"name": "ReentrancyGuardReentrantCall","type": "error"},
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "address","name": "jogador","type": "address"},
      {"indexed": false,"internalType": "uint256","name": "valor","type": "uint256"}
    ],
    "name": "BonusConcedido",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "address","name": "jogador","type": "address"}
    ],
    "name": "FreeAplicacaoConcedida",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "rodadaId","type": "uint256"},
      {"indexed": true,"internalType": "address","name": "jogador","type": "address"},
      {"indexed": false,"internalType": "uint256[5]","name": "prognosticos","type": "uint256[5]"}
    ],
    "name": "NovaAplicacaoFeita",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "rodadaId","type": "uint256"},
      {"indexed": false,"internalType": "uint256","name": "timestamp","type": "uint256"}
    ],
    "name": "NovaRodadaIniciada",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "address","name": "jogador","type": "address"},
      {"indexed": false,"internalType": "uint256","name": "valor","type": "uint256"}
    ],
    "name": "PremioRecebido",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "rodadaId","type": "uint256"},
      {"indexed": true,"internalType": "address","name": "jogador","type": "address"},
      {"indexed": false,"internalType": "uint256","name": "valor","type": "uint256"}
    ],
    "name": "PremioReivindicado",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true,"internalType": "uint256","name": "rodadaId","type": "uint256"},
      {"indexed": false,"internalType": "uint256[5]","name": "resultados","type": "uint256[5]"}
    ],
    "name": "ResultadosProcessados",
    "type": "event"
  },
  {"inputs": [],"name": "BONUS_ZERO_PONTOS","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "MAX_APLICACOES_POR_RODADA","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "PRECO_APLICACAO","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "TAXA_PLATAFORMA_PERCENTUAL","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "abrirRodada","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "aplicacoesParaFreeAplicacao","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "aplicacoesZeroPontos","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "uint256[5]","name": "_prognosticos","type": "uint256[5]"}],"name": "aplicar","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "bonusAcumulados","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "bonusZeroPontos","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "freeAplicacoesConcedidas","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "jogador","type": "address"}],"name": "getStatusJogador","outputs": [
      {"internalType": "uint256","name": "bonusAcumulado","type": "uint256"},
      {"internalType": "uint256","name": "freeAplicacoesDisponiveis","type": "uint256"},
      {"internalType": "uint256","name": "totalAplicacoesZeroPontos","type": "uint256"},
      {"internalType": "uint256","name": "premiosRecebidos","type": "uint256"}
    ],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "pause","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "paused","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "percentuaisPremio","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "uint256","name": "_rodadaId","type": "uint256"}],"name": "reivindicarPremio","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "rodadaAtualId","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "rodadas","outputs": [
      {"internalType": "uint256","name": "id","type": "uint256"},
      {"internalType": "enum BlockchainBetBrasilV3.StatusRodada","name": "status","type": "uint8"},
      {"internalType": "uint256","name": "totalArrecadado","type": "uint256"},
      {"internalType": "uint256","name": "premioTotal","type": "uint256"},
      {"internalType": "bool","name": "resultadosForamInseridos","type": "bool"},
      {"internalType": "uint256","name": "timestampAbertura","type": "uint256"},
      {"internalType": "uint256","name": "timestampFechamentoAplicacoes","type": "uint256"},
      {"internalType": "uint256","name": "timestampResultadosProcessados","type": "uint256"},
      {"internalType": "uint256","name": "s_requestId","type": "uint256"},
      {"internalType": "uint256","name": "poteAcumulado","type": "uint256"}
    ],"stateMutability": "view","type": "function"},
  {"inputs": [
      {"internalType": "uint256","name": "_novoBonus","type": "uint256"},
      {"internalType": "uint256","name": "_novoLimiteFreeAplicacao","type": "uint256"}
    ],"name": "setConfiguracoesBonus","outputs": [],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [],"name": "stablecoin","outputs": [{"internalType": "contract IERC20","name": "","type": "address"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "totalPremiosRecebidos","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "unpause","outputs": [],"stateMutability": "nonpayable","type": "function"}
] as const;

// ✅ ABI da Stablecoin (resumida para as funções essenciais)
const STABLECOIN_ABI = [
  {"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},
  {"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},
  {"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},
  {"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"}
] as const;

// ✅ Endereços dos contratos (use os mesmos do seu dashboard)
const CONTRACT_ADDRESSES = {
  blockchainBet: process.env.NEXT_PUBLIC_BET_CONTRACT || "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  stablecoin: process.env.NEXT_PUBLIC_STABLECOIN_CONTRACT || "0xd3a5Ec24959F38E9aF48423D7d3E8e2618870229"
} as const;

export default function AdminDashboardPage() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [roundData, setRoundData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adminActions, setAdminActions] = useState({
    novoBonus: '',
    novoLimite: ''
  });

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('MetaMask não instalado!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.blockchainBet, 
        BLOCKCHAIN_BET_ABI, 
        signer
      );

      setSigner(signer);
      setContract(contract);

      // Verificar se é owner
      const owner = await contract.owner();
      const isOwner = (await signer.getAddress()).toLowerCase() === owner.toLowerCase();
      
      if (!isOwner) {
        alert('⚠️ Você não é o owner do contrato!');
        return;
      }

      // Carregar dados
      const roundId = await contract.rodadaAtualId();
      const round = await contract.rodadas(roundId);
      
      setCurrentRound(Number(roundId));
      setRoundData(round);
      
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar');
    }
  };

  const handleAbrirRodada = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const tx = await contract.abrirRodada();
      await tx.wait();
      alert('✅ Nova rodada aberta com sucesso!');
      
      // Atualizar dados
      const roundId = await contract.rodadaAtualId();
      const round = await contract.rodadas(roundId);
      setCurrentRound(Number(roundId));
      setRoundData(round);
      
    } catch (error: any) {
      alert(error?.reason || 'Erro ao abrir rodada');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePauseContract = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const tx = await contract.pause();
      await tx.wait();
      alert('✅ Contrato pausado com sucesso!');
    } catch (error: any) {
      alert(error?.reason || 'Erro ao pausar contrato');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpauseContract = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const tx = await contract.unpause();
      await tx.wait();
      alert('✅ Contrato despausado com sucesso!');
    } catch (error: any) {
      alert(error?.reason || 'Erro ao despausar contrato');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetConfiguracoesBonus = async () => {
    if (!contract || !adminActions.novoBonus || !adminActions.novoLimite) return;
    
    try {
      setIsLoading(true);
      const tx = await contract.setConfiguracoesBonus(
        ethers.parseUnits(adminActions.novoBonus, 18),
        adminActions.novoLimite
      );
      await tx.wait();
      alert('✅ Configurações de bônus atualizadas!');
      setAdminActions({ novoBonus: '', novoLimite: '' });
    } catch (error: any) {
      alert(error?.reason || 'Erro ao atualizar configurações');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-800 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Admin */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ⚙️ Admin Dashboard
          </h1>
          <p className="text-xl text-purple-100">
            Painel de Controle - Blockchain Bet Brasil
          </p>
        </div>

        {/* Status da Conexão */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          {!signer ? (
            <div className="text-center">
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all"
              >
                🔗 Conectar como Admin
              </button>
              <p className="text-white/70 mt-3">Apenas o owner do contrato pode acessar</p>
            </div>
          ) : (
            <div className="flex justify-between items-center text-white">
              <div>
                <p className="text-green-300 font-bold">✅ Admin Conectado</p>
                <p className="text-sm opacity-90">
                  {signer.address?.slice(0, 8)}...{signer.address?.slice(-6)}
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                🔄 Atualizar
              </button>
            </div>
          )}
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Estatísticas da Rodada */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Estatísticas da Rodada</h2>
            {roundData ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentRound}</div>
                  <div className="text-sm text-gray-600">Rodada Atual</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {ethers.formatUnits(roundData.totalArrecadado || 0, 18)}
                  </div>
                  <div className="text-sm text-gray-600">Total Arrecadado</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {ethers.formatUnits(roundData.premioTotal || 0, 18)}
                  </div>
                  <div className="text-sm text-gray-600">Prêmio Total</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {roundData.status === 0 ? 'Aberta' : 
                     roundData.status === 1 ? 'Fechada' : 
                     roundData.status === 2 ? 'Processando' : 'Finalizada'}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Conecte como admin para ver os dados</p>
            )}
          </div>

          {/* Ações Admin */}
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Ações Administrativas</h2>
            
            <div className="space-y-4">
              <button
                onClick={handleAbrirRodada}
                disabled={isLoading || !signer}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Abrindo...' : '🔄 Abrir Nova Rodada'}
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={handlePauseContract}
                  disabled={isLoading || !signer}
                  className="flex-1 bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  ⏸️ Pausar
                </button>
                <button
                  onClick={handleUnpauseContract}
                  disabled={isLoading || !signer}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  ▶️ Despausar
                </button>
              </div>
            </div>

            {/* Configurações de Bônus */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎁 Configurar Bônus</h3>
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Novo Bônus (ex: 10)"
                  value={adminActions.novoBonus}
                  onChange={(e) => setAdminActions({...adminActions, novoBonus: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="number"
                  placeholder="Novo Limite Free Aplicação"
                  value={adminActions.novoLimite}
                  onChange={(e) => setAdminActions({...adminActions, novoLimite: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                <button
                  onClick={handleSetConfiguracoesBonus}
                  disabled={isLoading || !adminActions.novoBonus || !adminActions.novoLimite}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Configurando...' : '⚙️ Atualizar Configurações'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Informações do Contrato */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ℹ️ Informações do Contrato</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-semibold text-gray-700">Contrato Principal</div>
              <div className="text-sm text-gray-600 font-mono mt-1 break-all">
                {CONTRACT_ADDRESSES.blockchainBet}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-semibold text-gray-700">Stablecoin</div>
              <div className="text-sm text-gray-600 font-mono mt-1 break-all">
                {CONTRACT_ADDRESSES.stablecoin}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-semibold text-gray-700">Network</div>
              <div className="text-sm text-gray-600 mt-1">Ethereum Sepolia</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}