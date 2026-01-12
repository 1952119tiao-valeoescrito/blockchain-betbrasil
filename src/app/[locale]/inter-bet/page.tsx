"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Navbar from '@/components/Navbar';
import { Zap, ShieldCheck, ArrowRight, Target } from 'lucide-react';

export default function InterBetPage() {
  const t = useTranslations('InterBet');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20 text-center">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{t('highlight')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">{t('desc')}</p>
        </header>

        <div className="grid grid-cols-1 max-w-2xl mx-auto">
          
          {/* ADESÃO OFICIAL */}
          <div className="bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-8 md:p-12 hover:border-blue-500/30 transition-all flex flex-col relative overflow-hidden group text-left shadow-2xl">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500 border border-blue-500/20 text-center">
              <Target size={24} className="mx-auto" />
            </div>
            
            <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">{t('basicTitle')}</h2>
            
            <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-black text-yellow-500">{t('basicPrice')}</span>
                <span className="text-gray-500 font-bold text-sm uppercase">{t('basicUSD')}</span>
            </div>

            <p className="text-gray-400 mb-8 text-sm leading-relaxed">{t('basicDesc')}</p>
            
            <div className="space-y-4 mb-10">
               <div className="flex items-center gap-3 text-slate-300">
                  <ShieldCheck size={18} className="text-blue-500" /> 
                  <span className="text-sm font-medium">{t('basicFeat1')}</span>
               </div>
               <div className="flex items-center gap-3 text-slate-300">
                  <ShieldCheck size={18} className="text-blue-500" /> 
                  <span className="text-sm font-medium">{t('basicFeat2')}</span>
               </div>
            </div>

            <Link href="/apostas" className="mt-auto">
               <button className="w-full bg-slate-800 hover:bg-blue-600 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                  {t('basicBtn')} <ArrowRight size={18} />
               </button>
            </Link>
          </div>

        </div>

        {/* ATIVIDADE RECENTE */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight text-center">Atividade Recente</h3>
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center">
            <p className="text-gray-400 italic">Aguardando próxima aposta...</p>
          </div>
        </div>
      </main>
    </div>
  );
}