"use client";

import React from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from 'next/image';

const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/10 group-hover:border-yellow-500/50 transition-colors">
            <Image 
              src="/images/logo.png" 
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tighter leading-none text-lg">
              BLOCKCHAIN <span className="text-yellow-500">BET</span>
            </span>
            <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
              {t('subtitle')}
            </span>
          </div>
        </Link>

        {/* LINKS - Note a barra "/" antes do nome da página */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/como-funciona" className="text-sm text-gray-400 hover:text-white transition-colors">
            {t('how')}
          </Link>
          <Link href="/resultados" className="text-sm text-gray-400 hover:text-white transition-colors">
            {t('results')}
          </Link>
          <Link href="/premiacao" className="text-sm text-gray-400 hover:text-white transition-colors">
            {t('prizes')}
          </Link>
          
          <ConnectButton showBalance={false} chainStatus="none" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;