"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0b0c10] border-t border-[#2a2d35] py-10 px-4 text-center z-10 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6">
        
        {/* Badge de Segurança */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#13151a] border border-[#2a2d35]">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] text-[#cfb16d] font-bold uppercase tracking-[0.2em]">
                Ambiente 100% On-Chain
            </span>
        </div>

        {/* Links Legais (ADICIONADO) */}
        <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <Link href="/termos-de-uso" className="hover:text-[#cfb16d] transition-colors">
                Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="hover:text-[#cfb16d] transition-colors">
                Política de Privacidade
            </Link>
        </div>

        {/* Divisor Sutil */}
        <div className="w-12 h-px bg-[#2a2d35]"></div>

        {/* Informações Técnicas */}
        <div className="text-[10px] text-gray-600 flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <span>Operando na Rede <strong>Base (Mainnet)</strong></span>
            <span className="hidden md:inline text-[#2a2d35]">•</span>
            <span>Smart Contract Auditado</span>
            <span className="hidden md:inline text-[#2a2d35]">•</span>
            <span>Validado por <strong>Chainlink VRF</strong></span>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-gray-700 mt-2">
           &copy; {currentYear} Blockchain Bet Brasil. Todos os direitos reservados. Protocolo Descentralizado.
        </p>

      </div>
    </footer>
  );
}