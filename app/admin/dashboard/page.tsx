// app/admin/dashboard/page.tsx - ATUALIZADO COM VERIFICAÇÃO DE ROLE
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Tipos para os dados
interface UserStats {
  total: number;
  novos: number;
  ativos: number;
}

interface BetStats {
  total: number;
  emAndamento: number;
  finalizados: number;
}

interface RevenueStats {
  total: number;
  hoje: number;
  mes: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<string>('');
  const [userRole, setUserRole] = useState<string>(''); // ✅ NOVO: Estado para a role
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Dados mockados para demonstração
  const [stats, setStats] = useState({
    usuarios: { total: 1542, novos: 23, ativos: 1245 } as UserStats,
    apostas: { total: 8921, emAndamento: 156, finalizados: 8765 } as BetStats,
    receita: { total: 152430.50, hoje: 3250.75, mes: 45210.25 } as RevenueStats,
    transacoes: { total: 2845, pendentes: 12 },
    convites: { enviados: 15, ativos: 8, pendentes: 3 }
  });

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      const adminUser = localStorage.getItem('adminUser');
      const adminRole = localStorage.getItem('adminRole'); // ✅ NOVO: Pega a role
      
      if (!token || !adminUser) {
        router.push('/admin');
        return;
      }
      
      setUser(adminUser);
      setUserRole(adminRole || 'user'); // ✅ NOVO: Seta a role
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminRole'); // ✅ NOVO: Remove a role também
    router.push('/admin');
  };

  const handleRefreshData = () => {
    setLoading(true);
    // Simular atualização de dados
    setTimeout(() => {
      setStats(prev => ({
        usuarios: {
          ...prev.usuarios,
          novos: Math.floor(Math.random() * 50) + 10
        },
        apostas: {
          ...prev.apostas,
          emAndamento: Math.floor(Math.random() * 200) + 100
        },
        receita: {
          ...prev.receita,
          hoje: Math.random() * 5000 + 2000
        },
        convites: {
          ...prev.convites,
          enviados: prev.convites.enviados + 1,
          pendentes: Math.floor(Math.random() * 5)
        }
      }));
      setLoading(false);
    }, 1000);
  };

  const handleGerenciarConvites = () => {
    // ✅ NOVO: Verifica permissão antes de redirecionar
    if (userRole !== 'super-admin') {
      alert('❌ Acesso restrito para super administradores');
      return;
    }
    router.push('/admin/convites');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="text-slate-300 mt-4">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/')}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ← Home
              </button>
              <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* ✅ NOVO: Mostra a role do usuário */}
              <span className="text-slate-300">
                Bem-vindo, <strong>{user}</strong> 
                <span className="text-emerald-400 ml-2">({userRole})</span>
              </span>
              <button 
                onClick={handleRefreshData}
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                🔄 Atualizar
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-800/30 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: '📊 Visão Geral', icon: '📊' },
              { id: 'users', label: '👥 Usuários', icon: '👥' },
              { id: 'bets', label: '🎯 Apostas', icon: '🎯' },
              { id: 'transactions', label: '💰 Transações', icon: '💰' },
              { id: 'reports', label: '📈 Relatórios', icon: '📈' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card Usuários */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-300">👥 Usuários</h3>
              <span className="bg-emerald-500/20 text-emerald-400 text-sm px-2 py-1 rounded">
                +{stats.usuarios.novos}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.usuarios.total.toLocaleString()}</p>
            <p className="text-slate-400 text-sm mt-2">{stats.usuarios.ativos.toLocaleString()} ativos</p>
          </div>

          {/* Card Apostas */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-300">🎯 Apostas</h3>
              <span className="bg-blue-500/20 text-blue-400 text-sm px-2 py-1 rounded">
                {stats.apostas.emAndamento}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.apostas.total.toLocaleString()}</p>
            <p className="text-slate-400 text-sm mt-2">{stats.apostas.emAndamento} em andamento</p>
          </div>

          {/* Card Receita */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-300">💰 Receita</h3>
              <span className="bg-green-500/20 text-green-400 text-sm px-2 py-1 rounded">
                +R$ {stats.receita.hoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-3xl font-bold text-white">
              R$ {stats.receita.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-slate-400 text-sm mt-2">
              R$ {stats.receita.mes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} este mês
            </p>
          </div>

          {/* Card Convites Administrativos */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-300">🎫 Convites</h3>
              <span className="bg-purple-500/20 text-purple-400 text-sm px-2 py-1 rounded">
                {stats.convites.pendentes} pendentes
              </span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.convites.enviados}</p>
            <p className="text-slate-400 text-sm mt-2">{stats.convites.ativos} ativos • {stats.convites.pendentes} pendentes</p>
            <button 
              onClick={handleGerenciarConvites}
              className={`w-full mt-4 text-white py-2 px-4 rounded-lg transition-colors text-sm ${
                userRole === 'super-admin' 
                  ? 'bg-purple-500 hover:bg-purple-400' 
                  : 'bg-gray-500 cursor-not-allowed'
              }`}
              disabled={userRole !== 'super-admin'}
            >
              {userRole === 'super-admin' ? 'Gerenciar Convites' : 'Acesso Restrito'}
            </button>
            {/* ✅ NOVO: Mensagem de permissão */}
            {userRole !== 'super-admin' && (
              <p className="text-xs text-slate-500 mt-2 text-center">
                Apenas para super administradores
              </p>
            )}
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">📊 Visão Geral do Sistema</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Atividade Recente</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'Novo usuário registrado', time: '2 min atrás', user: 'joao123' },
                      { action: 'Aposta realizada', time: '5 min atrás', value: 'R$ 50,00' },
                      { action: 'Convite administrativo enviado', time: '8 min atrás', user: 'novo@admin.com' },
                      { action: 'Saque processado', time: '10 min atrás', value: 'R$ 100,00' },
                      { action: 'Depósito confirmado', time: '15 min atrás', value: 'R$ 200,00' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                        <div>
                          <p className="text-white text-sm">{item.action}</p>
                          <p className="text-slate-400 text-xs">{item.user || item.value}</p>
                        </div>
                        <span className="text-slate-500 text-sm">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-300 mb-4">Alertas do Sistema</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg">
                      <p className="text-yellow-400 text-sm">⚠️ {stats.transacoes.pendentes} transações pendentes de verificação</p>
                    </div>
                    <div className="p-3 bg-purple-500/20 border border-purple-500 rounded-lg">
                      <p className="text-purple-400 text-sm">🎫 {stats.convites.pendentes} convites pendentes de ativação</p>
                    </div>
                    <div className="p-3 bg-green-500/20 border border-green-500 rounded-lg">
                      <p className="text-green-400 text-sm">✅ Sistema operando normalmente</p>
                    </div>
                    <div className="p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
                      <p className="text-blue-400 text-sm">ℹ️ Backup agendado para hoje às 02:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">👥 Gerenciamento de Usuários</h2>
              <p className="text-slate-400">Funcionalidade em desenvolvimento...</p>
            </div>
          )}

          {activeTab === 'bets' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">🎯 Gerenciamento de Apostas</h2>
              <p className="text-slate-400">Funcionalidade em desenvolvimento...</p>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">💰 Gerenciamento de Transações</h2>
              <p className="text-slate-400">Funcionalidade em desenvolvimento...</p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">📈 Relatórios e Analytics</h2>
              <p className="text-slate-400">Funcionalidade em desenvolvimento...</p>
            </div>
          )}
        </div>

        {/* Footer do Dashboard */}
        <div className="mt-6 text-center text-slate-500 text-sm">
          <p>Blockchain Bet Brasil • Sistema Administrativo • {new Date().getFullYear()}</p>
          <p className="mt-1">Usuário: {user} • Nível: {userRole} • Última atualização: {new Date().toLocaleString('pt-BR')}</p>
        </div>
      </main>
    </div>
  );
}