"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import Navbar from "../../components/Navbar";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants/abi";
import { Trophy, Search, Loader2, Coins, CheckCircle, AlertTriangle, Wallet } from "lucide-react";
import { formatEther } from "viem";

const THEME = {
  bg: "bg-[#0b0c10]",
  card: "bg-[#13151a]",
  gold: "text-[#cfb16d]",
  border: "border-[#2a2d35]",
  buttonVerify: "bg-[#1a1c22] hover:bg-[#cfb16d] hover:text-black border border-[#2a2d35] transition-all",
  buttonClaim: "bg-green-600 hover:bg-green-500 text-white font-bold shadow-[0_0_15px_rgba(34,197,94,0.4)]",
};

export default function ResultadosPage() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [rodadaIdInput, setRodadaIdInput] = useState<number>(1); 

  const { data: currentId } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "rodadaAtualId",
  });

  const { data: rodadaData, refetch: refetchRodada } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "rodadas",
    args: [BigInt(rodadaIdInput)],
  });

  const { data: userBetsData, refetch: refetchBets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getAplicacoesUsuario",
    args: [BigInt(rodadaIdInput), address as `0x${string}`],
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    setMounted(true);
    if (currentId) {
        const id = Number(currentId);
        setRodadaIdInput(id > 1 ? id - 1 : 1);
    }
  }, [currentId]);

  useEffect(() => {
    if (isSuccess) {
      refetchBets();
      refetchRodada();
    }
  }, [isSuccess]);

  const handleVerificar = (indexApp: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "verificarAplicacao",
      args: [BigInt(rodadaIdInput), indexApp],
    });
  };

  const handleSacar = (indexApp: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: "sacarRendimento",
      args: [BigInt(rodadaIdInput), indexApp],
    });
  };

  if (!mounted) return null;

  const minhasApostas = userBetsData ? (userBetsData as any)[0] : [];
  const meusIndices = userBetsData ? (userBetsData as any)[1] : [];

  // Mapeamento da Nova Struct (Dual Pool)
  // 0:id, 1:aberta, 2:sorteada, 3:finalizada, 4:resultado, 5:requestId, 6:inicio, 7:sorteio time, 
  // 8:totalBasic, 9:boloBasic, ... 12:totalPro, 13:boloPro...
  const isSorteada = rodadaData ? (rodadaData as any)[2] : false; 
  const isFinalizada = rodadaData ? (rodadaData as any)[3] : false; 
  const resultadoRaw = rodadaData ? (rodadaData as any)[4] : []; // Ajustado o índice
  
  // Potes Separados
  const totalBasic = rodadaData ? (rodadaData as any)[8] : BigInt(0);
  const totalPro = rodadaData ? (rodadaData as any)[12] : BigInt(0);

  return (
    <main className={`min-h-screen ${THEME.bg} text-gray-200 font-sans selection:bg-[#cfb16d] selection:text-black`}>
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        
        <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#cfb16d] mb-6 uppercase tracking-widest">
                Central de Resultados
            </h1>
            <div className={`flex items-center bg-[#1a1c22] p-2 rounded-xl border ${THEME.border}`}>
                <span className="pl-4 text-gray-500 text-sm font-bold uppercase mr-3">Consultar Rodada #</span>
                <input 
                    type="number" 
                    min="1"
                    value={rodadaIdInput}
                    onChange={(e) => setRodadaIdInput(parseInt(e.target.value))}
                    className="bg-transparent text-white font-bold text-xl w-20 outline-none text-center border-b border-gray-600 focus:border-[#cfb16d]"
                />
                <button 
                    onClick={() => { refetchRodada(); refetchBets(); }}
                    className="ml-2 p-2 bg-[#0b0c10] rounded-lg text-[#cfb16d] hover:text-white border border-[#2a2d35] transition-colors"
                >
                    <Search size={20} />
                </button>
            </div>
        </div>

        {/* --- EXIBIÇÃO DOS POTES (NOVO) --- */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            <div className="bg-[#13151a] p-4 rounded-xl border border-blue-900/50 flex flex-col items-center">
                <span className="text-xs text-blue-400 font-bold uppercase mb-1">Pote Básico</span>
                <span className="text-xl text-white font-mono">{formatEther(totalBasic)} ETH</span>
            </div>
            <div className="bg-[#13151a] p-4 rounded-xl border border-purple-900/50 flex flex-col items-center">
                <span className="text-xs text-purple-400 font-bold uppercase mb-1">Pote Pro</span>
                <span className="text-xl text-white font-mono">{formatEther(totalPro)} ETH</span>
            </div>
        </div>

        {/* --- RESULTADO OFICIAL --- */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
            {isSorteada && resultadoRaw.length > 0 ? (
                <div className="animate-fade-in">
                    <div className="flex justify-center items-center gap-2 mb-6">
                        <Trophy className="text-[#cfb16d]" />
                        <h2 className="text-xl font-bold text-white uppercase tracking-wide">Prognósticos Sorteados</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="bg-[#13151a] p-4 rounded-xl border border-[#cfb16d]/50 shadow-[0_0_15px_rgba(207,177,109,0.1)] flex flex-col items-center">
                                <span className="text-[10px] text-gray-500 font-bold uppercase mb-1">{i + 1}º Prêmio</span>
                                <div className="text-2xl font-black text-[#cfb16d] font-mono">
                                    {Number(resultadoRaw[i*2])} / {Number(resultadoRaw[i*2+1])}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="p-10 bg-[#13151a] rounded-xl border border-dashed border-[#2a2d35] flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a1c22] flex items-center justify-center animate-pulse">
                        <Loader2 className="text-gray-500" />
                    </div>
                    <p className="text-gray-400">Aguardando fechamento da rodada e sorteio Chainlink.</p>
                </div>
            )}
        </div>

        {/* --- MINHAS APLICAÇÕES --- */}
        <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide border-l-4 border-[#cfb16d] pl-4 flex items-center justify-between">
                <span>Suas Aplicações</span>
                {isConnected && <span className="text-xs text-gray-500 bg-[#13151a] px-2 py-1 rounded">Total: {minhasApostas.length}</span>}
            </h3>

            {!isConnected ? (
                <div className="text-center py-12 bg-[#13151a] rounded-xl border border-[#2a2d35]"><p className="text-gray-400">Conecte sua carteira.</p></div>
            ) : minhasApostas.length === 0 ? (
                <div className="text-center py-12 bg-[#13151a] rounded-xl border border-[#2a2d35] opacity-60"><p className="text-gray-500">Nenhuma aplicação nesta rodada.</p></div>
            ) : (
                <div className="space-y-4">
                    {minhasApostas.map((aposta: any, idx: number) => {
                        const realIndex = meusIndices[idx];
                        const pontos = Number(aposta.pontos);
                        const verificado = aposta.verificado;
                        const pago = aposta.pago;
                        const isPro = aposta.isPro; // Identifica se é PRO

                        const jogo = [];
                        for(let k=0; k<5; k++) jogo.push(`${aposta.prognosticos[k*2]}/${aposta.prognosticos[k*2+1]}`);

                        return (
                            <div key={idx} className={`bg-[#13151a] p-6 rounded-xl border flex flex-col md:flex-row items-center justify-between gap-6 transition-colors ${isPro ? 'border-purple-900/40 hover:border-purple-500' : 'border-[#2a2d35] hover:border-blue-500'}`}>
                                
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row gap-2 mb-3 items-center md:items-start">
                                        <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider ${isPro ? 'bg-purple-900/20 text-purple-400' : 'bg-blue-900/20 text-blue-400'}`}>
                                            {isPro ? 'INTER-BET PRO' : 'BÁSICO'}
                                        </span>
                                        <span className="text-[10px] bg-[#2a2d35] text-gray-300 px-2 py-1 rounded uppercase font-bold">#{idx + 1}</span>
                                        {verificado && (
                                            <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold ${pontos > 0 ? "bg-green-900/30 text-green-400" : "bg-red-900/20 text-red-500"}`}>
                                                {pontos} Pontos
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-400 font-mono flex flex-wrap gap-2 justify-center md:justify-start">
                                        {jogo.map((par, pIdx) => (
                                            <span key={pIdx} className="bg-[#0b0c10] px-2 py-1 rounded border border-[#2a2d35] text-xs">{par}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="min-w-[200px] flex justify-center md:justify-end">
                                    {!isSorteada && (
                                        <button disabled className="px-5 py-3 rounded-lg bg-[#0b0c10] text-gray-600 border border-[#2a2d35] text-xs font-bold uppercase cursor-not-allowed">Aguardando Sorteio</button>
                                    )}

                                    {isSorteada && !verificado && (
                                        <button 
                                            onClick={() => handleVerificar(realIndex)}
                                            disabled={isPending || isConfirming}
                                            className={`px-6 py-3 rounded-lg text-xs font-bold uppercase flex items-center gap-2 ${THEME.buttonVerify}`}
                                        >
                                            {isPending ? <Loader2 className="animate-spin" size={14} /> : <Search size={14} />} Verificar
                                        </button>
                                    )}

                                    {verificado && pontos > 0 && !isFinalizada && (
                                        <button disabled className="px-5 py-3 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 text-xs font-bold uppercase flex items-center gap-2 cursor-wait">
                                            <Loader2 className="animate-spin" size={14} /> Apuração
                                        </button>
                                    )}

                                    {verificado && pontos > 0 && isFinalizada && !pago && (
                                        <button 
                                            onClick={() => handleSacar(realIndex)}
                                            disabled={isPending || isConfirming}
                                            className={`px-6 py-3 rounded-lg text-sm uppercase flex items-center gap-2 transition-transform hover:scale-105 ${THEME.buttonClaim}`}
                                        >
                                            <Coins size={16} /> SACAR
                                        </button>
                                    )}

                                    {pago && (
                                        <button disabled className="px-6 py-3 rounded-lg bg-[#0b0c10] text-green-500 border border-green-500/30 text-xs font-bold uppercase flex items-center gap-2"><CheckCircle size={16} /> Pago</button>
                                    )}

                                    {verificado && pontos === 0 && (
                                        <button disabled className="px-6 py-3 rounded-lg bg-[#0b0c10] text-gray-600 border border-[#2a2d35] text-xs font-bold uppercase cursor-not-allowed">Não Premiado</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

      </div>
    </main>
  );
}