import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import { Cpu, Coins, ShieldCheck, Grid3X3 } from "lucide-react";

export default function ComoFuncionaPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('ComoFunciona');

  // Gera os números de 1 a 25 para os eixos X e Y
  const range = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20">
      <Navbar />

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

        {/* SEÇÃO DA MATRIZ REAL 25x25 */}
        <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                        <Grid3X3 className="text-black w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{t('tableTitle')}</h2>
                </div>
                <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-bold text-yellow-500 uppercase tracking-widest">
                    625 {t('matrixTitle').split(' ')[0]} {/* Pega "Prognósticos" ou similar */}
                </div>
            </div>
            
            <div className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                {/* Scroll Horizontal para Mobile/Telas menores */}
                <div className="overflow-x-auto p-4 md:p-8 custom-scrollbar">
                    <table className="border-collapse mx-auto">
                        <thead>
                            <tr>
                                <th className="p-2 text-[10px] text-gray-600 border border-white/5">Y \ X</th>
                                {range.map(x => (
                                    <th key={x} className="p-2 min-w-[40px] text-[10px] font-bold text-yellow-500/50 border border-white/5 bg-white/5">
                                        {x}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {range.map(y => (
                                <tr key={y}>
                                    <td className="p-2 text-[10px] font-bold text-yellow-500/50 border border-white/5 bg-white/5 text-center">
                                        {y}
                                    </td>
                                    {range.map(x => (
                                        <td 
                                            key={`${x}-${y}`} 
                                            className="p-1 border border-white/5 text-center transition-colors hover:bg-yellow-500/20 group"
                                        >
                                            <div className="text-[9px] text-gray-500 group-hover:text-yellow-500 font-mono">
                                                {x}/{y}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Legenda de Scroll */}
                <div className="bg-black/40 p-3 text-center border-t border-white/5">
                    <p className="text-[10px] text-gray-500 flex items-center justify-center gap-2">
                         {t('scroll')}
                    </p>
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