"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Gem, Gift, Star, DollarSign } from 'lucide-react';

export default function PremiacaoPage() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 relative overflow-hidden pb-20">
      
      {/* FUNDO ANIMADO (Igual à Home) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 -z-10"></div>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        
        {/* CABEÇALHO */}
        <div className="mb-10 text-center relative">
            <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                <ArrowLeft size={16} /> Voltar
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
              Tabela de <span className="text-emerald-400">Premiação</span>
            </h1>
            <p className="text-slate-400 text-lg">Distribuição justa, transparente e automatizada via Smart Contract.</p>
        </div>

        {/* CARDS DE PREMIAÇÃO */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* INTERAÇÃO BÁSICA */}
            <div className="bg-[#111] border border-emerald-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy size={120} />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                    <span className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400"><Trophy size={24} /></span>
                    Interação Básica
                    <span className="ml-auto text-lg bg-emerald-500 text-black px-3 py-1 rounded-full font-black">1 USDC</span>
                </h2>
                
                <div className="overflow-hidden rounded-xl border border-white/10 relative z-10">
                    <table className="w-full text-sm">
                        <thead className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                            <th className="text-left py-3 px-4">Acertos</th>
                            <th className="text-right py-3 px-4">Rateio (%)</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-black/20">
                        {[
                            { pts: '5 Pontos', color: 'text-emerald-400', pct: '50%' },
                            { pts: '4 Pontos', color: 'text-blue-400', pct: '20%' },
                            { pts: '3 Pontos', color: 'text-yellow-400', pct: '15%' },
                            { pts: '2 Pontos', color: 'text-orange-400', pct: '10%' },
                            { pts: '1 Ponto', color: 'text-purple-400', pct: '5%' }
                        ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                <td className={`py-3 px-4 font-bold ${row.color}`}>{row.pts}</td>
                                <td className="text-right py-3 px-4 font-mono font-bold text-white">{row.pct}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* INTER-BET */}
            <div className="bg-[#111] border border-purple-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Gem size={120} />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 relative z-10">
                    <span className="bg-purple-500/20 p-2 rounded-lg text-purple-400"><Gem size={24} /></span>
                    Inter-Bet
                    <span className="ml-auto text-lg bg-purple-500 text-white px-3 py-1 rounded-full font-black">170 USDC</span>
                </h2>
                
                <div className="overflow-hidden rounded-xl border border-white/10 relative z-10">
                    <table className="w-full text-sm">
                        <thead className="bg-white/5 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                            <th className="text-left py-3 px-4">Acertos</th>
                            <th className="text-right py-3 px-4">Rateio (%)</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-black/20">
                        {[
                            { pts: '5 Pontos', color: 'text-emerald-400', pct: '50%' },
                            { pts: '4 Pontos', color: 'text-blue-400', pct: '20%' },
                            { pts: '3 Pontos', color: 'text-yellow-400', pct: '15%' },
                            { pts: '2 Pontos', color: 'text-orange-400', pct: '10%' },
                            { pts: '1 Ponto', color: 'text-purple-400', pct: '5%' }
                        ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                <td className={`py-3 px-4 font-bold ${row.color}`}>{row.pts}</td>
                                <td className="text-right py-3 px-4 font-mono font-bold text-white">{row.pct}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* SISTEMA DE BÔNUS */}
        <div className="bg-gradient-to-br from-amber-900/30 to-[#111] rounded-3xl p-8 md:p-12 border border-amber-500/30 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 p-8 opacity-10">
                <Gift size={150} />
            </div>

            <div className="text-center mb-10 relative z-10">
                <span className="text-amber-400 font-bold tracking-widest text-xs uppercase bg-amber-900/30 px-3 py-1 rounded-full border border-amber-500/30">Diferencial Exclusivo</span>
                <h2 className="text-3xl font-extrabold text-white mt-4 flex items-center justify-center gap-3">
                    Bônus "Todo Mundo Ganha" <Star className="text-yellow-400 fill-yellow-400" size={24} />
                </h2>
                <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
                    Aqui não existe derrota total. Se você errar tudo (Zero Pontos), o sistema devolve parte do valor e acumula pontos para uma aposta grátis.
                </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 relative z-10">
                {/* BÔNUS RETORNO */}
                <div className="bg-black/40 p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400"><DollarSign size={20} /></div>
                        <h3 className="font-bold text-white text-lg">Cashback Imediato</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <span className="text-slate-400 text-sm">Aposta Básica</span>
                            <span className="font-bold text-amber-400 font-mono">0.125 USDC</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <span className="text-slate-400 text-sm">Inter-Bet</span>
                            <span className="font-bold text-amber-400 font-mono">21.25 USDC</span>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-3">* Creditado automaticamente no saldo virtual.</p>
                </div>
                
                {/* FREE BET */}
                <div className="bg-black/40 p-6 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400"><Gift size={20} /></div>
                        <h3 className="font-bold text-white text-lg">Meta Free Bet</h3>
                    </div>
                    <div className="flex items-center justify-between bg-green-900/10 p-4 rounded-xl border border-green-500/20 mb-4">
                        <div>
                            <p className="text-xs text-slate-400 uppercase font-bold">Acumule</p>
                            <p className="text-xl font-bold text-white">8 Derrotas</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold">Ganhe</p>
                            <p className="text-xl font-bold text-green-400">1 Aposta Grátis</p>
                        </div>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-2/3 animate-pulse"></div>
                    </div>
                    <p className="text-xs text-center text-slate-500 mt-2">Barra de progresso pessoal no painel.</p>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
            <Link href="/apostas">
              <button className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-bold py-4 px-12 rounded-full text-lg shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                🚀 Participar Agora
              </button>
            </Link>
            <div className="mt-4">
                <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors md:hidden">
                    Voltar para o Início
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}