"use client"; // <--- OBRIGATÓRIO para interatividade (Click)

import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lista de Links do seu site (Baseado nos logs que você mandou)
  const links = [
    { name: "Início", href: "/" },
    { name: "Apostas", href: "/apostas" },
    { name: "Como Funciona", href: "/como-jogar" },
    { name: "Premiação", href: "/premiacao" },
    { name: "Inter-Bet", href: "/invest-bet" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center space-x-2">
            <Image 
  src="/images/logo.png" 
  alt="Blockchain Bet Brasil" 
  width={32}
  height={32}
  className="rounded-lg"
/>
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