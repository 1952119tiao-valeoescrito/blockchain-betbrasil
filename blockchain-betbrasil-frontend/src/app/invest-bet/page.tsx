'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function InvestBetPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connectWallet = async () => {
    try {
      console.log('Conectando carteira...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = '0x742...d35E1';
      setWalletAddress(mockAddress);
      setIsConnected(true);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-sans text-slate-100">
      {/* Menu Fixo Padronizado */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg border border-purple-500/50">
                <Image src="/images/logo.png" alt="B3 Logo" width={40} height={40} className="object-cover" />
              </div>
              <span className="text-white font-bold text-xl hidden md:block">Blockchain Bet Brasil</span>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/como-jogar" className="text-slate-300 hover:text-emerald-300 transition-colors text-sm font-medium uppercase tracking-wide">Como Proceder</Link>
              <Link href="/apostas" className="text-slate-300 hover:text-emerald-300 transition-colors text-sm font-medium uppercase tracking-wide">Aderir</Link>
              <Link href="/invest-bet" className="text-white font-bold border-b-2 border-purple-500 transition-colors text-sm uppercase tracking-wide">Inter-Bet</Link>
              <Link href="/premiacao" className="text-slate-300 hover:text-emerald-300 transition-colors text-sm font-medium uppercase tracking-wide">Premiação</Link>
              <Link href="/admin" className="text-slate-300 hover:text-emerald-300 transition-colors text-sm font-medium uppercase tracking-wide">Painel Admin</Link>
            </div>

            {/* Botão Conectar Carteira */}
            <div className="hidden md:flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-3 py-1 rounded-lg text-sm font-mono">
                    {formatWalletAddress(walletAddress)}
                  </div>
                  <button onClick={disconnectWallet} className="bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/50 px-4 py-2 rounded-lg transition-colors text-xs font-bold uppercase">
                    Sair
                  </button>
                </div>
              ) : (
                <button onClick={connectWallet} className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white px-6 py-2 rounded-full transition-all duration-300 font-bold shadow-lg hover:shadow-emerald-500/20 text-sm">
                  Conectar Carteira
                </button>
              )}
            </div>

            {/* Menu Mobile */}
            <div className="flex md:hidden items-center space-x-2">
               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white p-2 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
          
          {/* Menu Mobile Overlay */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-xl h-screen p-4 space-y-2">
                <Link href="/apostas" className="block text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50">Aderir</Link>
                <Link href="/invest-bet" className="block text-purple-400 font-bold py-3 px-4 rounded-lg bg-purple-500/10">Inter-Bet</Link>
            </div>
          )}
        </div>
      </nav>

      {/* Conteúdo */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mb-8">
                <div className="bg-slate-900 rounded-xl p-8 md:p-12 border border-purple-500/20">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 mb-4">INTER-BET</h1>
                    <p className="text-xl md:text-2xl text-purple-200 font-light">A elite do investimento gamificado na Web3.</p>
                </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            {/* CARD BÁSICO */}
            <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-6">🎯 Aplicação Básica</h3>
              <ul className="space-y-4 text-slate-300 text-lg mb-8">
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Investimento</span><span className="font-bold text-white">R$ 5,00</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Prêmio Máximo</span><span className="font-bold text-emerald-400">R$ 50.000,00</span></li>
                <li className="flex justify-between border-b border-slate-700 pb-2"><span>Bônus Zero Pontos</span><span className="font-bold text-amber-400">R$ 0,625</span></li>
              </ul>
              <div className="text-center">
                 {/* LINK INTELIGENTE PARA BASIC */}
                 <Link href="/apostas?tier=BASIC">
                    <button className="w-full py-3 rounded-xl border border-emerald-500 text-emerald-400 font-bold hover:bg-emerald-500 hover:text-white transition-all">
                        Acessar Básico
                    </button>
                 </Link>
              </div>
            </div>

            {/* CARD INVEST-BET */}
            <div className="bg-gradient-to-b from-purple-900/40 to-slate-900 p-8 rounded-3xl border border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)] transform md:-translate-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">PREMIUM</div>
              <h3 className="text-3xl font-bold text-purple-400 mb-6">💎 Inter-Bet</h3>
              <ul className="space-y-4 text-slate-200 text-lg mb-8">
                <li className="flex justify-between border-b border-purple-500/30 pb-2"><span>Investimento</span><span className="font-bold text-white text-xl">R$ 1.000,00</span></li>
                <li className="flex justify-between border-b border-purple-500/30 pb-2"><span>Prêmio Máximo</span><span className="font-bold text-purple-300 text-xl">R$ 10 Milhões</span></li>
                <li className="flex justify-between border-b border-purple-500/30 pb-2"><span>Bônus Zero Pontos</span><span className="font-bold text-amber-400">R$ 125,00</span></li>
              </ul>
              <div className="text-center">
                 {/* LINK INTELIGENTE PARA INVEST */}
                 <Link href="/apostas?tier=INVEST">
                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/40 hover:scale-[1.02] transition-all">
                        Acessar Inter-Bet Agora
                    </button>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}