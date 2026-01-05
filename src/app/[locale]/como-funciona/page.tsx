import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import { Cpu, Coins, ShieldCheck, Grid3X3, ArrowRight } from "lucide-react";

export default function ComoFuncionaPage({ params: { locale } }: { params: { locale: string } }) {
  // 1. Registra o locale para o servidor
  unstable_setRequestLocale(locale);
  
  // 2. Carrega as traduções (Certifique-se que o bloco 'ComoFunciona' existe nos JSONs)
  const t = useTranslations('ComoFunciona');

  // 3. Gera o array para a matriz 25x25
  const range = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20 text-gray-200">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-24">
        
        {/* CABEÇALHO */}
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('desc')}
          </p>
        </section>

        {/* MATRIZ 25x25 */}
        <section className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-1.5 bg-yellow-500 rounded-lg">
              <Grid3X3 className="text-black w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">
              {t('tableTitle')}
            </h2>
          </div>
          
          <div className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            {/* Scroll Horizontal */}
            <div className="overflow-x-auto p-4 md:p-6 custom-scrollbar bg-[#0d0e12]">
              <table className="border-collapse mx-auto">
                <thead>
                  <tr>
                    <th className="p-1 text-[9px] text-gray-600 border border-white/5 bg-black/20 font-mono">Y \ X</th>
                    {range.map((x) => (
                      <th key={`head-x-${x}`} className="p-1 min-w-[38px] text-[10px] font-bold text-yellow-500/40 border border-white/5 bg-white/5">
                        {x}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {range.map((y) => (
                    <tr key={`row-y-${y}`}>
                      <td className="p-1 text-[10px] font-bold text-yellow-500/40 border border-white/5 bg-white/5 text-center">
                        {y}
                      </td>
                      {range.map((x) => (
                        <td 
                          key={`cell-${x}-${y}`} 
                          className="p-1 border border-white/5 text-center transition-all hover:bg-yellow-500/20 group cursor-default"
                        >
                          <div className="text-[9px] text-gray-500 group-hover:text-yellow-400 font-mono">
                            {x}/{y}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-black/40 p-3 text-center border-t border-white/5">
              <p className="text-[10px] text-gray-500 flex items-center justify-center gap-2 uppercase tracking-[0.2em]">
                {t('scroll')}
              </p>
            </div>
          </div>
        </section>

        {/* CARDS DE PASSO A PASSO */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl group">
             <Coins className="text-yellow-500 mb-6" />
             <h3 className="text-xl font-bold text-white mb-3">{t('card1Title')}</h3>
             <p className="text-sm text-gray-400 leading-relaxed">{t('card1Desc')}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl group">
             <Cpu className="text-yellow-500 mb-6" />
             <h3 className="text-xl font-bold text-white mb-3">{t('card2Title')}</h3>
             <p className="text-sm text-gray-400 leading-relaxed">{t('card2Desc')}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl group">
             <ShieldCheck className="text-yellow-500 mb-6" />
             <h3 className="text-xl font-bold text-white mb-3">{t('card3Title')}</h3>
             <p className="text-sm text-gray-400 leading-relaxed">{t('card3Desc')}</p>
          </div>
        </div>

        {/* AUDITORIA */}
        <section className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[40px] p-8 md:p-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">{t('auditTitle')}</h2>
            <div className="h-1 w-20 bg-yellow-500 rounded-full mb-12"></div>
            
            <div className="space-y-12">
               <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('step1Title')}</h4>
                    <p className="text-gray-400">{t('step1Desc')}</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('step2Title')}</h4>
                    <p className="text-gray-400">{t('step2Desc')}</p>
                  </div>
               </div>
               <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('step3Title')}</h4>
                    <p className="text-gray-400">{t('step3Desc')}</p>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}