"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Globe, Coins, Lock, Cpu, Menu, X, ChevronRight, BarChart3 } from 'lucide-react';

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
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#2a2d35] shadow-lg shadow-[#cfb16d]/10 flex items-center justify-center bg-[#13151a]">
               <span className="text-[#cfb16d] font-bold text-xl">B</span>
            </div>
            <span className="font-bold text-lg tracking-tight hidden md:block text-white">
              Blockchain Bet <span className="text-[#cfb16d]">Brasil</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/como-funciona" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Como Funciona</Link>
            <Link href="/premiacao" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Premiação</Link>
            <Link href="/inter-bet" className="text-sm font-medium text-[#cfb16d] hover:text-[#b08d55] transition-colors flex items-center gap-1">
                <Zap size={14} /> Inter-Bet Pro
            </Link>
            <Link href="/apostas">
              <button className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-lg text-sm font-bold transition-all transform hover:scale-105 shadow-lg">
                Conectar Carteira
              </button>
            </Link>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0b0c10] border-b border-[#2a2d35] p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in slide-in-from-top-5">
             <Link href="/como-funciona" className="text-lg font-medium text-gray-300">Como Funciona</Link>
             <Link href="/premiacao" className="text-lg font-medium text-gray-300">Premiação</Link>
             <Link href="/inter-bet" className="text-lg font-bold text-[#cfb16d]">Inter-Bet Pro</Link>
             <Link href="/apostas">
                <button className="w-full bg-[#cfb16d] text-black py-3 rounded-lg font-bold mt-2">Acessar App</button>
             </Link>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION REORGANIZADA --- */}
      <section className="relative pt-32 pb-20 md:pt-36 md:pb-32 container mx-auto px-4 flex flex-col items-center justify-center text-center gap-6" id="inicio">
        
        {/* 1. Bem-vindo */}
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide animate-fade-in">
            Bem-vindo... <span className="text-[#cfb16d] block md:inline">BBB & Inter-Bet!</span>
        </h3>

        {/* 2. A Sorte é Matemática (Manchete Principal) */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter my-2 drop-shadow-2xl">
            A SORTE AGORA É <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfb16d] via-[#f0e68c] to-[#cfb16d]">
                MATEMÁTICA.
            </span>
        </h1>

        {/* 3. Subtítulo e Frase de Impacto */}
        <div className="max-w-4xl space-y-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-200">
                Blockchain Bet Brasil - O BBB da Web3.
                <span className="text-white block mt-1 font-light">Interação e estratégia, sem paredão.</span>
            </h2>
            
            <p className="text-xl md:text-2xl font-bold text-[#cfb16d] animate-pulse drop-shadow-lg py-2">
                Ganha com 5, 4, 3, 2 e até com 1 ponto apenas!
            </p>
        </div>

        {/* 4. Descrição Técnica */}
        <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed border-t border-[#2a2d35] pt-6 mt-2">
            Aplicação sem intermediários. Sem manipulação. O primeiro sistema de distribuição descentralizada operado inteiramente por Smart Contracts e Chainlink VRF na rede Base.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full">
          <Link href="/inter-bet" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#cfb16d] hover:bg-[#b59a5e] text-black font-bold text-lg px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(207,177,109,0.2)] hover:shadow-[0_0_50px_rgba(207,177,109,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Iniciar Adesão <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/como-funciona" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#111] text-white border border-[#2a2d35] font-bold text-lg px-10 py-4 rounded-xl hover:bg-[#1a1a1a] hover:border-white/20 transition-all flex items-center justify-center gap-2">
              Ler Documentação
            </button>
          </Link>
        </div>

        {/* Badges de Confiança */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 w-full">
          <div className="flex items-center gap-2"><Globe size={18} /> <span className="text-sm font-mono">Base Network</span></div>
          <div className="flex items-center gap-2"><Cpu size={18} /> <span className="text-sm font-mono">Chainlink VRF v2.5</span></div>
          <div className="flex items-center gap-2"><Lock size={18} /> <span className="text-sm font-mono">Audited Contract</span></div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20 bg-[#08090c] border-y border-[#2a2d35]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#13151a] p-8 rounded-3xl border border-[#2a2d35] hover:border-[#cfb16d]/50 transition-colors group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] transition-colors">
                <ShieldCheck className="text-[#cfb16d] group-hover:text-black transition-colors" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Trustless Core</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                O contrato não tem dono. Uma vez iniciado, ninguém pode alterar as regras, pausar saques ou manipular a Matriz. Código é lei.
              </p>
            </div>
            <div className="bg-[#13151a] p-8 rounded-3xl border border-[#2a2d35] hover:border-[#cfb16d]/50 transition-colors group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] transition-colors">
                <BarChart3 className="text-[#cfb16d] group-hover:text-black transition-colors" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Auditoria On-Chain</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Utilizamos o padrão da indústria (Chainlink VRF) para validar os prognósticos. A entropia é gerada fora e verificada dentro da Blockchain.
              </p>
            </div>
            <div className="bg-[#13151a] p-8 rounded-3xl border border-[#2a2d35] hover:border-[#cfb16d]/50 transition-colors group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] transition-colors">
                <Coins className="text-[#cfb16d] group-hover:text-black transition-colors" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Pagamento Direto</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                O valor arrecadado (90%) fica travado no contrato inteligente. Ao fim da rodada, o rendimento é liberado automaticamente para saque.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-gradient-to-r from-[#13151a] to-[#0b0c10] rounded-[32px] p-8 md:p-16 border border-[#2a2d35] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#cfb16d]/10 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para iniciar sua adesão?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Escolha entre a Adesão Básica ou o Inter-Bet Pro. 
              Resultados auditados a cada 24 horas.
            </p>
            <div className="flex gap-8">
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">90%</span>
                  <span className="text-xs uppercase text-[#cfb16d] font-bold tracking-wider">Payout</span>
               </div>
               <div className="w-px h-12 bg-[#2a2d35]"></div>
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-white">24h</span>
                  <span className="text-xs uppercase text-[#cfb16d] font-bold tracking-wider">Ciclos</span>
               </div>
            </div>
          </div>
          <Link href="/inter-bet" className="relative z-10 w-full md:w-auto">
             <button className="w-full md:w-auto bg-white text-black font-bold py-5 px-10 rounded-xl hover:bg-[#cfb16d] transition-all flex items-center justify-center gap-3 shadow-xl">
                Acessar DApp <ChevronRight size={20} />
             </button>
          </Link>
        </div>
      </section>

    </div>
  );
}