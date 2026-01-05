"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Calculator, Trophy, Info, ArrowRight } from 'lucide-react';

const ResultSimulator = () => {
  const t = useTranslations('Home'); // Usa o bloco Home ou Resultados conforme seu JSON
  const [acertos, setAcertos] = useState(0);

  // Simulação básica de prêmios baseada no seu JSON
  const premiosEstimados = {
    5: "R$ 1.000.000,00+",
    4: "R$ 50.000,00",
    3: "R$ 5.000,00",
    2: "R$ 500,00",
    1: "R$ 50,00",
    0: "R$ 0,00"
  };

  return (
    <div className="bg-[#13151a] p-6 rounded-2xl border border-[#2a2d35] relative shadow-xl">
      
      {/* HEADER */}
      <div className="flex flex-col items-center justify-center gap-3 mb-6">
        <div className="p-3 bg-yellow-500/10 rounded-full">
          <Calculator className="w-6 h-6 text-yellow-500" />
        </div>
        <h2 className="text-xl font-bold text-white uppercase tracking-wider">
          Simulador de Prêmios
        </h2>
        <div className="h-1 w-20 bg-yellow-500 rounded-full"></div>
      </div>

      {/* CONTEÚDO */}
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">
            Quantos pares você acha que vai acertar na matriz?
          </p>
          
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setAcertos(num)}
                className={`w-10 h-10 rounded-lg font-bold transition-all ${
                  acertos === num 
                    ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTADO DA SIMULAÇÃO */}
        <div className="bg-black/40 rounded-xl p-5 border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Estimativa de Ganho</span>
            <Trophy className="w-4 h-4 text-yellow-500 opacity-50" />
          </div>
          <div className="text-3xl font-mono font-bold text-white">
            {premiosEstimados[acertos as keyof typeof premiosEstimados]}
          </div>
          <p className="text-[10px] text-gray-500 mt-2 italic">
            * Valores baseados na média de arrecadação do protocolo.
          </p>
        </div>

        <button className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-black rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all active:scale-95">
          REALIZAR ADHESIÓN <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-2 text-left bg-blue-500/5 p-3 rounded-lg border border-blue-500/10">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-200/60 leading-relaxed">
            O prêmio é distribuído via Smart Contract em ETH na rede Base.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultSimulator;