// app/admin/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// ✅ ABI COMPATÍVEL com ethers v6 - Blockchain Bet
const BLOCKCHAIN_BET_ABI = [
  "function rodadaAtualId() view returns (uint256)",
  "function rodadas(uint256) view returns ((uint256 id, uint8 status, uint256 totalArrecadado, uint256 premioTotal, bool resultadosForamInseridos, uint256 timestampAbertura, uint256 timestampFechamentoAplicacoes, uint256 timestampResultadosProcessados, uint256 s_requestId, uint256 poteAcumulado))",
  "function getStatusJogador(address) view returns (uint256 bonusAcumulado, uint256 freeAplicacoesDisponiveis, uint256 totalAplicacoesZeroPontos, uint256 premiosRecebidos)",
  "function aplicar(uint256[5] _prognosticos)",
  "function reivindicarPremio(uint256 _rodadaId)",
  "function abrirRodada()",
  "function pause()",
  "function unpause()",
  "function setConfiguracoesBonus(uint256 _novoBonus, uint256 _novoLimiteFreeAplicacao)",
  "function owner() view returns (address)",
  "function paused() view returns (bool)",
  "function PRECO_APLICACAO() view returns (uint256)",
  "function BONUS_ZERO_PONTOS() view returns (uint256)",
  "function aplicacoesParaFreeAplicacao() view returns (uint256)",
  
  // Events
  "event NovaRodadaIniciada(uint256 indexed rodadaId, uint256 timestamp)",
  "event NovaAplicacaoFeita(uint256 indexed rodadaId, address indexed jogador, uint256[5] prognosticos)",
  "event ResultadosProcessados(uint256 indexed rodadaId, uint256[5] resultados)",
  "event PremioReivindicado(uint256 indexed rodadaId, address indexed jogador, uint256 valor)",
  "event BonusConcedido(address indexed jogador, uint256 valor)",
  "event FreeAplicacaoConcedida(address indexed jogador)"
] as const;

// ✅ ABI COMPATÍVEL com ethers v6 - Stablecoin
const STABLECOIN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address, uint256) returns (bool)",
  "function decimals() view returns (uint8)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  
  // Events
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
] as const;

// ✅ Endereços dos contratos
const CONTRACT_ADDRESSES = {
  blockchainBet: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", // ← SEU CONTRATO NOVO!
  stablecoin: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"    // ← SUA STABLECOIN NOVA!
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
    console.log('🔧 Iniciando conexão debug...');
    
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('❌ MetaMask não instalado!');
        return;
      }

      console.log('✅ MetaMask detectado');

      // 1. Conectar provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log('🔗 Provider criado');

      // 2. Pedir contas
      const accounts = await provider.send("eth_requestAccounts", []);
      console.log('📨 Contas:', accounts);

      if (!accounts || accounts.length === 0) {
        alert('❌ Nenhuma conta conectada!');
        return;
      }

      // 3. Criar signer
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log('👤 Usuário:', userAddress);

      // 4. Criar contratos COM ABIs COMPATÍVEIS
      console.log('📄 Criando contrato BlockchainBet...');
      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.blockchainBet, 
        BLOCKCHAIN_BET_ABI, 
        signer
      );

      console.log('✅ Contrato criado com sucesso!');

      // 5. Testar chamada simples
      console.log('🧪 Testando chamada...');
      try {
        const owner = await contract.owner();
        console.log('👑 Owner:', owner);
        
        const isOwner = userAddress.toLowerCase() === owner.toLowerCase();
        console.log('🔐 É owner?', isOwner);
        
        if (!isOwner) {
          alert('⚠️ Você não é o owner do contrato! Apenas visualização.');
        }
      } catch (testError) {
        console.warn('⚠️ Erro no teste, mas continuando...', testError);
      }

      // 6. Atualizar estado
      setSigner(signer);
      setContract(contract);

      // 7. Carregar dados
      console.log('📊 Carregando dados...');
      const roundId = await contract.rodadaAtualId();
      const round = await contract.rodadas(roundId);
      
      setCurrentRound(Number(roundId));
      setRoundData(round);

      console.log('🎉 Dashboard admin carregado!');

    } catch (error: any) {
      console.error('💥 ERRO CRÍTICO:', error);
      
      // Erros específicos do MetaMask
      if (error.code === 4001) {
        alert('❌ Conexão rejeitada pelo usuário');
      } else if (error.code === -32002) {
        alert('⏳ Solicitação pendente no MetaMask');
      } else {
        alert(`❌ Erro: ${error.message || 'Desconhecido'}`);
      }
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