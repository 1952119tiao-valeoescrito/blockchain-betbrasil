"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Navbar from '@/components/Navbar';
import { Trophy, Zap, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export default function QuinaBetPremiacaoPage() {
  const t = useTranslations('QuinaBetPrizes');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* HEADER */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{t('highlight')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">{t('subtitle')}</p>
        </header>

        {/* MAIN PRIZE SECTION - THE GOLDEN QUINA */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 to-transparent blur-3xl rounded-[2.5rem]" />
            
            <div className="relative bg-gradient-to-br from-amber-900/40 via-amber-900/20 to-slate-900/40 border-3 border-amber-500/50 rounded-[2.5rem] p-8 md:p-16 text-center shadow-2xl">
              <div className="mb-4 flex justify-center">
                <div className="animate-spin" style={{ animationDuration: '3s' }}>
                  <Sparkles className="w-12 h-12 text-amber-400" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2 uppercase tracking-tight">
                {t('quinaTitle')}
              </h2>
              <p className="text-amber-300 text-xl font-bold mb-8 tracking-widest">(5/5 {t('matches')})</p>
              
              <div className="text-center mb-8">
                <p className="text-gray-400 mb-4 text-lg">{t('quinaDesc')}</p>
              </div>

              <div className="bg-black/40 rounded-2xl p-8 border border-amber-500/30 mb-8">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-3 font-mono">{t('jackpot')}</p>
                <p className="text-6xl md:text-7xl font-black text-amber-300 tracking-tighter">
                  100% <span className="text-4xl md:text-5xl block mt-2 text-amber-200">{t('pool')}</span>
                </p>
                <p className="text-sm text-gray-500 mt-4 font-mono">{t('quinaNote')}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
                <div className="flex-1 bg-amber-500/20 border border-amber-500/40 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{t('noPartialLabel')}</p>
                  <p className="text-lg font-black text-amber-300">{t('noPartial')}</p>
                </div>
                <div className="flex-1 bg-blue-500/20 border border-blue-500/40 rounded-lg p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{t('fairnessLabel')}</p>
                  <p className="text-lg font-black text-blue-300">{t('fairness')}</p>
                </div>
              </div>

              <p className="text-amber-200 italic font-bold">{t('quinaSlogan')}</p>
            </div>
          </div>
        </section>

        {/* PRIZE DISTRIBUTION */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 uppercase tracking-tight text-center">
            {t('distributionTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Treasury */}
            <div className="bg-slate-900/40 border-2 border-slate-800 rounded-2xl p-6 text-center hover:border-red-500/30 transition-all">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 text-red-400">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-black text-white mb-2 uppercase text-sm tracking-tight">{t('treasuryLabel')}</h3>
              <p className="text-3xl font-black text-red-400">10%</p>
              <p className="text-xs text-gray-500 mt-3">{t('treasuryDesc')}</p>
            </div>

            {/* Rolling Jackpot */}
            <div className="bg-slate-900/40 border-2 border-slate-800 rounded-2xl p-6 text-center hover:border-purple-500/30 transition-all">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 text-purple-400">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-black text-white mb-2 uppercase text-sm tracking-tight">{t('rolloverLabel')}</h3>
              <p className="text-3xl font-black text-purple-400">+ {t('accumulates')}</p>
              <p className="text-xs text-gray-500 mt-3">{t('rolloverDesc')}</p>
            </div>

            {/* Winners */}
            <div className="bg-slate-900/40 border-2 border-slate-800 rounded-2xl p-6 text-center hover:border-amber-500/30 transition-all">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 text-amber-400">
                <Trophy size={20} />
              </div>
              <h3 className="font-black text-white mb-2 uppercase text-sm tracking-tight">{t('winnersLabel')}</h3>
              <p className="text-3xl font-black text-amber-400">90%</p>
              <p className="text-xs text-gray-500 mt-3">{t('winnersDesc')}</p>
            </div>
          </div>
        </section>

        {/* EXAMPLES */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 uppercase tracking-tight text-center">
            {t('examplesTitle')}
          </h2>

          <div className="bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-8 md:p-12">
            <div className="space-y-6">
              <div className="bg-black/40 rounded-xl p-6 border border-blue-500/20">
                <p className="text-sm text-blue-300 font-bold mb-2 uppercase tracking-widest">{t('scenario1Title')}</p>
                <p className="text-gray-300 mb-3">{t('scenario1Desc')}</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-blue-500/10 rounded p-3">
                    <p className="text-gray-500 mb-1">{t('totalRaised')}</p>
                    <p className="text-blue-300 font-bold">1000 USDC</p>
                  </div>
                  <div className="bg-green-500/10 rounded p-3">
                    <p className="text-gray-500 mb-1">{t('prizePool')}</p>
                    <p className="text-green-300 font-bold">900 USDC</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 rounded-xl p-6 border border-amber-500/20">
                <p className="text-sm text-amber-300 font-bold mb-2 uppercase tracking-widest">{t('scenario2Title')}</p>
                <p className="text-gray-300 mb-3">{t('scenario2Desc')}</p>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-amber-500/10 rounded p-3">
                    <p className="text-gray-500 mb-1">{t('winners')}</p>
                    <p className="text-amber-300 font-bold">5 {t('people')}</p>
                  </div>
                  <div className="bg-green-500/10 rounded p-3">
                    <p className="text-gray-500 mb-1">{t('eachWinner')}</p>
                    <p className="text-green-300 font-bold">180 USDC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ADVANTAGES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/40 border border-blue-500/20 rounded-2xl p-6">
            <ShieldCheck className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-bold text-white mb-2 text-lg">{t('advantage1Title')}</h3>
            <p className="text-sm text-gray-400">{t('advantage1Desc')}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-purple-500/20 rounded-2xl p-6">
            <Zap className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="font-bold text-white mb-2 text-lg">{t('advantage2Title')}</h3>
            <p className="text-sm text-gray-400">{t('advantage2Desc')}</p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border-2 border-amber-700/30 rounded-[2.5rem] p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-300 mb-8 text-lg">{t('ctaDesc')}</p>
          <Link href="/quina-bet">
            <button className="bg-amber-500 text-black font-black text-lg px-12 py-4 rounded-xl hover:scale-105 transition-all uppercase tracking-tighter shadow-xl">
              {t('ctaButton')}
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
