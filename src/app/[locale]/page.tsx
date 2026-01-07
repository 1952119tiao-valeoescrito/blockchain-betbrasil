"use client";
import React from 'react';
import { Link } from '../../navigation'; 
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-yellow-500 mb-6">
          Protocolo 100% On-Chain
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-4">
            {t('heroTitle')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">
              {t('heroHighlight')}
            </span>
        </h1>

        {/* MATRIZ RESPONSIVA - Scroll lateral no mobile */}
        <div className="w-full max-w-4xl bg-black/40 p-2 md:p-4 rounded-2xl border border-white/5 my-8 overflow-x-auto custom-scrollbar">
            <div className="grid grid-cols-[repeat(25,1fr)] gap-0.5 md:gap-1 min-w-[600px]">
                {Array.from({ length: 625 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-white/5 border border-white/5 rounded-sm"></div>
                ))}
            </div>
        </div>

        <div className="max-w-2xl space-y-4 mb-10">
            <h2 className="text-xl md:text-3xl font-bold text-gray-200 uppercase tracking-tight">
                {t('subtitle')}
            </h2>
            <p className="text-sm md:text-lg text-gray-400 leading-relaxed italic px-4">
                {t('subtext')}
            </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4">
          <Link href="/inter-bet" className="w-full sm:w-auto">
            <button className="w-full bg-yellow-500 text-black font-black px-8 py-4 rounded-xl uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2">
              {t('btnStart')} <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/como-funciona" className="w-full sm:w-auto">
            <button className="w-full bg-transparent text-white border border-white/10 font-bold px-8 py-4 rounded-xl hover:bg-white/5 transition-all">
              {t('btnDocs')}
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}