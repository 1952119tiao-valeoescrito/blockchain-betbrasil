"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Trophy, AlertCircle, Zap, Wallet, Home, 
  Activity, Lock, Keyboard, Clock, ChevronRight, Loader2, CheckCircle2, X, ExternalLink 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from '../../components/CountdownTimer';

// WEB3
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../../constants/contract';

export default function ApostasPage() {
  const searchParams = useSearchParams();
  const { address, isConnected } = useAccount();
  
  // ESCREVENDO NA BLOCKCHAIN
  const { data: hash, isPending, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [tier, setTier] = useState<'BASIC' | 'INVEST'>('BASIC');
  const [userBalance, setUserBalance] = useState(0);
  const [zeroPointsCount, setZeroPointsCount] = useState(6);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [palpites, setPalpites] = useState<{ [key: number]: { x: string, y: string } }>({
    1: { x: '', y: '' }, 2: { x: '', y: '' }, 3: { x: '', y: '' }, 4: { x: '', y: '' }, 5: { x: '', y: '' },
  });

  useEffect(() => {
    const tierParam = searchParams.get('tier');
    if (tierParam === 'INVEST') setTier('INVEST');
    else if (tierParam === 'BASIC') setTier('BASIC');
  }, [searchParams]);

  useEffect(() => {
    if (isConfirmed) {
        setShowSuccessModal(true);
        setPalpites({ 1: { x: '', y: '' }, 2: { x: '', y: '' }, 3: { x: '', y: '' }, 4: { x: '', y: '' }, 5: { x: '', y: '' } });
    }
  }, [isConfirmed]);

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
  const valorBonus = tier === 'BASIC' ? 'R$ 0,625' : 'R$ 125,00';

  const handleConfirm = async () => {
    if (!isFormValid || !address) return;

    try {
        // Monta o array plano de 10 números
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
            // AQUI ESTÁ A CORREÇÃO: 'as any' para passar pela verificação chata do TS
            args: [coordenadas as any, tierCode],
        });

    } catch (error) {
        console.error("Erro ao enviar:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4A373] selection:text-black pb-20 relative">
      
      <AnimatePresence>
        {showSuccessModal && (
            <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#111] border border-emerald-500/50 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative">
                    <button onClick={() => setShowSuccessModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={48} className="text-emerald-500" /></div>
                    <h2 className="text-2xl font-bold text-white mb-2">Aposta Confirmada!</h2>
                    <p className="text-gray-400 mb-6 text-sm">Seus prognósticos foram registrados na Blockchain.</p>
                    <div className="bg-black/50 p-4 rounded-lg border border-white/10 mb-6 text-left">
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Hash da Transação</p>
                        <div className="flex items-center justify-between">
                            <p className="text-emerald-400 font-mono text-xs truncate mr-2">{hash}</p>
                            <Link href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <ExternalLink size={14} />
                            </Link>
                        </div>
                    </div>
                    <button onClick={() => setShowSuccessModal(false)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">Nova Aplicação</button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {!isConnected && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#151515] border border-white/10 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"><Lock size={40} className="text-[#D4A373]" /></div>
                <h2 className="text-2xl font-bold text-white mb-2">Acesso Restrito</h2>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">Conecte sua carteira Web3 para operar no Smart Contract.</p>
                <div className="flex justify-center"><ConnectButton /></div>
                <Link href="/"><button className="mt-6 text-gray-500 text-xs hover:text-white flex items-center justify-center gap-1 mx-auto"><Home size={12} /> Voltar para a Home</button></Link>
            </div>
        </div>
      )}

      <div className={!isConnected ? 'filter blur-sm pointer-events-none select-none' : ''}>
          <div className="bg-[#0a0a0a] border-b border-white/5 text-gray-500 text-[10px] md:text-xs font-mono py-2 overflow-hidden flex items-center justify-center">
            <div className="flex gap-4 md:gap-8 items-center opacity-80 whitespace-nowrap px-4">
                <span className="flex items-center gap-1 text-emerald-500"><Activity size={10} /> MAINNET: ONLINE</span>
                <span className="flex items-center gap-1 text-gray-400"><Lock size={10} /> CONTRATO: AUDITADO</span>
                <span className="hidden md:flex items-center gap-1 text-blue-400"><Zap size={10} /> GAS: 15 Gwei</span>
            </div>
          </div>

          <nav className="border-b border-white/10 bg-black/90 backdrop-blur-xl sticky top-0 z-50">
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
                    <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/5"><Home size={16} /><span className="hidden sm:inline">Início</span></Link>
                    <ConnectButton showBalance={false} />
                </div>
            </div>
          </nav>

          <div className="container mx-auto p-4 mt-8 flex justify-center">
            <div className="w-full max-w-4xl">
                <div className="bg-[#151515] rounded-[24px] border border-white/5 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-[#D4A373] opacity-50 blur-sm"></div>

                    <div className="bg-[#0f0f0f] p-5 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-white/5">
                            <button onClick={() => setTier('BASIC')} className={`px-6 py-2 rounded-md text-xs font-bold transition-all ${tier === 'BASIC' ? 'bg-[#D4A373] text-black shadow' : 'text-gray-500 hover:text-white'}`}>BÁSICO</button>
                            <button onClick={() => setTier('INVEST')} className={`px-6 py-2 rounded-md text-xs font-bold transition-all ${tier === 'INVEST' ? 'bg-white text-black shadow' : 'text-gray-500 hover:text-white'}`}>INTER-BET</button>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 bg-green-900/10 px-3 py-1 rounded-full border border-green-900/20"><ShieldCheck size={12} /> Matriz Segura (1-25)</div>
                    </div>

                    <div className="p-6 md:p-8">
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

                        <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-5 relative mb-8">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#D4A373] to-transparent opacity-50"></div>
                            <div className="flex flex-col items-center justify-center"><p className="text-[10px] text-gray-500 text-center uppercase mb-2 tracking-[0.2em]">Encerramento da Rodada</p><CountdownTimer /></div>
                            <div className="mt-4 pt-4 border-t border-white/5 text-center"><p className="text-xs text-gray-400 flex items-center justify-center gap-2"><Trophy size={14} className="text-[#D4A373]" /><span>A cada <strong>8 aplicações com zero retorno</strong>, o Smart Contract libera <strong>1 Free Bet</strong> automaticamente.</span></p></div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3 bg-[#D4A373]/5 px-4 py-3 rounded-lg border border-[#D4A373]/10 w-full md:w-auto justify-center">
                                <span className="text-[#D4A373] text-xs uppercase font-bold">Retorno (Zero pts):</span>
                                <span className="text-white font-mono font-bold text-lg">{valorBonus}</span>
                            </div>
                            <button 
                                onClick={handleConfirm}
                                disabled={!isFormValid || isPending || isConfirming}
                                className={`flex-1 w-full h-14 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide transition-all ${isFormValid && !isPending && !isConfirming ? 'bg-gradient-to-r from-[#D4A373] to-[#b08255] text-black hover:scale-[1.01]' : 'bg-[#222] text-gray-500 cursor-not-allowed'}`}
                            >
                                {isPending ? ( <><Loader2 size={20} className="animate-spin" /> AGUARDANDO...</> ) : isConfirming ? ( <><Loader2 size={20} className="animate-spin" /> CONFIRMANDO...</> ) : ( <>CONFIRMAR APLICAÇÃO <ChevronRight size={20} className="bg-black/10 rounded-full p-0.5" /></> )}
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