"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Definição dos links para facilitar a manutenção
  const links = [
    { name: "Início", href: "/" },
    { name: "Como Funciona", href: "/como-jogar" },
    { name: "Adesão", href: "/apostas" },
    { name: "Premiação", href: "/premiacao" },
    { name: "Inter-Bet", href: "/invest-bet" },
    { name: "Painel Admin", href: "/admin" },
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* --- LOGO (Mantida a imagem do seu script original) --- */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/images/logo.png" 
                alt="Blockchain Bet Brasil" 
                width={32}
                height={32}
                className="rounded-lg"
              />
              {/* Opcional: Se quiser adicionar texto ao lado do logo, descomente abaixo */}
              {/* <span className="text-white font-bold hidden sm:block">BetBrasil</span> */}
            </Link>
          </div>

          {/* --- MENU DESKTOP (Escondido no Mobile) --- */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    link.name === "Início" 
                      ? "text-emerald-400 font-semibold hover:text-emerald-300" 
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* --- BOTÃO CONNECT WALLET & HAMBURGUER --- */}
          <div className="flex items-center gap-4">
            
            {/* Botão da RainbowKit */}
            <div className="scale-90 sm:scale-100">
               <ConnectButton 
                 showBalance={false} 
                 accountStatus="avatar" 
                 chainStatus="icon" 
                 label="Conectar"
               />
            </div>

            {/* Botão Hamburguer (Só aparece no Mobile) */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Abrir menu</span>
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
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-700" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                    link.name === "Início" 
                      ? "text-emerald-400" 
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
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