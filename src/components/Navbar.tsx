"use client";
import React, { useState } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from 'next/image';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5 h-20">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          
          {/* LOGO - REDIRECIONA PARA HOME */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0">
              <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-white font-bold tracking-tighter text-base uppercase">Blockchain <span className="text-yellow-500">Bet</span></span>
              <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">{t('subtitle')}</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t('home')}</Link>
            <Link href="/como-funciona" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t('how')}</Link>
            <Link href="/resultados" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t('results')}</Link>
            <Link href="/premiacao" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t('prizes')}</Link>
            <Link href="/inter-bet" className="text-sm font-bold text-yellow-500 hover:text-yellow-400 transition-colors flex items-center gap-1">
              <Zap size={14} /> {t('interbet')}
            </Link>
            <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" />
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex md:hidden items-center gap-4">
            <div className="scale-75 origin-right"><ConnectButton showBalance={false} accountStatus="avatar" chainStatus="none" /></div>
            <button onClick={() => setIsOpen(true)} className="text-white"><Menu size={28} /></button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl transition-all duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8">
          <button onClick={() => setIsOpen(false)} className="self-end text-white p-2 mb-8 border border-white/10 rounded-full"><X size={32} /></button>
          <div className="flex flex-col gap-8 text-center uppercase tracking-widest font-black">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl text-white">{t('home')}</Link>
            <Link href="/como-funciona" onClick={() => setIsOpen(false)} className="text-2xl text-white">{t('how')}</Link>
            <Link href="/resultados" onClick={() => setIsOpen(false)} className="text-2xl text-white">{t('results')}</Link>
            <Link href="/premiacao" onClick={() => setIsOpen(false)} className="text-2xl text-white">{t('prizes')}</Link>
            <Link href="/inter-bet" onClick={() => setIsOpen(false)} className="text-2xl text-yellow-500">{t('interbet')}</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;