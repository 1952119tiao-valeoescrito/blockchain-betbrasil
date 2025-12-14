"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import Navbar from "../../components/Navbar";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants/abi";

// --- TEMA VISUAL (Preto & Dourado) ---
const THEME = {
  bg: "bg-[#0b0c10]",
  card: "bg-[#13151a]",
  gold: "text-[#cfb16d]",
  border: "border-[#2a2d35]",
  inputBox: "bg-[#1a1c22] border-[#2a2d35] text-gray-400 hover:border-[#cfb16d] hover:text-white transition-all",
  inputFilled: "bg-[#1e293b] border-[#cfb16d] text-[#cfb16d] shadow-[0_0_10px_rgba(207,177,109,0.2)]",
};

type Pair = { x: number | null; y: number | null };

export default function AplicacaoPage() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  
  // Estado: 5 Prêmios (Pares)
  const [pairs, setPairs] = useState<Pair[]>([
    { x: null, y: null }, { x: null, y: null }, { x: null, y: null }, 
    { x: null, y: null }, { x: null, y: null }
  ]);

  const [tier, setTier] = useState<1 | 2>(1); // 1 = Básico, 2 = Inter-Bet
  const [showModal, setShowModal] = useState(false);
  const [txHash, setTxHash] = useState<string>("");
  
  // Controle do Seletor (Popup)
  const [activeSelector, setActiveSelector] = useState<{ pairIndex: number, field: 'x' | 'y' } | null>(null);

  // Web3 Hooks
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Evita erros de hidratação do React
  useEffect(() => setMounted(true), []);

  // Monitora sucesso da transação para limpar o formulário e mostrar modal
  useEffect(() => {
    if (isConfirmed && hash) {
      setTxHash(hash);
      setShowModal(true);
      setPairs(Array(5).fill({ x: null, y: null })); // Limpa os campos
    }
  }, [isConfirmed, hash]);

  const handleSelectNumber = (num: number) => {
    if (!activeSelector) return;
    const { pairIndex, field } = activeSelector;
    const newPairs = [...pairs];
    newPairs[pairIndex] = { ...newPairs[pairIndex], [field]: num };
    setPairs(newPairs);
    setActiveSelector(null);
  };

  const handleAplicar = () => {
    if (!isConnected) return alert("Conecte sua carteira para realizar a aplicação.");
    
    // Coletar números em um array linear [X1, Y1, X2, Y2...]
    const allNumbers: number[] = [];
    pairs.forEach(p => {
        if(p.x !== null) allNumbers.push(p.x);
        if(p.y !== null) allNumbers.push(p.y);
    });

    if (allNumbers.length !== 10) return alert("Preencha todos os campos da Matriz!");

    try {
      // Define o valor da transação baseado no Tier escolhido na interface
      // Básico = 0.00027 ETH | Inter-Bet = 0.0459 ETH
      const valorEth = tier === 1 ? "0.00027" : "0.0459"; 
      
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "realizarAplicacao", // Nome exato da função no Smart Contract
        args: [allNumbers], // O contrato só pede os números. O Tier é definido pelo valor abaixo.
        value: parseEther(valorEth),
      });
    } catch (error) {
      console.error("Erro ao enviar transação:", error);
    }
  };

  if (!mounted) return null;

  // Conta quantos campos foram preenchidos (para habilitar o botão)
  const countFilled = pairs.reduce((acc, p) => (p.x ? 1 : 0) + (p.y ? 1 : 0) + acc, 0);

  return (
    <main className={`min-h-screen ${THEME.bg} text-gray-200 font-sans selection:bg-[#cfb16d] selection:text-black`}>
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20 flex justify-center items-center min-h-[80vh]">
        
        {/* CARD PRINCIPAL */}
        <div className={`w-full max-w-5xl ${THEME.card} border ${THEME.border} rounded-2xl shadow-2xl overflow-hidden relative`}>
            
            {/* --- CABEÇALHO (Abas + Badge) --- */}
            <div className="p-6 border-b border-[#2a2d35] flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* ABAS DE TIER */}
                <div className="flex bg-[#0b0c10] p-1.5 rounded-lg border border-[#2a2d35] w-full md:w-auto">
                    <button 
                        onClick={() => setTier(1)}
                        className={`px-8 py-3 rounded-md text-sm transition-all flex flex-col items-center leading-tight flex-1 md:flex-none
                            ${tier === 1 ? "bg-[#cfb16d] text-black font-bold shadow-lg" : "text-gray-500 hover:text-white hover:bg-[#1a1c22]"}`}
                    >
                        <span className="uppercase tracking-wide">BÁSICO ($1.00)</span>
                        <span className="text-[10px] opacity-70">≈ 0.00027 ETH</span>
                    </button>
                    <button 
                        onClick={() => setTier(2)}
                        className={`px-8 py-3 rounded-md text-sm transition-all flex flex-col items-center leading-tight flex-1 md:flex-none
                            ${tier === 2 ? "bg-[#cfb16d] text-black font-bold shadow-lg" : "text-gray-500 hover:text-white hover:bg-[#1a1c22]"}`}
                    >
                        <span className="uppercase tracking-wide">INTER-BET ($170.00)</span>
                        <span className="text-[10px] opacity-70">≈ 0.0459 ETH</span>
                    </button>
                </div>

                {/* BADGE VERDE */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0b3d20] border border-[#14522d] rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-[10px] font-bold tracking-wider uppercase">Matriz Segura (1-25)</span>
                </div>
            </div>

            {/* --- CORPO (INPUTS DOS 5 PRÊMIOS) --- */}
            <div className="p-10 flex flex-col justify-center items-center">
                
                <h2 className="text-xl text-white font-bold mb-8 uppercase tracking-widest">Painel de Adesão</h2>

                {/* GRID DOS 5 PRÊMIOS */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                    {pairs.map((pair, index) => (
                        <div key={index} className="bg-[#0b0c10] border border-[#2a2d35] p-4 rounded-xl flex flex-col items-center gap-3 shadow-inner">
                            
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                {index + 1}º Prognóstico
                            </span>

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setActiveSelector({ pairIndex: index, field: 'x' })}
                                    className={`h-12 w-full rounded-lg font-bold text-lg flex items-center justify-center border ${pair.x ? THEME.inputFilled : THEME.inputBox}`}
                                >
                                    {pair.x || "X"}
                                </button>
                                <button
                                    onClick={() => setActiveSelector({ pairIndex: index, field: 'y' })}
                                    className={`h-12 w-full rounded-lg font-bold text-lg flex items-center justify-center border ${pair.y ? THEME.inputFilled : THEME.inputBox}`}
                                >
                                    {pair.y || "Y"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center opacity-40">
                    <p className="text-[10px] uppercase tracking-[0.3em]">Auditoria via Chainlink VRF</p>
                    <div className="w-24 h-1 bg-[#2a2d35] mx-auto mt-2 rounded-full"></div>
                </div>

            </div>

            {/* --- RODAPÉ --- */}
            <div className="bg-[#0b0c10] border-t border-[#2a2d35] p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Texto Informativo */}
                    <div className="flex items-center gap-3">
                         <span className="text-gray-500 text-xs uppercase tracking-wide">Modalidade:</span>
                         <span className="text-[#cfb16d] font-bold text-sm">Aplicação em Cascata (90% Payout)</span>
                    </div>

                    {/* Botão Confirmar */}
                    <button
                        disabled={isPending || isConfirming || countFilled !== 10}
                        onClick={handleAplicar}
                        className={`
                            w-full md:w-auto md:min-w-[320px] py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all
                            ${countFilled !== 10 
                                ? "bg-[#1a1c22] text-gray-600 cursor-not-allowed border border-[#2a2d35]" 
                                : "bg-[#2a2d35] text-white border border-[#3e424b] hover:bg-[#cfb16d] hover:text-black hover:border-[#cfb16d] shadow-lg"}
                        `}
                    >
                        {isPending ? "Confirmando..." : isConfirming ? "Processando..." : (
                            <>
                                <span>CONFIRMAR APLICAÇÃO</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* --- SELETOR (POPUP) --- */}
            {activeSelector && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-4 animate-in fade-in duration-200">
                    <h3 className="text-[#cfb16d] font-bold text-xl mb-6 tracking-widest uppercase">
                        Selecione {activeSelector.field.toUpperCase()} ({activeSelector.pairIndex + 1}º Prognóstico)
                    </h3>
                    
                    <div className="grid grid-cols-5 gap-3 w-full max-w-[300px]">
                        {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                            <button
                                key={num}
                                onClick={() => handleSelectNumber(num)}
                                className={`
                                    h-12 rounded font-bold text-lg border transition-all
                                    ${pairs[activeSelector.pairIndex][activeSelector.field] === num 
                                        ? "bg-[#cfb16d] text-black border-[#cfb16d]" 
                                        : "bg-[#0b0c10] border-[#333] text-gray-300 hover:border-[#cfb16d] hover:text-white"
                                    }
                                `}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        onClick={() => setActiveSelector(null)}
                        className="mt-8 text-gray-600 hover:text-white text-xs uppercase tracking-widest border-b border-transparent hover:border-white transition-colors"
                    >
                        Cancelar Seleção
                    </button>
                </div>
            )}

        </div>
      </div>

      {/* MODAL SUCESSO */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-[#13151a] border border-[#cfb16d] p-8 rounded-2xl max-w-sm w-full text-center relative shadow-[0_0_50px_rgba(207,177,109,0.2)]">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-white mb-2">Aplicação Registrada!</h2>
                <p className="text-gray-400 mb-4 text-sm">Seus prognósticos estão na Blockchain.</p>
                <a 
                    href={`https://basescan.org/tx/${txHash}`} 
                    target="_blank" rel="noopener noreferrer"
                    className="block w-full py-3 bg-[#0b0c10] border border-[#2a2d35] text-[#cfb16d] rounded-lg mt-4 mb-3 hover:bg-[#1a1c22]"
                >
                    Ver comprovante no BaseScan
                </a>
                <button onClick={() => setShowModal(false)} className="block w-full py-3 bg-[#cfb16d] text-black font-bold rounded-lg hover:bg-[#b59a5e]">
                    Fechar
                </button>
            </div>
        </div>
      )}
    </main>
  );
}