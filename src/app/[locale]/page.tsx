"use client";
import React from 'react';
import { Link } from '../../navigation'; 
import { useTranslations } from 'next-intl';
import { ArrowRight, ShieldCheck, Zap, Globe, Coins, Lock, Cpu, BarChart3, Gem } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-slate-100 selection:bg-[#cfb16d] selection:text-black overflow-x-hidden text-center">
      <Navbar />

      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#cfb16d]/5 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#cfb16d]/5 blur-[80px] md:blur-[120px] rounded-full"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-24 container mx-auto px-4 flex flex-col items-center gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13151a] border border-[#2a2d35] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#cfb16d] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#cfb16d] animate-pulse"></span>
          Protocolo 100% On-Chain
        </div>
        
        <h3 className="text-base md:text-2xl font-bold text-white tracking-wide uppercase">
            {t('welcome')} <span className="text-[#cfb16d] block md:inline">{t('brand')}</span>
        </h3>
        
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter my-2">
            {t('heroTitle')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfb16d] via-[#f0e68c] to-[#cfb16d]">
              {t('heroHighlight')}
            </span>
        </h1>

        <div className="max-w-4xl space-y-3 px-4 text-center">
            <h2 className="text-lg md:text-3xl font-bold text-gray-200">
                {t('subtitle')} <span className="text-white block mt-1 font-light text-base md:text-2xl">{t('subtext')}</span>
            </h2>
            <p className="text-[10px] sm:text-[13px] md:text-lg lg:text-xl font-black text-[#cfb16d] animate-pulse py-3 uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                {t('pulseText')}
            </p>
        </div>

        <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed border-t border-[#2a2d35] pt-6 px-4 text-center">
            {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full max-w-md md:max-w-none px-6">
          <Link href="/inter-bet" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#cfb16d] text-black font-black text-base md:text-lg px-10 py-4 rounded-xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 uppercase tracking-tighter">
              {t('btnStart')} <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/como-funciona" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-transparent text-white border border-[#2a2d35] font-bold text-base md:text-lg px-10 py-4 rounded-xl hover:bg-white/5 transition-all uppercase tracking-tighter">
              {t('btnDocs')}
            </button>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12 opacity-40 uppercase">
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-widest"><Globe size={16} />{t('trust1')}</div>
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-widest"><Cpu size={16} />{t('trust2')}</div>
          <div className="flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-widest"><Lock size={16} />{t('trust3')}</div>
        </div>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="py-12 md:py-20 bg-[#08090c] border-y border-[#2a2d35]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            
            {/* BASIC CARD */}
            <div className="h-full bg-gradient-to-br from-blue-900/20 to-[#0b0c10] text-white rounded-[2rem] p-6 md:p-10 border-2 border-blue-500/20 backdrop-blur-md relative overflow-hidden shadow-2xl text-left">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={100} /></div>
                <h1 className="text-xl md:text-3xl font-black mb-4 uppercase tracking-tight leading-tight">
                  {t('basicCardTitle')} <br/>
                  <span className="text-blue-400 text-3xl md:text-5xl">{t('basicCardValue')}</span>
                </h1>
                <p className="text-lg font-medium mb-8 italic text-blue-200/70">
                  {t('basicCardSub')} <span className="text-[#cfb16d] font-bold underline decoration-2">{t('basicCardPoint')}</span>
                </p>
                <div className="bg-black/40 rounded-3xl p-6 mb-6 border border-blue-500/20 text-center shadow-inner">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">{t('basicCardEntry')}</p>
                    <p className="text-4xl md:text-6xl font-black text-[#cfb16d] tracking-tighter">{t('basicCardPrice')}</p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-2 font-mono uppercase tracking-widest">{t('basicCardEth')}</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-100/60 uppercase tracking-widest text-center">
                   <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> {t('basicCardFooter')}
                </div>
            </div>

            {/* PRO CARD */}
            <div className="h-full bg-gradient-to-br from-purple-900/20 to-[#0b0c10] text-white rounded-[2rem] p-6 md:p-10 border-2 border-purple-500/20 backdrop-blur-md relative overflow-hidden shadow-2xl text-left">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Gem size={100} /></div>
                <h1 className="text-xl md:text-3xl font-black mb-4 uppercase tracking-tight leading-tight">
                  {t('proCardTitle')} <br/>
                  <span className="text-purple-400 text-3xl md:text-5xl">{t('proCardValue')}</span>
                </h1>
                <p className="text-lg font-medium mb-8 italic text-blue-200/70">
                  {t('proCardSub')} <span className="text-[#cfb16d] font-bold underline decoration-2">{t('proCardPoint')}</span>
                </p>
                <div className="bg-black/40 rounded-3xl p-6 mb-6 border border-purple-500/20 text-center shadow-inner">
                    <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">{t('proCardEntry')}</p>
                    <p className="text-4xl md:text-6xl font-black text-[#cfb16d] tracking-tighter">{t('proCardPrice')}</p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-2 font-mono uppercase tracking-widest">{t('proCardEth')}</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-100/60 uppercase tracking-widest text-center">
                   <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> {t('proCardFooter')}
                </div>
            </div>

          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto text-left">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#13151a]/50 p-8 rounded-[2rem] border border-[#2a2d35] hover:border-[#cfb16d]/40 transition-all group">
                <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] transition-all">
                  {i === 1 && <ShieldCheck className="text-[#cfb16d] group-hover:text-black" size={32} />}
                  {i === 2 && <BarChart3 className="text-[#cfb16d] group-hover:text-black" size={32} />}
                  {i === 3 && <Coins className="text-[#cfb16d] group-hover:text-black" size={32} />}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-tight">{t(`card${i}Title`)}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">{t(`card${i}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[#2a2d35] text-center">
         <div className="container mx-auto px-4 text-center justify-center">
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.4em] font-medium text-center">
              © {new Date().getFullYear()} Blockchain Bet Brasil. {t('Footer.allRightsReserved')}
            </p>
         </div>
      </footer>
    </div>
  );
}