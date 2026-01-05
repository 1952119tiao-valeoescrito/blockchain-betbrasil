import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";

export default function ResultadosPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Resultados');

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-gray-400">{t('banner')}</p>
        </div>

        {/* Card Informativo */}
        <div className="bg-white/5 p-10 rounded-3xl border border-white/10 text-center">
            <p className="text-xl text-gray-300 mb-6">{t('connectWallet')}</p>
            <div className="bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20 text-yellow-200/70 text-sm">
                {t('waitingAudit')}
            </div>
        </div>
      </main>
    </div>
  );
}