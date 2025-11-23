'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Activity, Users, DollarSign, Gift, Database, Settings, Lock, Key, ShieldAlert, Pause, RefreshCw, Wallet, Loader2 } from 'lucide-react'

// --- WEB3 IMPORTS ---
import { useAccount, useReadContract, useWriteContract, useBalance } from 'wagmi'
import { formatEther } from 'viem'

// --- IMPORTANTE: ADICIONE ESSA LINHA AQUI EMBAIXO ---
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/constants/abi';

export default function PainelAdmin() {

// --- IMPORTAR A ABI QUE VOCÊ CRIOU NO OUTRO ARQUIVO ---
// Se você não criou o arquivo separado, descomente a linha abaixo e cole a ABI ali (mas cuidado com a sintaxe!)
// import { CONTRACT_ABI } from '@/constants/abi'

// SE FOR PREGUIÇA DE CRIAR O ARQUIVO, PODE USAR ESSE ABAIXO (MAS TEM QUE TER A SUA ABI REAL)
const CONTRACT_ABI = [
    {
      "inputs": [
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
const CONTRACT_ADDRESS = "0xF00aA01e9d1f8E81fd070FBE52A917bE07710469"; // <--- RECOLOQUE SEU ENDEREÇO AQUI

export default function PainelAdmin() {
  // --- WEB3 HOOKS ---
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending: isTxPending } = useWriteContract();
  
  // Leitura do Owner
  const { data: contractOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  });

  // Status Pausado
  const { data: isPausedData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'paused',
  });

  // ID da Rodada
  const { data: roundIdData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'currentRoundId',
  });

  // Saldo
  const { data: balanceData } = useBalance({
    address: CONTRACT_ADDRESS,
  });

  // --- ESTADOS LOCAIS ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Verifica Owner
  const isWalletOwner = address && contractOwner && address.toLowerCase() === (contractOwner as string).toLowerCase();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey !== 'ADMIN-B3-MASTER') {
        setErrorMsg('Chave de acesso incorreta.');
        setAccessKey('');
        return;
    }
    setIsAuthenticated(true);
  }

  // --- AÇÕES ---
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

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans">
      {isTxPending && (
          <div className="fixed top-4 right-4 bg-blue-900/90 text-white px-4 py-3 rounded-lg z-[60] flex items-center gap-3 shadow-xl border border-blue-500/50 backdrop-blur">
              <Loader2 className="animate-spin" size={20} />
              <div>
                  <p className="text-sm font-bold">Processando Transação...</p>
                  <p className="text-xs opacity-80">Aguarde a confirmação na carteira.</p>
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
        {/* METRICAS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] p-4 rounded-xl border border-emerald-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Saldo</p>
                    <DollarSign size={16} className="text-emerald-500" />
                </div>
                <p className="text-2xl font-bold text-white">
                    {balanceData ? parseFloat(formatEther(balanceData.value)).toFixed(4) : '0.00'} <span className="text-sm">{balanceData?.symbol}</span>
                </p>
            </div>
            
            <div className="bg-[#111] p-4 rounded-xl border border-blue-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Status</p>
                    <Activity size={16} className={isPausedData ? "text-red-500" : "text-green-500"} />
                </div>
                <p className={`text-2xl font-bold ${isPausedData ? 'text-red-400' : 'text-green-400'}`}>
                    {isPausedData ? "PAUSADO" : "ATIVO"}
                </p>
            </div>

            <div className="bg-[#111] p-4 rounded-xl border border-amber-500/20 shadow-lg opacity-80">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Taxas</p>
                    <Gift size={16} className="text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-amber-400">---</p>
            </div>

             <div className="bg-[#111] p-4 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Rodada</p>
                    <Users size={16} className="text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-400">#{roundIdData ? roundIdData.toString() : '0'}</p>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* CONTROLES */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5 shadow-xl">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity className="text-emerald-500" size={20} />
                                Gerenciamento
                            </h2>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={handleTogglePause}
                                disabled={isTxPending}
                                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors ${
                                    isPausedData 
                                    ? 'bg-green-900 hover:bg-green-800 text-green-100' 
                                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                                }`}
                            >
                                <Pause size={12} /> {isPausedData ? "Retomar" : "Pausar"}
                            </button>
                            
                            <button 
                                onClick={handleProcessRound}
                                disabled={isTxPending || isPausedData}
                                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg"
                            >
                                <RefreshCw size={12} className={isTxPending ? "animate-spin" : ""} /> Processar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONFIGURAÇÕES */}
            <div className="space-y-8">
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Settings size={18} className="text-gray-400" /> Ações
                    </h2>
                    <div className="space-y-4">
                        <button 
                            onClick={handleWithdraw}
                            disabled={isTxPending}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg text-xs font-bold flex justify-between px-4 transition-colors group disabled:opacity-50"
                        >
                            <span>Sacar Taxas</span>
                            <Wallet size={14} className="text-gray-500 group-hover:text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}