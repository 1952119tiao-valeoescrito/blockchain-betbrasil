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
// CONFIGURAÇÃO DO SEU CONTRATO
// ========================================================
const CONTRACT_ADDRESS = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c";  

const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "uint8[10]", "name": "_prognosticos", "type": "uint8[10]" }],
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
  const { address, isConnected } = useAccount();
  const searchParams = useSearchParams();
  
  const mode = searchParams.get('mode') || 'basic';
  const isPro = false; // Unificado para oficial

  // Hooks de Blockchain
  const { writeContract, data: hash, isPending: isWaitingSignature, error } = useWriteContract();
  const { isLoading: isConfirmingOnChain, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash });

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

    // Converte ["1/2", "3/4"] em [1, 2, 3, 4...] para o Solidity uint8[10]
    const prognosticosParaContrato = selectedCoords.flatMap(c => {
        const [x, y] = c.split('/').map(num => parseInt(num));
        return [x, y];
    });

    const valueInEth = "0.0002"; 

    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'realizarAplicacao',
      args: [prognosticosParaContrato],
      value: parseEther(valueInEth),
    } as any);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-10">
        
        {/* HEADER DA PÁGINA */}
        <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
                Aposta Oficial
            </h1>
            <p className="text-yellow-500 font-bold font-mono mt-2 uppercase tracking-widest text-sm">
                Valor da Entrada: 0.0002 ETH
            </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-8">
          
          {/* LADO ESQUERDO: MATRIZ COM VISIBILIDADE MELHORADA */}
          <div className="bg-slate-900/40 p-4 md:p-8 rounded-3xl border border-white/10 text-left">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LayoutGrid className="text-yellow-500" />
                <h2 className="text-xl font-black text-white uppercase">{t('matrixTitle')}</h2>
              </div>
              {selectedCoords.length > 0 && !isWaitingSignature && (
                <button onClick={() => setSelectedCoords([])} className="text-[10px] text-red-400 font-bold uppercase hover:underline">Limpar Seleção</button>
              )}
            </div>

            {/* AREA DA MATRIZ (ESTILO COMO-FUNCIONA) */}
            <div className="overflow-x-auto pb-4 bg-black/40 rounded-xl p-2 md:p-6 border border-white/5 shadow-inner">
               <div className="grid grid-cols-[30px_repeat(25,1fr)] gap-1 min-w-[850px] mx-auto text-center">
                  
                  {/* Cabeçalho X */}
                  <div className="h-6"></div>
                  {Array.from({ length: 25 }, (_, i) => (
                    <div key={`col-${i}`} className="text-[10px] text-gray-500 font-bold flex items-center justify-center uppercase font-mono">{i + 1}</div>
                  ))}

                  {/* Linhas Y + Células */}
                  {Array.from({ length: 25 }, (_, row) => (
                    <React.Fragment key={`row-${row}`}>
                      <div className="text-[10px] text-gray-500 font-bold flex items-center justify-center uppercase font-mono">{row + 1}</div>
                      {Array.from({ length: 25 }, (_, col) => {
                        const coord = `${col + 1}/${row + 1}`;
                        const isSelected = selectedCoords.includes(coord);
                        return (
                          <button 
                            key={coord} 
                            disabled={isWaitingSignature || isConfirmingOnChain} 
                            onClick={() => toggleCoordinate(coord)}
                            className={`aspect-square border transition-all rounded-sm flex items-center justify-center group
                              ${isSelected 
                                ? 'bg-yellow-500 border-yellow-300 text-black z-10 scale-110 shadow-[0_0_15px_rgba(234,179,8,0.6)]' 
                                : 'bg-white/10 border-white/20 text-gray-400 hover:bg-yellow-500/30 hover:border-yellow-500/50'
                              }`}
                          >
                            <span className={`text-[7px] font-mono font-bold transition-colors
                              ${isSelected ? 'text-black' : 'text-gray-500 group-hover:text-yellow-200'}`}>
                              {coord}
                            </span>
                          </button>
                        );
                      })}
                    </React.Fragment>
                  ))}
               </div>
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO */}
          <div className="bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-yellow-500/20 h-fit sticky top-28 shadow-2xl">
             <h3 className="text-lg font-black text-white uppercase mb-6 text-center border-b border-white/5 pb-4 tracking-widest">{t('title')}</h3>
             <div className="space-y-3 mb-8">
                {[0, 1, 2, 3, 4].map((i) => (
                   <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase">Nº 0{i + 1}</span>
                      <span className="text-yellow-500 font-mono font-black text-xl leading-none">
                        {selectedCoords[i] || "-- / --"}
                      </span>
                   </div>
                ))}
             </div>

             <div className="flex flex-col items-center gap-6">
                {!isConnected ? <ConnectButton label="Conectar Carteira" /> : (
                  isTxSuccess ? (
                    <div className="w-full bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center animate-in zoom-in-95">
                        <CheckCircle2 className="text-green-500 mx-auto mb-3" size={40} />
                        <p className="text-green-500 font-black text-sm uppercase">Entrada Registrada!</p>
                        <a href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noreferrer" className="text-[10px] text-white underline mt-4 block uppercase font-bold flex items-center justify-center gap-1">
                          Ver no BaseScan <ExternalLink size={12} />
                        </a>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      <button 
                        onClick={handleConfirm} 
                        disabled={selectedCoords.length < 5 || isWaitingSignature || isConfirmingOnChain}
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${selectedCoords.length === 5 ? 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_30px_rgba(234,179,8,0.3)]' : 'bg-white/5 text-gray-600 opacity-50 cursor-not-allowed'}`}
                      >
                        {isWaitingSignature ? <Loader2 className="animate-spin" /> : isConfirmingOnChain ? <Loader2 className="animate-spin" /> : <ShieldCheck />} 
                        {isWaitingSignature ? "Assine na Carteira" : isConfirmingOnChain ? "Confirmando..." : "Confirmar Aposta"}
                      </button>
                      
                      {error && (
                        <p className="text-[10px] text-red-500 text-center font-bold uppercase leading-tight">
                           {error.message.includes("rejected") ? "Usuário recusou transação" : "Saldo insuficiente ou erro na rede"}
                        </p>
                      )}
                    </div>
                  )
                )}
                
                <div className="w-full h-[1px] bg-white/5 my-2"></div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest justify-center">
                    <ShieldCheck size={14} className="text-green-500/50" /> {t('audit')}
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}