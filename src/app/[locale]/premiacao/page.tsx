import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";

export default function PremiacaoPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Premiacao');

  return (
    <div className="min-h-screen bg-[#0b0c10] pt-32 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 text-center">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-300 text-center mb-16">
          {t('desc')}
        </p>

        <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 p-10 rounded-3xl mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">{t('distributionTitle')}</h2>
          <p className="text-gray-400 mb-8">{t('distributionDesc')}</p>
          
          <div className="space-y-4">
            {[5, 4, 3, 2, 1].map((hit) => (
              <div key={hit} className="flex justify-between items-center border-b border-white/5 pb-4">
                <span className="text-gray-200">{t(`hit${hit}`)}</span>
                <span className="text-yellow-500 font-mono font-bold">{t('share')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <h3 className="text-white font-bold mb-3">{t('cascadeTitle')}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{t('cascadeDesc1')}</p>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
            <h3 className="text-white font-bold mb-3">{t('rolloverTitle')}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{t('rolloverDesc1')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}