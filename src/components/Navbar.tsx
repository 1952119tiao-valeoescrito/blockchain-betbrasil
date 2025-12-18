"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Importação do componente de Imagem
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Início", href: "/" },
    { name: "Como Funciona", href: "/como-funciona" },
    { name: "Premiação", href: "/premiacao" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#2a2d35] z-50 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* --- LOGO + NOME --- */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition group">
            
            {/* Container da Imagem (Visível em Mobile e Desktop) */}
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#2a2d35] group-hover:border-[#cfb16d] transition-colors bg-[#13151a]">
                <Image 
                  src="/images/logo.png" 
                  alt="Blockchain Bet Brasil Logo" 
                  fill
                  className="object-cover p-1" // p-1 dá um respiro para a borda não colar no logo
                  priority
                />
            </div>

            {/* Texto (Escondido em telas muito pequenas para não quebrar, visível em tablets/desktop) */}
            <span className="font-bold text-white tracking-tight hidden sm:block text-sm md:text-base uppercase leading-tight">
              Blockchain Bet <span className="text-[#cfb16d] block md:inline">Brasil</span>
            </span>
          </Link>

          {/* --- MENU DESKTOP --- */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {/* Link Especial Inter-Bet (Dourado) */}
            <Link 
                href="/inter-bet" 
                className="text-sm font-bold text-[#cfb16d] hover:text-[#b59a5e] transition-colors flex items-center gap-1 border border-[#cfb16d]/20 px-3 py-1.5 rounded-lg hover:bg-[#cfb16d]/10"
            >
                <Zap size={14} /> Inter-Bet Pro
            </Link>
          </div>

          {/* --- BOTÕES (Carteira + Mobile) --- */}
          <div className="flex items-center gap-4">
            
            {/* Botão da Carteira (RainbowKit) */}
            <div className="scale-90 sm:scale-100">
               <ConnectButton 
                 showBalance={false} 
                 accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }} 
                 chainStatus="icon" 
               />
            </div>

            {/* Botão Hamburguer Mobile */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                <span className="sr-only">Abrir menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MENU MOBILE EXPANSÍVEL --- */}
      {isOpen && (
        <div className="md:hidden bg-[#0b0c10] border-b border-[#2a2d35] shadow-2xl animate-in slide-in-from-top-5">
          <div className="px-6 py-6 space-y-4 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-white hover:pl-2 transition-all border-l-2 border-transparent hover:border-[#cfb16d]"
              >
                {link.name}
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
                    Acessar DApp
                </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}