"use client"; // <--- OBRIGATÓRIO para interatividade (Click)

import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lista de Links do seu site (Baseado nos logs que você mandou)
  const links = [
    { name: "Início", href: "/" },
    { name: "Como Funciona", href: "/como-jogar" },
    { name: "Adesão", href: "/apostas" },
    { name: "Premiação", href: "/premiacao" },
    { name: "Inter-Bet", href: "/invest-bet" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- LOGO --- */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-bold text-xl tracking-tighter hover:text-brand-gold transition">
              BET<span className="text-brand-gold">BRASIL</span>
            </Link>
          </div>

          {/* --- MENU DESKTOP (Escondido no Mobile) --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* --- BOTÃO CONNECT WALLET & HAMBURGUER --- */}
          <div className="flex items-center gap-4">
            
            {/* O Botão da RainbowKit (aparece sempre) */}
            <div className="scale-90 sm:scale-100">
               <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" />
            </div>

            {/* Botão Hamburguer (Só aparece no Mobile) */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Abrir menu</span>
                {/* Ícone de Menu (3 risquinhos) se fechado, ou X se aberto */}
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MENU MOBILE (Expansível) --- */}
      {/* Só mostra se isOpen for true */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-white/10" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}