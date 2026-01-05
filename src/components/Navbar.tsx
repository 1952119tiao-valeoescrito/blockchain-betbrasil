// src/components/Navbar.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, X, Zap } from "lucide-react";
// 1. Importações de Tradução e Navegação
import { useTranslations } from 'next-intl';
import { Link } from '../navigation'; // Certifique-se que navigation.ts está na pasta src/

export default function Navbar() {
  const t = useTranslations('Navbar'); // Carrega as traduções do grupo 'Navbar'
  const [isOpen, setIsOpen] = useState(false);

  // Mapeamento dos Links com as chaves de tradução
  const navLinks = [
    { key: "home", href: "/" },
    { key: "how", href: "/como-funciona" },
    { key: "results", href: "/resultados" },
    { key: "prizes", href: "/premiacao" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#2a2d35] z-50 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* --- LOGO + NOME --- */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 hover:opacity-80 transition group z-50">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden border border-[#2a2d35] group-hover:border-[#cfb16d] transition-colors bg-[#13151a] flex-shrink-0">
                <Image 
                  src="/images/logo.png" 
                  alt="Blockchain Bet Brasil Logo" 
                  fill
                  className="object-cover p-1"
                  priority
                />
            </div>
            <div className="flex flex-col leading-none">
                <span className="font-bold text-white tracking-tight text-xs md:text-sm uppercase">
                  Blockchain Bet
                </span>
                <span className="text-[#cfb16d] font-bold text-xs md:text-base uppercase tracking-wide">
                  {t('subtitle')} {/* Traduz 'BRASIL' ou 'GLOBAL' */}
                </span>
            </div>
          </Link>

          {/* --- MENU DESKTOP --- */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors whitespace-nowrap"
              >
                {t(link.key)} {/* Traduz o nome do link */}
              </Link>
            ))}
            
            {/* Link Especial Inter-Bet */}
            <Link 
                href="/inter-bet" 
                className="text-sm font-bold text-[#cfb16d] hover:text-[#b59a5e] transition-colors flex items-center gap-1 border border-[#cfb16d]/20 px-3 py-1.5 rounded-lg hover:bg-[#cfb16d]/10 whitespace-nowrap"
            >
                <Zap size={14} /> Inter-Bet Pro
            </Link>
          </div>

          {/* --- BOTÕES (Carteira + Mobile) --- */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="scale-75 md:scale-100 origin-right">
               <ConnectButton 
                 showBalance={false} 
                 accountStatus="avatar"
                 chainStatus="none"
                 label={t('connect')} // Traduz 'Conectar Carteira'
               />
            </div>

            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                <span className="sr-only">Menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MENU MOBILE EXPANSÍVEL --- */}
      {isOpen && (
        <div className="md:hidden bg-[#0b0c10] border-b border-[#2a2d35] shadow-2xl animate-in slide-in-from-top-5 absolute top-20 left-0 w-full z-40">
          <div className="px-6 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-white hover:pl-2 transition-all border-l-2 border-transparent hover:border-[#cfb16d]"
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
                href="/inter-bet"
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-[#cfb16d] hover:text-[#b59a5e] flex items-center gap-2"
            >
                <Zap size={18} /> Inter-Bet Pro
            </Link>
            <Link href="/apostas" onClick={() => setIsOpen(false)}>
                <button className="w-full bg-white text-black font-bold py-3 rounded-lg mt-4 hover:bg-gray-200">
                    {t('access')} {/* Traduz 'Acessar App' */}
                </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}