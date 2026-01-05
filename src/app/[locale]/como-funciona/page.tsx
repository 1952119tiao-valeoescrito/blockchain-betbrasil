import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";

export default function ComoFuncionaPage({ params: { locale } }: { params: { locale: string } }) {
  // CRUCIAL: Registra o locale para tradução e SEO
  unstable_setRequestLocale(locale);
  const t = useTranslations('ComoFunciona');

  return (
    <div className="min-h-screen bg-[#0b0c10] pt-32 pb-20">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 text-center">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-400 text-center mb-16 leading-relaxed">
          {t('desc')}
        </p>

        <div className="grid gap-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <h3 className="text-yellow-500 font-bold text-lg mb-2">
                {t(`card${num}Title`)}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t(`card${num}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}