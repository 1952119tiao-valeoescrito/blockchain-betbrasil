"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import { CheckCircle2, Cpu, Coins, Search, FileText, Eye, ExternalLink, ShieldCheck } from "lucide-react";

export default function ComoFuncionaPage({ params: { locale } }: { params: { locale: string } }) {
  // Mantém a tradução funcionando
  unstable_setRequestLocale(locale);
  const t = useTranslations('ComoFunciona');

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20">
      <Navbar />

      {/* Ajuste de altura: pt-24 faz o conteúdo começar logo abaixo do Navbar */}
      <main className="max-w-6xl mx-auto px-4 pt-24">
        
        {/* CABEÇALHO */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('desc')}
          </p>
        </section>

        {/* CARDS DE PASSO A PASSO */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[1, 2, 3].map((num) => (
            <div key={num} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-yellow-500/30 transition-colors group">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {num === 1 && <Coins className="text-yellow-500" />}
                {num === 2 && <Cpu className="text-yellow-500" />}
                {num === 3 && <ShieldCheck className="text-yellow-500" />}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t(`card${num}Title`)}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t(`card${num}Desc`)}</p>
            </div>
          ))}
        </div>

        {/* SEÇÃO DA MATRIZ (TABELA) */}
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">{t('tableTitle')}</h2>
                    <p className="text-sm text-gray-500">{t('scroll')}</p>
                </div>
                <div className="hidden md:block px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-bold text-yellow-500 uppercase tracking-widest">
                    625 Prognósticos
                </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-4 overflow-x-auto">
                {/* Aqui viria a renderização da sua matriz visual */}
                <div className="min-w-[600px] h-64 flex items-center justify-center text-gray-600 italic">
                    [ Renderização da Matriz de Pares X/Y ]
                </div>
            </div>
        </section>

        {/* SEÇÃO DE AUDITORIA */}
        <section className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[40px] p-8 md:p-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">{t('auditTitle')}</h2>
            <div className="h-1 w-20 bg-yellow-500 rounded-full mb-12"></div>
            
            <div className="space-y-12">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold border border-white/20">
                    {step}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{t(`step${step}Title`)}</h4>
                    <p className="text-gray-400 leading-relaxed">{t(`step${step}Desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}