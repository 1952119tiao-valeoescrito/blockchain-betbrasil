import React from 'react';

const PainelAdminPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 py-12">
        <div className="container mx-auto px-4">
          <header className="text-center mb-12">
            <a className="inline-block mb-6" href="/">
              <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-lg transition-colors">
                ← Voltar para a Home
              </button>
            </a>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Painel Administrativo
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Área restrita para administração do sistema
            </p>
          </header>
          
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              🚫 Acesso Restrito
            </h2>
            <p className="text-slate-300">
              Esta área é exclusiva para administradores do sistema.
            </p>
            <p className="text-slate-400 mt-2">
              Em desenvolvimento...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PainelAdminPage;