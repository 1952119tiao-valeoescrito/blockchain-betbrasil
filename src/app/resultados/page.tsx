"use client";

import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import Navbar from "../../components/Navbar";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../constants/abi";
import { Trophy, Search, Loader2, Coins, CheckCircle, AlertTriangle } from "lucide-react";
import { formatEther } from "viem";

// --- TEMA PRETO & DOURADO ---
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

  // 1. Pega ID da Rodada Atual
  const { data: currentId } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "rodadaAtualId",
  });

  // 2. Dados da Rodada
  const { data: rodadaData, refetch: refetchRodada } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "rodadas",
    args: [BigInt(rodadaIdInput)],
  });

  // 3. Apostas do Usuário
  const { data: userBetsData, refetch: refetchBets } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: "getAplicacoesUsuario",
    args: [BigInt(rodadaIdInput), address as `0x${string}`],
  });

  // Escrita (Check-In e Saque)
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    setMounted(true);
    if (currentId) {
        // Tenta mostrar a rodada anterior (que provavelmente acabou), senão mostra a 1
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

  // AÇÕES DO USUÁRIO
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

  // Processamento de Dados
  // O contrato retorna: [ListaDeStructs, ListaDeIndicesReais]
  const minhasApostas = userBetsData ? (userBetsData as any)[0] : [];
  const meusIndices = userBetsData ? (userBetsData as any)[1] : [];

  // Dados da Rodada (Mapeamento da Struct)
  const isSorteada = rodadaData ? (rodadaData as any)[2] : false; 
  const isFinalizada = rodadaData ? (rodadaData as any)[3] : false; // Cascata calculada?
  const resultadoRaw = rodadaData ? (rodadaData as any)[6] : []; 
  const totalArrecadado = rodadaData ? (rodadaData as any)[4] : BigInt(0);

  return (
    <main className={`min-h-screen ${THEME.bg} text-gray-200 font-sans selection:bg-[#cfb16d] selection:text-black`}>
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        
        {/* SELETOR DE RODADA */}
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
                    
                    <div className="mt-4 text-xs text-gray-500">
                        Total no Pote: <span className="text-[#cfb16d]">{formatEther(totalArrecadado)} ETH</span>
                    </div>
                </div>
            ) : (
                <div className="p-10 bg-[#13151a] rounded-xl border border-dashed border-[#2a2d35] flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a1c22] flex items-center justify-center animate-pulse">
                        <Loader2 className="text-gray-500" />
                    </div>
                    <p className="text-gray-400">Aguardando auditoria da Chainlink para esta rodada...</p>
                </div>
            )}
        </div>

        {/* --- LISTA DE APLICAÇÕES DO USUÁRIO --- */}
        <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide border-l-4 border-[#cfb16d] pl-4 flex items-center justify-between">
                <span>Suas Aplicações (Rodada {rodadaIdInput})</span>
                {isConnected && <span className="text-xs text-gray-500 normal-case bg-[#13151a] px-2 py-1 rounded">Total: {minhasApostas.length}</span>}
            </h3>

            {!isConnected ? (
                <div className="text-center py-12 bg-[#13151a] rounded-xl border border-[#2a2d35]">
                    <p className="text-gray-400">Conecte sua carteira para verificar seus resultados.</p>
                </div>
            ) : minhasApostas.length === 0 ? (
                <div className="text-center py-12 bg-[#13151a] rounded-xl border border-[#2a2d35] opacity-60">
                    <p className="text-gray-500">Nenhuma aplicação encontrada nesta rodada.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {minhasApostas.map((aposta: any, idx: number) => {
                        const realIndex = meusIndices[idx]; // Índice para o contrato
                        const pontos = Number(aposta.pontos);
                        const verificado = aposta.verificado;
                        const pago = aposta.pago;
                        
                        // Parse dos números jogados
                        const jogo = [];
                        for(let k=0; k<5; k++) {
                            jogo.push(`${aposta.prognosticos[k*2]}/${aposta.prognosticos[k*2+1]}`);
                        }

                        return (
                            <div key={idx} className="bg-[#13151a] p-6 rounded-xl border border-[#2a2d35] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#cfb16d]/30 transition-colors">
                                
                                {/* Resumo da Aposta */}
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row gap-2 mb-3 items-center md:items-start">
                                        <span className="text-[10px] bg-[#2a2d35] text-gray-300 px-2 py-1 rounded uppercase font-bold tracking-wider">
                                            Ticket #{idx + 1}
                                        </span>
                                        {verificado && (
                                            <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold ${pontos > 0 ? "bg-green-900/30 text-green-400 border border-green-500/30" : "bg-red-900/20 text-red-500 border border-red-500/20"}`}>
                                                {pontos} Pontos (Faixa {pontos > 0 ? 6 - pontos : '-'})
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-400 font-mono flex flex-wrap gap-2 justify-center md:justify-start">
                                        {jogo.map((par, pIdx) => (
                                            <span key={pIdx} className="bg-[#0b0c10] px-2 py-1 rounded border border-[#2a2d35] text-xs">
                                                {par}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* ÁREA DE AÇÃO (Fluxo do Gás Otimizado) */}
                                <div className="min-w-[200px] flex justify-center md:justify-end">
                                    
                                    {/* 1. AGUARDANDO SORTEIO */}
                                    {!isSorteada && (
                                        <button disabled className="px-5 py-3 rounded-lg bg-[#0b0c10] text-gray-600 border border-[#2a2d35] text-xs font-bold uppercase cursor-not-allowed">
                                            Aguardando Sorteio
                                        </button>
                                    )}

                                    {/* 2. FAZER CHECK-IN (Verificar se ganhou) */}
                                    {isSorteada && !verificado && (
                                        <button 
                                            onClick={() => handleVerificar(realIndex)}
                                            disabled={isPending || isConfirming}
                                            className={`px-6 py-3 rounded-lg text-xs font-bold uppercase flex items-center gap-2 ${THEME.buttonVerify}`}
                                        >
                                            {isPending ? <Loader2 className="animate-spin" size={14} /> : <Search size={14} />}
                                            Verificar Resultado
                                        </button>
                                    )}

                                    {/* 3. VERIFICADO E GANHOU -> ESPERANDO CASCATA */}
                                    {verificado && pontos > 0 && !isFinalizada && (
                                        <div className="flex flex-col items-end">
                                            <button disabled className="px-5 py-3 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 text-xs font-bold uppercase flex items-center gap-2 cursor-wait">
                                                <Loader2 className="animate-spin" size={14} />
                                                Aguardando Apuração
                                            </button>
                                            <span className="text-[10px] text-gray-600 mt-1">Cálculo da Cascata em andamento</span>
                                        </div>
                                    )}

                                    {/* 4. VERIFICADO, GANHOU E APURADO -> SACAR! */}
                                    {verificado && pontos > 0 && isFinalizada && !pago && (
                                        <button 
                                            onClick={() => handleSacar(realIndex)}
                                            disabled={isPending || isConfirming}
                                            className={`px-6 py-3 rounded-lg text-sm uppercase flex items-center gap-2 transition-transform hover:scale-105 ${THEME.buttonClaim}`}
                                        >
                                            <Coins size={16} /> REIVINDICAR PRÊMIO
                                        </button>
                                    )}

                                    {/* 5. JÁ PAGO */}
                                    {pago && (
                                        <button disabled className="px-6 py-3 rounded-lg bg-[#0b0c10] text-green-500 border border-green-500/30 text-xs font-bold uppercase flex items-center gap-2">
                                            <CheckCircle size={16} /> Pago na Carteira
                                        </button>
                                    )}

                                    {/* 6. NÃO GANHOU */}
                                    {verificado && pontos === 0 && (
                                        <button disabled className="px-6 py-3 rounded-lg bg-[#0b0c10] text-gray-600 border border-[#2a2d35] text-xs font-bold uppercase cursor-not-allowed">
                                            Não Premiado
                                        </button>
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