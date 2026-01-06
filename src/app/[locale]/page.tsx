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
      
      {/* BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[300 md:w-[500px] h-[300 md:h-[500px] bg-[#cfb16d]/5 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[300 md:w-[500px] h-[300 md:h-[500px] bg-[#cfb16d]/5 blur-[80px] md:blur-[120px] rounded-full"></div>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 border-b ${isScrolled || mobileMenuOpen ? 'bg-[#0b0c10]/95 backdrop-blur-md border-[#2a2d35] py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 md:gap-3 z-50">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden border border-[#2a2d35] bg-[#13151a] shrink-0">
               <Image src="/images/logo.png" alt="Logo" fill className="object-cover p-1" />
            </div>
            <div className="flex flex-col leading-none">
                <span className="font-bold text-white tracking-tight text-[10px] md:text-sm uppercase">Blockchain Bet</span>
                <span className="text-[#cfb16d] font-bold text-xs md:text-base uppercase tracking-wide">{tn('subtitle')}</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/como-funciona" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{tn('how')}</Link>
            <Link href="/resultados" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{tn('results')}</Link>
            <Link href="/premiacao" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{tn('prizes')}</Link>
            <Link href="/inter-bet" className="text-sm font-medium text-[#cfb16d] hover:text-[#b08d55] transition-colors flex items-center gap-1"><Zap size={14} /> Inter-Bet Pro</Link>
            <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" label={tn('connect')} />
          </div>

          {/* MOBILE NAV BUTTONS */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="scale-90 origin-right">
              <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="none" />
            </div>
            <button className="text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`absolute top-full left-0 w-full bg-[#0b0c10]/98 backdrop-blur-xl border-b border-[#2a2d35] p-8 flex flex-col gap-6 md:hidden shadow-2xl transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
             <Link href="/como-funciona" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-gray-300 border-b border-white/5 pb-2">{tn('how')}</Link>
             <Link href="/resultados" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-gray-300 border-b border-white/5 pb-2">{tn('results')}</Link>
             <Link href="/premiacao" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-gray-300 border-b border-white/5 pb-2">{tn('prizes')}</Link>
             <Link href="/inter-bet" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold text-[#cfb16d]">{t('brand')}</Link>
             <Link href="/apostas" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full bg-[#cfb16d] text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-[#cfb16d]/20">
                  {tn('access')}
                </button>
             </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 container mx-auto px-4 flex flex-col items-center text-center gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#13151a] border border-[#2a2d35] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#cfb16d] mb-2">
          <span className="w-2 h-2 rounded-full bg-[#cfb16d] animate-pulse"></span>
          Protocolo 100% On-Chain
        </div>
        
        <h3 className="text-lg md:text-3xl font-bold text-white tracking-wide">
            {t('welcome')} <span className="text-[#cfb16d] block md:inline">{t('brand')}</span>
        </h3>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter my-2">
            {t('heroTitle')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfb16d] via-[#f0e68c] to-[#cfb16d]">
              {t('heroHighlight')}
            </span>
        </h1>

        <div className="max-w-4xl space-y-4">
            <h2 className="text-lg md:text-3xl font-bold text-gray-200 px-4">
                {t('subtitle')} <span className="text-white block mt-2 font-light text-base md:text-2xl">{t('subtext')}</span>
            </h2>
            <p className="text-xl md:text-3xl font-black text-[#cfb16d] animate-pulse drop-shadow-[0_0_15px_rgba(207,177,109,0.3)] py-4 uppercase">
                {t('pulseText')}
            </p>
        </div>

        <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed border-t border-[#2a2d35] pt-8 px-4">
            {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full max-w-md md:max-w-none">
          <Link href="/inter-bet" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-[#cfb16d] text-black font-black text-base md:text-lg px-10 py-4 rounded-xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 uppercase tracking-tighter">
              {t('btnStart')} <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/como-funciona" className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-transparent text-white border border-[#2a2d35] font-bold text-base md:text-lg px-10 py-4 rounded-xl hover:bg-white/5 transition-all">
              {t('btnDocs')}
            </button>
          </Link>
        </div>

        {/* TRUST ICONS */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12 opacity-40">
          <div className="flex items-center gap-2"><Globe size={16} /> <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest">{t('trust1')}</span></div>
          <div className="flex items-center gap-2"><Cpu size={16} /> <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest">{t('trust2')}</span></div>
          <div className="flex items-center gap-2"><Lock size={16} /> <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest">{t('trust3')}</span></div>
        </div>
      </section>

      {/* PRICING CARDS SECTION */}
      <section className="py-20 bg-[#08090c] border-y border-[#2a2d35]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md: {/* PRICING CARDS SECTION (Continuação) */}
      <section className="py-20 bg-[#08090c] border-y border-[#2a2d35]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
            
            {/* BASIC CARD */}
            <Link href="/apostas" className="group">
                <div className="h-full bg-gradient-to-br from-blue-900/20 to-[#0b0c10] text-white rounded-[2rem] p-6 md:p-10 border-2 border-blue-500/20 backdrop-blur-md transform transition duration-500 hover:scale-[1.02] hover:border-blue-400 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform"><Zap size={100} /></div>
                    
                    <h1 className="text-xl md:text-3xl font-black mb-4 uppercase tracking-tight leading-tight">
                      {t('basicCardTitle')} <br/>
                      <span className="text-blue-400 text-3xl md:text-5xl">{t('basicCardValue')}</span>
                    </h1>
                    
                    <p className="text-lg font-medium mb-8 italic text-blue-200/70">
                      {t('basicCardSub')} <span className="text-[#cfb16d] font-bold underline decoration-2">{t('basicCardPoint')}</span>
                    </p>

                    <div className="bg-black/40 rounded-3xl p-6 mb-6 border border-blue-500/20 shadow-inner">
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">{t('basicCardEntry')}</p>
                        <p className="text-4xl md:text-6xl font-black text-[#cfb16d] tracking-tighter">{t('basicCardPrice')}</p>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-2 font-mono uppercase tracking-widest">{t('basicCardEth')}</p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-blue-100/60 uppercase tracking-widest">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                       {t('basicCardFooter')}
                    </div>
                </div>
            </Link>

            {/* PRO CARD */}
            <Link href="/inter-bet" className="group">
                <div className="h-full bg-gradient-to-br from-purple-900/20 to-[#0b0c10] text-white rounded-[2rem] p-6 md:p-10 border-2 border-purple-500/20 backdrop-blur-md transform transition duration-500 hover:scale-[1.02] hover:border-purple-400 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform"><Gem size={100} /></div>
                    
                    <h1 className="text-xl md:text-3xl font-black mb-4 uppercase tracking-tight leading-tight">
                      {t('proCardTitle')} <br/>
                      <span className="text-purple-400 text-3xl md:text-5xl">{t('proCardValue')}</span>
                    </h1>
                    
                    <p className="text-lg font-medium mb-8 italic text-purple-200/70">
                      {t('proCardSub')} <span className="text-[#cfb16d] font-bold underline decoration-2">{t('proCardPoint')}</span>
                    </p>

                    <div className="bg-black/40 rounded-3xl p-6 mb-6 border border-purple-500/20 shadow-inner text-center">
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2">{t('proCardEntry')}</p>
                        <p className="text-4xl md:text-6xl font-black text-[#cfb16d] tracking-tighter">
                          {t('proCardPrice')}
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500 mt-2 font-mono uppercase tracking-widest">{t('proCardEth')}</p>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold text-purple-100/60 uppercase tracking-widest">
                       <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                       {t('proCardFooter')}
                    </div>
                </div>
            </Link>
          </div>

          {/* FEATURES GRID (Artigo 1, 2 e 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            
            {/* CARD 1 */}
            <div className="bg-[#13151a]/50 p-8 rounded-[2rem] border border-[#2a2d35] hover:border-[#cfb16d]/40 transition-all group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] group-hover:scale-110 transition-all duration-300">
                <ShieldCheck className="text-[#cfb16d] group-hover:text-black" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-tight">{t('card1Title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{t('card1Desc')}</p>
            </div>

            {/* CARD 2 */}
            <div className="bg-[#13151a]/50 p-8 rounded-[2rem] border border-[#2a2d35] hover:border-[#cfb16d]/40 transition-all group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] group-hover:scale-110 transition-all duration-300">
                <BarChart3 className="text-[#cfb16d] group-hover:text-black" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-tight">{t('card2Title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{t('card2Desc')}</p>
            </div>

            {/* CARD 3 */}
            <div className="bg-[#13151a]/50 p-8 rounded-[2rem] border border-[#2a2d35] hover:border-[#cfb16d]/40 transition-all group">
              <div className="w-14 h-14 bg-[#1a1c22] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#cfb16d] group-hover:scale-110 transition-all duration-300">
                <Coins className="text-[#cfb16d] group-hover:text-black" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-tight">{t('card3Title')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{t('card3Desc')}</p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER SIMPLIFICADO */}
      <footer className="py-12 border-t border-[#2a2d35] text-center">
         <div className="container mx-auto px-4">
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.4em] font-medium">
              © {new Date().getFullYear()} Blockchain Bet Brasil | Protocolo Descentralizado
            </p>
            <div className="flex justify-center gap-6 mt-6 opacity-30">
               <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20"></div>
               <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20"></div>
               <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20"></div>
            </div>
         </div>
      </footer>
    </div>
  );
}