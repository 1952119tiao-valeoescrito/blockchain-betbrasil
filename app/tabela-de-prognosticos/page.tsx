// app/tabela-de-prognosticos/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import PrognosticsTable from './PrognosticsTable';
export default function TabelaPrognosticosPage() {
  const [selectedPrognostics, setSelectedPrognostics] = useState<string[]>([]);

  const handlePrognosticSelect = (prognostic: string) => {
    setSelectedPrognostics(prev => {
      if (prev.includes(prognostic)) {
        return prev.filter(p => p !== prognostic);
      } else {
        return [...prev, prognostic];
      }
    });
  };

  const clearSelection = () => {
    setSelectedPrognostics([]);
  };

  const getPrognosticsByPrize = () => {
    const prizes = ['1º Prêmio', '2º Prêmio', '3º Prêmio', '4º Prêmio', '5º Prêmio'];
    return prizes.map((prize, index) => ({
      prize,
      prognostic: selectedPrognostics[index] || 'Não selecionado'
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <header className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar para a Home
            </button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            📊 Tabela de Prognósticos
          </h1>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto">
            Explore a matriz 25×25 completa e selecione seus prognósticos para cada faixa de prêmio
          </p>
        </header>

        {/* Informações Importantes */}
        <section className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold text-amber-400 mb-4">🎯 Como Funciona?</h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-amber-900 rounded-full p-1 mt-1">1</span>
                  <span>Cada célula representa um prognóstico único (Linha/Coluna)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-amber-900 rounded-full p-1 mt-1">2</span>
                  <span>Clique para selecionar 5 prognósticos - um para cada prêmio</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-amber-900 rounded-full p-1 mt-1">3</span>
                  <span>Navegue pelas páginas para ver toda a matriz 25×25</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-amber-500 text-amber-900 rounded-full p-1 mt-1">4</span>
                  <span>Os prognósticos selecionados serão usados na sua aposta</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-400 mb-4">💡 Dicas Importantes</h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-emerald-900 rounded-full p-1 mt-1">✓</span>
                  <span>Você pode selecionar prognósticos repetidos se desejar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-emerald-900 rounded-full p-1 mt-1">✓</span>
                  <span>A ordem de seleção define o prêmio correspondente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-emerald-900 rounded-full p-1 mt-1">✓</span>
                  <span>Clique novamente para desmarcar um prognóstico</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-emerald-900 rounded-full p-1 mt-1">✓</span>
                  <span>Use o botão "Limpar Seleção" para recomeçar</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tabela de Prognósticos */}
        <section className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Matriz de Prognósticos 25×25</h2>
            <div className="flex gap-3">
              <button
                onClick={clearSelection}
                disabled={selectedPrognostics.length === 0}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Limpar Seleção
              </button>
              <Link href="/apostas">
                <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Ir para Apostas
                </button>
              </Link>
            </div>
          </div>

          <PrognosticsTable 
            onPrognosticSelect={handlePrognosticSelect}
            selectedPrognostics={selectedPrognostics}
          />
        </section>

        {/* Resumo da Seleção */}
        {selectedPrognostics.length > 0 && (
          <section className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-emerald-500/30">
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">📋 Sua Seleção Atual</h2>
            
            <div className="grid md:grid-cols-5 gap-4 mb-6">
              {getPrognosticsByPrize().map((item, index) => (
                <div key={index} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 text-center">
                  <div className="text-sm text-slate-400 mb-1">{item.prize}</div>
                  <div className={`text-lg font-bold ${
                    item.prognostic === 'Não selecionado' 
                      ? 'text-slate-500' 
                      : 'text-emerald-400'
                  }`}>
                    {item.prognostic}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-500 text-amber-900 rounded-full p-2 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-300 mb-1">Ordem de Seleção Importa!</h4>
                  <p className="text-slate-300 text-sm">
                    O primeiro prognóstico selecionado corresponde ao 1º Prêmio, o segundo ao 2º Prêmio, e assim por diante. 
                    Certifique-se de que a ordem está correta antes de prosseguir para as apostas.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Estatísticas e Informações */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">625</div>
            <div className="text-slate-300">Prognósticos Possíveis</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">5</div>
            <div className="text-slate-300">Prognósticos por Aposta</div>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">25×25</div>
            <div className="text-slate-300">Matriz Completa</div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 mb-6">
            <h2 className="text-3xl font-bold text-white mb-4">🎯 Pronto para Apostar?</h2>
            <p className="text-slate-100 mb-6 text-lg">
              {selectedPrognostics.length === 5 
                ? 'Você já selecionou todos os 5 prognósticos! Hora de fazer sua aposta.'
                : `Selecione ${5 - selectedPrognostics.length} prognóstico(s) restante(s) para continuar.`
              }
            </p>
            <Link href="/apostas">
              <button 
                disabled={selectedPrognostics.length !== 5}
                className="bg-white text-emerald-600 hover:bg-slate-100 disabled:bg-slate-300 disabled:text-slate-500 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {selectedPrognostics.length === 5 
                  ? '🎰 Fazer Minha Aposta!' 
                  : `Selecione mais ${5 - selectedPrognostics.length}`
                }
              </button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-slate-400">
          <p>
            <a href="/premiacao" className="text-blue-400 hover:underline">
              📊 Ver Sistema de Premiação
            </a>
          </p>
          <br />
          <p>
            <a href="/como-jogar" className="text-blue-400 hover:underline">
              ❓ Como Jogar
            </a>
          </p>
          <br />
          <p>Blockchain Bet Brasil • Descentralizado e Transparente</p>
        </footer>
      </div>
    </div>
  );
}