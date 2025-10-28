"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const DashboardCorporativo = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Dados simulados do dashboard
  const corporateData = {
    overview: {
      totalUsers: '1.247',
      totalVolume: 'R$ 89.500,00',
      activeBets: '156',
      contractBalance: '0.85 ETH',
      weeklyGrowth: '+12.5%'
    },
    departments: [
      {
        icon: '👑',
        title: 'CEO & OWNER',
        address: '0xF00aA01e9d1f8E81fd070FBE52A917bE07710469',
        status: 'active'
      },
      {
        icon: '💰',
        title: 'TESOURARIA',
        address: 'Recebe fundos das apostas',
        status: 'active',
        balance: '12.5 ETH'
      },
      {
        icon: '🔧',
        title: 'DEPLOYER',
        address: 'Carteira dedicada para gas fees',
        status: 'active',
        balance: '0.1 ETH'
      },
      {
        icon: '🎲',
        title: 'VRF COORDINATOR',
        address: 'Chainlink VRF v2',
        status: 'connected'
      }
    ],
    recentTransactions: [
      { id: 1, type: 'Bet', amount: 'R$ 5,00', user: '0x1234...5678', time: '2 min ago', status: 'success' },
      { id: 2, type: 'Bet', amount: 'R$ 1.000,00', user: '0x8765...4321', time: '5 min ago', status: 'success' },
      { id: 3, type: 'Withdrawal', amount: 'R$ 2.500,00', user: '0x1111...2222', time: '1 hour ago', status: 'success' },
      { id: 4, type: 'Bet', amount: 'R$ 5,00', user: '0x3333...4444', time: '2 hours ago', status: 'success' }
    ],
    systemStatus: [
      { component: 'Blockchain Network', status: 'operational', value: 'Ethereum Mainnet' },
      { component: 'Contrato Principal', status: 'operational', value: 'Deployed' },
      { component: 'VRF Coordinator', status: 'operational', value: 'Connected' },
      { component: 'Frontend', status: 'operational', value: 'Online' },
      { component: 'Database', status: 'operational', value: 'Sincronizado' }
    ]
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300 text-lg">Carregando Dashboard Corporativo...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard Corporativo - Blockchain Bet Brasil</title>
        <meta name="description" content="Painel administrativo corporativo da Blockchain Bet Brasil" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <a className="flex items-center space-x-2" href="/">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B³</span>
                </div>
                <span className="text-white font-bold text-xl">Blockchain Bet Brasil</span>
              </a>
              
              {/* MENU ATUALIZADO */}
              <div className="hidden md:flex items-center space-x-8">
                <a className="text-slate-300 hover:text-white transition-colors" href="/">Início</a>
                <a className="text-slate-300 hover:text-white transition-colors" href="/apostas">Aplicações</a>
                <a className="text-slate-300 hover:text-white transition-colors" href="/como-proceder">Como Proceder</a>
                <a className="text-slate-300 hover:text-white transition-colors" href="/adesao">Adesão Inter-Bet</a>
                <a className="text-slate-300 hover:text-white transition-colors" href="/premiacao">Premiação</a>
                <a className="text-emerald-400 font-semibold" href="/dashboard">Dashboard</a>
                <a className="text-slate-300 hover:text-white transition-colors" href="/admin">Painel Admin</a>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  🌐 Mainnet
                </div>
                <button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  👑 Admin
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-20 pb-8">
          <div className="container mx-auto px-4">
            {/* Header Corporativo */}
            <div className="text-center mb-8 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl p-8 shadow-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                BLOCKCHAIN BET BRASIL CORPORATION
              </h1>
              <p className="text-emerald-100 text-xl mb-4">Dashboard Corporativo - Implementação Web3 Enterprise</p>
              <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                ENTERPRISE GRADE
              </div>
            </div>

            {/* Quote */}
            <div className="text-center italic text-slate-300 bg-slate-800/50 p-6 rounded-xl border-l-4 border-emerald-500 mb-8">
              "Quem anda pra trás é caranguejo... O céu é o limite! 🚀" - CEO
            </div>

            {/* Tabs de Navegação */}
            <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/50 rounded-xl p-2">
              {[
                { id: 'overview', label: '📊 Visão Geral', icon: '📊' },
                { id: 'corporate', label: '🏢 Estrutura Corporativa', icon: '🏢' },
                { id: 'transactions', label: '💸 Transações', icon: '💸' },
                { id: 'contracts', label: '📝 Contratos', icon: '📝' },
                { id: 'analytics', label: '📈 Analytics', icon: '📈' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Conteúdo do Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Cards de Métricas */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Total de Usuários</p>
                    <p className="text-2xl font-bold text-white">{corporateData.overview.totalUsers}</p>
                    <p className="text-green-400 text-sm">{corporateData.overview.weeklyGrowth}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">💰</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Volume Total</p>
                    <p className="text-2xl font-bold text-white">{corporateData.overview.totalVolume}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Apostas Ativas</p>
                    <p className="text-2xl font-bold text-white">{corporateData.overview.activeBets}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal Baseado na Tab Ativa */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Estrutura Corporativa */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-emerald-400 mb-4">🏢 Estrutura Corporativa</h3>
                  <div className="space-y-4">
                    {corporateData.departments.map((dept, index) => (
                      <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{dept.icon}</span>
                          <div>
                            <h4 className="font-bold text-white">{dept.title}</h4>
                            <p className="text-slate-400 text-sm">{dept.address}</p>
                          </div>
                          <div className="ml-auto bg-green-500 text-white px-2 py-1 rounded text-xs">
                            {dept.status}
                          </div>
                        </div>
                        {dept.balance && (
                          <p className="text-emerald-400 text-sm font-semibold">Saldo: {dept.balance}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status do Sistema */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-emerald-400 mb-4">⚡ Status do Sistema</h3>
                  <div className="space-y-3">
                    {corporateData.systemStatus.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-slate-300">{item.component}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 text-sm">{item.value}</span>
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <h4 className="font-bold text-amber-400 mb-2">📊 Saldo do Contrato</h4>
                    <p className="text-2xl font-bold text-white">{corporateData.overview.contractBalance}</p>
                    <p className="text-slate-400 text-sm mt-1">Disponível para saques corporativos</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">💸 Transações Recentes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 text-slate-400">Tipo</th>
                        <th className="text-left py-3 text-slate-400">Valor</th>
                        <th className="text-left py-3 text-slate-400">Usuário</th>
                        <th className="text-left py-3 text-slate-400">Tempo</th>
                        <th className="text-left py-3 text-slate-400">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {corporateData.recentTransactions.map(tx => (
                        <tr key={tx.id} className="border-b border-slate-700/50">
                          <td className="py-3 text-white">{tx.type}</td>
                          <td className="py-3 text-emerald-400 font-semibold">{tx.amount}</td>
                          <td className="py-3 text-slate-300">{tx.user}</td>
                          <td className="py-3 text-slate-400">{tx.time}</td>
                          <td className="py-3">
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'corporate' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fases de Implementação */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-emerald-400 mb-4">🚀 Fases de Implementação</h3>
                  <div className="space-y-4">
                    {[
                      { phase: 'FASE 1', title: 'Diagnóstico do Erro', status: '✅ CONCLUÍDO' },
                      { phase: 'FASE 2', title: 'Configuração Web3', status: '✅ IMPLEMENTADO' },
                      { phase: 'FASE 3', title: 'Estrutura Corporativa', status: '✅ IMPLEMENTADO' },
                      { phase: 'FASE 4', title: 'Infraestrutura Enterprise', status: '🔄 EM ANDAMENTO' },
                      { phase: 'FASE 5', title: 'Deploy Mainnet', status: '⏳ AGUARDANDO' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">{item.phase}</div>
                          <div className="text-slate-400 text-sm">{item.title}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.status.includes('✅') ? 'bg-green-500' : 
                          item.status.includes('🔄') ? 'bg-blue-500' : 'bg-amber-500'
                        } text-white`}>
                          {item.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Próximos Passos */}
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-emerald-400 mb-4">🎯 Próximos Passos</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                      <h4 className="font-bold text-white mb-2">💰 Capitalização</h4>
                      <p className="text-slate-300 text-sm">Aguardando 0.1 ETH para deploy final</p>
                    </div>
                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                      <h4 className="font-bold text-white mb-2">🚀 Deploy Mainnet</h4>
                      <p className="text-slate-300 text-sm">Implementação oficial na Ethereum Mainnet</p>
                    </div>
                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                      <h4 className="font-bold text-white mb-2">📈 Marketing</h4>
                      <p className="text-slate-300 text-sm">Campanha de lançamento corporativo</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Corporativo */}
            <div className="text-center mt-12 pt-6 border-t border-slate-700">
              <p className="text-slate-500 text-sm">
                Blockchain Bet Brasil Corporation © 2025 - Dashboard Corporativo Enterprise
              </p>
              <p className="text-slate-600 text-xs mt-2">
                "Do erro técnico à corporação Web3 em tempo recorde!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCorporativo;