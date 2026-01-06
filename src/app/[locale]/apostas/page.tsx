"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Grid3X3, ArrowRight } from 'lucide-react';

// Endereço do seu contrato Solidity
const CONTRACT_ADDRESS = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c";

// ABI correta para aceitar uint8[10] (Array de 10 números individuais)
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint8[10]", "name": "_prognosticos", "type": "uint8[10]" }
    ],
    "name": "realizarAplicacao",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;

export default function ApostasPage() {
  const t = useTranslations('Apostas');
  const { isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();
  
  // Armazena os pares selecionados como objetos {x, y}
  const [selecionados, setSelecionados] = useState<{x: number, y: number}[]>([]);

  // Lógica para marcar/desmarcar na matriz
  const handleSelecionar = (x: number, y: number) => {
    const existe = selecionados.find(p => p.x === x && p.y === y);
    
    if (existe) {
      setSelecionados(selecionados.filter(p => !(p.x === x && p.y === y)));
    } else if (selecionados.length < 5) {
      setSelecionados([...selecionados, { x, y }]);
    }
  };

  // Função que chama o contrato
  const handleConfirmar = (tier: number) => {
    if (!isConnected) return alert(t('alertWallet'));
    if (selecionados.length < 5) return alert(t('alertFill'));

    // TRANSFORMAÇÃO VITAL PARA O SEU CONTRATO:
    // Transforma [{x:1, y:2}, {x:3, y:4}] em [1, 2, 3, 4...] (exatos 10 números uint8)
    // Isso resolve o erro de "Prognóstico Inválido" e a falha da MetaMask
    const arrayParaContrato = selecionados.flatMap(p => [p.x, p.y]);

    // Valores do seu contrato: BASIC (min 0.0002) | PRO (min 0.04)
    const valorEth = tier === 1 ? "0.00021" : "0.041";

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "realizarAplicacao",
        args: [arrayParaContrato], // Envia o array de 10 uint8
        value: parseEther(valorEth),
      } as any);
    } catch (error) {
      console.error("Erro ao enviar transação:", error);
    }
  };

  const range = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LADO ESQUERDO: A MATRIZ VISUAL */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-[32px] p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Grid3X3 className="text-yellow-500" />
                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{t('matrixTitle')}</h2>
              </div>
              
              <div className="overflow-x-auto custom-scrollbar pb-4">
                <div className="grid grid-cols-[30px_repeat(25,1fr)] gap-1 min-w-[800px]">
                  {/* Header X */}
                  <div className="text-[9px] text-gray-700 flex items-center justify-center">Y\X</div>
                  {range.map(x => <div key={`hx-${x}`} className="text-[10px] text-center text-gray-500 font-bold">{x}</div>)}
                  
                  {/* Corpo da Matriz */}
                  {range.map(y => (
                    <React.Fragment key={`row-${y}`}>
                      <div className="text-[10px] flex items-center justify-center text-gray-500 font-bold bg-white/5">{y}</div>
                      {range.map(x => {
                        const selecionado = selecionados.some(p => p.x === x && p.y === y);
                        return (
                          <button
                            key={`cell-${x}-${y}`}
                            onClick={() => handleSelecionar(x, y)}
                            className={`h-8 rounded-sm text-[9px] transition-all border ${
                              selecionado 
                              ? 'bg-yellow-500 border-yellow-500 text-black font-bold scale-110 shadow-[0_0_10px_rgba(234,179,8,0.5)] z-10' 
                              : 'bg-white/5 border-white/5 text-gray-600 hover:bg-white/10'
                            }`}
                          >
                            {x}/{y}
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-4 italic">{t('matrixSub')}</p>
            </div>
          </div>

          {/* LADO DIREITO: RESUMO DA ENTRADA */}
          <div className="lg:col-span-1">
            <div className="bg-[#13151a] border border-white/10 rounded-[32px] p-8 sticky top-24 shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter italic">{t('title')}</h3>
              
              <div className="space-y-3 mb-10">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={`resumo-${i}`} className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Nº {i + 1}</span>
                    <span className={`text-lg font-mono font-bold ${selecionados[i] ? 'text-yellow-500' : 'text-gray-800'}`}>
                      {selecionados[i] ? `${selecionados[i].x} / ${selecionados[i].y}` : t('empty')}
                    </span>
                  </div>
                ))}
              </div>

              {!isConnected ? (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-gray-400 text-sm">{t('alertWallet')}</p>
                  <ConnectButton />
                </div>
              ) : (
                <button
                  onClick={() => handleConfirmar(1)}
                  disabled={isPending || selecionados.length < 5}
                  className="w-full py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:brightness-110 text-black font-black rounded-2xl transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-xl"
                >
                  {isPending ? t('btnProcessing') : t('btnConfirm')} <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <div className="mt-8 flex items-start gap-3 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-[10px] text-blue-200/50 leading-relaxed italic">{t('audit')}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}