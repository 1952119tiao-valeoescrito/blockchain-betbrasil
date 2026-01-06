"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Zap, Info, CheckCircle2 } from 'lucide-react';

const CONTRACT_ADDRESS = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c";
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "uint256[]", "name": "_prognosticos", "type": "uint256[]" }],
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
  
  // Estado para armazenar os 5 prognósticos selecionados (ex: [105, 220, 315...])
  const [selecionados, setSelecionados] = useState<number[]>([]);

  const handleSelecionar = (x: number, y: number) => {
    const par = x * 100 + y; // Gera um ID único para o par (ex: 10/05 vira 1005)
    if (selecionados.includes(par)) {
      setSelecionados(selecionados.filter(i => i !== par));
    } else if (selecionados.length < 5) {
      setSelecionados([...selecionados, par]);
    }
  };

  const handleConfirmar = (tier: number) => {
    if (!isConnected) return alert(t('alertWallet'));
    if (selecionados.length < 5) return alert(t('alertFill'));

    const valorEth = tier === 1 ? "0.00027" : "0.0459";

    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "realizarAplicacao",
      args: [selecionados.map(p => BigInt(p))],
      value: parseEther(valorEth),
    } as any);
  };

  const range = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 pt-24">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* COLUNA 1 E 2: A MATRIZ */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">{t('matrixTitle')}</h2>
              <p className="text-gray-500 text-sm mb-6">{t('matrixSub')}</p>
              
              <div className="overflow-x-auto custom-scrollbar">
                <div className="grid grid-cols-[30px_repeat(25,1fr)] gap-1 min-w-[800px]">
                  <div className=""></div>
                  {range.map(x => <div key={x} className="text-[10px] text-center text-gray-600 font-bold">{x}</div>)}
                  
                  {range.map(y => (
                    <React.Fragment key={y}>
                      <div className="text-[10px] flex items-center justify-center text-gray-600 font-bold">{y}</div>
                      {range.map(x => {
                        const par = x * 100 + y;
                        const isSel = selecionados.includes(par);
                        return (
                          <button
                            key={`${x}-${y}`}
                            onClick={() => handleSelecionar(x, y)}
                            className={`h-7 border transition-all rounded-sm flex items-center justify-center text-[9px] ${
                              isSel ? 'bg-yellow-500 border-yellow-500 text-black font-bold' : 'border-white/5 bg-white/5 text-gray-600 hover:bg-white/10'
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
            </div>
          </div>

          {/* COLUNA 3: RESUMO E BOTÕES */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">{t('title')}</h3>
              
              <div className="space-y-4 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Nº {i + 1}</span>
                    <span className="text-lg text-white font-mono">
                      {selecionados[i] ? `${Math.floor(selecionados[i]/100)} / ${selecionados[i]%100}` : t('empty')}
                    </span>
                  </div>
                ))}
              </div>

              {!isConnected ? (
                <div className="flex justify-center"><ConnectButton /></div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => handleConfirmar(1)}
                    disabled={isPending || selecionados.length < 5}
                    className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-xl transition-all disabled:opacity-30"
                  >
                    {isPending ? t('btnProcessing') : `${t('btnConfirm')} (BASIC)`}
                  </button>
                </div>
              )}

              <div className="mt-6 flex items-start gap-2 bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <p className="text-[10px] text-blue-200/60 leading-relaxed">{t('audit')}</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}