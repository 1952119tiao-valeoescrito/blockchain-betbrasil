"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import { useTranslations } from 'next-intl';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import { Trophy, Clock } from 'lucide-react';

export default function ResultadosPage() {
  const t = useTranslations('Resultados');
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-40 pb-20 text-center">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">
            {t('title')}
          </h1>
          <p className="text-gray-400 italic">{t('banner')}</p>
        </header>

        <div className="max-w-2xl mx-auto bg-slate-900/50 border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
          {!isConnected ? (
            <div className="flex flex-col items-center gap-6">
              <Trophy size={64} className="text-gray-700" />
              <p className="text-gray-400">{t('connectWallet')}</p>
              <ConnectButton label="Conectar Carteira" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-yellow-500 bg-yellow-500/10 py-4 rounded-2xl border border-yellow-500/20">
                <Clock className="animate-spin" size={20} />
                <span className="font-bold uppercase tracking-widest text-sm">{t('waitingAudit')}</span>
              </div>
              <p className="text-gray-500 text-sm italic">{t('statusCalculating')}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}