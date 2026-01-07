"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import { Link } from '@/navigation';
import { ShieldCheck, TrendingUp, Zap, Target, Info, Award } from 'lucide-react';

export default function PremiacaoPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('Premiacao');

  const faixas = [
    { pt: 5, std: "50%", casc: "70%", turb: "110%" },
    { pt: 4, std: "20%", casc: "40%", turb: "80%" },
    { pt: 3, std: "15%", casc: "35%", turb: "75%" },
    { pt: 2, std: "10%", casc: "30%", turb: "70%" },
    { pt: 1, std: "5%",  casc: "25%", turb: "65%" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 text-slate-100">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4">
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-1 border border-green-500/50 bg-green-500/10 text-green-400 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
            {t('badge90')}
          </div>
          <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 mb-6 tracking-tighter uppercase">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto italic">
            {t('desc')}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-16 text-left">
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl hover:border-yellow-500/30 transition-all">
            <Target className="text-yellow-500 mb-4" size={32} />
            <h3 className="text-white font-bold text-xl mb-2 uppercase">{t('matrixTitle')}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{t('matrixDesc')}</p>
          </div>
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl hover:border-green-500/30 transition-all">
            <TrendingUp className="text-green-500 mb-4" size={32} />
            <h3 className="text-white font-bold text-xl mb-2 uppercase">{t('payoutTitle')}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{t('payoutDesc')}</p>
          </div>
          <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl hover:border-orange-500/30 transition-all">
            <Zap className="text-orange-500 mb-4" size={32} />
            <h3 className="text-white font-bold text-xl mb-2 uppercase">{t('cascadeTitle')}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{t('cascadeDesc1')}</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl mb-16">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-900/80">
            <div className="text-left">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white">{t('distributionTitle')}</h2>
              <p className="text-slate-400 text-sm">{t('distributionDesc')}</p>
            </div>
            <Info className="text-slate-600 hidden md:block" />
          </div>

          <div className="overflow-x-auto text-left">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-black/20 text-slate-500 text-xs uppercase tracking-widest">
                  <th className="py-6 px-4 text-left pl-10">{t('tableRank')}</th>
                  <th className="py-6 px-4">{t('tableStandard')}</th>
                  <th className="py-6 px-4 text-orange-400">{t('tableCascade')}</th>
                  <th className="py-6 px-4 bg-orange-600/20 text-orange-500 font-bold">{t('tableTurbo')}</th>
                </tr>
              </thead>
              <tbody className="text-slate-200 divide-y divide-white/5">
                {faixas.map((row) => (
                  <tr key={row.pt} className="hover:bg-white/5 transition-colors">
                    <td className="py-5 px-6 text-left pl-10 font-bold text-yellow-500">
                      {row.pt} {t('points')}
                    </td>
                    <td className="py-5 px-4 font-mono">{row.std}</td>
                    <td className="py-5 px-4 text-orange-400 font-bold font-mono">{row.casc}</td>
                    <td className="py-5 px-4 bg-orange-600/10 text-orange-500 font-black font-mono">{row.turb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 bg-black/40 text-center">
            <p className="text-xs text-slate-500 italic">
               <strong>Nota de Transparência:</strong> {t('distributionNote')}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-red-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-left">
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">
              {t('rolloverTitle')}
            </h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-3xl">
              {t('rolloverDesc1')}
            </p>
          </div>
          <Award className="absolute right-[-20px] bottom-[-20px] text-white/10" size={180} />
        </div>

        <div className="mt-20 text-center">
          <Link href="/apostas" className="inline-block px-12 py-5 bg-yellow-500 hover:bg-yellow-400 text-black font-black rounded-full transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(234,179,8,0.4)] uppercase tracking-[0.2em]">
            {t('playNow')}
          </Link>
        </div>
      </div>
    </div>
  );
}