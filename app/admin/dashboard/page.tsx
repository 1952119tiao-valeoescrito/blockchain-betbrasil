// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Tipos para os dados do dashboard
interface DashboardStats {
  totalUsers: number;
  totalBets: number;
  totalVolume: string;
  successRate: number;
  contractBalance: string;
  activeBets: number;
}

interface Bet {
  id: string;
  user: string;
  amount: string;
  team: string;
  odds: number;
  status: 'active' | 'won' | 'lost';
  timestamp: Date;
}

interface Transaction {
  hash: string;
  type: 'bet' | 'withdrawal' | 'deposit';
  amount: string;
  from: string;
  to: string;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'failed';
}

export default function CorporateDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1250,
    totalBets: 5840,
    totalVolume: '25.4',
    successRate: 98,
    contractBalance: '12.8',
    activeBets: 42
  });

  const [recentBets, setRecentBets] = useState<Bet[]>([
    {
      id: '1',
      user: '0x742d...1a3f',
      amount: '0.1',
      team: 'Flamengo',
      odds: 2.1,
      status: 'active',
      timestamp: new Date()
    },
    {
      id: '2',
      user: '0x8a9b...4c2d',
      amount: '0.05',
      team: 'Palmeiras',
      odds: 3.2,
      status: 'won',
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '3',
      user: '0x3c8f...7e1a',
      amount: '0.2',
      team: 'Empate',
      odds: 2.8,
      status: 'lost',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    }
  ]);

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    {
      hash: '0x8a3b...c4d5',
      type: 'bet',
      amount: '0.1',
      from: '0x742d...1a3f',
      to: 'Contract',
      timestamp: new Date(),
      status: 'confirmed'
    },
    {
      hash: '0x9b2c...d3e6',
      type: 'withdrawal',
      amount: '5.0',
      from: 'Contract',
      to: 'Treasury',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: 'pending'
    }
  ]);

  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulação de conexão com wallet
  const connectWallet = () => {
    setIsConnected(true);
    // Aqui você integraria com Web3
  };

  // Funções executivas
  const withdrawToTreasury = (amount: string) => {
    console.log(`Withdrawing ${amount} ETH to treasury`);
    // Integração com contrato
    alert(`Saque de ${amount} ETH executado para a tesouraria!`);
  };

  const emergencyPause = () => {
    console.log('Emergency pause activated');
    // Integração com contrato
    alert('Contrato pausado em modo de emergência!');
  };

  const generateReport = () => {
    alert('Relatório corporativo gerado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Corporativo */}
      <header className="border-b border-gray-700 bg-gray-900/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-xl">B³</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  Blockchain Bet Brasil Corp
                </h1>
                <p className="text-gray-400 text-sm">Executive Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {!isConnected ? (
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  🔗 Connect CEO Wallet
                </button>
              ) : (
                <div className="flex items-center space-x-3 bg-gray-800/80 rounded-xl px-4 py-2 border border-green-500/30">
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">👑 CEO Connected</p>
                    <p className="text-gray-400 text-xs">0xF00aA01e9d1f8E81fd070FBE52A917bE07710469</p>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'bets', 'transactions', 'contract', 'treasury'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? 'border-green-500 text-green-400 font-bold'
                    : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {tab === 'overview' ? '📊 Overview' :
                 tab === 'bets' ? '🎯 Bets' :
                 tab === 'transactions' ? '💸 Transactions' :
                 tab === 'contract' ? '📝 Contract' :
                 '💰 Treasury'}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: '👥', change: '+12%', color: 'blue' },
                { label: 'Total Bets', value: stats.totalBets.toLocaleString(), icon: '🎲', change: '+8%', color: 'purple' },
                { label: 'Volume Total', value: `${stats.totalVolume} ETH`, icon: '💰', change: '+15%', color: 'green' },
                { label: 'Taxa de Sucesso', value: `${stats.successRate}%`, icon: '📈', change: '+2%', color: 'yellow' },
                { label: 'Saldo do Contrato', value: `${stats.contractBalance} ETH`, icon: '🏦', change: '+5%', color: 'indigo' },
                { label: 'Apostas Ativas', value: stats.activeBets.toString(), icon: '⚡', change: '+3%', color: 'red' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-green-500/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-green-400 text-sm mt-1 font-semibold">
                        📈 {stat.change} from last week
                      </p>
                    </div>
                    <div className="text-4xl opacity-80">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Bets */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                    🎯 Apostas Recentes
                  </h3>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {recentBets.length} ativas
                  </span>
                </div>
                <div className="space-y-4">
                  {recentBets.map((bet) => (
                    <div 
                      key={bet.id} 
                      className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${
                          bet.status === 'active' ? 'bg-yellow-500 animate-pulse' :
                          bet.status === 'won' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-semibold text-white">{bet.user}</p>
                          <p className="text-gray-400 text-sm">
                            {bet.team} • Odds: <span className="text-yellow-400">{bet.odds}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-white">{bet.amount} ETH</p>
                        <p className={`text-sm font-semibold capitalize ${
                          bet.status === 'active' ? 'text-yellow-400' :
                          bet.status === 'won' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {bet.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                    💸 Transações Recentes
                  </h3>
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                    Live
                  </span>
                </div>
                <div className="space-y-4">
                  {recentTransactions.map((tx, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tx.type === 'bet' ? 'bg-blue-500/20 border border-blue-500/30' :
                          tx.type === 'withdrawal' ? 'bg-red-500/20 border border-red-500/30' : 
                          'bg-green-500/20 border border-green-500/30'
                        }`}>
                          {tx.type === 'bet' ? '🎲' : tx.type === 'withdrawal' ? '📤' : '📥'}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                          </p>
                          <p className="text-gray-400 text-sm capitalize">
                            {tx.type} • {tx.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-white">{tx.amount} ETH</p>
                        <p className={`text-sm font-semibold ${
                          tx.status === 'confirmed' ? 'text-green-400' :
                          tx.status === 'pending' ? 'text-yellow-400 animate-pulse' : 'text-red-400'
                        }`}>
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Executive Actions */}
            <div className="bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-green-500/10 backdrop-blur-lg rounded-2xl p-8 border border-green-500/30 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                ⚡ Ações Executivas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => withdrawToTreasury('5.0')}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center justify-center space-x-2"
                >
                  <span>💰</span>
                  <span>Withdraw to Treasury</span>
                </button>
                <button
                  onClick={emergencyPause}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-500/25 flex items-center justify-center space-x-2"
                >
                  <span>🚨</span>
                  <span>Emergency Pause</span>
                </button>
                <button 
                  onClick={generateReport}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
                >
                  <span>📊</span>
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bets Tab */}
        {activeTab === 'bets' && (
          <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                🎯 Gerenciamento de Apostas
              </h2>
              <div className="flex space-x-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300">
                  🔄 Atualizar
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300">
                  📥 Exportar
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-gray-700">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/80 border-b border-gray-700">
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">ID</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Usuário</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Time</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Valor</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Odds</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Status</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBets.map((bet) => (
                    <tr 
                      key={bet.id} 
                      className="border-b border-gray-800 hover:bg-gray-700/50 transition duration-300"
                    >
                      <td className="py-4 px-6 font-mono text-sm text-gray-300">#{bet.id}</td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-white">{bet.user}</p>
                          <p className="text-gray-400 text-sm">
                            {bet.timestamp.toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-white">{bet.team}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-lg text-yellow-400">{bet.amount} ETH</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-green-400">{bet.odds}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          bet.status === 'active' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                          bet.status === 'won' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                          'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {bet.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-300">
                            👁️ Detalhes
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition duration-300">
                            ⚡ Ações
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Treasury Tab */}
        {activeTab === 'treasury' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Treasury Overview */}
              <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
                <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  💰 Visão Geral do Tesouro
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Saldo do Contrato', value: `${stats.contractBalance} ETH`, color: 'green' },
                    { label: 'Total Arrecadado', value: `${stats.totalVolume} ETH`, color: 'yellow' },
                    { label: 'Taxa da Plataforma', value: '2.5%', color: 'blue' },
                    { label: 'Lucro Líquido', value: '18.2 ETH', color: 'green' },
                    { label: 'Saque Pendente', value: '5.0 ETH', color: 'red' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-green-500/30 transition duration-300"
                    >
                      <span className="text-gray-300 font-medium">{item.label}</span>
                      <span className={`font-bold text-lg ${
                        item.color === 'green' ? 'text-green-400' :
                        item.color === 'yellow' ? 'text-yellow-400' :
                        item.color === 'blue' ? 'text-blue-400' : 'text-red-400'
                      }`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Withdrawal Panel */}
              <div className="bg-gradient-to-r from-green-500/10 to-yellow-500/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30 shadow-xl">
                <h3 className="text-xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                  📤 Saque para Tesouraria
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      💎 Valor para Saque (ETH)
                    </label>
                    <input
                      type="number"
                      placeholder="0.0"
                      step="0.1"
                      min="0.1"
                      max={stats.contractBalance}
                      className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-4 text-white text-lg font-semibold focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition duration-300"
                    />
                  </div>
                  <button
                    onClick={() => withdrawToTreasury('5.0')}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 text-lg"
                  >
                    💰 Executar Saque para Tesouraria
                  </button>
                  <div className="text-center p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                    <p className="text-gray-400 text-sm">
                      Saldo disponível para saque:
                    </p>
                    <p className="text-2xl font-bold text-green-400 mt-1">
                      {stats.contractBalance} ETH
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contract Tab */}
        {activeTab === 'contract' && (
          <div className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                📝 Gerenciamento do Contrato
              </h2>
              <div className="flex items-center space-x-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold text-sm">CONTRATO ATIVO</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center space-x-2">
                  <span>🔧</span>
                  <span>Funções do Owner</span>
                </h3>
                <div className="space-y-3">
                  {[
                    'updateTreasury(address _newTreasury)',
                    'withdrawToTreasury(uint256 _amount)',
                    'emergencyPause()',
                    'updateCEO(address _newCEO)',
                    'setPlatformFee(uint256 _fee)',
                    'withdrawAllToTreasury()'
                  ].map((func, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-yellow-500/30 transition duration-300 font-mono text-sm"
                    >
                      <span className="text-yellow-400">function</span>{" "}
                      <span className="text-green-400">{func}</span>{" "}
                      <span className="text-purple-400">external</span>{" "}
                      <span className="text-blue-400">onlyOwner</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-blue-400 flex items-center space-x-2">
                  <span>📊</span>
                  <span>Informações do Contrato</span>
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Endereço do Contrato', value: '0x742d35Cc...1a3f8E9b', icon: '🏢' },
                    { label: 'Rede', value: 'Ethereum Mainnet', icon: '🌐' },
                    { label: 'Versão', value: 'V3.1.0', icon: '🏷️' },
                    { label: 'Owner Atual', value: '0xF00aA01e...7704669', icon: '👑' },
                    { label: 'Tesouraria', value: '0x8a9b4c2d...3e6f7a1b', icon: '💰' },
                    { label: 'Última Atualização', value: '2 horas atrás', icon: '⏰' }
                  ].map((info, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition duration-300"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{info.icon}</span>
                        <span className="text-gray-300 font-medium">{info.label}</span>
                      </div>
                      <span className="text-white font-semibold text-sm">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Corporativo */}
      <footer className="border-t border-gray-700 bg-gray-900/90 backdrop-blur-lg mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">B</span>
                </div>
                <h3 className="text-lg font-bold text-white">Blockchain Bet Brasil Corp</h3>
              </div>
              <p className="text-gray-400 mb-2">
                © 2024 Blockchain Bet Brasil Corporation. Todos os direitos reservados.
              </p>
              <p className="text-green-400 text-sm font-semibold">
                🚀 Enterprise Web3 Dashboard v1.0.0
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 mb-2">
                Desenvolvido com 💚 para revolucionar as apostas Web3
              </p>
              <p className="text-yellow-400 font-semibold text-lg">
                "O céu é o limite! 🚀"
              </p>
              <p className="text-gray-500 text-sm mt-2">
                - CEO & Founder
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}