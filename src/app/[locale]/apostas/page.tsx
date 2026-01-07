"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import { useTranslations } from 'next-intl';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LayoutGrid, ShieldCheck } from 'lucide-react';

export default function ApostasPage() {
  const t = useTranslations('Apostas');

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-10">
        {/* Grid empilha no mobile (1 coluna) e divide no desktop (2 colunas) */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-8">
          
          {/* LADO ESQUERDO: MATRIZ */}
          <div className="bg-slate-900/40 p-4 md:p-8 rounded-3xl border border-white/10 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-6">
              <LayoutGrid className="text-yellow-500" />
              <div>
                <h2 className="text-xl font-black text-white uppercase">{t('matrixTitle')}</h2>
                <p className="text-xs text-gray-400">{t('matrixSub')}</p>
              </div>
            </div>

            <div className="overflow-x-auto pb-4 custom-scrollbar">
               <div className="grid grid-cols-[repeat(25,1fr)] gap-1 min-w-[700px]">
                  {Array.from({ length: 625 }).map((_, i) => (
                    <button key={i} className="aspect-square bg-white/5 border border-white/5 hover:bg-yellow-500/30 transition-all rounded-sm"></button>
                  ))}
               </div>
            </div>
          </div>

          {/* LADO DIREITO: PAINEL */}
          <div className="bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-yellow-500/20 h-fit order-1 lg:order-2 lg:sticky lg:top-28">
             <h3 className="text-lg font-black text-white uppercase mb-6 text-center border-b border-white/5 pb-4">
                {t('title')}
             </h3>
             <div className="flex flex-col items-center gap-6 py-4">
                <p className="text-gray-500 text-sm italic">{t('alertWallet')}</p>
                <ConnectButton />
                <div className="w-full h-[1px] bg-white/5 my-2"></div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase">
                    <ShieldCheck size={14} className="text-green-500" />
                    {t('audit')}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}