"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // <--- O IMPORT QUE FALTAVA
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Início", href: "/" },
    { name: "Como Funciona", href: "/como-jogar" },
    { name: "Adesão", href: "/apostas" },
    { name: "Premiação", href: "/premiacao" },
    { name: "Inter-Bet", href: "/invest-bet" },
    { name: "Painel Admin", href: "/admin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* --- LOGO --- */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <Image 
              src="/images/logo.png" 
              alt="Blockchain Bet Brasil" 
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-white tracking-tighter hidden sm:block">
              BLOCKCHAIN-BET<span className="text-amber-500">BRASIL</span>
            </span>
          </Link>

          {/* --- MENU DESKTOP --- */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.name === "Início" 
                    ? "text-emerald-400 hover:text-emerald-300" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* --- BOTÕES (Carteira + Mobile) --- */}
          <div className="flex items-center gap-4">
            
            {/* Botão da Carteira */}
            <div className="scale-90 sm:scale-100">
               <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" />
            </div>

            {/* Botão Hamburguer Mobile */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-800 p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                <span className="sr-only">Abrir menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MENU MOBILE EXPANSÍVEL --- */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-700">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                    link.name === "Início" 
                    ? "text-emerald-400 bg-slate-800" 
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