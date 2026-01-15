"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Navbar from '@/components/Navbar';
import { HelpCircle, Zap, Target, ShieldCheck, BookOpen } from 'lucide-react';

export default function QuinaBetComoFuncionaPage() {
  const t = useTranslations('QuinaBetFAQ');

  const faqs = [
    {
      icon: <Target className="w-6 h-6" />,
      title: t('faq1Title'),
      desc: t('faq1Desc'),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('faq2Title'),
      desc: t('faq2Desc'),
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: t('faq3Title'),
      desc: t('faq3Desc'),
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t('faq4Title'),
      desc: t('faq4Desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* HEADER */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
            {t('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{t('subtitle')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto italic">{t('description')}</p>
        </header>

        {/* HOW IT WORKS SECTION */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-8 text-left">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="text-amber-400">1</span> {t('step1')}
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed">{t('step1Desc')}</p>
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-4 text-sm">
              <p className="text-amber-300 font-bold">{t('step1Tip')}</p>
            </div>
          </div>

          <div className="bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-8 text-left">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="text-amber-400">2</span> {t('step2')}
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed">{t('step2Desc')}</p>
            <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4 text-sm">
              <p className="text-blue-300 font-bold">{t('step2Tip')}</p>
            </div>
          </div>

          <div className="bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-8 text-left">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="text-amber-400">3</span> {t('step3')}
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed">{t('step3Desc')}</p>
            <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-4 text-sm">
              <p className="text-green-300 font-bold">{t('step3Tip')}</p>
            </div>
          </div>

          <div className="bg-slate-900/40 border-2 border-slate-800 rounded-[2.5rem] p-8 text-left">
            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight flex items-center gap-3">
              <span className="text-amber-400">4</span> {t('step4')}
            </h2>
            <p className="text-gray-400 mb-4 leading-relaxed">{t('step4Desc')}</p>
            <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4 text-sm">
              <p className="text-purple-300 font-bold">{t('step4Tip')}</p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight flex items-center justify-center gap-3">
              <HelpCircle className="w-8 h-8 text-amber-400" />
              {t('faqTitle')}
            </h2>
            <p className="text-gray-400">{t('faqSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 border-2 border-slate-800 rounded-2xl p-6 hover:border-amber-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-amber-400 mt-1">{faq.icon}</div>
                  <div>
                    <h3 className="font-black text-white mb-2 text-lg">{faq.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border-2 border-amber-700/30 rounded-[2.5rem] p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-300 mb-8 text-lg">{t('ctaDesc')}</p>
          <Link href="/quina-bet">
            <button className="bg-amber-500 text-black font-black text-lg px-12 py-4 rounded-xl hover:scale-105 transition-all uppercase tracking-tighter shadow-xl">
              {t('ctaButton')}
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
