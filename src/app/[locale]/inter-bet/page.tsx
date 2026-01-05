'use client';

import React from 'react';
import { Link } from '../../../navigation'; // <--- Link do navigation.ts
import Image from 'next/image'; 
import { ArrowLeft, CheckCircle2, Gem, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl'; // <--- Hook de tradução

export default function InvestBetPage() {
  const t = useTranslations('InterBet'); // Pega as chaves do bloco InterBet
  const tn = useTranslations('Navbar');

  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-gray-200 selection:bg-[#cfb16d] selection:text-black">
      
      {/* HEADER SIMPLIFICADO */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#2a2d35] z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#2a2d35] group-hover:border-[#cfb16d] transition-colors bg-[#13151a]">
                 <Image src="/images/logo.png" alt="Logo" fill className="object-cover p-1" />
              </div>
              <span className="text-white font-bold text-lg hidden md:block group-hover:text-[#cfb16d] transition-colors">
                Blockchain Bet <span className="text-[#cfb16d]">{tn('subtitle')}</span>
              </span>
            </Link>
            <Link href="/">
                <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} /> {tn('home')}
                </button>
            </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#cfb16d]/10 blur-[100px] rounded-full pointer-events-none"></div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight relative z-10 uppercase">
              {t('title')} <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfb16d] to-[#f0e68c]">{t('highlight')}</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto relative z-10">
              {t('desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
            
            {/* CARD BÁSICO */}
            <div className="bg-[#13151a] p-8 rounded-[32px] border border-[#2a2d35] hover:border-[#cfb16d] transition-all duration-300 group flex flex-col relative shadow-xl">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 border border-[#2a2d35] group-hover:border-[#cfb16d] transition-colors">
                <Zap className="text-gray-400 group-hover:text-[#cfb16d] transition-colors" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{t('basicTitle')}</h3>
              <p className="text-gray-500 mb-8">{t('basicDesc')}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>{t('basicFeat1')} <span className="text-xs text-gray-500">{t('basicEth')}</span></span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>{t('basicFeat2')}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>{t('basicFeat3')}</span>
                </li>
              </ul>
              
              <Link href="/apostas" className="mt-auto">
                <button className="w-full py-4 rounded-xl border border-[#2a2d35] bg-[#0b0c10] text-gray-300 font-bold hover:bg-[#cfb16d] hover:text-black hover:border-[#cfb16d] transition-all uppercase tracking-wide text-sm">
                    {t('basicBtn')}
                </button>
              </Link>
            </div>

            {/* CARD INTER-BET (PREMIUM) */}
            <div className="bg-gradient-to-b from-[#1a1500] to-[#0a0a0a] p-8 rounded-[32px] border border-[#cfb16d]/30 hover:border-[#cfb16d] transition-all duration-300 relative overflow-hidden flex flex-col shadow-2xl shadow-[#cfb16d]/5">
              <div className="absolute top-0 right-0 bg-[#cfb16d] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-bl-xl">Pro</div>
              <div className="w-14 h-14 bg-[#cfb16d]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#cfb16d]/30">
                <Gem className="text-[#cfb16d]" size={28} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{t('proTitle')}</h3>
              <p className="text-[#cfb16d]/60 mb-8">{t('proDesc')}</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-[#fefce8]">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span className="text-lg">{t('proFeat1')} <span className="text-xs opacity-70">{t('proEth')}</span></span>
                </li>
                <li className="flex items-center gap-3 text-[#fefce8]">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>{t('proFeat2')}</span>
                </li>
                <li className="flex items-center gap-3 text-[#fefce8]">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>{t('proFeat3')}</span>
                </li>
              </ul>
              
              <Link href="/apostas" className="mt-auto">
                <button className="w-full py-4 rounded-xl bg-[#cfb16d] hover:bg-[#b59a5e] text-black font-bold shadow-[0_0_20px_rgba(207,177,109,0.3)] hover:shadow-[0_0_30px_rgba(207,177,109,0.5)] transition-all transform hover:scale-[1.02] uppercase tracking-wide text-sm">
                    {t('proBtn')}
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}