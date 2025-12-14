"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';

export default function PoliticaPrivacidade() {
  const platformName = "Blockchain Bet Brasil";
  const currentDate = "Dezembro de 2025";

  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-200 py-12 font-sans selection:bg-[#cfb16d] selection:text-black">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Botão Voltar */}
        <div className="mb-8">
            <Link href="/">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-wider group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para o Início
                </button>
            </Link>
        </div>

        <div className="bg-[#13151a] rounded-[32px] border border-[#2a2d35] shadow-2xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Efeito de fundo leve (Dourado) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#cfb16d]/5 rounded-full blur-[80px] pointer-events-none"></div>

          <header className="text-center mb-10 border-b border-[#2a2d35] pb-8 relative z-10">
            <div className="inline-block p-4 bg-[#cfb16d]/10 rounded-2xl mb-4 border border-[#cfb16d]/20">
                <Shield size={40} className="text-[#cfb16d]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight uppercase">
              Política de Privacidade <br/><span className="text-[#cfb16d] text-lg md:text-xl font-medium tracking-widest">Protocolo Web3 & Blockchain</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-4">
              Última atualização: {currentDate}
            </p>
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-8 relative z-10 text-sm md:text-base">
            <p>
              A <strong>{platformName}</strong> é uma Interface Descentralizada (DApp) que interage diretamente com a rede <strong>Base Mainnet</strong>. 
              Diferente de plataformas