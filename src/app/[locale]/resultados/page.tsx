"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Trophy } from 'lucide-react';

export default function ResultadosPage() {
  const t = useTranslations('Resultados');

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-40 pb-20 text-center">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">{t('title')}</h1>
          <p className="text-gray-400 italic">{t('banner')}</p>
        </header>
        <div className="max-w-2xl mx-auto bg-slate-900/50 border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
            <Trophy size={64} className="text-gray-700 mx-auto mb-6" />
            <p className="text-gray-400 mb-8">{t('connectWallet')}</p>
            <div className="flex justify-center"><ConnectButton /></div>
        </div>
      </main>
    </div>
  );
}