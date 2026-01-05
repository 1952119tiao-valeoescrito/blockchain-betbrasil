"use client";
import React, { useState, useEffect } from 'react';
import { Link } from '../../navigation'; 
import { useTranslations } from 'next-intl';
import { ArrowRight, ShieldCheck, Zap, Globe, Coins, Lock, Cpu, Menu, X, BarChart3, Gem } from 'lucide-react';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations('Home');
  const tn = useTranslations('Navbar');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-slate-100 selection:bg-[#cfb16d] selection:text-black overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#cfb16d]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#cfb16d]/5 blur-[120px] rounded-full"></div>
      </div>

      {/* NAVBAR MANUAL TRADUZIDA */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0b0c10]/90 backdrop-blur-md border-[#2a2d35] py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 z-50">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden border border-[#2a2d35] shadow-lg shadow-[#cfb16d]/10 bg-[#13151a] flex-shrink-0">
               <Image src="/images/logo.png" alt="Logo" fill className="object-cover p-1" />
            </div>
            <div className="flex flex-col leading-none">
                <span className="font-bold text-white tracking-tight text-xs md:text-sm uppercase">Blockchain Bet</span>
                <span className="text-[#cfb16d] font-bold text-xs md:text-base uppercase tracking-wide">{tn('subtitle')}</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/como-funciona" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{tn('how')}</Link>
            <Link href="/resultados" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{tn('results')}</Link>
            <Link href="/premiacao" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{tn('prizes')}</Link>
            <Link href="/inter-bet" className="text-sm font-medium text-[#cfb16d] hover:text-[#b08d55] transition-colors flex items-center gap-1"><Zap size={14} /> Inter-Bet Pro</Link>
            <div className="scale-100"><ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" label={tn('connect')} /></div>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <div className="scale-75 origin-right"><ConnectButton showBalance={false} accountStatus="avatar" chainStatus="none" label={tn('connect')} /></div>
            <button className="text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0b0c10] border-b border-[#2a2d35] p-6 flex flex-col gap-4 md:hidden shadow-2xl animate-in slide-in-from-top-5">
             <Link href="/como-funciona" className="text-lg font-medium text-gray-300">{tn('how')}</Link>
             <Link href="/resultados" className="text-lg font-medium text-gray-300">{tn('results')}</Link>
             <Link href="/premiacao" className="text-lg font-medium text-gray-300">{tn('prizes')}</Link>
             <Link href="/inter-bet" className="text-lg font-bold text-[#cfb16d]">Inter-Bet Pro</Link>
             <Link href="/apostas"><button className="w-full bg-[#cfb16d] text-black py-3 rounded-lg font-bold mt-2">{tn('access')}</button></Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 container mx-auto px-4 flex flex-col items-center justify-center text-center gap-6" id="inicio">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#13151a] border border-[#2a2d35] text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#cfb16d] mb-4 animate-fade-in hover:border-[#cfb16d] transition-colors cursor-default">
          <span className="w-2 h-2 rounded-full bg-[#cfb16d] animate-pulse"></span>
          Protocolo 100% On-Chain
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide animate-fade-in">
            {t('welcome')} <span className="text-[#cfb16d] block md:inline">{t('brand')}</span>
        </h3>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter my-2 drop-shadow-2xl">
            {t('heroTitle')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfb16d] via-[#f0e68c] to-[#cfb16d]">{t('heroHighlight')}</span>
        </h1>
        <div className="max-w-4xl space-y-4">
            <h2 className="text-xl md:text-3xl font-bold text-gray-200">
                {t('subtitle')} <span className="text-white block mt-1 font-light">{t('subtext')}</span>
            </h2>
            <p className="text-xl md:text-2xl font-bold text-[#cfb16d] animate-pulse drop-shadow-lg py-2">
                {t('pulseText')}
            </p>
        </div>
        <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed border-t border-[#2a2d35] pt-6 mt-2">
            {t('description')}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full">
          <Link href="/inter-bet" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#cfb16d] hover:bg-[#b59a5e] text-black font-bold text-lg px-10 py-4 rounded-xl shadow-[0_0_30px_rgba(207,177,109,0.2)] hover:shadow-[0_0_50px_rgba(207,177,109,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              {t('btnStart')} <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/como-funciona" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#111] text-white border border-[#2a2d35] font-bold text-lg px-10 py-4 rounded-xl hover:bg-[#1a1a1a] hover:border-white/20 transition-all flex items-center justify-center gap-2">
              {t('btnDocs')}
            </button>
          </Link>
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 w-full">
          <div className="flex items-center gap-2"><Globe size={18} /> <span className="text-sm font-mono">{t('trust1')}</span></div>
          <div className="flex items-center gap-2"><Cpu size={18} /> <span className="text-sm font-mono">{t('trust2')}</span></div>
          <div className="flex items-center gap-2"><Lock size={18} /> <span className="text-sm font-mono">{t('trust3')}</span></div>
        </div>
      </section>

      {/* FEATURES GRID COM CARDS (Nova Inserção) */}
       <section className="py-20 bg-[#08090c] border-y border-[#2a2d35]">
        <div className="container mx-auto px-4">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-12 mb-16 max-w-6xl mx-auto">
            <Link href="/apostas" className="group">
                <div className="h-full bg-gradient-to-br from-blue-900/40 to-[#0b0c10] text-white rounded-3xl shadow-2xl p-8 text-center border-2 border-blue-500/30 backdrop-blur-md transform transition duration-300 group-hover:scale-[1.02] group-hover:border-blue-400 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Zap size={80} /></div>
                    <h1 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-wide">{t('basicCardTitle')} <br/><span className="text-blue-400">{t('basicCardValue')}</span></h1>
                    <p className="text-xl font-semibold mb-6 italic text-blue-200">{t('basicCardSub')} <span className="text-[#cfb16d] font-bold underline">{t('basicCardPoint')}</span></p>
                    <div className="bg-black/50 rounded-2xl p-4 mb-4 border border-blue-500/30">
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">{t('basicCardEntry')}</p>
                        <p className="text-5xl md:text-6xl font-black text-[#cfb16d] drop-shadow-lg">{t('basicCardPrice')}</p>
                        <p className="text-xs text-gray-500 mt-1">{t('basicCardEth')}</p>
                    </div>
                    <p className="text-sm font-medium text-blue-100/80">{t('basicCardFooter')}</p>
                </div>
            </Link>
            <Link href="/inter-bet" className="group">
                <div className="h-full bg-gradient-to-br from-purple-900/40 to-[#0b0c10] text-white rounded-3xl shadow-2xl p-8 text-center border-2 border-purple-500/30 backdrop-blur-md transform transition duration-300 group-hover:scale-[1.02] group-hover:border-purple-400 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20"><Gem size={80} /></div>
                    <h1 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-wide">{t('proCardTitle')} <br/><span className="text-purple-400">{t('proCardValue')}</span></h1>
                    <p className="text-xl font-semibold mb-6 italic text-purple-200">{t('proCardSub')} <span className="text-[#cfb16d] font-bold underline">{t('proCardPoint')}</span></p>
                    <div className="bg-black/50 rounded-2xl p-4 mb-4 border border-purple-500/30">
                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">{t('proCardEntry')}</p>
                        <p className="text-5xl md:text-6xl font-black text-[#cfb16d] drop-shadow-lg text-nowrap">{t('proCardPrice')}</p>
                        <p className="text-xs text-gray-500 mt-1">{t('proCardEth')}</p>
                    </div>
                    <p className="text-sm font-medium text-purple-100/80">{t('proCardFooter')}</p>
                </div>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#13151a] p-8 rounded-3xl border border-[#2a2d35] hover:border-[#cfb16d]/50 transition-colors group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] transition-colors"><ShieldCheck className="text-[#cfb16d] group-hover:text-black transition-colors" size={32} /></div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('card1Title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{t('card1Desc')}</p>
            </div>
            <div className="bg-[#13151a] p-8 rounded-3xl border border-[#2a2d35] hover:border-[#cfb16d]/50 transition-colors group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] transition-colors"><BarChart3 className="text-[#cfb16d] group-hover:text-black transition-colors" size={32} /></div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('card2Title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{t('card2Desc')}</p>
            </div>
            <div className="bg-[#13151a] p-8 rounded-3xl border border-[#2a2d35] hover:border-[#cfb16d]/50 transition-colors group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] transition-colors"><Coins className="text-[#cfb16d] group-hover:text-black transition-colors" size={32} /></div>
              <h3 className="text-2xl font-bold text-white mb-3">{t('card3Title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{t('card3Desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}