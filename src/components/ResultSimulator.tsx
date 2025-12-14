"use client";

import { useState } from 'react';
import { Calculator, RefreshCw, Cpu, Dna } from 'lucide-react';

interface ResultSimulatorProps {
  blockchainData?: {
    resultado: number[];
    timestamp?: bigint;
  } | null;
}

export default function ResultSimulator({ blockchainData }: ResultSimulatorProps) {
  
  const [simulatedResult, setSimulatedResult] = useState<number[] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Prioriza dados reais da blockchain se existirem, senão mostra a simulação
  const displayResult = blockchainData?.resultado && blockchainData.resultado.length > 0 
    ? blockchainData.resultado 
    : simulatedResult;

  const isOfficial = !!(blockchainData?.resultado && blockchainData.resultado.length > 0);

  // Simula a lógica da Matriz (1 a 25, PERMITINDO repetição)
  const handleSimulateVRF = () => {
    setIsAnimating(true);
    setSimulatedResult(null);

    setTimeout(() => {
      // Gera 10 números, cada um independente (pode repetir, igual à Matriz X/Y)
      const nums = Array.from({ length: 10 }, () => Math.floor(Math.random() * 25) + 1);
      setSimulatedResult(nums);
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div className="bg-[#13151a] p-6 rounded-2xl border border-[#2a2d35] relative shadow-xl">
      
      {/* HEADER */}
      <div className="flex flex-col items-center justify-center gap-3 mb-6">
         {isOfficial ? (
            <span className="bg-green-900/20 text-green-400 text-[10px] font-bold px-3 py-1 rounded-full border border-green-500/30 flex items-center gap-2 animate-pulse">
               <Cpu size={12} /> AUDITORIA ON-CHAIN (OFICIAL)
            </span>
         ) : (
            <span className="bg-[#cfb16d]/10 text-[#cfb16d] text-[10px] font-bold px-3 py-1 rounded-full border border-[#cfb16d]/30 flex items-center gap-2">
               <Dna size={12} /> SIMULADOR DE PROGNÓSTICO
            </span>
         )}
         
         <h2 className="text-xl font-bold text-white uppercase tracking-wide">
            {isOfficial ? 'Prognósticos da Rodada' : 'Testar Aleatoriedade'}
         </h2>
         
         <p className="text-center text-gray-500 text-xs px-4 max-w-md">
            {isOfficial 
              ? 'Estes resultados foram gerados pelo Chainlink VRF e são imutáveis.' 
              : 'Clique para simular como a Matriz gera 5 pares (10 números) aleatórios.'}
         </p>
      </div>

      {/* RESULTADO (BOLAS) */}
      {(displayResult || isAnimating) && (
        <div className="my-8">
            {isAnimating ? (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                    <RefreshCw className="animate-spin text-[#cfb16d]" size={32} />
                    <span className="text-xs">Calculando Entropia...</span>
                </div>
            ) : (
                <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto">
                    {displayResult?.map((num, idx) => (
                        <div key={idx} className={`aspect-square flex items-center justify-center rounded-lg border text-lg font-bold font-mono shadow-inner ${
                            isOfficial 
                            ? 'bg-green-900/10 border-green-500/30 text-green-400' 
                            : 'bg-[#0b0c10] border-[#cfb16d] text-[#cfb16d] shadow-[#cfb16d]/10'
                        }`}>
                            {num}
                        </div>
                    ))}
                </div>
            )}
            
            {displayResult && !isAnimating && (
                <div className="text-center mt-4">
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                        {isOfficial ? 'Hash Validado na Base' : 'Resultado Simulado (Demo)'}
                    </p>
                </div>
            )}
        </div>
      )}

      {/* BOTÃO */}
      {!isOfficial && (
        <div className="mt-6">
          <button 
            onClick={handleSimulateVRF} 
            disabled={isAnimating}
            className="w-full bg-[#0b0c10] hover:bg-[#1a1c22] border border-[#2a2d35] hover:border-[#cfb16d] text-white font-bold py-4 px-4 rounded-xl transition-all flex items-center justify-center gap-2 group uppercase text-xs tracking-wider"
          >
            <Calculator size={16} className="group-hover:text-[#cfb16d] transition-colors" /> 
            {simulatedResult ? 'Simular Novamente' : 'Gerar Simulação'}
          </button>
        </div>
      )}

      {/* RODAPÉ */}
      <div className="mt-6 pt-4 border-t border-[#2a2d35] text-center">
          <p className="text-[10px] text-gray-600">
              O sistema utiliza <strong>Verifiable Random Function (VRF)</strong>. 
              Resultados 100% auditáveis.
          </p>
      </div>

    </div>
  );
}