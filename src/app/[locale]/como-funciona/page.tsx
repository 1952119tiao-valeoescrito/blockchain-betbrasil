"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { Target, RefreshCcw, Coins, Search, Wallet, Globe, BarChart } from 'lucide-react';

export default function ComoFuncionaPage() {
  const t = useTranslations('ComoFunciona');

  // Matriz 25x25 - REESTRUTURADA PARA ALINHAMENTO PERFEITO
  const MatrixDisplay = () => (
    <div className="w-full max-w-5xl mx-auto my-12 p-1 bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="bg-[#0b0c10] overflow-x-auto p-4 md:p-8 custom-scrollbar">
        
        {/* Container da Grade com Largura Mínima para manter a forma quadrada */}
        <div className="grid grid-cols-[30px_repeat(25,1fr)] gap-1 min-w-[850px] mx-auto">
          
          {/* 1. CABEÇALHO SUPERIOR (EIXO X - HORIZONTAL) */}
          <div className="h-8"></div> {/* Espaço vazio do canto superior esquerdo */}
          {Array.from({ length: 25 }, (_, i) => (
            <div key={`th-${i}`} className="text-[10px] text-yellow-500/50 font-bold flex items-center justify-center uppercase font-mono h-8 border-b border-white/5">
              {i + 1}
            </div>
          ))}

          {/* 2. CORPO DA MATRIZ (LINHAS E COLUNAS) */}
          {Array.from({ length: 25 }, (_, row) => (
            <React.Fragment key={`row-${row}`}>
              
              {/* INDICADOR LATERAL (EIXO Y - VERTICAL) */}
              <div className="text-[10px] text-yellow-500/50 font-bold flex items-center justify-center uppercase font-mono w-8 border-r border-white/5">
                {row + 1}
              </div>
              
              {/* AS CÉLULAS DA LINHA */}
              {Array.from({ length: 25 }, (_, col) => {
                const x = col + 1; // Coluna (Horizontal)
                const y = row + 1; // Linha (Vertical)
                return (
                  <div 
                    key={`cell-${x}-${y}`} 
                    className="aspect-square bg-white/5 border border-white/10 hover:bg-yellow-500/20 transition-all rounded-[1px] flex items-center justify-center group"
                  >
                    <span className="text-[7px] text-gray-500 group-hover:text-yellow-200 transition-colors font-mono font-medium">
                      {x}/{y}
                    </span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* RODAPÉ DA MATRIZ */}
      <div className="bg-black/60 py-4 text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black text-center border-t border-white/5">
        MATRIZ OPERACIONAL: 25 LINHAS X 25 COLUNAS = 625 POSSIBILIDADES
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans selection:bg-[#cfb16d] selection:text-black">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20 text-center">
        {/* TÍTULO E DESCRIÇÃO */}
        <header className="mb-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto italic leading-relaxed px-4">
            {t('desc')}
          </p>
        </header>

        {/* A MATRIZ CORRIGIDA */}
        <MatrixDisplay />

        {/* CARDS TÉCNICOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 mt-20 text-left">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#13151a] border border-[#2a2d35] p-8 rounded-[2rem] hover:border-yellow-500/30 transition-all shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">
                {t(`card${i}Title`)}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t(`card${i}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}