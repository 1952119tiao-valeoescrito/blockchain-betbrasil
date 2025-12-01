'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Activity, Users, DollarSign, Gift, Settings, Lock, Key, Pause, RefreshCw, Wallet, Loader2, Trophy, AlertTriangle, Clock } from 'lucide-react'
import { useAccount, useReadContract, useWriteContract, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/constants/abi';

export default function PainelAdmin() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending: isTxPending } = useWriteContract();
  
  const { data: contractOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  });

  const { data: isPausedData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'paused',
  });

  const { data: roundIdData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'rodadaAtualId',
  });

  const { data: rodadaData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'rodadas',
    args: [roundIdData ? roundIdData : BigInt(1)],
  });

  const { data: balanceData } = useBalance({
    address: CONTRACT_ADDRESS,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [manualResults, setManualResults] = useState({
    p1: '', p2: '', p3: '', p4: '', p5: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey !== 'ADMIN-B3-MASTER') {
        setErrorMsg('Chave de acesso incorreta.');
        setAccessKey('');
        return;
    }
    setIsAuthenticated(true);
  }

  const handleTogglePause = () => {
    writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: isPausedData ? 'unpause' : 'pause',
    });
  };

  const handleCloseRound = () => {
    if(confirm("FECHAR RODADA (MAINNET)? Isso bloqueará novas apostas.")) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'fecharRodada',
        });
    }
  };

  const handleWithdraw = () => {
    const amount = prompt("Quantidade em Wei para sacar:");
    if(amount) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'sacarFundos',
            args: [BigInt(amount)],
        });
    }
  };

  const handleStartNext = () => {
     if(confirm("INICIAR NOVA RODADA (MAINNET)?")) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'iniciarNovaRodada',
        });
     }
  }

  const handleDefineResult = () => {
    const { p1, p2, p3, p4, p5 } = manualResults;
    if(!p1 || !p2 || !p3 || !p4 || !p5) {
        alert("Preencha todos os campos!");
        return;
    }

    const processPrize = (numStr: string) => {
        const milharNum = parseInt(numStr);
        let d1 = Math.floor(milharNum / 100) % 100; if(d1===0) d1=100;
        let d2 = milharNum % 100; if(d2===0) d2=100;
        const g1 = Math.floor((d1 - 1) / 4) + 1;
        const g2 = Math.floor((d2 - 1) / 4) + 1;
        return [g1, g2];
    };

    try {
        const r1 = processPrize(p1);
        const r2 = processPrize(p2);
        const r3 = processPrize(p3);
        const r4 = processPrize(p4);
        const r5 = processPrize(p5);
        const finalArray = [...r1, ...r2, ...r3, ...r4, ...r5];

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'definirResultado',
            args: [finalArray as any],
        });

    } catch (err) {
        alert("Erro ao processar.");
        console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans">
             <div className="max-w-md w-full bg-[#111] border border-red-900/30 rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
                <div className="w-20 h-20 mx-auto mb-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <Image src="/images/logo.png" alt="Logo Admin" width={80} height={80} className="object-cover" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-1">Painel Admin (MASTER)</h1>
                <p className="text-gray-500 text-sm mb-4">Acesso Exclusivo Owner</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Key size={16} className="absolute left-3 top-3.5 text-gray-500" />
                        <input type="password" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} placeholder="Chave Mestra"
                            className="w-full bg-black border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" />
                    </div>
                    {errorMsg && <div className="text-red-400 text-xs bg-red-900/10 p-2 rounded border border-red-900/20">{errorMsg}</div>}
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg">Acessar Painel</button>
                    <Link href="/"><button type="button" className="mt-4 text-gray-600 text-xs hover:text-white">← Voltar</button></Link>
                </form>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans">
      {isTxPending && (
          <div className="fixed top-4 right-4 bg-blue-900/90 text-white px-4 py-3 rounded-lg z-[60] flex items-center gap-3 shadow-xl border border-blue-500/50 backdrop-blur">
              <Loader2 className="animate-spin" size={20} />
              <div>
                  <p className="text-sm font-bold">Processando (Mainnet)...</p>
                  <p className="text-xs opacity-80">Aguarde confirmação na Blockchain.</p>
              </div>
          </div>
      )}

      <header className="w-full bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
             <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg border border-emerald-500/30">
                <Image src="/images/logo.png" alt="B3 Admin Logo" width={40} height={40} className="object-cover" />
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-none">PAINEL ADMIN</span>
                <span className="text-[10px] text-emerald-500 font-mono">Modo: MANUAL (JUIZ)</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#111] rounded border border-white/10">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-400 font-mono">{isConnected ? `Owner: ${address?.slice(0,6)}...` : 'Desconectado'}</span>
             </div>
             <button onClick={() => setIsAuthenticated(false)} className="bg-red-900/20 text-red-400 px-3 py-1 rounded text-xs border border-red-900/30">Logout</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] p-4 rounded-xl border border-emerald-500/20">
                <p className="text-xs text-gray-500 font-bold uppercase">Saldo Contrato</p>
                <p className="text-2xl font-bold text-white">{balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(4) : '0.00'} ETH</p>
            </div>
             <div className="bg-[#111] p-4 rounded-xl border border-purple-500/20">
                <p className="text-xs text-gray-500 font-bold uppercase">Rodada Atual</p>
                <p className="text-2xl font-bold text-purple-400">#{roundIdData ? roundIdData.toString() : '-'}</p>
            </div>
             <div className="bg-[#111] p-4 rounded-xl border border-blue-500/20">
                <p className="text-xs text-gray-500 font-bold uppercase">Estado</p>
                <p className={`text-xl font-bold ${rodadaData && (rodadaData as any)[1] ? 'text-green-400' : 'text-orange-400'}`}>
                    {rodadaData && (rodadaData as any)[1] ? "ABERTA" : "FECHADA"}
                </p>
            </div>
             <div className="bg-[#111] p-4 rounded-xl border border-blue-500/20">
                <p className="text-xs text-gray-500 font-bold uppercase">Ambiente</p>
                <p className="text-xl font-bold text-blue-400">MAINNET (BASE)</p>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#111] rounded-2xl p-6 border border-orange-500/30 shadow-xl">
                     <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Clock className="text-orange-500" size={20} />
                        1. Fechamento (Sexta 17:30)
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">Bloqueia novas apostas.</p>
                    <button onClick={handleCloseRound} disabled={isTxPending} className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg w-full flex items-center justify-center gap-2">
                        <Lock size={18} /> FECHAR RODADA
                    </button>
                </div>

                <div className="bg-[#111] rounded-2xl p-6 border border-emerald-500/30 shadow-xl relative overflow-hidden">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Trophy className="text-emerald-500" size={20} />
                        2. Apuração (Sábado 19:10)
                    </h2>
                    <div className="bg-emerald-900/20 border border-emerald-700/30 p-4 rounded-lg mb-6">
                         <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i}>
                                    <label className="text-[10px] text-gray-500 font-bold mb-1 block uppercase">{i}º Prêmio</label>
                                    <input type="text" placeholder="0000" maxLength={4} className="w-full bg-black border border-gray-700 rounded p-2 text-center text-white font-mono focus:border-emerald-500 outline-none" value={manualResults[`p${i}` as keyof typeof manualResults]} onChange={(e) => setManualResults({...manualResults, [`p${i}`]: e.target.value})} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleDefineResult} disabled={isTxPending || !isConnected} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg shadow-lg disabled:opacity-50 flex justify-center items-center gap-2">
                        {isTxPending ? <Loader2 className="animate-spin" /> : <Trophy size={18} />}
                        REGISTRAR RESULTADO (MAINNET)
                    </button>
                </div>

                 <div className="bg-[#111] rounded-2xl p-6 border border-blue-500/30 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                         <RefreshCw className="text-blue-500" size={18} />
                         3. Reabertura (Sábado 21:00)
                    </h2>
                    <button onClick={handleStartNext} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg text-sm font-bold">
                        INICIAR NOVA RODADA
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Settings size={18} className="text-gray-400" /> Emergência
                    </h2>
                    <div className="space-y-4">
                         <button onClick={handleTogglePause} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg text-xs font-bold flex justify-between px-4 transition-colors">
                            <span>{Boolean(isPausedData) ? "Retomar" : "PAUSAR TUDO"}</span>
                            <Pause size={14} className={Boolean(isPausedData) ? "text-green-500" : "text-red-500"} />
                        </button>
                        <button onClick={handleWithdraw} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg text-xs font-bold flex justify-between px-4 transition-colors">
                            <span>Sacar Taxas</span>
                            <Wallet size={14} className="text-gray-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}