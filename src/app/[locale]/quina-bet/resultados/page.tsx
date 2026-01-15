"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { Search, Zap, Trophy, CheckCircle2, XCircle } from 'lucide-react';

interface DrawResult {
  drawNumber: number;
  date: string;
  numbers: number[];
  totalParticipants: number;
  winners: number;
  jackpot: string;
}

export default function QuinaBetResultadosPage() {
  const t = useTranslations('QuinaBetResults');
  const [searchDraw, setSearchDraw] = useState('');

  // Mock data - será substituído por dados reais da blockchain
  const mockResults: DrawResult[] = [
    {
      drawNumber: 127,
      date: '15/01/2026',
      numbers: [3, 7, 12, 19, 24],
      totalParticipants: 456,
      winners: 2,
      jackpot: '2,340 USDC',
    },
    {
      drawNumber: 126,
      date: '08/01/2026',
      numbers: [5, 11, 15, 21, 23],
      totalParticipants: 392,
      winners: 1,
      jackpot: '1,890 USDC',
    },
    {
      drawNumber: 125,
      date: '01/01/2026',
      numbers: [2, 8, 14, 18, 25],
      totalParticipants: 531,
      winners: 3,
      jackpot: '3,120 USDC',
    },
  ];

  const filteredResults = searchDraw
    ? mockResults.filter(r => r.drawNumber.toString().includes(searchDraw))
    : mockResults;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* HEADER */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{t('highlight')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">{t('subtitle')}</p>
        </header>

        {/* LATEST DRAW HIGHLIGHT */}
        {filteredResults.length > 0 && (
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{t('latestDraw')}</h2>
            
            <div className="bg-gradient-to-br from-amber-900/30 to-slate-900/40 border-3 border-amber-500/50 rounded-[2.5rem] p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Numbers */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-4 font-mono">{t('drawnNumbers')}</p>
                  <div className="grid grid-cols-5 gap-3 mb-6">
                    {filteredResults[0].numbers.map((num) => (
                      <div
                        key={num}
                        className="aspect-square bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center font-black text-2xl text-black shadow-lg"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div className="bg-black/40 rounded-xl p-4 border border-amber-500/30">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{t('drawNumber')}</p>
                    <p className="text-3xl font-black text-amber-300">#{filteredResults[0].drawNumber}</p>
                  </div>

                  <div className="bg-black/40 rounded-xl p-4 border border-amber-500/30">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{t('date')}</p>
                    <p className="text-2xl font-black text-amber-300">{filteredResults[0].date}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <p className="text-xs text-blue-300 uppercase tracking-widest mb-2">{t('participants')}</p>
                      <p className="text-2xl font-black text-blue-300">{filteredResults[0].totalParticipants}</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                      <p className="text-xs text-green-300 uppercase tracking-widest mb-2">{t('winners')}</p>
                      <p className="text-2xl font-black text-green-300">{filteredResults[0].winners}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/50 rounded-xl p-4 text-center">
                    <p className="text-xs text-amber-300 uppercase tracking-widest mb-2 font-bold">{t('jackpot')}</p>
                    <p className="text-3xl font-black text-amber-300">{filteredResults[0].jackpot}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEARCH */}
        <section className="mb-12 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="number"
              placeholder={t('searchPlaceholder')}
              value={searchDraw}
              onChange={(e) => setSearchDraw(e.target.value)}
              className="w-full bg-slate-900/40 border-2 border-slate-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>
        </section>

        {/* RESULTS TABLE */}
        <section className="mb-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{t('allDraws')}</h2>

          <div className="space-y-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/40 border-2 border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
                    {/* Draw Number */}
                    <div className="md:text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{t('draw')}</p>
                      <p className="text-2xl font-black text-amber-300">#{result.drawNumber}</p>
                    </div>

                    {/* Date */}
                    <div className="md:text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{t('date')}</p>
                      <p className="text-lg font-bold text-white">{result.date}</p>
                    </div>

                    {/* Numbers */}
                    <div className="md:text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{t('numbers')}</p>
                      <div className="flex gap-2 flex-wrap md:justify-center">
                        {result.numbers.map((num) => (
                          <span
                            key={num}
                            className="w-8 h-8 bg-amber-500/20 border border-amber-500/50 rounded text-amber-300 font-bold flex items-center justify-center text-sm"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="md:text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{t('stats')}</p>
                      <p className="text-sm text-gray-400">
                        <span className="text-white font-bold">{result.totalParticipants}</span> {t('participantsLabel')} / <span className="text-green-300 font-bold">{result.winners}</span> {t('winnersLabel')}
                      </p>
                    </div>

                    {/* Jackpot */}
                    <div className="md:text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{t('jackpot')}</p>
                      <p className="text-xl font-black text-green-400">{result.jackpot}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-900/40 border-2 border-slate-800 rounded-2xl p-12 text-center">
                <XCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">{t('noResults')}</p>
              </div>
            )}
          </div>
        </section>

        {/* INFO BOX */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/40 border border-blue-500/20 rounded-2xl p-6">
            <Zap className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-bold text-white mb-2 text-lg">{t('infoTitle1')}</h3>
            <p className="text-sm text-gray-400">{t('infoDesc1')}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-purple-500/20 rounded-2xl p-6">
            <Trophy className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="font-bold text-white mb-2 text-lg">{t('infoTitle2')}</h3>
            <p className="text-sm text-gray-400">{t('infoDesc2')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
