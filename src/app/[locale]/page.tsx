"use client";
import React from 'react';
import { Link } from '../../navigation'; 
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const t = useTranslations('Home');

  // Componente da Tabela 25x25=625 mais elegante
  const MatrixTable = () => (
    <div className="w-full max-w-4xl mx-auto my-12 p-1 bg-gradient-to-b from-white/10 to-transparent rounded-xl border border-white/5 shadow-2xl overflow-hidden">
      <div className="bg-[#0b0c10]/90 backdrop-blur-md overflow-x-auto p-4 md:p-6 custom-scrollbar">
        <div className="grid grid-cols-[repeat(25,1fr)] gap-[2px] min-w-[500px] md:min-w-[700px]">
          {Array.from({ length: 625 }).map((_, i) => (
            <div 
              key={i} 
              className="aspect-square bg-white/5 border-[0.5px] border-white/10 hover:bg-yellow-500/30 transition-all duration-300 rounded-[1px]"
              title={`Posição ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="bg-black/40 py-2 text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">
        Grade Operacional 25x25 = 625 Possibilidades
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-slate-100 overflow-x-hidden selection:bg-yellow-500 selection:text-black text-center">
      <Navbar />

      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-yellow-500/5 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative z-10 pt-32 md:pt-44 pb-20 container mx-auto px-4 flex flex-col items-center">
        
        {/* TÍTULO HERO */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-yellow-500 mb-8">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
          Protocolo 100% On-Chain
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[1] tracking-tighter mb-12">
            {t('heroTitle')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-200 to-yellow-600">
              {t('heroHighlight')}
            </span>
        </h1>

        {/* SUBTÍTULO E DESCRIÇÃO DA MATRIZ */}
        <div className="max-w-3xl space-y-4 mb-2 text-center">
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight">
                {t('matrixTitle')}
            </h2>
            <p className="text-sm md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto italic px-4 font-medium">
                {t('matrixDesc')}
            </p>
        </div>

        {/* A TABELA SOLICITADA ABAIXO DO TÍTULO/DESC */}
        <MatrixTable />

        {/* TEXTO PULSANTE */}
        <div className="w-full max-w-5xl mb-12">
            <p className="text-[10px] sm:text-xs md:text-lg lg:text-xl font-black text-yellow-500 animate-pulse uppercase whitespace-nowrap overflow-hidden py-4 border-y border-white/5">
                {t('pulseText')}
            </p>
        </div>

        {/* BOTÕES */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
          <Link href="/inter-bet">
            <button className="bg-yellow-500 text-black font-black px-10 py-4 rounded-xl uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              {t('btnStart')} <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/como-funciona">
            <button className="bg-transparent text-white border border-white/10 font-bold px-10 py-4 rounded-xl hover:bg-white/5 transition-all uppercase tracking-tighter">
              {t('btnDocs')}
            </button>
          </Link>
        </div>

      </main>
    </div>
  );
}