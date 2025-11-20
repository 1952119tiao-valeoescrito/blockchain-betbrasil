'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image' // Importação da Imagem
import { ArrowLeft, Activity, Users, DollarSign, Gift, Database, Settings, Lock, Key, ShieldAlert, Pause, RefreshCw, Wallet } from 'lucide-react'

interface ContractStats {
  contractBalance: number;
  totalUsers: number;
  currentRoundId: number;
  isPaused: boolean;
  treasuryAddress: string;
}

export default function PainelAdmin() {
  // --- SEGURANÇA ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // --- ESTADOS DO SISTEMA ---
  const [contractStats] = useState<ContractStats>({
    contractBalance: 25.4,
    totalUsers: 1420,
    currentRoundId: 1402,
    isPaused: false,
    treasuryAddress: "0x71C...9A21"
  });

  const financialData = {
    arrecadadoTotal: 12500000.00,
    premiosPagos: 8450000.00,
    bonusDistribuidos: 12500.00,
    freeBetsAtivas: 84
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === 'ADMIN-B3-MASTER') {
        setIsAuthenticated(true);
    } else {
        setErrorMsg('Acesso Negado: Chave inválida.');
        setAccessKey('');
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  // --- TELA DE BLOQUEIO ---
  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-[#111] border border-red-900/30 rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse"></div>
                
                {/* LOGO NA TELA DE LOGIN TAMBÉM */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <Image src="/images/logo.png" alt="Logo Admin" width={80} height={80} className="object-cover" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-1">Área Restrita</h1>
                <p className="text-gray-500 text-sm mb-8">Acesso exclusivo ao Owner do Smart Contract.</p>
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
      {/* HEADER */}
      <header className="w-full bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-3">
             
             {/* LOGO NO HEADER DO DASHBOARD */}
             <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg border border-emerald-500/30">
                <Image 
                    src="/images/logo.png" 
                    alt="B3 Admin Logo" 
                    width={40} 
                    height={40} 
                    className="object-cover" 
                />
             </div>

             <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-none">PAINEL ADMIN</span>
                <span className="text-[10px] text-emerald-500 font-mono">v4.2.0 (Mainnet)</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-[#111] rounded border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400 font-mono">Conectado: {contractStats.treasuryAddress}</span>
            </div>
            <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 px-4 py-2 rounded-lg text-sm transition-all border border-red-900/30">
               <Lock size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        
        {/* METRICAS GLOBAIS (KPIs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#111] p-4 rounded-xl border border-emerald-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Saldo do Contrato</p>
                    <DollarSign size={16} className="text-emerald-500" />
                </div>
                <p className="text-2xl font-bold text-white">{contractStats.contractBalance} ETH</p>
                <p className="text-[10px] text-gray-600">Aprox. {formatCurrency(contractStats.contractBalance * 15000)}</p>
            </div>
            <div className="bg-[#111] p-4 rounded-xl border border-blue-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Total Arrecadado</p>
                    <Database size={16} className="text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-400">{formatCurrency(financialData.arrecadadoTotal)}</p>
                <p className="text-[10px] text-gray-600">+ R$ 12.500 hoje</p>
            </div>
            <div className="bg-[#111] p-4 rounded-xl border border-amber-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Prêmios Pagos</p>
                    <Gift size={16} className="text-amber-500" />
                </div>
                <p className="text-2xl font-bold text-amber-400">{formatCurrency(financialData.premiosPagos)}</p>
                <p className="text-[10px] text-gray-600">95% do Pool</p>
            </div>
             <div className="bg-[#111] p-4 rounded-xl border border-purple-500/20 shadow-lg">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-gray-500 uppercase font-bold">Participantes</p>
                    <Users size={16} className="text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-purple-400">{contractStats.totalUsers}</p>
                <p className="text-[10px] text-gray-600">Carteiras Únicas</p>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* CONTROLES E RODADAS (2/3 da tela) */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Painel de Controle da Rodada Atual */}
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5 shadow-xl">
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Activity className="text-emerald-500" size={20} />
                                Rodada Atual #{contractStats.currentRoundId}
                            </h2>
                            <p className="text-xs text-gray-500 mt-1">Status: <span className="text-green-400 font-bold uppercase">Aberta para Aplicações</span></p>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10">
                                <Pause size={12} /> Pausar
                            </button>
                            <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/20">
                                <RefreshCw size={12} /> Processar Sorteio
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                         {/* Dados Basic */}
                         <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-white">BÁSICO (R$ 5,00)</span>
                                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">Ativo</span>
                            </div>
                            <div className="space-y-2 text-xs text-gray-400">
                                <div className="flex justify-between"><span>Aplicações:</span><span className="text-white font-mono">1.240</span></div>
                                <div className="flex justify-between"><span>Arrecadado:</span><span className="text-white font-mono">R$ 6.200,00</span></div>
                                <div className="flex justify-between"><span>Bônus Zero (R$ 0,625):</span><span className="text-amber-500 font-mono">R$ 312,50</span></div>
                            </div>
                         </div>

                         {/* Dados Invest */}
                         <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-bold text-purple-400">INTER-BET (R$ 1K)</span>
                                <span className="text-[10px] bg-purple-500/10 text-purple-500 px-2 py-1 rounded">Ativo</span>
                            </div>
                            <div className="space-y-2 text-xs text-gray-400">
                                <div className="flex justify-between"><span>Aplicações:</span><span className="text-white font-mono">42</span></div>
                                <div className="flex justify-between"><span>Arrecadado:</span><span className="text-white font-mono">R$ 42.000,00</span></div>
                                <div className="flex justify-between"><span>Bônus Zero (R$ 125):</span><span className="text-amber-500 font-mono">R$ 2.500,00</span></div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Histórico de Rodadas */}
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5">
                    <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Últimas Rodadas</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5 text-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 font-mono">#1401</span>
                                <span className="text-red-400 bg-red-500/10 px-2 py-0.5 rounded text-[10px] font-bold">ENCERRADA</span>
                            </div>
                            <div className="text-gray-400">Premio: <span className="text-white font-bold">R$ 2.500.000</span></div>
                            <div className="text-xs text-gray-600">12/11/2025</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-white/5 text-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 font-mono">#1400</span>
                                <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-[10px] font-bold">PAGA</span>
                            </div>
                            <div className="text-gray-400">Premio: <span className="text-white font-bold">R$ 2.100.000</span></div>
                            <div className="text-xs text-gray-600">05/11/2025</div>
                        </div>
                    </div>
                </div>

            </div>

            {/* COLUNA 2: CONFIGURAÇÕES E LOGS (1/3 da tela) */}
            <div className="space-y-8">
                
                {/* Configurações do Contrato */}
                <div className="bg-[#111] rounded-2xl p-6 border border-white/5 shadow-xl">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Settings size={18} className="text-gray-400" /> Parâmetros
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                            <span className="text-gray-400 text-xs">Taxa Admin</span>
                            <span className="text-white font-bold text-sm">5%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                            <span className="text-gray-400 text-xs">Meta Free Bet</span>
                            <span className="text-white font-bold text-sm">8 Derrotas</span>
                        </div>
                        
                        <div className="pt-4 border-t border-white/5">
                            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg text-xs font-bold flex justify-between px-4 transition-colors group">
                                <span>Sacar Taxas (Treasury)</span>
                                <Wallet size={14} className="text-gray-500 group-hover:text-white" />
                            </button>
                        </div>
                         <div className="pt-2">
                            <button className="w-full bg-red-900/20 hover:bg-red-900/30 text-red-400 border border-red-900/30 py-3 rounded-lg text-xs font-bold flex justify-between px-4 transition-colors">
                                <span>PAUSE DE EMERGÊNCIA</span>
                                <ShieldAlert size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Log de Atividades (Estilo Terminal) */}
                <div className="bg-black rounded-2xl p-6 border border-white/10 shadow-xl flex-1">
                    <h2 className="text-sm font-bold text-gray-400 mb-4 font-mono uppercase">System Logs</h2>
                    <div className="h-[300px] overflow-y-auto font-mono text-[10px] space-y-2 custom-scrollbar opacity-80">
                        <div className="text-green-500">[19:30:01] New round #1402 started. Hash: 0x82...91a</div>
                        <div className="text-blue-400">[19:28:45] Deposit: 1000 BRL from 0x742...d31</div>
                        <div className="text-amber-500">[19:25:12] Bonus Trigger: Zero Points x8 (Free Bet Granted)</div>
                        <div className="text-gray-500">[19:20:00] Oracle VRF Request sent. ID: 829102</div>
                        <div className="text-purple-400">[19:15:00] Cascade Distribution: Level 5 (Empty) to Level 4.</div>
                        <div className="text-blue-400">[19:10:22] Deposit: 5 BRL from 0x112...a99</div>
                        <div className="text-green-500">[19:05:00] Contract Health Check: OK. Gas: 12 gwei.</div>
                    </div>
                </div>

            </div>

        </div>
      </main>
    </div>
  )
}