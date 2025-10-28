'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BLOCKCHAIN_BET_CORPORATION_ABI = [
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
  "function treasury() view returns (address)",
  "function getContractBalance() view returns (uint256)",
  "function withdrawToTreasury(uint256 _amount) external onlyOwner",
  "function withdrawAllToTreasury() external onlyOwner",
  "event NovaRodadaIniciada(uint256 indexed rodadaId, uint256 timestamp)",
  "event NovaAplicacaoFeita(uint256 indexed rodadaId, address indexed jogador, uint256[5] prognosticos)",
  "event ResultadosProcessados(uint256 indexed rodadaId, uint256[5] resultados)",
  "event PremioReivindicado(uint256 indexed rodadaId, address indexed jogador, uint256 valor)",
  "event BonusConcedido(address indexed jogador, uint256 valor)",
  "event FreeAplicacaoConcedida(address indexed jogador)",
  "event TreasuryUpdated(address indexed newTreasury)",
  "event FundsWithdrawnToTreasury(uint256 amount)"
] as const;

const CORPORATE_TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function approve(address, uint256) returns (bool)",
  "function decimals() view returns (uint8)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
] as const;

const BLOCKCHAIN_BET_CORPORATION_ADDRESSES = {
  mainContract: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  corporateToken: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  treasury: "0xF00aA01e9d1f8E81fd070FBE52A917bE07710469"
} as const;

export default function AdminDashboardCorporationPage() {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [roundData, setRoundData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [adminActions, setAdminActions] = useState({
    novoBonus: '',
    novoLimite: ''
  });
  const [userAddress, setUserAddress] = useState('');
  const [corporationData, setCorporationData] = useState({
    contractBalance: '0',
    treasuryAddress: '',
    isPaused: false
  });

  const connectWallet = async () => {
    console.log('🏢 Iniciando conexão corporativa...');
    
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('❌ MetaMask não instalado!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      if (!accounts || accounts.length === 0) {
        alert('❌ Nenhuma conta conectada!');
        return;
      }

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setUserAddress(userAddress);

      const contract = new ethers.Contract(
        BLOCKCHAIN_BET_CORPORATION_ADDRESSES.mainContract, 
        BLOCKCHAIN_BET_CORPORATION_ABI, 
        signer
      );

      try {
        const owner = await contract.owner();
        const isOwner = userAddress.toLowerCase() === owner.toLowerCase();
        
        if (!isOwner) {
          alert('⚠️ Acesso restrito ao CEO da corporação!');
        }

        const treasury = await contract.treasury();
        const contractBalance = await contract.getContractBalance();
        const isPaused = await contract.paused();

        setCorporationData({
          contractBalance: ethers.formatUnits(contractBalance, 18),
          treasuryAddress: treasury,
          isPaused
        });

      } catch (testError) {
        console.warn('⚠️ Erro no teste corporativo:', testError);
      }

      setSigner(signer);
      setContract(contract);

      const roundId = await contract.rodadaAtualId();
      const round = await contract.rodadas(roundId);
      
      setCurrentRound(Number(roundId));
      setRoundData(round);

      console.log('🎉 Dashboard corporativo carregado!');

    } catch (error: any) {
      console.error('💥 ERRO CORPORATIVO:', error);
      
      if (error.code === 4001) {
        alert('❌ Conexão rejeitada pelo CEO');
      } else if (error.code === -32002) {
        alert('⏳ Solicitação pendente no MetaMask');
      } else {
        alert(`❌ Erro corporativo: ${error.message || 'Desconhecido'}`);
      }
    }
  };

  const handleAbrirRodada = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const tx = await contract.abrirRodada();
      await tx.wait();
      alert('✅ Nova rodada corporativa aberta!');
      
      const roundId = await contract.rodadaAtualId();
      const round = await contract.rodadas(roundId);
      setCurrentRound(Number(roundId));
      setRoundData(round);
      
    } catch (error: any) {
      alert(error?.reason || 'Erro ao abrir rodada corporativa');
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
      alert('✅ Contrato corporativo pausado!');
      setCorporationData(prev => ({...prev, isPaused: true}));
    } catch (error: any) {
      alert(error?.reason || 'Erro ao pausar contrato corporativo');
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
      alert('✅ Contrato corporativo ativado!');
      setCorporationData(prev => ({...prev, isPaused: false}));
    } catch (error: any) {
      alert(error?.reason || 'Erro ao ativar contrato corporativo');
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
      alert('✅ Configurações corporativas atualizadas!');
      setAdminActions({ novoBonus: '', novoLimite: '' });
    } catch (error: any) {
      alert(error?.reason || 'Erro ao atualizar configurações corporativas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawToTreasury = async () => {
    if (!contract) return;
    
    try {
      setIsLoading(true);
      const tx = await contract.withdrawAllToTreasury();
      await tx.wait();
      alert('✅ Fundos transferidos para tesouraria corporativa!');
      
      const contractBalance = await contract.getContractBalance();
      setCorporationData(prev => ({
        ...prev,
        contractBalance: ethers.formatUnits(contractBalance, 18)
      }));
    } catch (error: any) {
      alert(error?.reason || 'Erro na transferência corporativa');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🏢 CEO Dashboard
          </h1>
          <p className="text-xl text-purple-200">
            Painel de Controle Corporativo - Blockchain Bet Brasil Corporation
          </p>
          <div className="mt-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-4 py-2 rounded-full inline-block">
            💼 STATUS CORPORATION
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          {!signer ? (
            <div className="text-center">
              <button
                onClick={connectWallet}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-blue-700 transition-all shadow-2xl"
              >
                🏢 Conectar como CEO
              </button>
              <p className="text-white/70 mt-3">Acesso restrito ao CEO da corporação</p>
            </div>
          ) : (
            <div className="flex justify-between items-center text-white">
              <div>
                <p className="text-emerald-300 font-bold text-lg">✅ CEO Conectado</p>
                <p className="text-sm opacity-90 font-mono">
                  {userAddress?.slice(0, 8)}...{userAddress?.slice(-6)}
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
              >
                🔄 Atualizar Corporação
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Estatísticas Corporativas</h2>
            {roundData ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center border-2 border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{currentRound}</div>
                  <div className="text-sm text-gray-600">Rodada Corporativa</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center border-2 border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {ethers.formatUnits(roundData.totalArrecadado || 0, 18)}
                  </div>
                  <div className="text-sm text-gray-600">Arrecadação Corporativa</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center border-2 border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">
                    {ethers.formatUnits(roundData.premioTotal || 0, 18)}
                  </div>
                  <div className="text-sm text-gray-600">Prêmio Corporativo</div>
                </div>
                <div className={`p-4 rounded-xl text-center border-2 ${
                  corporationData.isPaused ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'
                }`}>
                  <div className={`text-2xl font-bold ${
                    corporationData.isPaused ? 'text-red-600' : 'text-emerald-600'
                  }`}>
                    {corporationData.isPaused ? '⏸️ Pausado' : '▶️ Ativo'}
                  </div>
                  <div className="text-sm text-gray-600">Status Corporativo</div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Conecte como CEO para ver dados corporativos</p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Gestão Corporativa</h2>
            
            <div className="space-y-4">
              <button
                onClick={handleAbrirRodada}
                disabled={isLoading || !signer}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? '🔄 Abrindo...' : '🏢 Abrir Nova Rodada'}
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
                  ▶️ Ativar
                </button>
              </div>

              <button
                onClick={handleWithdrawToTreasury}
                disabled={isLoading || !signer}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? '💰 Transferindo...' : '💼 Transferir para Tesouraria'}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">🎁 Configurações Corporativas</h3>
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Novo Bônus Corporativo"
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
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-bold hover:from-orange-700 hover:to-red-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? '⚙️ Configurando...' : '🏢 Atualizar Configurações'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">💼 Informações Corporativas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
              <div className="font-semibold text-blue-700">Contrato Corporativo</div>
              <div className="text-sm text-blue-600 font-mono mt-1 break-all">
                {BLOCKCHAIN_BET_CORPORATION_ADDRESSES.mainContract}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
              <div className="font-semibold text-green-700">Token Corporativo</div>
              <div className="text-sm text-green-600 font-mono mt-1 break-all">
                {BLOCKCHAIN_BET_CORPORATION_ADDRESSES.corporateToken}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200">
              <div className="font-semibold text-purple-700">Tesouraria</div>
              <div className="text-sm text-purple-600 font-mono mt-1 break-all">
                {corporationData.treasuryAddress || BLOCKCHAIN_BET_CORPORATION_ADDRESSES.treasury}
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border-2 border-emerald-200">
              <div className="font-semibold text-emerald-700">Saldo Corporativo</div>
              <div className="text-2xl font-bold text-emerald-600 mt-1">
                {corporationData.contractBalance} ETH
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border-2 border-amber-200">
              <div className="font-semibold text-amber-700">Status Corporativo</div>
              <div className={`text-2xl font-bold mt-1 ${
                corporationData.isPaused ? 'text-red-600' : 'text-emerald-600'
              }`}>
                {corporationData.isPaused ? '⏸️ CORPORATION PAUSED' : '🏢 CORPORATION ACTIVE'}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-full inline-block">
            🚀 BLOCKCHAIN BET BRASIL CORPORATION - TODOS OS DIREITOS RESERVADOS
          </div>
        </div>

      </div>
    </div>
  );
}