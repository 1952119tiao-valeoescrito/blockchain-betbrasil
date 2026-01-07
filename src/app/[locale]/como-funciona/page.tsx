"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Navbar from '@/components/Navbar';
import { 
  Target, 
  RefreshCcw, 
  Coins, 
  ShieldCheck, 
  Search, 
  Lock, 
  Wallet, 
  Globe, 
  BarChart, 
  ArrowRight 
} from 'lucide-react';

export default function ComoFuncionaPage() {
  const t = useTranslations('ComoFunciona');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-yellow-500 selection:text-black">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20">
        
        {/* HEADER */}
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto italic leading-relaxed">
            {t('desc')}
          </p>
        </header>

        {/* 3 CARDS TÉCNICOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all">
            <Target className="text-blue-500 mb-6" size={40} />
            <h3 className="text-xl font-bold text-white mb-4 uppercase">{t('card1Title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('card1Desc')}</p>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:border-yellow-500/30 transition-all">
            <RefreshCcw className="text-yellow-500 mb-6" size={40} />
            <h3 className="text-xl font-bold text-white mb-4 uppercase">{t('card2Title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('card2Desc')}</p>
          </div>
          <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:border-green-500/30 transition-all">
            <Coins className="text-green-500 mb-6" size={40} />
            <h3 className="text-xl font-bold text-white mb-4 uppercase">{t('card3Title')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t('card3Desc')}</p>
          </div>
        </div>

        {/* AUDITORIA */}
        <section className="bg-slate-900/60 border border-white/10 rounded-[3rem] p-8 md:p-16 mb-24 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 uppercase tracking-tighter italic flex items-center gap-4">
            <Search className="text-yellow-500" /> {t('auditTitle')}
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-left">
            {[1, 2, 3].map((step) => (
              <div key={step} className="space-y-4">
                <div className="text-yellow-500 font-black text-4xl opacity-30 font-mono italic">0{step}</div>
                <h4 className="text-white font-bold text-lg uppercase">{t(`step${step}Title`)}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`step${step}Desc`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NOVO NA WEB3? */}
        <section className="py-16 bg-gradient-to-b from-transparent to-slate-900/50 rounded-[3rem] border border-white/5 mb-24">
          <div className="text-center px-4">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter italic">{t('Beginners.title')}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg italic">{t('Beginners.desc')}</p>
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
              <div className="bg-slate-900/80 p-8 rounded-[2rem] border border-white/10 hover:border-blue-500/40 transition-all">
                <Wallet className="text-blue-500 mb-6" size={32} />
                <h3 className="text-white font-bold text-xl mb-4 uppercase leading-none">{t('Beginners.walletTitle')}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t('Beginners.walletDesc')}</p>
              </div>
              <div className="bg-slate-900/80 p-8 rounded-[2rem] border border-white/10 hover:border-green-500/40 transition-all">
                <Globe className="text-green-500 mb-6" size={32} />
                <h3 className="text-white font-bold text-xl mb-4 uppercase leading-none">{t('Beginners.blockchainTitle')}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t('Beginners.blockchainDesc')}</p>
              </div>
              <div className="bg-slate-900/80 p-8 rounded-[2rem] border border-white/10 hover:border-yellow-500/40 transition-all">
                <BarChart className="text-yellow-500 mb-6" size={32} />
                <h3 className="text-white font-bold text-xl mb-4 uppercase leading-none">{t('Beginners.basescanTitle')}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t('Beginners.basescanDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/inter-bet">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xl px-12 py-5 rounded-full shadow-[0_0_50px_rgba(234,179,8,0.3)] transition-all transform hover:scale-105 flex items-center gap-3 mx-auto uppercase">
              {t('Beginners.btn')} <ArrowRight size={24} />
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}