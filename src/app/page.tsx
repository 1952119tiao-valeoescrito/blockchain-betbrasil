"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight, ShieldCheck, Zap, Globe, Coins, Lock, Cpu, Menu, X, BarChart3, Gem } from 'lucide-react';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-slate-100 selection:bg-[#cfb16d] selection:text-black overflow-x-hidden">
      
      {/* EFEITOS DE FUNDO */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#cfb16d]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#cfb16d]/5 blur-[120px] rounded-full"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0b0c10]/90 backdrop-blur-md border-[#2a2d35] py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          
          <div className="flex items-center gap-2 md:gap-3 z-50">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden border border-[#2a2d35] shadow-lg shadow-[#cfb16d]/10 bg-[#13151a] flex-shrink-0">
               <Image src="/images/logo.png" alt="Logo" fill className="object-cover p-1" />
            </div>
            <div className="flex flex-col leading-none">
                <span className="font-bold text-white tracking-tight text-xs md:text-sm uppercase">Blockchain Bet</span>
                <span className="text-[#cfb16d] font-bold text-xs md:text-base uppercase tracking-wide">Brasil</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/como-funciona" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Como Funciona</Link>
            <Link href="/resultados" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Resultados / Saque</Link>
            <Link href="/premiacao" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Premiação</Link>
            <Link href="/inter-bet" className="text-sm font-medium text-[#cfb16d] hover:text-[#b08d55] transition-colors flex items-center gap-1">
                <Zap size={14} /> Inter-Bet Pro
            </Link>
            <div className="scale-100"><ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" /></div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <div className="scale-75 origin-right"><ConnectButton showBalance={false} accountStatus="avatar" chainStatus="none" /></div>
            <button className="text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0b0c10] border-b border-[#2a2d35] p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in slide-in-from-top-5">
             <Link href="/como-funciona" className="text-lg font-medium text-gray-300">Como Funciona</Link>
             <Link href="/resultados" className="text-lg font-medium text-gray-300">Resultados / Saque</Link>
             <Link href="/premiacao" className="text-lg font-medium text-gray-300">Premiação</Link>
             <Link href="/inter-bet" className="text-lg font-bold text-[#cfb16d]">Inter-Bet Pro</Link>
             <Link href="/apostas"><button className="w-full bg-[#cfb16d] text-black py-3 rounded-lg font-bold mt-2">Acessar App</button></Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-10 md:pt-40 container mx-auto px-4 flex flex-col items-center justify-center text-center gap-6" id="inicio">
        
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide animate-fade-in">
            Bem-vindo... <span className="text-[#cfb16d] block md:inline">BBB & Inter-Bet!</span>
        </h3>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter my-2 drop-shadow-2xl">
            A SORTE AGORA É <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfb16d] via-[#f0e68c] to-[#cfb16d]">
                MATEMÁTICA.
            </span>
        </h1>

        <div className="max-w-4xl space-y-2">
            <h2 className="text-xl md:text-3xl font-bold text-gray-200">
                Blockchain Bet Brasil - O BBB da Web3.
                <span className="text-white block mt-1 font-light">Interação e estratégia, sem paredão.</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold text-[#cfb16d] animate-pulse drop-shadow-lg py-2">
                Ganha com 5, 4, 3, 2 e até com 1 ponto apenas!
            </p>
        </div>

        {/* --- CARDS DE VALOR (NOVO) --- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-12 mt-8 max-w-6xl">
            
            {/* CARD BÁSICO */}
            <Link href="/apostas" className="group">
                <div className="h-full bg-gradient-to-br from-blue-900/40 to-[#0b0c10] text-white rounded-3xl shadow-2xl p-8 text-center border-2 border-blue-500/30 backdrop-blur-md transform transition duration-300 group-hover:scale-[1.02] group-hover:border-blue-400 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Zap size={80} /></div>
                    
                    <h1 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-wide">Prêmio Estimado <br/><span className="text-blue-400">R$ 50.000,00</span></h1>
                    <p className="text-xl font-semibold mb-6 italic text-blue-200">Com apenas <span className="text-[#cfb16d] font-bold underline">1 ponto</span></p>
                    
                    <div className="bg-black/50 rounded-2xl p-4 mb-4 border border-blue-500/30">
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Adesão</p>
                        <p className="text-5xl md:text-6xl font-black text-[#cfb16d] drop-shadow-lg">R$ 5,00</p>
                        <p className="text-xs text-gray-500 mt-1">~0.00027 ETH</p>
                    </div>
                    <p className="text-sm font-medium text-blue-100/80">Limite de 10.000 aplicações. Pote exclusivo.</p>
                </div>
            </Link>

            {/* CARD INTER-BET */}
            <Link href="/inter-bet" className="group">
                <div className="h-full bg-gradient-to-br from-purple-900/40 to-[#0b0c10] text-white rounded-3xl shadow-2xl p-8 text-center border-2 border-purple-500/30 backdrop-blur-md transform transition duration-300 group-hover:scale-[1.02] group-hover:border-purple-400 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Gem size={80} /></div>
                    
                    <h1 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-wide">Prêmio Estimado <br/><span className="text-purple-400">R$ 10 Milhões</span></h1>
                    <p className="text-xl font-semibold mb-6 italic text-purple-200">Com apenas <span className="text-[#cfb16d] font-bold underline">1 ponto</span></p>
                    
                    <div className="bg-black/50 rounded-2xl p-4 mb-4 border border-purple-500/30">
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Adesão</p>
                        <p className="text-5xl md:text-6xl font-black text-[#cfb16d] drop-shadow-lg text-nowrap">R$ 1.000</p>
                        <p className="text-xs text-gray-500 mt-1">~0.0459 ETH</p>
                    </div>
                    <p className="text-sm font-medium text-purple-100/80">Alta performance. Pote exclusivo.</p>
                </div>
            </Link>
        </div>

        <p className="text-base text-gray-400 max-w-3xl mx-auto leading-relaxed mt-12">
            Aplicação sem intermediários. Sem manipulação. O primeiro sistema de distribuição descentralizada operado inteiramente por Smart Contracts e Chainlink VRF na rede Base.
        </p>

        {/* Badges de Confiança */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 w-full pb-20">
          <div className="flex items-center gap-2"><Globe size={18} /> <span className="text-sm font-mono">Base Network</span></div>
          <div className="flex items-center gap-2"><Cpu size={18} /> <span className="text-sm font-mono">Chainlink VRF v2.5</span></div>
          <div className="flex items-center gap-2"><Lock size={18} /> <span className="text-sm font-mono">Audited Contract</span></div>
        </div>
      </section>

      {/* RESTO DO CÓDIGO (Features e CTA) - Pode manter o que estava ou remover se achar que ficou muita coisa */}
      
    </div>
  );
}