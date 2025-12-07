'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Activity, Lock, Unlock, Trophy, Settings, Key, Pause, Wallet, Loader2, AlertTriangle, PlayCircle, CheckCircle, XCircle } from 'lucide-react'
import { useAccount, useReadContract, useWriteContract, useBalance, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/constants/abi'

// Tipagem correta para o retorno da struct Rodada
type RodadaData = [
  bigint,             // id
  boolean,            // aberta
  boolean,            // finalizada
  bigint,             // totalBasic
  bigint,             // totalInvest
  readonly number[],  // resultado
  bigint              // timestamp
];

export default function PainelAdmin() {
  const { address, isConnected } = useAccount();
  
  // -- CONTROLE DE TRANSAÇÃO --
  // Guardamos o hash da transação para monitorar a mineração
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const { 
    writeContract, 
    isPending: isWalletLoading, // Carregando carteira (assinatura)
    isError: isWalletError, 
    error: walletError,
    reset: resetWrite 
  } = useWriteContract();

  // Monitora a confirmação do bloco (Mineração)
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({ 
    hash: txHash, 
  });

  // Estado geral de carregamento (Carteira OU Mineração)
  const isProcessing = isWalletLoading || isConfirming;

  // -- ESTADOS LOCAIS --
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const [manualResults, setManualResults] = useState({
    p1: '', p2: '', p3: '', p4: '', p5: ''
  });

  // -- LEITURAS DO CONTRATO --
  const { data: isPausedData, refetch: refetchPause } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'paused',
  });

  const { data: roundIdData, refetch: refetchRoundId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'rodadaAtualId',
  });

  const { data: rawRodadaData, refetch: refetchRodada } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'rodadas',
    args: [roundIdData ? roundIdData : BigInt(1)],
    query: {
        enabled: !!roundIdData, 
    }
  });
  
  const rodadaData = rawRodadaData as RodadaData | undefined;

  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address: CONTRACT_ADDRESS,
  });

  // -- EFEITO DE ATUALIZAÇÃO E LIMPEZA --
  useEffect(() => {
    if (isConfirmed) {
        // Se confirmou na blockchain, atualiza os dados
        refetchPause();
        refetchRoundId();
        refetchRodada();
        refetchBalance();
        
        // Limpa o hash para permitir novas transações limpas
        const timer = setTimeout(() => {
            setTxHash(undefined);
            resetWrite();
        }, 3000);
        return () => clearTimeout(timer);
    }
    
    // Se deu erro na carteira (rejeitou), reseta imediatamente
    if (isWalletError) {
        const timer = setTimeout(() => {
            resetWrite();
            setTxHash(undefined);
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, [isConfirmed, isWalletError, refetchPause, refetchRoundId, refetchRodada, refetchBalance, resetWrite]);


  // -- HANDLERS --

  // Função genérica para chamar o contrato e capturar o hash
  const executeContractAction = (functionName: string, args: any[] = []) => {
    resetWrite(); 
    writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: functionName as any, // Já tínhamos arrumado aqui
        args: args as any,                 // <--- ADICIONE O 'as any' AQUI TAMBÉM
    }, {
        onSuccess: (hash) => {
            setTxHash(hash); 
        },
        onError: (error) => {
            console.error("Erro na transação:", error);
        }
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === 'ADMIN-B3-MASTER') { // Cuidado: validação client-side não é segura para produção real
        setIsAuthenticated(true);
        setErrorMsg('');
    } else {
        setErrorMsg('Chave de acesso inválida.');
        setAccessKey('');
    }
  };

  const handleTogglePause = () => {
    executeContractAction(isPausedData ? 'unpause' : 'pause');
  };

  const handleCloseRound = () => {
    if(!confirm("CONFIRMAR FECHAMENTO DE RODADA?\n\nIsso impedirá novas apostas.")) return;
    executeContractAction('fecharRodada');
  };

  const handleStartNext = () => {
     if(!confirm("INICIAR NOVA RODADA?\n\nCertifique-se de que a rodada anterior já foi apurada.")) return;
     executeContractAction('iniciarNovaRodada');
  };

  const handleWithdraw = () => {
    const amount = prompt("Quantidade em WEI para sacar:");
    if(amount) {
        try {
            executeContractAction('sacarFundos', [BigInt(amount)]);
        } catch (e) {
            alert("Valor inválido");
        }
    }
  };
  
  const handleWithdrawAll = () => {
    if(!confirm("SACAR TODO O SALDO?")) return;
    executeContractAction('sacarTudo');
  };

  const handleDefineResult = () => {
    const { p1, p2, p3, p4, p5 } = manualResults;
    if(!p1 || !p2 || !p3 || !p4 || !p5) {
        alert("Preencha todos os 5 prêmios.");
        return;
    }

    const processPrize = (numStr: string) => {
        const cleanStr = numStr.replace(/\D/g,'');
        if(!cleanStr) throw new Error("Número vazio");
        const milharNum = parseInt(cleanStr);
        if(isNaN(milharNum)) throw new Error("Número inválido");
        
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
        
        // Validação final de tamanho
        if (finalArray.length !== 10) {
            alert("Erro na geração do array: Tamanho incorreto.");
            return;
        }

        const msg = `Confirma Resultado:\n[${finalArray.join(', ')}]\n\nGravar na Blockchain?`;

        if(confirm(msg)) {
            // TypeScript trick: Força o tipo para coincidir com a ABI (uint8[10])
            executeContractAction('definirResultado', [finalArray]);
        }

    } catch (err) {
        alert("Erro ao processar números. Verifique se digitou apenas números.");
        console.error(err);
    }
  };

  // -- RENDER: LOGIN --
  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans">
             <div className="max-w-md w-full bg-[#0f0f0f] border border-white/5 rounded-2xl shadow-2xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-800 to-red-600"></div>
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center border border-red-500/20 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                        <Lock className="text-red-500" size={32} />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white mb-1 text-center">Admin Access</h1>
                <p className="text-gray-500 text-sm mb-8 text-center">Blockchain Bet Brasil</p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Key size={16} className="absolute left-3 top-3.5 text-gray-500" />
                        <input type="password" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} placeholder="Access Key"
                            className="w-full bg-black border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all placeholder:text-gray-700" />
                    </div>
                    {errorMsg && <div className="text-red-400 text-xs bg-red-950/30 p-3 rounded border border-red-900/50 flex items-center gap-2"><AlertTriangle size={14}/>{errorMsg}</div>}
                    <button type="submit" className="w-full bg-red-700 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-red-900/20">Entrar</button>
                    <div className="text-center mt-4"><Link href="/" className="text-gray-600 text-xs hover:text-white transition-colors">← Voltar</Link></div>
                </form>
            </div>
        </div>
    );
  }

  // Dados da Rodada
  const isRodadaAberta = rodadaData ? rodadaData[1] : false;
  const isRodadaFinalizada = rodadaData ? rodadaData[2] : false;
  const totalArrecadado = rodadaData ? (rodadaData[3] + rodadaData[4]) : BigInt(0);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans pb-20">
      
      {/* LOADING OVERLAY: Só aparece se estiver processando E não tiver erro */}
      {isProcessing && !isWalletError && (
          <div className="fixed top-6 right-6 bg-blue-950 text-blue-100 px-6 py-4 rounded-xl z-[60] flex items-center gap-4 shadow-2xl border border-blue-500/30 animate-in slide-in-from-top-5">
              <Loader2 className="animate-spin text-blue-400" size={24} />
              <div>
                  <p className="text-sm font-bold">
                    {isWalletLoading ? "Aguardando assinatura..." : "Confirmando Bloco..."}
                  </p>
                  <p className="text-xs opacity-70">
                    {isWalletLoading ? "Verifique sua carteira." : "A transação foi enviada."}
                  </p>
              </div>
          </div>
      )}

      {/* ERROR OVERLAY */}
      {isWalletError && (
          <div className="fixed top-6 right-6 bg-red-950 text-red-100 px-6 py-4 rounded-xl z-[60] flex items-center gap-4 shadow-2xl border border-red-500/30 animate-in slide-in-from-top-5">
              <XCircle className="text-red-400" size={24} />
              <div>
                  <p className="text-sm font-bold">Erro na Transação</p>
                  <p className="text-xs opacity-70">Operação cancelada ou falhou.</p>
              </div>
          </div>
      )}

      <header className="w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-purple-900 to-black rounded-lg flex items-center justify-center border border-white/10">
                <Settings className="text-purple-400" size={20} />
             </div>
             <div>
                <h1 className="text-lg font-bold text-white leading-tight">Admin Console</h1>
                <p className="text-[10px] text-gray-500 font-mono tracking-wider">MANAGER</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#111] rounded-full border border-white/5">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-400 font-mono">{isConnected ? address?.slice(0,6) + '...' + address?.slice(-4) : 'Off'}</span>
             </div>
             <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-white text-xs font-bold px-2 py-1">SAIR</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 space-y-8">
        
        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2"><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Saldo</p><Wallet size={14} className="text-emerald-500" /></div>
                <p className="text-2xl font-bold text-white font-mono">{balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(4) : '0.00'} <span className="text-sm text-gray-600">ETH</span></p>
            </div>
            <div className="bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2"><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Rodada ID</p><Activity size={14} className="text-purple-500" /></div>
                <p className="text-2xl font-bold text-white font-mono">#{roundIdData ? roundIdData.toString() : '-'}</p>
            </div>
            <div className="bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2"><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Estado</p>{isRodadaAberta ? <Unlock size={14} className="text-blue-500" /> : <Lock size={14} className="text-orange-500" />}</div>
                <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${isRodadaAberta ? 'bg-blue-500 animate-pulse' : 'bg-orange-500'}`}></div><p className="text-xl font-bold text-white">{isRodadaAberta ? "ABERTA" : (isRodadaFinalizada ? "FINALIZADA" : "FECHADA")}</p></div>
            </div>
            <div className="bg-[#111] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2"><p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Arrecadado</p><Trophy size={14} className="text-yellow-500" /></div>
                <p className="text-2xl font-bold text-white font-mono">{parseFloat(formatEther(totalArrecadado)).toFixed(4)} <span className="text-sm text-gray-600">ETH</span></p>
            </div>
        </div>

        {/* ACTIONS */}
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                
                <div className={`rounded-2xl p-6 border transition-all ${isRodadaAberta ? 'bg-[#111] border-orange-500/30 shadow-lg shadow-orange-900/10' : 'bg-black border-white/5 opacity-50'}`}>
                    <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-sm">1</div><h2 className="text-lg font-bold text-white">Fechar Rodada</h2></div>
                    <button onClick={handleCloseRound} disabled={!isRodadaAberta || isProcessing} className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">{isProcessing ? <Loader2 className="animate-spin" /> : <Lock size={18} />} FECHAR AGORA</button>
                </div>

                <div className={`rounded-2xl p-6 border transition-all ${(!isRodadaAberta && !isRodadaFinalizada) ? 'bg-[#111] border-emerald-500/30 shadow-lg shadow-emerald-900/10' : 'bg-black border-white/5 opacity-50'}`}>
                    <div className="flex justify-between items-start mb-6"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-sm">2</div><h2 className="text-lg font-bold text-white">Lançar Resultado</h2></div><span className="text-[10px] bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded border border-emerald-900/50">AUTO-CONVERSÃO</span></div>
                    <div className="grid grid-cols-5 gap-3 mb-6">{[1, 2, 3, 4, 5].map((i) => (<div key={i} className="flex flex-col gap-1"><label className="text-[10px] text-gray-500 text-center font-bold">LOT {i}</label><input type="text" placeholder="00000" maxLength={5} disabled={isRodadaAberta || isRodadaFinalizada} className="w-full bg-black border border-gray-800 rounded-lg p-3 text-center text-emerald-400 font-mono focus:border-emerald-500 outline-none transition-colors disabled:opacity-50" value={manualResults[`p${i}` as keyof typeof manualResults]} onChange={(e) => setManualResults({...manualResults, [`p${i}`]: e.target.value})} /></div>))}</div>
                    <button onClick={handleDefineResult} disabled={isRodadaAberta || isRodadaFinalizada || isProcessing} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">{isProcessing ? <Loader2 className="animate-spin" /> : <CheckCircle size={18} />} PROCESSAR & GRAVAR</button>
                </div>

                <div className={`rounded-2xl p-6 border transition-all ${isRodadaFinalizada ? 'bg-[#111] border-blue-500/30 shadow-lg shadow-blue-900/10' : 'bg-black border-white/5 opacity-50'}`}>
                     <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-sm">3</div><h2 className="text-lg font-bold text-white">Iniciar Nova Rodada</h2></div>
                     <button onClick={handleStartNext} disabled={!isRodadaFinalizada || isProcessing} className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">{isProcessing ? <Loader2 className="animate-spin" /> : <PlayCircle size={18} />} INICIAR RODADA #{(roundIdData ? Number(roundIdData) + 1 : 0)}</button>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-[#111] rounded-2xl p-6 border border-red-900/20">
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-4 flex items-center gap-2"><AlertTriangle size={14} /> Zona de Perigo</h3>
                    <div className="space-y-3">
                        <button onClick={handleTogglePause} disabled={isProcessing} className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white py-3 px-4 rounded-lg text-xs font-bold flex justify-between items-center transition-colors"><span>{Boolean(isPausedData) ? "RETOMAR" : "PAUSAR (PANIC)"}</span><Pause size={14} className={Boolean(isPausedData) ? "text-green-500" : "text-red-500"} /></button>
                        <button onClick={handleWithdraw} disabled={isProcessing} className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white py-3 px-4 rounded-lg text-xs font-bold flex justify-between items-center transition-colors"><span>SACAR (PARCIAL)</span><Wallet size={14} className="text-gray-400" /></button>
                        <button onClick={handleWithdrawAll} disabled={isProcessing} className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white py-3 px-4 rounded-lg text-xs font-bold flex justify-between items-center transition-colors"><span>SACAR TUDO</span><Wallet size={14} className="text-red-400" /></button>
                         <button onClick={() => window.open(`https://basescan.org/address/${CONTRACT_ADDRESS}`, '_blank')} className="w-full bg-transparent hover:bg-white/5 border border-white/5 text-gray-500 py-3 px-4 rounded-lg text-xs flex justify-center items-center gap-2 transition-colors mt-8">Ver no Explorer ↗</button>
                    </div>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}