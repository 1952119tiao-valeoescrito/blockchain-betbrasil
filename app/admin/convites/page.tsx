// app/admin/convites/page.tsx
'use client';

import { useState } from 'react';

export default function GerenciarConvites() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('moderator');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Convite enviado com sucesso!');
        setEmail('');
      } else {
        setMessage(`❌ Erro: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Erro ao enviar convite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">🎫 Gerenciar Convites</h1>
        
        <div className="max-w-md bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <form onSubmit={handleSendInvite} className="space-y-4">
            <div>
              <label className="block text-slate-300 mb-2">Email do Convidado</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white"
                placeholder="convidado@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Nível de Acesso</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white"
              >
                <option value="moderator">Moderador</option>
                <option value="admin">Administrador</option>
                <option value="support">Suporte</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 px-4 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Enviando...' : '📨 Enviar Convite'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg ${
              message.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}