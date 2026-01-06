"use client";
import React, { useState, useEffect } from 'react';
import { Link } from '../../navigation'; 
import { useTranslations } from 'next-intl';
import { ArrowRight, ShieldCheck, Zap, Globe, Coins, Lock, Cpu, Menu, X, BarChart3, Gem } from 'lucide-react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from '@/components/Navbar'; // Usando a Navbar que acabamos de criar
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-slate-100 selection:bg-[#cfb16d] selection:text-black overflow-x-hidden text-center">
      <Navbar />

      {/* HERO SECTION - Espaçamento reduzido para "subir" a página */}
      <section className="relative pt-24 md:pt-36 pb-12 container mx-auto px-4 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13151a] border border-[#2a2d35] text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#cfb16d]">
          <span className="w-2 h-2 rounded-full bg-[#cfb16d] animate-pulse"></span>
          Protocolo 100% On-Chain
        </div>
        
        <h3 className="text-base md:text-2xl font-bold text-white tracking-wide uppercase">
            {t('welcome')} <span className="text-[#cfb16d]">{t('brand')}</span>
        </h3>
        
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1] tracking-tighter">
            {t('heroTitle')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfb16d] via-[#f0e68c] to-[#cfb16d]">{t('heroHighlight')}</span>
        </h1>

        <div className="max-w-4xl space-y-2">
            <h2 className="text-base md:text-2xl font-bold text-gray-200">
                {t('subtitle')} <span className="text-white block mt-1 font-light text-sm md:text-xl">{t('subtext')}</span>
            </h2>
            {/* FONTE REDUZIDA PARA UMA LINHA */}
            <p className="text-[10px] sm:text-[12px] md:text-[16px] lg:text-[19px] font-black text-[#cfb16d] animate-pulse uppercase whitespace-nowrap overflow-hidden py-2">
                {t('pulseText')}
            </p>
        </div>

        <p className="text-xs md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed border-t border-[#2a2d35] pt-4">
            {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link href="/inter-bet">
            <button className="bg-[#cfb16d] text-black font-black text-sm md:text-base px-8 py-3 rounded-xl shadow-xl flex items-center gap-2 uppercase tracking-tighter">
              {t('btnStart')} <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/como-funciona">
            <button className="bg-transparent text-white border border-[#2a2d35] font-bold text-sm md:text-base px-8 py-3 rounded-xl hover:bg-white/5 uppercase transition-all">
              {t('btnDocs')}
            </button>
          </Link>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="py-12 bg-[#08090c] border-y border-[#2a2d35]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* BASIC */}
            <div className="bg-gradient-to-br from-blue-900/20 to-black p-8 rounded-[2rem] border-2 border-blue-500/20 text-left relative overflow-hidden">
                <Zap className="absolute top-4 right-4 text-blue-500/20" size={80} />
                <h1 className="text-2xl font-black mb-2">{t('basicCardTitle')}<br/><span className="text-blue-400 text-4xl">{t('basicCardValue')}</span></h1>
                <p className="italic text-blue-200/70 mb-6">{t('basicCardSub')} <span className="text-yellow-500 font-bold underline">{t('basicCardPoint')}</span></p>
                <div className="bg-black/50 p-6 rounded-3xl border border-blue-500/20 text-center mb-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t('basicCardEntry')}</p>
                    <p className="text-5xl font-black text-yellow-500 tracking-tighter">{t('basicCardPrice')}</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">{t('basicCardEth')}</p>
                </div>
                <p className="text-[10px] font-bold text-blue-100/60 text-center uppercase tracking-widest leading-none">● {t('basicCardFooter')}</p>
            </div>

            {/* PRO - AGORA LISINHO SEM ERROS */}
            <div className="bg-gradient-to-br from-purple-900/20 to-black p-8 rounded-[2rem] border-2 border-purple-500/20 text-left relative overflow-hidden">
                <Gem className="absolute top-4 right-4 text-purple-500/20" size={80} />
                <h1 className="text-2xl font-black mb-2">{t('proCardTitle')}<br/><span className="text-purple-400 text-4xl">{t('proCardValue')}</span></h1>
                <p className="italic text-purple-200/70 mb-6">{t('proCardSub')} <span className="text-yellow-500 font-bold underline">{t('proCardPoint')}</span></p>
                <div className="bg-black/50 p-6 rounded-3xl border border-purple-500/20 text-center mb-4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t('proCardEntry')}</p>
                    <p className="text-5xl font-black text-yellow-500 tracking-tighter">{t('proCardPrice')}</p>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase">{t('proCardEth')}</p>
                </div>
                <p className="text-[10px] font-bold text-purple-100/60 text-center uppercase tracking-widest leading-none">● {t('proCardFooter')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES - GOVERNANÇA / ENTROPIA / PACTO */}
      <section className="py-20 bg-[#0b0c10] container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-left">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all">
                      <h3 className="text-white font-bold text-xl mb-4 uppercase">{t(`card${i}Title`)}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{t(`card${i}Desc`)}</p>
                  </div>
              ))}
          </div>
      </section>
    </div>
  );
}