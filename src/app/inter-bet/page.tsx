'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { ArrowLeft, CheckCircle2, Gem, Zap } from 'lucide-react';
import { ConnectButton } from "@rainbow-me/rainbowkit"; // Opcional, se quiser o botão aqui também

export default function InvestBetPage() {
  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-gray-200 selection:bg-[#cfb16d] selection:text-black">
      
      {/* HEADER SIMPLIFICADO */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#2a2d35] z-50">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              {/* LOGO CORRIGIDO */}
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#2a2d35] group-hover:border-[#cfb16d] transition-colors bg-[#13151a]">
                 <Image 
                    src="/images/logo.png" 
                    alt="Logo" 
                    fill 
                    className="object-cover p-1"
                 />
              </div>
              
              {/* TEXTO CORRIGIDO (Visível Mobile) */}
              <div className="flex flex-col leading-none">
                <span className="font-bold text-white tracking-tight text-xs md:text-sm uppercase">Blockchain Bet</span>
                <span className="text-[#cfb16d] font-bold text-xs md:text-base uppercase tracking-wide">Brasil</span>
              </div>
            </Link>
            <Link href="/">
                <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={16} /> Voltar
                </button>
            </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          
          {/* TÍTULO HERO */}
          <div className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#cfb16d]/10 blur-[100px] rounded-full pointer-events-none"></div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight relative z-10 uppercase">
              Escolha sua <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfb16d] to-[#f0e68c]">Modalidade</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto relative z-10">
              Dois caminhos, a mesma tecnologia Trustless. Defina o tamanho da sua participação no rateio global.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
            
            {/* CARD BÁSICO */}
            <div className="bg-[#13151a] p-8 rounded-[32px] border border-[#2a2d35] hover:border-[#cfb16d] transition-all duration-300 group flex flex-col relative shadow-xl">
              
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 border border-[#2a2d35] group-hover:border-[#cfb16d] transition-colors">
                <Zap className="text-gray-400 group-hover:text-[#cfb16d] transition-colors" size={28} />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-2">Adesão Básica</h3>
              <p className="text-gray-500 mb-8">Para quem está começando a explorar aplicações na Blockchain.</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>Contribuição: <strong>$1.00 USD</strong> <span className="text-xs text-gray-500">(~0.00027 ETH)</span></span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>Matriz Segura (1-25)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>Elegível ao Pote e Cascata</span>
                </li>
              </ul>
              
              <Link href="/apostas" className="mt-auto">
                <button className="w-full py-4 rounded-xl border border-[#2a2d35] bg-[#0b0c10] text-gray-300 font-bold hover:bg-[#cfb16d] hover:text-black hover:border-[#cfb16d] transition-all uppercase tracking-wide text-sm">
                    Selecionar Básico
                </button>
              </Link>
            </div>

            {/* CARD INTER-BET (PREMIUM) */}
            <div className="bg-gradient-to-b from-[#1a1500] to-[#0a0a0a] p-8 rounded-[32px] border border-[#cfb16d]/30 hover:border-[#cfb16d] transition-all duration-300 relative overflow-hidden flex flex-col shadow-2xl shadow-[#cfb16d]/5">
              
              <div className="absolute top-0 right-0 bg-[#cfb16d] text-black text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-bl-xl">
                Alta Performance
              </div>
              
              <div className="w-14 h-14 bg-[#cfb16d]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#cfb16d]/30">
                <Gem className="text-[#cfb16d]" size={28} />
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-2">Inter-Bet <span className="text-[#cfb16d]">Pro</span></h3>
              <p className="text-[#cfb16d]/60 mb-8">Para participantes focados em multiplicadores agressivos.</p>
              
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-[#fefce8]">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span className="text-lg">Adesão: <strong>$170.00 USD</strong> <span className="text-xs opacity-70">(~0.0459 ETH)</span></span>
                </li>
                <li className="flex items-center gap-3 text-[#fefce8]">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>Volume de Pote Exclusivo</span>
                </li>
                <li className="flex items-center gap-3 text-[#fefce8]">
                    <CheckCircle2 size={18} className="text-[#cfb16d]" />
                    <span>Smart Contract Auditado</span>
                </li>
              </ul>
              
              <Link href="/apostas" className="mt-auto">
                <button className="w-full py-4 rounded-xl bg-[#cfb16d] hover:bg-[#b59a5e] text-black font-bold shadow-[0_0_20px_rgba(207,177,109,0.3)] hover:shadow-[0_0_30px_rgba(207,177,109,0.5)] transition-all transform hover:scale-[1.02] uppercase tracking-wide text-sm">
                    Acessar Inter-Bet
                </button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}