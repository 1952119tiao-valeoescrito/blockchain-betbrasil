src/components/ManifestoOverlay.tsx

"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ShieldCheck, ArrowRight, X } from 'lucide-react';

const ManifestoOverlay = () => {
  const t = useTranslations('Manifesto');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já viu o manifesto nesta sessão
    const hasSeen = sessionStorage.getItem('hasSeenManifesto');
    if (!hasSeen) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenManifesto', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#020617] flex items-center justify-center p-4 overflow-y-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(207,177,109,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-3xl w-full bg-slate-900/80 backdrop-blur-2xl border border-yellow-500/20 rounded-[3rem] p-8 md:p-16 relative shadow-[0_0_100px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-500">
        
        {/* Botão Fechar Rápido */}
        <button 
          onClick={handleClose}
          className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <header className="text-center mb-10">
          <span className="inline-block px-4 py-1 border border-yellow-500/50 text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-6">
            {t('badge')}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter italic uppercase mb-4">
            {t('title')}
          </h1>
          <div className="h-1 w-20 bg-yellow-500 mx-auto" />
        </header>

        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-yellow-500 leading-tight uppercase italic">
            {t('headline')}
          </h2>
          
          <div className="space-y-4 text-gray-300 text-sm md:text-lg leading-relaxed">
            <p>"{t('p1')}"</p>
            <p className="font-bold text-white italic">{t('p2')}</p>
            <p className="text-yellow-500/80 font-mono text-xs md:text-sm uppercase tracking-widest">{t('p3')}</p>
          </div>
        </div>

        <footer className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={handleClose}
            className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-black px-12 py-5 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all transform hover:scale-105 uppercase tracking-widest flex items-center justify-center gap-3"
          >
            {t('btnAccept')} <ArrowRight size={20} />
          </button>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest underline decoration-gray-700"
          >
            {t('btnSkip')}
          </button>
        </footer>

        <p className="text-center mt-12 text-[8px] text-gray-600 uppercase tracking-[0.5em] font-mono">
          Verified on Base Blockchain | No House Edge
        </p>
      </div>
    </div>
  );
};

export default ManifestoOverlay;