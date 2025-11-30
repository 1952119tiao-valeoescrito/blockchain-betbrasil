"use client";

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Trophy, Zap, Home, Activity, Lock, ChevronRight, 
  Loader2, CheckCircle2, X, ExternalLink, Calculator, DollarSign 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from '../../components/CountdownTimer';

// WEB3
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther, formatUnits } from 'viem'; 
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/constants/abi';

// Componente Simulador
import ResultSimulator from '../../components/ResultSimulator'; 

// --- CONFIGURAÇÃO CHAINLINK (BASE MAINNET) ---
// Contrato Oficial ETH/USD na rede Base
// Documentação: https://docs.chain.link/data-feeds/price-feeds/addresses?network=base
const CHAINLINK_FEED_ADDRESS = "0x71041dddad3595F745215C5809381D1338eF9256";

// ABI Mínima para ler o preço (GAS FREE - Leitura)
const CHAINLINK_ABI = [{
  inputs: [],
  name: "latestRoundData",
  outputs: [
    { name: "roundId", type: "uint80" },
    { name: "answer", type: "int256" }, // O Preço vem aqui
    { name: "startedAt", type: "uint256" },
    { name: "updatedAt", type: "uint256" },
    { name: "answeredInRound", type: "uint80" }
  ],
  stateMutability: "view",
  type: "function"
}] as const;

function ApostasContent() {
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount();
  
  // Hooks de Escrita (Aposta) - ISSO GASTA GÁS (Pagamento do Usuário)
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Hook de Leitura (Chainlink) - ISSO NÃO GASTA GÁS (Grátis)
  const { data: priceData, isLoading: isLoadingPrice } = useReadContract({
    address: CHAINLINK_FEED_ADDRESS,
    abi: CHAINLINK_ABI,
    functionName: 'latestRoundData',
    query: {
        refetchInterval: 60000 // Atualiza a cotação a cada 1 minuto na tela
    }
  });

  const [tier, setTier] = useState<'BASIC' | 'INVEST'>('BASIC');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [palpites, setPalpites] = useState<{ [key: number]: { x: string, y: string } }>({
    1: { x: '', y: '' }, 2: { x: '', y: '' }, 3: { x: '', y: '' }, 4: { x: '', y: '' }, 5: { x: '', y: '' },
  });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const tierParam = searchParams.get('tier');
    if (tierParam === 'INVEST') setTier('INVEST');
    else setTier('BASIC');
  }, [searchParams]);

  useEffect(() => {
    if (isConfirmed) {
        setShowSuccessModal(true);
        // Limpa os campos após sucesso
        setPalpites({ 1: { x: '', y: '' }, 2: { x: '', y: '' }, 3: { x: '', y: '' }, 4: { x: '', y: '' }, 5: { x: '', y: '' } });
    }
  }, [isConfirmed]);

  const blockchainData = null;

  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  const handleChange = (premio: number, campo: 'x' | 'y', valor: string) => {
    const numero = valor.replace(/[^0-9]/g, '');
    if (numero === '') {
        setPalpites(prev => ({ ...prev, [premio]: { ...prev[premio], [campo]: '' } }));
        return;
    }
    const valInt = parseInt(numero);
    if (valInt >= 1 && valInt <= 25) {
        setPalpites(prev => ({ ...prev, [premio]: { ...prev[premio], [campo]: valInt.toString() } }));
    }
  };

  const isFormValid = Object.values(palpites).every(p => p.x !== '' && p.y !== '');

  // --- CÁLCULO FINANCEIRO AUTOMÁTICO ---
  
  // 1. Definimos o preço fixo em DÓLAR
  const USD_PRICE_BASIC = 1.00;    // $1.00
  const USD_PRICE_INVEST = 170.00; // $170.00

  // 2. Pegamos o preço do ETH atual da Chainlink (Ex: 3500.00)
  // A Chainlink retorna com 8 casas decimais, por isso o formatUnits(..., 8)
  const ethPriceUSD = priceData ? Number(formatUnits(priceData[1], 8)) : 0;
  
  // 3. Calculamos quanto ETH é necessário para bater o valor em Dólar
  // UseMemo evita recálculos desnecessários
  const custoEmEth = useMemo(() => {
    if (!ethPriceUSD || ethPriceUSD === 0) return "0";
    
    const targetUSD = tier === 'BASIC' ? USD_PRICE_BASIC : USD_PRICE_INVEST;
    
    // Matemática: Valor em Dólar / Preço do ETH
    // Ex: $1.00 / $3500.00 = 0.00028571 ETH
    const rawEth = targetUSD / ethPriceUSD;
    
    // Retorna string com 7 casas decimais para precisão no envio
    return rawEth.toFixed(7);
  }, [tier, ethPriceUSD]);

  const valorBonusEstimado = tier === 'BASIC' ? '125x (Retorno)' : '125x (Retorno)';

  const handleConfirm = async () => {
    if (!isFormValid || !address || custoEmEth === "0") return;

    try {
        const coordenadas = [
            parseInt(palpites[1].x), parseInt(palpites[1].y),
            parseInt(palpites[2].x), parseInt(palpites[2].y),
            parseInt(palpites[3].x), parseInt(palpites[3].y),
            parseInt(palpites[4].x), parseInt(palpites[4].y),
            parseInt(palpites[5].x), parseInt(palpites[5].y)
        ];

        const tierCode = tier === 'BASIC' ? 1 : 2;

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'realizarAplicacao',
            args: [coordenadas as any, tierCode],
            // Envia o valor exato em ETH calculado pela cotação atual
            value: parseEther(custoEmEth), 
        });

    } catch (error) {
        console.error("Erro na transação:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4A373] selection:text-black pb-20 relative">
      
      <AnimatePresence>
        {/* MODAL DE SUCESSO */}
        {showSuccessModal && (
            <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#111] border border-emerald-500/50 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative">
                    <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={48} className="text-emerald-500" /></div>
                    <h2 className="text-2xl font-bold text-white mb-2">Aposta Confirmada!</h2>
                    <p className="text-gray-400 mb-6 text-sm">Sua aplicação foi registrada na Base Mainnet.</p>
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10 mb-6 text-left">
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Hash da Transação</p>
                        <div className="flex items-center justify-between">
                            <p className="text-emerald-400 font-mono text-xs truncate mr-2">{hash}</p>
                            <a href={`https://basescan.org/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                    <button onClick={() => setShowSuccessModal(false)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">Nova Aplicação</button>
                </motion.div>
            </div>
        )}

        {/* MODAL SIMULADOR */}
        {showSimulator && (
            <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-[#151515] border border-cyan-500/30 rounded-2xl w-full max-w-3xl relative shadow-2xl my-auto"
                >
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <h3 className="text-lg font-bold text-cyan-500 flex items-center gap-2">
                           <Calculator size={20} /> Simulador de Resultados
                        </h3>
                        <button onClick={() => setShowSimulator(false)} className="text-gray-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-2 md:p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
                         <ResultSimulator blockchainData={blockchainData} />
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* TELA DE BLOQUEIO (Carteira Desconectada) */}
      {!isConnected && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#151515] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"><Lock size={40} className="text-[#D4A373]" /></div>
                <h2 className="text-2xl font-bold text-white mb-2">Conectar Carteira</h2>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">Conecte-se à rede Base para realizar suas aplicações.</p>
                <div className="flex justify-center"><ConnectButton /></div>
                <Link href="/"><button className="mt-6 text-gray-500 text-xs hover:text-white flex items-center justify-center gap-1 mx-auto"><Home size={12} /> Voltar</button></Link>
            </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL (Filtro Blur se desconectado) */}
      <div className={!isConnected ? 'filter blur-sm pointer-events-none select-none' : ''}>
          
          {/* BARRA DE STATUS (Com Cotação Automática) */}
          <div className="bg-[#0a0a0a] border-b border-white/5 text-gray-500 text-[10px] md:text-xs font-mono py-2 overflow-hidden flex items-center justify-center">
            <div className="flex gap-4 md:gap-8 items-center opacity-80 whitespace-nowrap px-4">
                <span className="flex items-center gap-1 text-emerald-500"><Activity size={10} /> BASE MAINNET</span>
                
                {/* MOSTRADOR DE PREÇO (GRÁTIS) */}
                <span className="flex items-center gap-1 text-[#D4A373]">
                    <DollarSign size={10} /> 
                    ETH/USD: {isLoadingPrice ? <Loader2 size={8} className="animate-spin"/> : `$${ethPriceUSD.toFixed(2)}`}
                </span>
                
                <span className="hidden md:flex items-center gap-1 text-blue-400"><Zap size={10} /> LIVE</span>
            </div>
          </div>

          <nav className="border-b border-white/10 bg-black/90 backdrop-blur-xl sticky top-16 z-40 mt-6">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="hover:scale-105 transition-transform">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg border border-white/10">
                            <Image src="/images/logo.png" alt="B3 Logo" width={40} height={40} className="object-cover" />
                        </div>
                    </Link>
                    <div className="hidden md:block"><h1 className="text-xl font-bold tracking-tighter leading-none text-white">BBB <span className="text-[#D4A373]">APP</span></h1><p className="text-[10px] text-gray-500 tracking-widest uppercase">Módulo Web3</p></div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">
                    <button onClick={() => setShowSimulator(true)} className="flex items-center gap-2 text-sm text-cyan-500 hover:text-cyan-400 hover:bg-cyan-950/30 transition px-3 py-2 rounded-lg border border-cyan-500/20">
                        <Calculator size={16} /> <span className="hidden sm:inline">Simulador</span>
                    </button>
                    <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/5"><Home size={16} /><span className="hidden sm:inline">Início</span></Link>
                    <ConnectButton showBalance={false} />
                </div>
            </div>
          </nav>

          <div className="container mx-auto p-4 mt-20 md:mt-28 flex justify-center">
            <div className="w-full max-w-4xl">
                <div className="bg-[#151515] rounded-[24px] border border-white/5 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-[#D4A373] opacity-50 blur-sm"></div>

                    <div className="bg-[#0f0f0f] p-5 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-white/5">
                            {/* BOTÕES DE TIER (Mostram o valor em USD fixo e a conversão em ETH) */}
                            <button onClick={() => setTier('BASIC')} className={`px-6 py-2 rounded-md text-xs font-bold transition-all flex flex-col items-center ${tier === 'BASIC' ? 'bg-[#D4A373] text-black shadow' : 'text-gray-500 hover:text-white'}`}>
                                <span>BÁSICO ($1.00)</span>
                                <span className="text-[9px] opacity-80 mt-1">
                                    ≈ {isLoadingPrice ? "..." : (1.00 / ethPriceUSD).toFixed(5)} ETH
                                </span>
                            </button>
                            <button onClick={() => setTier('INVEST')} className={`px-6 py-2 rounded-md text-xs font-bold transition-all flex flex-col items-center ${tier === 'INVEST' ? 'bg-white text-black shadow' : 'text-gray-500 hover:text-white'}`}>
                                <span>INTER-BET ($170.00)</span>
                                <span className="text-[9px] opacity-80 mt-1">
                                    ≈ {isLoadingPrice ? "..." : (170.00 / ethPriceUSD).toFixed(4)} ETH
                                </span>
                            </button>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 bg-green-900/10 px-3 py-1 rounded-full border border-green-900/20"><ShieldCheck size={12} /> Matriz Segura (1-25)</div>
                    </div>

                    <div className="p-6 md:p-8">
                        {/* GRID DE INPUTS */}
                        <div className="mb-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {[1, 2, 3, 4, 5].map((premio) => (
                                    <div key={premio} className="bg-[#0a0a0a] p-3 pb-4 rounded-xl border border-white/5 hover:border-[#D4A373]/30 transition-colors group flex flex-col items-center justify-center relative shadow-inner">
                                        <span className="absolute -top-2.5 bg-[#151515] px-2 text-[9px] text-gray-500 font-bold uppercase border border-white/5 rounded-full group-hover:text-[#D4A373] transition-colors">{premio}º Prêmio</span>
                                        <div className="flex items-center gap-1 mt-1">
                                            <input type="text" inputMode="numeric" value={palpites[premio].x} onChange={(e) => handleChange(premio, 'x', e.target.value)} maxLength={2} className="w-10 h-10 bg-[#1a1a1a] border border-white/10 rounded text-center font-mono text-lg text-white focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] focus:outline-none" placeholder="X" />
                                            <span className="text-gray-700 font-thin text-xl">/</span>
                                            <input type="text" inputMode="numeric" value={palpites[premio].y} onChange={(e) => handleChange(premio, 'y', e.target.value)} maxLength={2} className="w-10 h-10 bg-[#1a1a1a] border border-white/10 rounded text-center font-mono text-lg text-white focus:border-[#D4A373] focus:ring-1 focus:ring-[#D4A373] focus:outline-none" placeholder="Y" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* INFO RODADA */}
                        <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-5 relative mb-8">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A373] to-transparent opacity-50"></div>
                                <div className="flex flex-col items-center justify-center"><p className="text-[10px] text-gray-500 text-center uppercase mb-2 tracking-[0.2em]">Encerramento da Rodada</p><CountdownTimer /></div>
                        </div>

                        {/* BOTÃO CONFIRMAR (Mostra valor exato em ETH) */}
                        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3 bg-[#D4A373]/5 px-4 py-3 rounded-lg border border-[#D4A373]/10 w-full md:w-auto justify-center">
                                <span className="text-[#D4A373] text-xs uppercase font-bold">Retorno Estimado:</span>
                                <span className="text-white font-mono font-bold text-lg">{valorBonusEstimado}</span>
                            </div>
                            <button 
                                onClick={handleConfirm}
                                disabled={!isFormValid || isPending || isConfirming || isLoadingPrice}
                                className={`flex-1 w-full h-14 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide transition-all ${isFormValid && !isPending && !isConfirming ? 'bg-gradient-to-r from-[#D4A373] to-[#b08255] text-black hover:scale-[1.01]' : 'bg-[#222] text-gray-500 cursor-not-allowed'}`}
                            >
                                {isPending ? ( <><Loader2 size={20} className="animate-spin" /> ENVIANDO...</> ) : isConfirming ? ( <><Loader2 size={20} className="animate-spin" /> VALIDANDO...</> ) : ( <>CONFIRMAR (~{custoEmEth} ETH) <ChevronRight size={20} className="bg-black/10 rounded-full p-0.5" /></> )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </main>
  );
}

export default function ApostasPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center"><Loader2 className="animate-spin text-[#D4A373]" size={40} /></div>}>
        <ApostasContent />
    </Suspense>
  );
}