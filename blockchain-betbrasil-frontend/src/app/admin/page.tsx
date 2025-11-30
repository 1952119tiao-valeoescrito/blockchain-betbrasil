'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Settings, Key, Pause, Wallet, Loader2, Trophy, Lock } from 'lucide-react'
import { useAccount, useReadContract, useWriteContract, useBalance } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/constants/abi';

export default function PainelAdmin() {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending: isTxPending } = useWriteContract();
  
  // --- LEITURAS ---
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

  const { data: balanceData } = useBalance({
    address: CONTRACT_ADDRESS,
  });

  // --- ESTADOS ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [manualResults, setManualResults] = useState<string[]>(['', '', '', '', '']);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey !== 'ADMIN-B3-MASTER') {
        setErrorMsg('Chave incorreta.');
        setAccessKey('');
        alert('Chave incorreta');
        return;
    }
    setIsAuthenticated(true);
  }

  // --- AÇÕES ---
  const handleTogglePause = () => {
    writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: isPausedData ? 'unpause' : 'pause', 
    });
  };

  const handleCloseRound = () => {
    writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'fecharRodada',
    });
  };

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

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'definirResultado',
            args: [finalArray as any], 
        });

    } catch (err) {
        alert("Erro nos números. Verifique se são apenas dígitos.");
        console.error(err);
    }
  };

  const handleStartNext = () => {
     if(confirm("Tem certeza que deseja iniciar uma nova rodada?")) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'iniciarNovaRodada',
        });
     }
  }

  const handleWithdraw = () => {
    const amount = prompt("Quantidade em WEI para sacar (ex: 1000000000000000000 = 1 ETH):");
    if(amount) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'sacarFundos',
            args: [BigInt(amount)],
        });
    }
  };

  const updateResultValue = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newResults = [...manualResults];
    newResults[index] = value;
    setManualResults(newResults);
  };

  // --- TELA DE LOGIN ---
  if (!isAuthenticated) {
    return (
        // Aumentei aqui também: pt-32
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans pt-32">
             <div className="max-w-md w-full bg-[#111] border border-red-900/30 rounded-2xl p-8 text-center shadow-2xl shadow-red-900/10">
                <div className="w-20 h-20 mx-auto mb-6 bg-black rounded-xl border border-white/10 flex items-center justify-center">
                    <Lock className="text-red-500" size={32} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-4">Acesso Restrito</h1>
                <p className="text-gray-500 text-sm mb-6">Área exclusiva para administração do Smart Contract.</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                        type="password" 
                        value={accessKey} 
                        onChange={(e) => setAccessKey(e.target.value)} 
                        placeholder="Chave Mestra"
                        className="w-full bg-black border border-gray-800 rounded-lg py-3 px-4 text-white focus:border-red-500 outline-none transition-colors" 
                    />
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-transform active:scale-95">
                        Entrar no Painel
                    </button>
                    <div className="pt-2">
                        <Link href="/">
                            <span className="text-gray-500 text-xs hover:text-white cursor-pointer underline decoration-gray-700">Voltar ao site principal</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
  }

  // --- DASHBOARD ADMIN ---
  return (
    // MUDANÇA AQUI: pt-32 (celular) e md:pt-40 (desktop)
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans p-4 md:p-8 pt-32 md:pt-40">
      
      {isTxPending && (
          // Ajustei o loading para não ficar escondido
          <div className="fixed top-24 right-4 bg-blue-600 text-white px-6 py-4 rounded-xl z-[60] shadow-2xl flex items-center gap-3 animate-bounce shadow-blue-500/20">
              <Loader2 className="animate-spin" size={24} />
              <div className="flex flex-col">
                  <span className="font-bold text-sm">Transação Enviada</span>
                  <span className="text-xs opacity-80">Aguardando confirmação...</span>
              </div>
          </div>
      )}

      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#111] p-4 rounded-xl border border-white/10 gap-4">
          <div className="flex items-center gap-3">
             <Image src="/images/logo.png" alt="Logo" width={48} height={48} className="rounded-lg shadow-lg" />
             <div>
                <h1 className="text-xl font-bold text-white tracking-tight">ADMINISTRATIVO <span className="text-emerald-500">B3</span></h1>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <p className="text-[10px] text-gray-400 font-mono">
                        {CONTRACT_ADDRESS ? `${CONTRACT_ADDRESS.slice(0,6)}...${CONTRACT_ADDRESS.slice(-4)}` : "CONTRATO NÃO DETECTADO"}
                    </p>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                  <p className="text-xs text-gray-500">Carteira Conectada</p>
                  <p className="text-xs font-mono text-emerald-400">{address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Desconectado'}</p>
              </div>
              <button onClick={() => setIsAuthenticated(false)} className="bg-red-900/20 text-red-400 px-4 py-2 rounded text-sm hover:bg-red-900/40 border border-red-900/30 transition-colors">
                  Sair
              </button>
          </div>
      </header>

      {/* STATUS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] p-4 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                <p className="text-xs text-gray-500 font-bold mb-1">SALDO DO CONTRATO</p>
                <p className="text-2xl font-bold text-emerald-400 truncate">
                    {balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(4) : '0.00'} <span className="text-sm text-gray-500">ETH</span>
                </p>
            </div>
             <div className="bg-[#111] p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                <p className="text-xs text-gray-500 font-bold mb-1">RODADA ATUAL</p>
                <p className="text-2xl font-bold text-purple-400">#{roundIdData ? roundIdData.toString() : '...'}</p>
            </div>
             <div className="bg-[#111] p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                <p className="text-xs text-gray-500 font-bold mb-1">STATUS DO SISTEMA</p>
                <div className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-bold ${Boolean(isPausedData) ? 'bg-red-900/30 text-red-500' : 'bg-green-900/30 text-green-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${Boolean(isPausedData) ? 'bg-red-500' : 'bg-green-500'}`}></span>
                    {Boolean(isPausedData) ? "PAUSADO" : "OPERANDO"}
                </div>
            </div>
            <div className="bg-[#111] p-4 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors">
                 <p className="text-xs text-gray-500 font-bold mb-1">ADMINISTRADOR</p>
                 <p className="text-sm text-gray-300 font-mono truncate">{address ? "Conectado" : "Desconectado"}</p>
            </div>
      </div>

      {/* CONTROLES PRINCIPAIS */}
      <div className="grid lg:grid-cols-3 gap-8">
            {/* PAINEL DA RODADA (ESQUERDA) */}
            <div className="lg:col-span-2 bg-[#111] border border-emerald-500/20 rounded-2xl p-6 relative shadow-lg shadow-emerald-900/5">
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <Trophy size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Gerenciar Sorteio</h2>
                        <p className="text-xs text-gray-500">Siga os passos na ordem para finalizar a rodada.</p>
                    </div>
                </div>

                {/* PASSO 1 */}
                <div className="mb-6 p-5 bg-black/40 rounded-xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-sm text-yellow-500 font-bold flex items-center gap-2">
                            <span className="bg-yellow-500/20 px-2 py-0.5 rounded text-xs">PASSO 1</span>
                            FECHAR APOSTAS
                        </p>
                        <Lock size={16} className="text-gray-600 group-hover:text-yellow-500 transition-colors"/>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Impede novas apostas para iniciar a apuração.</p>
                    <button onClick={handleCloseRound} disabled={isTxPending} className="bg-yellow-600 hover:bg-yellow-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors w-full sm:w-auto justify-center">
                        FECHAR RODADA AGORA
                    </button>
                </div>

                {/* PASSO 2 */}
                <div className="mb-6 p-5 bg-black/40 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-sm text-emerald-500 font-bold flex items-center gap-2">
                             <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-xs">PASSO 2</span>
                             INSERIR RESULTADOS
                        </p>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Digite os 5 milhares da Loteria Federal (ex: 5432).</p>
                    
                    <div className="grid grid-cols-5 gap-2 mb-4">
                        {manualResults.map((val, index) => (
                            <div key={index} className="flex flex-col gap-1">
                                <label className="text-[10px] text-gray-500 text-center">{index+1}º Prêmio</label>
                                <input 
                                    type="text" 
                                    placeholder="0000" 
                                    maxLength={4} 
                                    className="bg-black border border-gray-700 rounded-lg p-2 text-center text-white font-mono focus:border-emerald-500 outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
                                    value={val} 
                                    onChange={(e) => updateResultValue(index, e.target.value)} 
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleDefineResult} disabled={isTxPending} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg flex justify-center items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.99]">
                        {isTxPending ? <Loader2 className="animate-spin" /> : <Trophy size={18} />} 
                        PROCESSAR PREMIAÇÃO NA BLOCKCHAIN
                    </button>
                </div>

                 {/* PASSO 3 */}
                 <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                    <div>
                         <p className="text-sm text-blue-400 font-bold mb-1">PASSO 3: Próximo Ciclo</p>
                         <p className="text-xs text-gray-500">Zera a rodada e libera novas apostas.</p>
                    </div>
                    <button onClick={handleStartNext} disabled={isTxPending} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-900/20 transition-transform active:scale-95">
                        INICIAR NOVA RODADA
                    </button>
                </div>
            </div>

            {/* PAINEL DO SISTEMA (DIREITA) */}
            <div className="space-y-4">
                <div className="bg-[#111] p-6 rounded-2xl border border-white/5 h-full">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Settings className="text-gray-400" size={20} /> 
                        Controles do Sistema
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Emergência</p>
                            <button onClick={handleTogglePause} disabled={isTxPending} className={`w-full py-3 rounded-lg text-xs font-bold flex justify-between px-4 border transition-all ${Boolean(isPausedData) ? 'bg-green-600 border-green-500 text-white hover:bg-green-500' : 'bg-red-900/20 border-red-900/50 text-red-400 hover:bg-red-900/40'}`}>
                                <span>{Boolean(isPausedData) ? "DESPAUSAR SISTEMA" : "PAUSAR TUDO (EMERGÊNCIA)"}</span>
                                <Pause size={14} />
                            </button>
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Financeiro</p>
                            <button onClick={handleWithdraw} disabled={isTxPending} className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg text-xs font-bold flex justify-between px-4 border border-white/5 transition-colors">
                                <span>SACAR TAXAS ACUMULADAS</span>
                                <Wallet size={14} className="text-emerald-500"/>
                            </button>
                             <p className="text-[10px] text-gray-600 mt-2 text-center">Envia todo o saldo de taxas para o Admin.</p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}