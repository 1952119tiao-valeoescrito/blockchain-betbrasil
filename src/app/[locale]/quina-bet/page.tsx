"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Navbar from '@/components/Navbar';
import { ShieldCheck, ArrowRight, Zap, Target, Sparkles } from 'lucide-react';

interface QuinaSelection {
  [key: number]: boolean;
}

export default function QuinaBetPage() {
  const t = useTranslations('QuinaBet');
  const [selection, setSelection] = useState<QuinaSelection>({});
  const selectedCount = Object.values(selection).filter(Boolean).length;

  const toggleNumber = (num: number) => {
    if (selectedCount >= 25 || selection[num]) {
      setSelection((prev) => ({
        ...prev,
        [num]: !prev[num],
      }));
    }
  };

  const handleClear = () => {
    setSelection({});
  };

  const handleRandom = () => {
    const newSelection: QuinaSelection = {};
    let count = 0;
    while (count < 25) {
      const randomNum = Math.floor(Math.random() * 25) + 1;
      if (!newSelection[randomNum]) {
        newSelection[randomNum] = true;
        count++;
      }
    }
    setSelection(newSelection);
  };

  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* HEADER */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{t('highlight')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">{t('subtitle')}</p>
        </header>

        {/* GAME INFO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-amber-900/20 border-2 border-amber-700/30 rounded-2xl p-6 text-center">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{t('rulesTitle')}</h3>
            <p className="text-2xl font-black text-amber-300">25 {t('numbersLabel')}</p>
            <p className="text-xs text-gray-500 mt-2">{t('rule1')}</p>
          </div>

          <div className="bg-amber-900/20 border-2 border-amber-700/30 rounded-2xl p-6 text-center">
            <Target className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{t('goalTitle')}</h3>
            <p className="text-2xl font-black text-amber-300">5/5 {t('matches')}</p>
            <p className="text-xs text-gray-500 mt-2">{t('rule2')}</p>
          </div>

          <div className="bg-amber-900/20 border-2 border-amber-700/30 rounded-2xl p-6 text-center">
            <Zap className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{t('priceTitle')}</h3>
            <p className="text-2xl font-black text-amber-300">1 USDC</p>
            <p className="text-xs text-gray-500 mt-2">{t('rule3')}</p>
          </div>
        </div>

        {/* MAIN BETTING AREA */}
        <div className="bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          {/* SELECTION MATRIX */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                {t('selectLabel')} <span className="text-amber-300">({selectedCount}/25)</span>
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={handleRandom}
                  className="px-4 py-2 bg-amber-600/30 border border-amber-500/50 rounded-lg text-amber-300 font-bold text-sm hover:bg-amber-600/50 transition-all"
                >
                  {t('btnRandom')}
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300 font-bold text-sm hover:bg-slate-700 transition-all"
                >
                  {t('btnClear')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3 mb-8">
              {numbers.map((num) => (
                <button
                  key={num}
                  onClick={() => toggleNumber(num)}
                  disabled={selectedCount >= 25 && !selection[num]}
                  className={`
                    aspect-square rounded-lg font-black text-lg transition-all font-mono tracking-tight
                    ${selection[num]
                      ? 'bg-amber-500 text-black border-2 border-amber-300 shadow-lg scale-105'
                      : 'bg-slate-800 text-gray-300 border-2 border-slate-700 hover:border-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }
                  `}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* PROGRESS BAR */}
            <div className="bg-slate-800/50 rounded-full h-2 overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-300"
                style={{ width: `${(selectedCount / 25) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center font-mono">{selectedCount}/25 {t('selected')}</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              disabled={selectedCount !== 25}
              className={`
                flex-1 py-4 font-black text-lg rounded-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-2
                ${selectedCount === 25
                  ? 'bg-amber-500 text-black hover:scale-105 shadow-xl'
                  : 'bg-slate-700 text-gray-500 cursor-not-allowed opacity-50'
                }
              `}
            >
              {t('btnBet')} <ArrowRight size={20} />
            </button>
            <Link href="/quina-bet/como-funciona" className="flex-1">
              <button className="w-full py-4 font-bold text-lg rounded-xl uppercase tracking-tighter transition-all border border-slate-600 text-gray-300 hover:bg-white/5">
                {t('btnInfo')}
              </button>
            </Link>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/40 border border-blue-500/20 rounded-2xl p-6">
            <div className="flex gap-3 mb-3">
              <ShieldCheck className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-white mb-2">{t('highlight1Title')}</h3>
                <p className="text-sm text-gray-400">{t('highlight1Desc')}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-slate-900/40 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex gap-3 mb-3">
              <Zap className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-white mb-2">{t('highlight2Title')}</h3>
                <p className="text-sm text-gray-400">{t('highlight2Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
