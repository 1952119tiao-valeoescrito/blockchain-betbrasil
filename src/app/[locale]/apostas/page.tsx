"use client";
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useTranslations } from 'next-intl';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useSearchParams } from 'next/navigation';
import { parseEther } from 'viem';
import { LayoutGrid, ShieldCheck, Trash2, CheckCircle2, Loader2, ExternalLink } from 'lucide-react';

// ========================================================
// CONFIGURAÇÃO DO SEU CONTRATO REAL
// ========================================================
const CONTRACT_ADDRESS = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c"; 

const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint8[10]",
        "name": "_prognosticos",
        "type": "uint8[10]"
      }
    ],
    "name": "realizarAplicacao",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
] as const;
// ========================================================

export default function ApostasPage() {
  const t = useTranslations('Apostas');
  const th = useTranslations('Home');
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();
  
  const mode = searchParams.get('mode') || 'basic';
  const isPro = mode === 'pro';

  // Wagmi Hooks para interação com a Base Network
  const { writeContract, data: hash, isPending: isWaitingSignature, error } = useWriteContract();
  
  const { isLoading: isConfirmingOnChain, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const [selectedCoords, setSelectedCoords] = useState<string[]>([]);

  const toggleCoordinate = (coord: string) => {
    if (isWaitingSignature || isConfirmingOnChain) return;
    if (selectedCoords.includes(coord)) {
      setSelectedCoords(selectedCoords.filter(c => c !== coord));
    } else {
      if (selectedCoords.length < 5) setSelectedCoords([...selectedCoords, coord]);
    }
  };

  const handleConfirm = async () => {
    if (selectedCoords.length !== 5) return;

    // 1. Transformar ["1/2", "3/4"...] em [1, 2, 3, 4...] para o Solidity uint8[10]
    const prognosticosParaContrato = selectedCoords.flatMap(c => {
        const [x, y] = c.split('/').map(num => parseInt(num));
        return [x, y];
    });

    // 2. Definir valor baseado no seu contrato (Basic 0.0002 / Pro 0.04)
    // Usando valores um pouco acima do mínimo para garantir aceitação
    const valueInEth = isPro ? "0.045" : "0.0003"; 

    // 3. Disparar o MetaMask
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'realizarAplicacao',
      args: [prognosticosParaContrato as unknown as [number, number, number, number, number, number, number, number, number, number]],
      value: parseEther(valueInEth),
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-10 text-center">
        
        <div className="mb-8 lg:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic">
                {isPro ? "Adesão Inter-Bet PRO" : "Adesão Básica"}
            </h1>
            <p className="text-yellow-500 font-bold font-mono">
                PAGAMENTO: {isPro ? "0.045 ETH" : "0.0003 ETH"}
            </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-8">
          
          {/* MATRIZ DE SELEÇÃO */}
          <div className="bg-slate-900/40 p-4 md:p-8 rounded-3xl border border-white/10 text-left">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutGrid className="text-yellow-500" />
                <h2 className="text-xl font-black text-white uppercase">Selecione 5 Pares</h2>
              </div>
              {selectedCoords.length > 0 && (
                <button onClick={() => setSelectedCoords([])} className="text-[10px] text-red-400 font-bold uppercase hover:underline">Limpar</button>
              )}
            </div>

            <div className="overflow-x-auto pb-4 bg-black/20 rounded-xl p-2 md:p-4 border border-white/5">
               <div className="grid grid-cols-[30px_repeat(25,1fr)] gap-1 min-w-[850px]">
                  <div className="h-6"></div>
                  {Array.from({ length: 25 }, (_, i) => (
                    <div key={i} className="text-[10px] text-gray-600 font-bold flex items-center justify-center">{i + 1}</div>
                  ))}
                  {Array.from({ length: 25 }, (_, row) => (
                    <React.Fragment key={row}>
                      <div className="text-[10px] text-gray-600 font-bold flex items-center justify-center">{row + 1}</div>
                      {Array.from({ length: 25 }, (_, col) => {
                        const coord = `${col + 1}/${row + 1}`;
                        const isSelected = selectedCoords.includes(coord);
                        return (
                          <button key={coord} disabled={isWaitingSignature || isConfirmingOnChain} onClick={() => toggleCoordinate(coord)}
                            className={`aspect-square border transition-all rounded-sm flex items-center justify-center text-[7px] font-mono font-bold ${isSelected ? 'bg-yellow-500 border-yellow-300 text-black z-10 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)]' : 'bg-white/5 border-white/10 text-gray-700 hover:border-yellow-500/50'}`}>
                            {coord}
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
               </div>
            </div>
          </div>

          {/* PAINEL LATERAL */}
          <div className="bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-yellow-500/20 h-fit sticky top-28 shadow-2xl">
             <h3 className="text-lg font-black text-white uppercase mb-6 text-center border-b border-white/5 pb-4">Sua Entrada</h3>
             <div className="space-y-3 mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                   <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase">Par {i + 1}</span>
                      <span className="text-yellow-500 font-mono font-black text-xl">{selectedCoords[i] || "-- / --"}</span>
                   </div>
                ))}
             </div>

             <div className="flex flex-col items-center gap-6">
                {!isConnected ? <ConnectButton label="Conectar Carteira" /> : (
                  isTxSuccess ? (
                    <div className="w-full bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center">
                        <CheckCircle2 className="text-green-500 mx-auto mb-3" size={40} />
                        <p className="text-green-500 font-black text-sm uppercase">Aposta Confirmada!</p>
                        <a href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noreferrer" className="text-[10px] text-white underline mt-4 block flex items-center justify-center gap-1">
                          Ver no BaseScan <ExternalLink size={12} />
                        </a>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      <button 
                        onClick={handleConfirm} 
                        disabled={selectedCoords.length < 5 || isWaitingSignature || isConfirmingOnChain}
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${selectedCoords.length === 5 ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-xl' : 'bg-white/5 text-gray-600 opacity-50'}`}
                      >
                        {isWaitingSignature ? <><Loader2 className="animate-spin" /> Assine na Carteira</> : isConfirmingOnChain ? <><Loader2 className="animate-spin" /> Confirmando na Rede...</> : <><ShieldCheck size={20} /> {t('btnConfirm')}</>}
                      </button>
                      
                      {error && (
                        <p className="text-[10px] text-red-500 text-center font-bold uppercase leading-tight">
                          {error.message.includes("rejected") ? "Usuário recusou a transação" : "Erro na transação ou saldo insuficiente"}
                        </p>
                      )}
                    </div>
                  )
                )}
                
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-green-500/50" /> {t('audit')}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}