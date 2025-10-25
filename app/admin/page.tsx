'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa erro quando o usuário começar a digitar
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validação básica
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      // Simulação de autenticação - substitua pela sua API real
      console.log('Tentando login com:', { username: formData.username });
      
      const response = await fakeAuthAPI(formData.username, formData.password);
      
      if (response.success) {
        // Salva o token (em uma aplicação real, use cookies ou localStorage seguro)
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminUser', formData.username);
        
        console.log('Login bem-sucedido, redirecionando...');
        
        // Redireciona para o painel administrativo
        router.push('/admin/dashboard');
      } else {
        setError('Credenciais inválidas. Verifique seu usuário e senha.');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função de exemplo - substitua pela sua lógica real de autenticação
  const fakeAuthAPI = (username: string, password: string): Promise<{success: boolean; token: string}> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Credenciais de exemplo - em produção, valide contra seu backend
          const validCredentials = [
            { user: 'admin', pass: 'admin123' },
            { user: 'suporte', pass: 'suporte123' },
            { user: 'moderador', pass: 'mod123' }
          ];

          const isValid = validCredentials.some(
            cred => cred.user === username && cred.pass === password
          );

          if (isValid) {
            resolve({
              success: true,
              token: `fake-jwt-token-${username}-${Date.now()}`
            });
          } else {
            resolve({
              success: false,
              token: ''
            });
          }
        } catch (error) {
          reject(error);
        }
      }, 1500); // Simula delay de rede
    });
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Entre em contato com o suporte técnico para redefinir sua senha.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <button 
            onClick={() => router.push('/')}
            className="inline-block mb-6 bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-lg transition-colors duration-200"
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

        <div className="max-w-md mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🔐 Login Administrativo
          </h2>
          
          {/* Mensagem de Erro */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm animate-pulse">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}
          
          {/* Formulário de Login */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-slate-300 font-medium">
                Usuário Admin
              </label>
              <input 
                id="username"
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200" 
                placeholder="Digite seu usuário"
                disabled={loading}
                autoComplete="username"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-slate-300 font-medium">
                Senha
              </label>
              <input 
                id="password"
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200" 
                placeholder="Digite sua senha"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-emerald-500/25"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Autenticando...
                </>
              ) : (
                '🚀 Acessar Painel'
              )}
            </button>
          </form>

          {/* Link Esqueci Senha */}
          <div className="mt-6 text-center">
            <button 
              onClick={handleForgotPassword}
              className="text-slate-400 hover:text-emerald-400 text-sm transition-colors duration-200"
            >
              🔑 Esqueci minha senha
            </button>
          </div>

          {/* Credenciais de exemplo para teste */}
          <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <p className="text-sm text-slate-400 text-center mb-2">
              <strong>🎯 Credenciais de Teste</strong>
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Usuário:</span>
                <span className="text-emerald-400">admin</span>
              </div>
              <div className="flex justify-between">
                <span>Senha:</span>
                <span className="text-emerald-400">admin123</span>
              </div>
              <div className="border-t border-slate-700 mt-2 pt-2">
                <div className="flex justify-between">
                  <span>Usuário:</span>
                  <span className="text-blue-400">suporte</span>
                </div>
                <div className="flex justify-between">
                  <span>Senha:</span>
                  <span className="text-blue-400">suporte123</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Segurança */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              🔒 Conexão segura • Sistema administrativo Blockchain Bet Brasil
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}