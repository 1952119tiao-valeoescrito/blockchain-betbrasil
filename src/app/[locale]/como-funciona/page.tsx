"use client";
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { Target, RefreshCcw, Coins, Search, Wallet, Globe, BarChart, ChevronDown } from 'lucide-react';

export default function ComoFuncionaPage() {
  const t = useTranslations('ComoFunciona');

  // Matriz 25x25 - REESTRUTURADA PARA ALINHAMENTO PERFEITO
  const MatrixDisplay = () => (
    <div className="w-full max-w-5xl mx-auto my-12 p-1 bg-white/5 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="bg-[#0b0c10] overflow-x-auto p-4 md:p-8 custom-scrollbar">
        
        {/* Container da Grade com Largura Mínima para manter a forma quadrada */}
        <div className="grid grid-cols-[30px_repeat(25,1fr)] gap-1 min-w-[850px] mx-auto">
          
          {/* 1. CABEÇALHO SUPERIOR (EIXO X - HORIZONTAL) */}
          <div className="h-8"></div> {/* Espaço vazio do canto superior esquerdo */}
          {Array.from({ length: 25 }, (_, i) => (
            <div key={`th-${i}`} className="text-[10px] text-yellow-500/50 font-bold flex items-center justify-center uppercase font-mono h-8 border-b border-white/5">
              {i + 1}
            </div>
          ))}

          {/* 2. CORPO DA MATRIZ (LINHAS E COLUNAS) */}
          {Array.from({ length: 25 }, (_, row) => (
            <React.Fragment key={`row-${row}`}>
              
              {/* INDICADOR LATERAL (EIXO Y - VERTICAL) */}
              <div className="text-[10px] text-yellow-500/50 font-bold flex items-center justify-center uppercase font-mono w-8 border-r border-white/5">
                {row + 1}
              </div>
              
              {/* AS CÉLULAS DA LINHA */}
              {Array.from({ length: 25 }, (_, col) => {
                const x = col + 1; // Coluna (Horizontal)
                const y = row + 1; // Linha (Vertical)
                return (
                  <div 
                    key={`cell-${x}-${y}`} 
                    className="aspect-square bg-white/5 border border-white/10 hover:bg-yellow-500/20 transition-all rounded-[1px] flex items-center justify-center group"
                  >
                    <span className="text-[7px] text-gray-500 group-hover:text-yellow-200 transition-colors font-mono font-medium">
                      {x}/{y}
                    </span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* RODAPÉ DA MATRIZ */}
      <div className="bg-black/60 py-4 text-[10px] text-gray-400 uppercase tracking-[0.4em] font-black text-center border-t border-white/5">
        MATRIZ OPERACIONAL: 25 LINHAS X 25 COLUNAS = 625 POSSIBILIDADES
      </div>
    </div>
  );

  // FAQ Accordion Component
  const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems = [
      { question: t('faq.q1'), answer: t('faq.a1') },
      { question: t('faq.q2'), answer: t('faq.a2') },
      { question: t('faq.q3'), answer: t('faq.a3') },
      { question: t('faq.q4'), answer: t('faq.a4') },
      { question: t('faq.q5'), answer: t('faq.a5') },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto mt-20 mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12 uppercase tracking-tight">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-[#13151a] border border-[#2a2d35] rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-[#1a1d23] transition-colors"
              >
                <span className="text-lg font-semibold text-white">{item.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-yellow-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 text-gray-400 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans selection:bg-[#cfb16d] selection:text-black">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20 text-center">
        {/* TÍTULO E DESCRIÇÃO */}
        <header className="mb-4">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto italic leading-relaxed px-4">
            {t('desc')}
          </p>
        </header>

        {/* A MATRIZ CORRIGIDA */}
        <MatrixDisplay />

        {/* FAQ ACCORDION */}
        <FAQAccordion />
      </main>
    </div>
  );
}