"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Shield, Trophy, CheckCircle, Table } from 'lucide-react';

const ComoJogarPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100 py-12 font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          <header className="text-center mb-12">
            <div className="flex justify-center md:justify-start mb-6">
                <Link href="/">
                    <button className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-2 rounded-lg transition-all font-bold">
                        <ArrowLeft size={18} /> Voltar para a Home
                    </button>
                </Link>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">Como Participar?</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">Aprenda as regras, entenda o sistema e maximize suas chances!</p>
          </header>

          <section className="bg-slate-800/40 rounded-3xl p-8 mb-12 border border-emerald-500/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-emerald-400 mb-8 flex items-center gap-2">📋 Regras Básicas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Zap className="text-emerald-400" size={20} /> Formato</h3>
                  <p className="text-slate-300">Cada adesão consiste na <strong>inserção de 5 prognósticos (X/Y)</strong>, onde X e Y são números de 1 a 25.</p>
                </div>
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Shield className="text-blue-400" size={20} /> Valores</h3>
                  <ul className="text-slate-300 space-y-3">
                    <li className="flex justify-between border-b border-slate-800 pb-2"><span>Blockchain Bet Brasil</span><strong className="text-emerald-400">R$ 5,00</strong></li>
                    <li className="flex justify-between border-b border-slate-800 pb-2"><span>Inter-Bet</span><strong className="text-amber-400">R$ 1.000,00</strong></li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2"><Trophy className="text-yellow-400" size={20} /> Contemplação</h3>
                  <p className="text-slate-300">Ganha acertando <strong>5, 4, 3, 2 ou 1 ponto</strong>. Distribuição em cascata.</p>
                </div>
                <div className="bg-gradient-to-br from-amber-900/20 to-black p-6 rounded-2xl border border-amber-500/30">
                  <h3 className="text-xl font-bold text-amber-400 mb-3">🎁 Bônus Zero Pontos</h3>
                  <p className="text-slate-300 mb-2">Receba bônus (R$ 0,625 ou R$ 125,00) a cada rodada zerada.</p>
                  <p className="text-amber-200 text-sm font-bold">8 zeros = 1 Aplicação Grátis!</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Matriz de Referência (X/Y)</h2>
                <p className="text-gray-400 text-sm">Consulte todos os 625 prognósticos possíveis.</p>
            </div>
            <div className="rounded-xl border border-slate-700 overflow-hidden shadow-2xl bg-slate-900">
                <div className="overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-slate-800">
                    <table className="min-w-full text-center text-xs md:text-sm font-mono">
                        <tbody className="divide-y divide-slate-800">
                            {Array.from({ length: 25 }, (_, i) => i + 1).map((row) => (
                                <tr key={row} className="hover:bg-slate-800/50 transition-colors even:bg-slate-900 odd:bg-slate-800/30">
                                    {Array.from({ length: 25 }, (_, j) => j + 1).map((col) => (
                                        <td key={col} className="px-3 py-2 text-slate-400 hover:text-emerald-400 whitespace-nowrap border-r border-slate-800/50 last:border-r-0">{row}/{col}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </section>

          <section className="text-center mt-16">
            <Link href="/apostas">
              <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto">
                <CheckCircle /> 🎯 Aderir ao Sistema Agora!
              </button>
            </Link>
          </section>
        </div>
    </div>
  );
};
export default ComoJogarPage;