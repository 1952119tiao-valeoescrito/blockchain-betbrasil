'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Settings, Key, Pause, Wallet, Loader2, Trophy, AlertTriangle, Lock } from 'lucide-react'
import { useAccount, useReadContract, useWriteContract, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/constants/abi';

export default function PainelAdmin() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending: isTxPending } = useWriteContract();
  
  // --- LEITURAS (AGORA EM PORTUGUÊS) ---
  const { data: isPausedData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'paused',
  });

  const { data: roundIdData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'rodadaAtualId', // <--- AGORA VAI LER CERTO!
  });

  const { data: balanceData } = useBalance({
    address: CONTRACT_ADDRESS,
  });

  // ESTADOS
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [manualResults, setManualResults] = useState<string[]>(['', '', '', '', '']);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey !== 'ADMIN-B3-MASTER') {
        setErrorMsg('Chave incorreta.');
        setAccessKey('');
        return;
    }
    setIsAuthenticated(true);
  }

  // --- AÇÕES DO CONTRATO ---
  
  const handleTogglePause = () => {
    writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: isPausedData ? 'unpause' : 'pause', 
    });
  };

  // 1. PRIMEIRO PASSO: FECHAR A RODADA
  const handleCloseRound = () => {
    writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'fecharRodada',
    });
  };

  // 2. SEGUNDO PASSO: DEFINIR RESULTADO
  const handleDefineResult = () => {
    if(manualResults.some(val => val.trim() === '')) {
        alert("Preencha todos os 5 prêmios!");
        return;
    }

    const processPrize = (numStr: string) => {
        const milharNum = parseInt(numStr);
        if (isNaN(milharNum)) throw new Error("Número inválido");
        let d1 = Math.floor(milharNum / 100) % 100; if(d1===0) d1=100;
        let d2 = milharNum % 100; if(d2===0) d2=100;
        const g1 = Math.floor((d1 - 1) / 4) + 1;
        const g2 = Math.floor((d2 - 1) / 4) + 1;
        return [g1, g2];
    };

    try {
        const finalArray: number[] = [];
        manualResults.forEach(res => {
            const [g1, g2] = processPrize(res);
            finalArray.push(g1, g2);
        });

        console.log("Enviando (definirResultado):", finalArray);

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'definirResultado', // EM PORTUGUÊS
            args: [finalArray],
        });

    } catch (err) {
        alert("Erro nos números.");
        console.error(err);
    }
  };

  // 3. TERCEIRO PASSO: NOVA RODADA
  const handleStartNext = () => {
     if(confirm("Iniciar nova rodada?")) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'iniciarNovaRodada', // EM PORTUGUÊS
        });
     }
  }

  const handleWithdraw = () => {
    const amount = prompt("Wei para sacar (ex: 1000000000000000000 = 1 ETH):");
    if(amount) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'sacarFundos', // EM PORTUGUÊS
            args: [BigInt(amount)],
        });
    }
  };

  const updateResultValue = (index: number, value: string) => {
    const newResults = [...manualResults];
    newResults[index] = value;
    setManualResults(newResults);
  };

  // --- LOGIN ---
  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans">
             <div className="max-w-md w-full bg-[#111] border border-red-900/30 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-black rounded-xl border border-white/10 flex items-center justify-center">
                    <Lock className="text-red-500" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-4">Acesso Restrito</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input type="password" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} placeholder="Chave Mestra"
                        className="w-full bg-black border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-red-500 outline-none" />
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg">Entrar</button>
                    <Link href="/"><span className="text-gray-500 text-xs hover:text-white cursor-pointer">Voltar ao site</span></Link>
                </form>
            </div>
        </div>
    )
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans p-4 md:p-8">
      {isTxPending && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-4 rounded-xl z-[60] shadow-2xl flex items-center gap-3 animate-bounce">
              <Loader2 className="animate-spin" size={24} />
              <span className="font-bold">Processando na Blockchain...</span>
          </div>
      )}

      <header className="flex justify-between items-center mb-8 bg-[#111] p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
             <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="rounded" />
             <div>
                <h1 className="text-xl font-bold text-white">ADMIN B3</h1>
                <p className="text-[10px] text-emerald-500 font-mono">CONTRATO: {CONTRACT_ADDRESS.slice(0,6)}...{CONTRACT_ADDRESS.slice(-4)}</p>
             </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="bg-red-900/20 text-red-400 px-4 py-2 rounded text-sm hover:bg-red-900/40">Sair</button>
      </header>

      {/* STATUS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 font-bold">SALDO</p>
                <p className="text-2xl font-bold text-emerald-400">{balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(4) : '0.00'} ETH</p>
            </div>
             <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 font-bold">RODADA ATUAL</p>
                <p className="text-2xl font-bold text-purple-400">#{roundIdData ? roundIdData.toString() : '...'}</p>
            </div>
             <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                <p className="text-xs text-gray-500 font-bold">STATUS</p>
                <p className={`text-xl font-bold ${Boolean(isPausedData) ? 'text-red-500' : 'text-green-500'}`}>{Boolean(isPausedData) ? "PAUSADO" : "ATIVO"}</p>
            </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
            {/* PAINEL DE SORTEIO */}
            <div className="lg:col-span-2 bg-[#111] border border-emerald-500/20 rounded-2xl p-6 relative">
                <div className="flex items-center gap-2 mb-6 text-emerald-400">
                    <Trophy size={24} />
                    <h2 className="text-xl font-bold">Gerenciar Rodada</h2>
                </div>

                {/* PASSO 1 */}
                <div className="mb-6 p-4 bg-black/50 rounded-xl border border-white/5">
                    <p className="text-sm text-gray-400 mb-2 font-bold">PASSO 1: Fechar Apostas</p>
                    <p className="text-xs text-gray-500 mb-3">Bloqueia novas entradas para permitir o sorteio.</p>
                    <button onClick={handleCloseRound} className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2">
                        <Lock size={14} /> FECHAR RODADA
                    </button>
                </div>

                {/* PASSO 2 */}
                <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2 font-bold">PASSO 2: Inserir Milhares (Loteria Federal)</p>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                        {manualResults.map((val, index) => (
                            <input key={index} type="text" placeholder={`${index+1}º`} maxLength={4} 
                                className="bg-black border border-gray-700 rounded p-2 text-center text-white focus:border-emerald-500"
                                value={val} onChange={(e) => updateResultValue(index, e.target.value)} />
                        ))}
                    </div>
                    <button onClick={handleDefineResult} disabled={isTxPending} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg flex justify-center gap-2">
                        {isTxPending ? <Loader2 className="animate-spin" /> : <Trophy size={18} />} DEFINIR RESULTADO
                    </button>
                </div>

                {/* PASSO 3 */}
                 <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-2 font-bold">PASSO 3: Próximo Ciclo</p>
                    <button onClick={handleStartNext} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold text-sm">
                        INICIAR NOVA RODADA
                    </button>
                </div>
            </div>

            {/* CONTROLES EXTRAS */}
            <div className="space-y-4">
                <div className="bg-[#111] p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-4 flex gap-2"><Settings /> Sistema</h3>
                    <button onClick={handleTogglePause} className="w-full mb-3 bg-slate-800 text-white py-3 rounded-lg text-xs font-bold flex justify-between px-4">
                        <span>{Boolean(isPausedData) ? "DESPAUSAR" : "PAUSAR TUDO"}</span>
                        <Pause size={14} />
                    </button>
                    <button onClick={handleWithdraw} className="w-full bg-slate-800 text-white py-3 rounded-lg text-xs font-bold flex justify-between px-4">
                        <span>SACAR TAXAS</span>
                        <Wallet size={14} />
                    </button>
                </div>
            </div>
      </div>
    </div>
  )
}