'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Activity, Users, DollarSign, Gift, Database, Settings, Lock, Key, ShieldAlert, Pause, RefreshCw, Wallet, Loader2 } from 'lucide-react'

// --- WEB3 IMPORTS ---
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi'
import { formatEther, parseEther } from 'viem'

// --- ABI PARCIAL (Exemplo - Substitua pela ABI completa do seu contrato) ---
const CONTRACT_ABI = [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_treasury",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "valor",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contagemAtual",
          "type": "uint256"
        }
      ],
      "name": "BonusZeroConcedido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "tier",
          "type": "uint8"
        }
      ],
      "name": "FreeBetGanho",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "tier",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "usouFreeBet",
          "type": "bool"
        }
      ],
      "name": "NovaAposta",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "faixa",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "valorTotal",
          "type": "uint256"
        }
      ],
      "name": "PremioDistribuido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint8[10]",
          "name": "resultado",
          "type": "uint8[10]"
        }
      ],
      "name": "ResultadoDefinido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalArrecadado",
          "type": "uint256"
        }
      ],
      "name": "RodadaFechada",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "BONUS_ZERO_BASIC",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "BONUS_ZERO_INVEST",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "META_FREE_BET",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRECO_BASIC",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRECO_INVEST",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "apostasDaRodada",
      "outputs": [
        {
          "internalType": "address",
          "name": "apostador",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "tier",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "processada",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "pontos",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[10]",
          "name": "_resultado",
          "type": "uint8[10]"
        }
      ],
      "name": "definirResultado",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fecharRodada",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "iniciarNovaRodada",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_inicio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fim",
          "type": "uint256"
        }
      ],
      "name": "processarResultadosBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[10]",
          "name": "_coords",
          "type": "uint8[10]"
        },
        {
          "internalType": "uint8",
          "name": "_tier",
          "type": "uint8"
        }
      ],
      "name": "realizarAplicacao",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rodadaAtualId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "rodadas",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "aberta",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "finalizada",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "totalArrecadadoBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalArrecadadoInvest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestampInicio",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sacarFundos",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stats",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "contadorZeroBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "contadorZeroInvest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "freeBetsBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "freeBetsInvest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "saldoBonus",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenAplicacao",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "treasury",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ] as const;

// --- ENDEREÇO DO CONTRATO ---
const CONTRACT_ADDRESS = "0xF00aA01e9d1f8E81fd070FBE52A917bE07710469"; // <--- CONFIGURAR AQUI

export default function PainelAdmin() {
  // --- WEB3 HOOKS ---
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending: isTxPending } = useWriteContract();
  
  // Exemplo de leitura de dados do contrato
  const { data: contractOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  });

  const { data: isPausedData, refetch: refetchPaused } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'paused',
  });

  const { data: roundIdData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'currentRoundId',
  });

  // Ler saldo do contrato
  const { data: balanceData } = useBalance({
    address: CONTRACT_ADDRESS,
  });

  // --- ESTADOS LOCAIS ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // --- VERIFICAÇÃO DE SEGURANÇA ---
  // Verifica se a carteira conectada é a dona do contrato
  const isWalletOwner = address && contractOwner && address.toLowerCase() === (contractOwner as string).toLowerCase();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Nível 1: Senha fixa (Safety Switch)
    if (accessKey !== 'ADMIN-B3-MASTER') {
        setErrorMsg('Chave de acesso incorreta.');
        setAccessKey('');
        return;
    }

    // Nível 2: Verificação Web3 (Opcional: Descomente se quiser forçar que a carteira seja Owner)
    /* 
    if (!isWalletOwner) {
       setErrorMsg('Carteira conectada não é a Owner do contrato.');
       return;
    }
    */

    setIsAuthenticated(true);
  }

  // --- FUNÇÕES DE AÇÃO (ESCREVER NO BLOCKCHAIN) ---
  
  const handleTogglePause = () => {
    writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'togglePause',
    });
  };

  const handleWithdraw = () => {
    if(confirm("Tem certeza que deseja sacar as taxas para a Treasury?")) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'withdrawFees',
        });
    }
  };

  const handleProcessRound = () => {
    if(confirm("Iniciar sorteio da rodada atual?")) {
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'startNextRound',
        });
    }
  };

  // Formatador de Moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  // --- TELA DE BLOQUEIO ---
  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-[#111] border border-red-900/30 rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
                
                <div className="w-20 h-20 mx-auto mb-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <Image src="/images/logo.png" alt="Logo Admin" width={80} height={80} className="object-cover" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-1">Área Restrita</h1>
                <p className="text-gray-500 text-sm mb-4">Acesso exclusivo ao Owner do Smart Contract.</p>
                
                {/* Status da Carteira na Login Screen */}
                <div className="mb-6 flex justify-center">
                    {isConnected ? (
                        <span className={`text-xs px-2 py-1 rounded border ${isWalletOwner ? 'bg-green-900/20 text-green-400 border-green-900' : 'bg-yellow-900/20 text-yellow-400 border-yellow-900'}`}>
                            {isWalletOwner ? 'Wallet Owner Verificada' : 'Wallet Conectada (Não Owner)'}
                        </span>
                    ) : (
                        <span className="text-xs text-red-400 bg-red-900/10 px-2 py-1 rounded border border-red-900">Carteira Desconectada</span>
                    )}
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Key size={16} className="absolute left-3 top-3.5 text-gray-500" />
                        <input type="password" value={accessKey} onChange={(e) => setAccessKey(e.target.value)} placeholder="Chave Mestra"
                            className="w-full bg-black border border-gray-800 rounded-lg py-3 pl-10 pr-4 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all" />
                    </div>
                    {errorMsg && <div className="text-red-400 text-xs bg-red-900/10 p-2 rounded border border-red-900/20">{errorMsg}</div>}
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg">Liberar Painel</button>
                    <Link href="/"><button type="button" className="mt-4 text-gray-600 text-xs hover:text-white">← Voltar</button></Link>
                </form>
            </div>
        </div>
    )
  }

  // --- DASHBOARD REAL ---
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans">
      
      {/* Feedback de Transação */}
      {isTxPending && (
          <div className="fixed top-4 right-4 bg-blue-900/90 text-white px-4 py-3 rounded-lg z-[60] flex items-center gap-3 shadow-xl border border-blue-500/50 backdrop-blur">
              <Loader2 className="animate-spin" size={20} />
              <div>
                  <p className="text-sm font-bold">Processando Transação...</p>
                  <p className="text-xs opacity-80">Aguarde a confirmação na carteira.</p>
              </div>
          </div>
      )}

      {/* HEADER */}
      <header className="w-full bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
             <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg border border-emerald-500/30">
                <Image src="/images/logo.png" alt="B3 Admin Logo" width={40} height={40} className="object-cover" />
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-none">PAINEL ADMIN</span>
                <span className="text-[10px] text-emerald-500 font-mono">Blockchain: {balanceData?.symbol || 'ETH'}</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#111] rounded border border-white/10">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-xs text-gray-400 font-mono">
                    {isConnected ? `Conectado: ${address?.slice(0,6)}...${address?.slice(-4)}` : 'Desconectado'}
                </span>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 px-4 py-2 rounded-lg text-sm transition-all border border-red-900/30">
               <Lock size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        
        {/* METRICAS GLOBAIS (DADOS VINDOS DA BLOCKCHAIN) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] p-4 rounded-xl border border-emerald-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Saldo do Contrato</p>
                    <DollarSign size={16} className="text-emerald-500" />
                </div>
                {/* DADO REAL */}
                <p className="text-2xl font-bold text-white">
                    {balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(4) : '0.00'} <span className="text-sm">{balanceData?.symbol}</span>
                </p>
                <p className="text-[10px] text-gray-600">Liquidez On-Chain</p>
            </div>
            
            <div className="bg-[#111] p-4 rounded-xl border border-blue-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Status do Contrato</p>
                    <Activity size={16} className={isPausedData ? "text-red-500" : "text-green-500"} />
                </div>
                <p className={`text-2xl font-bold ${isPausedData ? 'text-red-400' : 'text-green-400'}`}>
                    {isPausedData ? "PAUSADO" : "ATIVO"}
                </p>
                <p className="text-[10px] text-gray-600">Estado atual de execução</p>
            </div>

            {/* Placeholder para dados off-chain ou eventos passados (substitua por indexador Graph se tiver) */}
            <div className="bg-[#111] p-4 rounded-xl border border-amber-500/20 shadow-lg opacity-80">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Taxas Acumuladas</p>
                    <Gift size={16} className="text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-amber-400">---</p>
                <p className="text-[10px] text-gray-600">Requer Indexador</p>
            </div>

             <div className="bg-[#111] p-4 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Rodada Atual</p>
                    <Users size={16} className="text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-400">#{roundIdData ? roundIdData.toString() : '0'}</p>
                <p className="text-[10px] text-gray-600">ID Global</p>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* CONTROLES E RODADAS */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Painel de Controle */}
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5 shadow-xl">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity className="text-emerald-500" size={20} />
                                Gerenciamento de Rodada
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">
                                Status: <span className={isPausedData ? "text-red-400 font-bold" : "text-green-400 font-bold"}>
                                    {isPausedData ? "SISTEMA TRAVADO" : "OPERACIONAL"}
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {/* BOTÃO REAL DE PAUSE */}
                            <button 
                                onClick={handleTogglePause}
                                disabled={isTxPending}
                                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors ${
                                    isPausedData 
                                    ? 'bg-green-900 hover:bg-green-800 text-green-100' 
                                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                            >
                                <Pause size={12} /> {isPausedData ? "Retomar Contrato" : "Pausar Contrato"}
                            </button>
                            
                            {/* BOTÃO REAL DE SORTEIO */}
                            <button 
                                onClick={handleProcessRound}
                                disabled={isTxPending || isPausedData}
                                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                            >
                                <RefreshCw size={12} className={isTxPending ? "animate-spin" : ""} /> Processar Sorteio
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-white">BÁSICO (R$ 5,00)</span>
                                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">Ativo</span>
                            </div>
                            <div className="space-y-2 text-xs text-gray-400">
                                <div className="p-4 text-center border border-dashed border-gray-800 rounded">
                                    <span className="italic text-gray-600">Dados em tempo real requerem ABI específica do jogo</span>
                                </div>
                            </div>
                         </div>

                         <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-purple-400">INTER-BET (R$ 1K)</span>
                                <span className="text-[10px] bg-purple-500/10 text-purple-500 px-2 py-1 rounded">Ativo</span>
                            </div>
                            <div className="space-y-2 text-xs text-gray-400">
                                <div className="p-4 text-center border border-dashed border-gray-800 rounded">
                                     <span className="italic text-gray-600">Dados em tempo real requerem ABI específica do jogo</span>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Histórico Simulado (Para real precisa de TheGraph) */}
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5 opacity-70">
                    <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Últimas Rodadas (Simulado)</h3>
                    <p className="text-xs text-gray-500 italic mb-2">Para ver histórico real, integre com TheGraph ou Logs de Eventos.</p>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5 text-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 font-mono">#{Number(roundIdData || 0) - 1}</span>
                                <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-[10px] font-bold">ENCERRADA</span>
                            </div>
                            <div className="text-gray-400">Status: <span className="text-white font-bold">Finalizada</span></div>
                        </div>
                    </div>
                </div>

            </div>

            {/* COLUNA 2: CONFIGURAÇÕES */}
            <div className="space-y-8">
                
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Settings size={18} className="text-gray-400" /> Parâmetros
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                            <span className="text-gray-400 text-xs">Owner</span>
                            <span className="text-white font-mono text-[10px] truncate w-24">{contractOwner as string || "..."}</span>
                        </div>
                        
                        <div className="pt-4 border-t border-white/5">
                            {/* BOTÃO REAL DE SAQUE */}
                            <button 
                                onClick={handleWithdraw}
                                disabled={isTxPending}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg text-xs font-bold flex justify-between px-4 transition-colors group disabled:opacity-50"
                            >
                                <span>Sacar Taxas (Treasury)</span>
                                <Wallet size={14} className="text-gray-500 group-hover:text-white" />
                            </button>
                        </div>
                         <div className="pt-2">
                            {/* BOTÃO DE EMERGÊNCIA REAL (PAUSE) */}
                            <button 
                                onClick={handleTogglePause}
                                disabled={isTxPending}
                                className="w-full bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-900/30 py-3 rounded-lg text-xs font-bold flex justify-between px-4 transition-colors disabled:opacity-50"
                            >
                                <span>{isPausedData ? "RETOMAR SISTEMA" : "PAUSE DE EMERGÊNCIA"}</span>
                                <ShieldAlert size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-black rounded-2xl p-6 border border-white/10 shadow-xl flex-1">
                    <h2 className="text-sm font-bold text-gray-400 mb-4 font-mono uppercase">Live Events</h2>
                    <div className="h-[300px] overflow-y-auto font-mono text-[10px] space-y-2 custom-scrollbar opacity-80">
                       <p className="text-gray-600 italic">Conecte um Listener de eventos (wagmi watchContractEvent) para ver logs em tempo real aqui.</p>
                       {hash && (
                           <div className="text-green-500 mt-2">
                               [Transação Enviada]: {hash.slice(0, 20)}...
                           </div>
                       )}
                    </div>
                </div>

            </div>

        </div>
      </main>
    </div>
  )
}