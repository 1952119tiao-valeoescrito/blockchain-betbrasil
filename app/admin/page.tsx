// app/admin/page.tsx - VERSÃO API REAL PRONTA
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      // 🔥 INTEGRAÇÃO COM API REAL - SUBSTITUA A URL!
      const response = await realAuthAPI(formData.email, formData.password);
      
      if (response.success) {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminUser', formData.email);
        localStorage.setItem('adminRole', response.role || 'admin');
        router.push('/admin/dashboard');
      } else {
        setError(response.message || 'Credenciais inválidas');
      }
    } catch (err: any) {
      setError(err.message || 'Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FUNÇÃO REAL DE AUTENTICAÇÃO - AJUSTE A URL!
  const realAuthAPI = async (email: string, password: string) => {
    // ⚠️ SUBSTITUA PELA SUA URL REAL!
   const API_URL = 'https://api.blockchainbetbrasil.com/auth/admin-login' // ← ALTERE AQUI!
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // Adicione headers se precisar (API Key, etc)
      },
      body: JSON.stringify({ 
        email, 
        password,
        // Adicione outros campos se necessário
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Falha na autenticação');
    }
    
    // 🔧 AJUSTE CONFORME A RESPOSTA DA SUA API:
    return {
      success: data.success || data.token ? true : false,
      token: data.token || data.access_token,
      role: data.role || data.user?.role || 'admin',
      message: data.message
    };
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Entre em contato com o suporte para redefinir sua senha.');
  };

  const handleRequestAccess = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Solicite acesso administrativo ao administrador do sistema.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <button 
            onClick={() => router.push('/')}
            className="inline-block mb-6 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-lg transition-colors"
          >
            ← Voltar para a Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Painel Administrativo
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Área restrita para administração do sistema Blockchain Bet Brasil
          </p>
        </header>

        <div className="max-w-md mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🔐 Login Administrativo
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-slate-300 mb-2">
                Usuário Admin
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500" 
                placeholder="seu@email.com"
                disabled={loading}
                autoComplete="email"
              />
            </div>
            
            <div>
              <label className="block text-slate-300 mb-2">
                Senha
              </label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500" 
                placeholder="Digite sua senha"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Conectando...
                </>
              ) : (
                '🚀 Acessar Painel'
              )}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="text-center">
              <button 
                onClick={handleForgotPassword}
                className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                disabled={loading}
              >
                🔑 Esqueci minha senha
              </button>
            </div>

            <div className="text-center">
              <button 
                onClick={handleRequestAccess}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                disabled={loading}
              >
                🚀 Solicitar Acesso Administrativo
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            🔒 Conexão segura • Sistema administrativo Blockchain Bet Brasil
          </p>
          {/* 🔥 DEBUG - REMOVA EM PRODUÇÃO */}
          <p className="text-xs text-slate-600 mt-2">
            Modo: {process.env.NODE_ENV === 'production' ? 'Produção' : 'Desenvolvimento'}
          </p>
        </div>
      </div>
    </div>
  );
}