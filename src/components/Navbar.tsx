"use client";

import React, { useState } from 'react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from 'next/image';
import { Menu, X } from 'lucide-react'; // Ícones para o menu mobile

const Navbar = () => {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu mobile

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-white/10 group-hover:border-yellow-500/50 transition-colors">
            <Image 
              src="/images/logo.png" 
              alt="Logo"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tighter leading-none text-base md:text-lg">
              BLOCKCHAIN <span className="text-yellow-500">BET</span>
            </span>
            <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">
              {t('subtitle')}
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
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

        {/* MOBILE CONTROLS (Wallet + Hamburger) */}
        <div className="flex md:hidden items-center gap-3">
          {/* Botão de Connect reduzido para mobile via CSS do RainbowKit ou apenas visível */}
          <div className="scale-90 origin-right">
             <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
          </div>
          
          <button 
            onClick={toggleMenu}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`
        fixed inset-0 top-20 bg-black/95 backdrop-blur-2xl z-40 transition-all duration-300 md:hidden
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}>
        <div className="flex flex-col p-8 gap-6 text-center">
          <Link 
            href="/como-funciona" 
            onClick={toggleMenu}
            className="text-xl font-medium text-gray-300 hover:text-yellow-500 transition-colors border-b border-white/5 pb-4"
          >
            {t('how')}
          </Link>
          <Link 
            href="/resultados" 
            onClick={toggleMenu}
            className="text-xl font-medium text-gray-300 hover:text-yellow-500 transition-colors border-b border-white/5 pb-4"
          >
            {t('results')}
          </Link>
          <Link 
            href="/premiacao" 
            onClick={toggleMenu}
            className="text-xl font-medium text-gray-300 hover:text-yellow-500 transition-colors border-b border-white/5 pb-4"
          >
            {t('prizes')}
          </Link>
          
          <div className="pt-4 flex justify-center">
             {/* ConnectButton duplicado aqui se quiser destaque, ou apenas mantê-lo na barra fixa */}
             <span className="text-[10px] text-gray-600 uppercase tracking-widest">Protocolo Descentralizado</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;