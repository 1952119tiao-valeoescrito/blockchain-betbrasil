"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import Navbar from "../../components/Navbar";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants/abi";
import { Check, Trash2, Zap, Grid3X3 } from "lucide-react";

// --- TEMA VISUAL ---
const THEME = {
  bg: "bg-[#0b0c10]",
  card: "bg-[#13151a]",
  gold: "text-[#cfb16d]",
  border: "border-[#2a2d35]",
  inputBox: "bg-[#1a1c22] border-[#2a2d35] text-gray-400 hover:border-[#cfb16d] hover:text-white transition-all",
  inputFilled: "bg-[#1e293b] border-[#cfb16d] text-[#cfb16d] shadow-[0_0_10px_rgba(207,177,109,0.2)] font-bold",
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

  const [tier, setTier] = useState<1 | 2>(1); 
  const [showModal, setShowModal] = useState(false);
  const [txHash, setTxHash] = useState<string>("");

  // Array de 1 a 25 para gerar a matriz
  const nums = Array.from({ length: 25 }, (_, i) => i + 1);

  // Web3 Logic
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isConfirmed && hash) {
      setTxHash(hash);
      setShowModal(true);
      setPairs(Array(5).fill({ x: null, y: null }));
    }
  }, [isConfirmed, hash]);

  // Lógica da Matriz: Clicou no prognóstico (X/Y), preenche o primeiro vazio
  const handleMatrixClick = (x: number, y: number) => {
    const emptyIndex = pairs.findIndex(p => p.x === null);
    
    // Se estiver cheio, não faz nada
    if (emptyIndex === -1) return;

    const newPairs = [...pairs];
    newPairs[emptyIndex] = { x, y };
    setPairs(newPairs);
  };

  // Limpar um par específico
  const handleClearPair = (index: number) => {
    const newPairs = [...pairs];
    newPairs[index] = { x: null, y: null };
    setPairs(newPairs);
  };

  const handleAplicar = () => {
    if (!isConnected) return alert("Conecte sua carteira para realizar a aplicação.");
    
    // Coletar números
    const allNumbers: number[] = [];
    pairs.forEach(p => {
        if(p.x !== null) allNumbers.push(p.x);
        if(p.y !== null) allNumbers.push(p.y);
    });

    if (allNumbers.length !== 10) return alert("Preencha os 5 prognósticos!");

    try {
      const valorEth = tier === 1 ? "0.00027" : "0.0459"; 
      
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "realizarAplicacao", 
        // CORREÇÃO DO ERRO DE TIPO TYPESCRIPT:
        args: [allNumbers as unknown as readonly [number, number, number, number, number, number, number, number, number, number]], 
        value: parseEther(valorEth),
      });
    } catch (error) {
      console.error("Erro ao enviar transação:", error);
    }
  };

  if (!mounted) return null;

  const countFilled = pairs.reduce((acc, p) => (p.x ? 1 : 0) + (p.y ? 1 : 0) + acc, 0);

  return (
    <main className={`min-h-screen ${THEME.bg} text-gray-200 font-sans selection:bg-[#cfb16d] selection:text-black`}>
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20 flex flex-col xl:flex-row gap-8 items-start justify-center">
        
        {/* COLUNA ESQUERDA: RESUMO DA APLICAÇÃO (Fixa no Desktop) */}
        <div className={`w-full xl:w-[350px] ${THEME.card} border ${THEME.border} rounded-2xl shadow-xl p-6 xl:sticky xl:top-32 order-1`}>
            
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                <Zap className="text-[#cfb16d]" size={20} /> Sua Adesão
            </h2>

            {/* Seletor de Tier */}
            <div className="flex bg-[#0b0c10] p-1 rounded-lg border border-[#2a2d35] mb-6">
                <button 
                    onClick={() => setTier(1)}
                    className={`flex-1 py-2 rounded text-xs font-bold transition-all ${tier === 1 ? "bg-[#cfb16d] text-black" : "text-gray-500 hover:text-white"}`}
                >
                    BÁSICO ($1)
                </button>
                <button 
                    onClick={() => setTier(2)}
                    className={`flex-1 py-2 rounded text-xs font-bold transition-all ${tier === 2 ? "bg-[#cfb16d] text-black" : "text-gray-500 hover:text-white"}`}
                >
                    PRO ($170)
                </button>
            </div>

            {/* Lista dos 5 Prognósticos Preenchidos */}
            <div className="space-y-3 mb-8">
                {pairs.map((pair, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#0b0c10] p-3 rounded-lg border border-[#2a2d35]">
                        <span className="text-[10px] uppercase text-gray-500 font-bold">{index + 1}º PRÊMIO</span>
                        
                        <div className="flex items-center gap-2">
                            {pair.x ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-[#cfb16d] font-mono font-bold text-lg">{pair.x} / {pair.y}</span>
                                    <button onClick={() => handleClearPair(index)} className="text-red-500/50 hover:text-red-500 transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ) : (
                                <span className="text-xs text-gray-700 italic">Vazio...</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Botão Confirmar */}
            <button
                disabled={isPending || isConfirming || countFilled !== 10}
                onClick={handleAplicar}
                className={`
                    w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all
                    ${countFilled !== 10 
                        ? "bg-[#1a1c22] text-gray-600 cursor-not-allowed border border-[#2a2d35]" 
                        : "bg-[#2a2d35] text-white border border-[#3e424b] hover:bg-[#cfb16d] hover:text-black hover:border-[#cfb16d] shadow-lg"}
                `}
            >
                {isPending ? "Confirmando..." : isConfirming ? "Processando..." : "CONFIRMAR"}
            </button>

        </div>

        {/* COLUNA DIREITA: MATRIZ DE 625 PROGNÓSTICOS */}
        <div className="flex-1 w-full max-w-5xl order-2">
            <div className={`${THEME.card} border ${THEME.border} rounded-2xl shadow-xl overflow-hidden`}>
                <div className="p-4 border-b border-[#2a2d35] bg-[#1a1c22] flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                        <Grid3X3 className="text-[#cfb16d]" size={18} />
                        <h3 className="text-sm font-bold text-white uppercase">Matriz de Prognósticos (625 Opções)</h3>
                    </div>
                    <span className="text-xs text-gray-500">Clique em um par para selecionar</span>
                </div>

                {/* Container com Scroll para a Matriz */}
                <div className="overflow-auto max-h-[600px] p-0 custom-scrollbar bg-[#0b0c10]">
                    <table className="w-full text-center border-collapse">
                        <thead className="bg-[#1a1c22] sticky top-0 z-10 shadow-md">
                            <tr>
                                <th className="p-3 text-[#cfb16d] border-b border-[#2a2d35] font-bold text-xs bg-[#1a1c22] border-r">X↓ / Y→</th>
                                {nums.map(y => (
                                    <th key={y} className="p-2 text-gray-400 border-b border-[#2a2d35] text-xs font-mono min-w-[50px] bg-[#1a1c22]">
                                        {y}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {nums.map(x => (
                                <tr key={x} className="hover:bg-[#1e2029] transition-colors">
                                    <td className="p-2 bg-[#13151a] border-r border-[#2a2d35] text-[#cfb16d] font-bold text-xs sticky left-0 z-10">
                                        {x}
                                    </td>
                                    {nums.map(y => (
                                        <td key={`${x}-${y}`} className="p-0 border border-[#1a1c22]">
                                            <button 
                                                onClick={() => handleMatrixClick(x, y)}
                                                className="w-full h-10 flex items-center justify-center text-[10px] font-mono text-gray-500 hover:text-black hover:bg-[#cfb16d] hover:font-bold transition-all focus:outline-none focus:bg-[#cfb16d]/50"
                                                title={`Prognóstico ${x} / ${y}`}
                                            >
                                                {x}/{y}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </div>

      {/* MODAL SUCESSO */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-[#13151a] border border-[#cfb16d] p-8 rounded-2xl max-w-sm w-full text-center relative">
                <div className="flex justify-center mb-4"><Check size={40} className="text-[#cfb16d]" /></div>
                <h2 className="text-2xl font-bold text-white mb-2">Aplicação Realizada!</h2>
                <p className="text-gray-400 mb-4 text-sm">Seus 5 prognósticos estão na Blockchain.</p>
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