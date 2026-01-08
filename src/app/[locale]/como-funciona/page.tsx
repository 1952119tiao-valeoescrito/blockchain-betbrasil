"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { Target, RefreshCcw, Coins, Search, Wallet, Globe, BarChart } from 'lucide-react';

export default function ComoFuncionaPage() {
  const t = useTranslations('ComoFunciona');

  // Matriz 25x25 com VISIBILIDADE MELHORADA
  const MatrixDisplay = () => (
    <div className="w-full max-w-5xl mx-auto my-12 p-1 bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="bg-[#0b0c10] overflow-x-auto p-4 md:p-8 custom-scrollbar">
        <div className="grid grid-cols-[30px_repeat(25,1fr)] gap-1 min-w-[850px] mx-auto text-center">
          <div className="h-6"></div>
          {Array.from({ length: 25 }, (_, i) => (
            <div key={`th-${i}`} className="text-[10px] text-gray-400 font-bold flex items-center justify-center uppercase font-mono">{i + 1}</div>
          ))}
          {Array.from({ length: 25 }, (_, row) => (
            <React.Fragment key={`row-${row}`}>
              <div className="text-[10px] text-gray-400 font-bold flex items-center justify-center uppercase font-mono">{row + 1}</div>
              {Array.from({ length: 25 }, (_, col) => {
                const x = col + 1; const y = row + 1;
                return (
                  <div key={`cell-${x}-${y}`} className="aspect-square bg-white/10 border border-white/20 hover:bg-yellow-500/30 transition-all rounded-[1px] flex items-center justify-center group">
                    <span className="text-[7px] text-gray-300 group-hover:text-yellow-200 transition-colors font-mono font-medium">{x}/{y}</span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="bg-black/60 py-3 text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black text-center border-t border-white/5 uppercase">
        Matriz Operacional: 625 Prognósticos Estratégicos
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20 text-center">
        <header className="mb-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">{t('title')}</h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto italic leading-relaxed px-4">{t('desc')}</p>
        </header>

        <MatrixDisplay />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 mt-20 text-left">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/30 transition-all">
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{t(`card${i}Title`)}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t(`card${i}Desc`)}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}