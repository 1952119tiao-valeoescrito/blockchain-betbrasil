import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import Navbar from "@/components/Navbar";
import { ArrowRight, Zap, Shield, Target } from 'lucide-react';

export default function InterBetPage({ params: { locale } }: { params: { locale: string } }) {
  // 1. Registra o locale para o servidor
  unstable_setRequestLocale(locale);
  
  // 2. Carrega as traduções (O bloco deve se chamar 'InterBet' no JSON)
  const t = useTranslations('InterBet');

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-32">
        <div className="text-center mb-16">
          <h2 className="text-yellow-500 font-bold uppercase tracking-widest mb-4">
            {t('title')}
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            {t('title')} <span className="text-yellow-500">{t('highlight')}</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t('desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CARD BÁSICO */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] flex flex-col items-start hover:border-blue-500/30 transition-all group">
            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Target className="text-blue-500 w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('basicTitle')}</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {t('basicDesc')}
            </p>
            <div className="space-y-4 mb-10 w-full">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Shield className="w-4 h-4 text-blue-500" /> {t('basicFeat1')}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Shield className="w-4 h-4 text-blue-500" /> {t('basicFeat2')}
              </div>
            </div>
            <Link 
              href="/apostas" 
              className="mt-auto w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
            >
              {t('basicBtn')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* CARD PRO */}
          <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 p-8 rounded-[40px] flex flex-col items-start hover:border-yellow-500/50 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase">
              High ROI
            </div>
            <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Zap className="text-yellow-500 w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('proTitle')}</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {t('proDesc')}
            </p>
            <div className="space-y-4 mb-10 w-full">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Zap className="w-4 h-4 text-yellow-500" /> {t('proFeat1')}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Zap className="w-4 h-4 text-yellow-500" /> {t('proFeat2')}
              </div>
            </div>
            <Link 
              href="/apostas" 
              className="mt-auto w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all"
            >
              {t('proBtn')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}