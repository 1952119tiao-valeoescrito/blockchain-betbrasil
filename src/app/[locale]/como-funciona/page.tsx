import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Navbar from "@/components/Navbar";
import { Cpu, Coins, ShieldCheck, Grid3X3 } from "lucide-react";

export default function ComoFuncionaPage({ params: { locale } }: { params: { locale: string } }) {
  // Mantém a tradução funcionando no servidor
  unstable_setRequestLocale(locale);
  const t = useTranslations('ComoFunciona');

  // Gera os números de 1 a 25 para os eixos X e Y
  const range = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#0b0c10] pb-20 text-gray-200">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 pt-24">
        
        {/* 1. CABEÇALHO (TÍTULO E DESCRIÇÃO) */}
        <section className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('desc')}
          </p>
        </section>

        {/* 2. MATRIZ REAL 25x25 (POSIÇÃO SOLICITADA) */}
        <section className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-1.5 bg-yellow-500 rounded-lg">
                    <Grid3X3 className="text-black w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">{t('tableTitle')}</h2>
            </div>
            
            <div className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Container com scroll horizontal para não quebrar o layout */}
                <div className="overflow-x-auto p-4 md:p-6 custom-scrollbar bg-[#0d0e12]">
                    <table className="border-collapse mx-auto">
                        <thead>
                            <tr>
                                <th className="p-1 text-[9px] text-gray-600 border border-white/5 bg-black/20 font-mono">Y \ X</th>
                                {range.map(x => (
                                    <th key={x} className="p-1 min-w-[38px] text-[10px] font-bold text-yellow-500/40 border border-white/5 bg-white/5">
                                        {x}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {range.map(y => (
                                <tr key={y}>
                                    <td className="p-1 text-[10px] font-bold text-yellow-500/40 border border-white/5 bg-white/5 text-center">
                                        {y}
                                    </td>
                                    {range.map(x => (
                                        <td 
                                            key={`${x}-${y}`} 
                                            className="p-1 border border-white/5 text-center transition-all hover:bg-yellow-500/20 hover:scale-110 group cursor-default"
                                        >
                                            <div className="text-[9px] text-gray-500 group-hover:text-yellow-400 font-mono">
                                                {x}/{y}
                                            </div>
                                        </td>