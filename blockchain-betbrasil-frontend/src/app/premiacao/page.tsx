"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Gem, Gift } from 'lucide-react';

export default function PremiacaoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 py-12 font-sans">
      {/* NAVBAR SIMPLIFICADA PARA MANTER O PADRÃO */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
            <Link href="/">
                <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold">
                    <ArrowLeft size={20} /> Voltar para o Início
                </button>
            </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-tight">
          Tabela de Premiação
        </h1>

        {/* INTERAÇÃO BÁSICA */}
        <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-6 mb-8 shadow-xl">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center flex items-center justify-center gap-2">
                <Trophy size={24} /> Interação Básica - R$ 5,00
            </h2>
            
            <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm md:text-base">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs font-bold">
                <tr>
                    <th className="text-left py-4 px-6">Pontuação</th>
                    <th className="text-right py-4 px-6">Regra</th>
                    <th className="text-right py-4 px-6">Distribuição</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                {[
                    { pts: '5 pontos', color: 'text-emerald-400', pct: '50%' },
                    { pts: '4 pontos', color: 'text-blue-400', pct: '20%' },
                    { pts: '3 pontos', color: 'text-yellow-400', pct: '15%' },
                    { pts: '2 pontos', color: 'text-orange-400', pct: '10%' },
                    { pts: '1 ponto', color: 'text-purple-400', pct: '5%' }
                ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                        <td className={`py-4 px-6 font-bold ${row.color}`}>{row.pts}</td>
                        <td className="text-right py-4 px-6 text-slate-300">Rateio entre acertadores</td>
                        <td className="text-right py-4 px-6 font-mono font-bold text-white">{row.pct}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* INTER-BET */}
        <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-6 mb-8 shadow-xl">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center flex items-center justify-center gap-2">
                <Gem size={24} /> Inter-Bet - R$ 1.000,00
            </h2>
            
            <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm md:text-base">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-xs font-bold">
                <tr>
                    <th className="text-left py-4 px-6">Pontuação</th>
                    <th className="text-right py-4 px-6">Regra</th>
                    <th className="text-right py-4 px-6">Distribuição</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                {[
                    { pts: '5 pontos', color: 'text-emerald-400', pct: '50%' },
                    { pts: '4 pontos', color: 'text-blue-400', pct: '20%' },
                    { pts: '3 pontos', color: 'text-yellow-400', pct: '15%' },
                    { pts: '2 pontos', color: 'text-orange-400', pct: '10%' },
                    { pts: '1 ponto', color: 'text-purple-400', pct: '5%' }
                ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                        <td className={`py-4 px-6 font-bold ${row.color}`}>{row.pts}</td>
                        <td className="text-right py-4 px-6 text-slate-300">Rateio entre acertadores</td>
                        <td className="text-right py-4 px-6 font-mono font-bold text-white">{row.pct}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        {/* SISTEMA DE BÔNUS */}
        <div className="mt-12 bg-gradient-to-br from-amber-900/20 to-slate-900 rounded-2xl p-8 border border-amber-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Gift size={100} />
            </div>
            <h2 className="text-2xl font-bold text-amber-400 mb-8 text-center flex items-center justify-center gap-2 relative z-10">
                🎁 Sistema de Bônus "Todo Mundo Ganha"
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-black/20 p-6 rounded-xl border border-amber-500/10">
                <h3 className="font-bold text-amber-200 mb-4 uppercase text-sm tracking-wide">Bônus por Zero Pontos</h3>
                <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-300">Aposta Básica</span>
                    <span className="font-bold text-amber-400 font-mono">R$ 0,625</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-300">Inter-Bet</span>
                    <span className="font-bold text-amber-400 font-mono">R$ 125,00</span>
                </div>
                </div>
            </div>
            
            <div className="bg-black/20 p-6 rounded-xl border border-amber-500/10">
                <h3 className="font-bold text-amber-200 mb-4 uppercase text-sm tracking-wide">Aplicação Grátis (Free Bet)</h3>
                <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-300">Aposta Básica</span>
                    <span className="font-bold text-green-400 font-mono">R$ 5,00</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-300">Inter-Bet</span>
                    <span className="font-bold text-green-400 font-mono">R$ 1.000,00</span>
                </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                    <span className="inline-block bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                        META: 8 APLICAÇÕES ZERADAS
                    </span>
                </div>
            </div>
            </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
            <Link href="/apostas">
              <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                🚀 Entendi, Quero Participar!
              </button>
            </Link>
        </div>

      </div>
    </div>
  );
}