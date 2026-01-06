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
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between text-center">
        
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/10 shrink-0">
            <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-bold tracking-tighter leading-none text-base">BLOCKCHAIN <span className="text-yellow-500">BET</span></span>
            <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">{t('subtitle')}</span>
          </div>
        </Link>

        {/* Links Unificados em todas as páginas */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/como-funciona" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t('how')}</Link>
          <Link href="/resultados" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t('results')}</Link>
          <Link href="/premiacao" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{t('prizes')}</Link>
          <Link href="/inter-bet" className="text-sm font-bold text-yellow-500 hover:text-yellow-400 transition-colors flex items-center gap-1">
            <Zap size={14} /> {t('interbet')}
          </Link>
          <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <div className="scale-90 origin-right"><ConnectButton showBalance={false} accountStatus="avatar" chainStatus="none" /></div>
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400">{isOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div className={`fixed inset-0 top-20 bg-black/95 backdrop-blur-2xl z-[90] transition-all md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col p-8 gap-6 text-center">
          <Link href="/como-funciona" onClick={() => setIsOpen(false)} className="text-xl text-gray-300 border-b border-white/5 pb-4">{t('how')}</Link>
          <Link href="/resultados" onClick={() => setIsOpen(false)} className="text-xl text-gray-300 border-b border-white/5 pb-4">{t('results')}</Link>
          <Link href="/premiacao" onClick={() => setIsOpen(false)} className="text-xl text-gray-300 border-b border-white/5 pb-4">{t('prizes')}</Link>
          <Link href="/inter-bet" onClick={() => setIsOpen(false)} className="text-xl font-bold text-yellow-500">{t('interbet')}</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;