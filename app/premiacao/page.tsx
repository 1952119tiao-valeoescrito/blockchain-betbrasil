'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PremiacaoPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Menu Fixo */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B³</span>
              </div>
              <span className="text-white font-bold text-xl">Blockchain Bet Brasil</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/apostas" className="text-slate-300 hover:text-white transition-colors">Apostas</Link>
              <Link href="/invest-bet" className="text-slate-300 hover:text-white transition-colors">Invest-Bet</Link>
              <Link href="/como-jogar" className="text-slate-300 hover:text-white transition-colors">Como Proceder</Link>
              <Link href="/premiacao" className="text-emerald-400 font-semibold">Premiação</Link>
              <Link href="/admin" className="text-slate-300 hover:text-white transition-colors">Painel Admin</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-3 py-1 rounded-lg text-sm">
                    {formatWalletAddress(walletAddress)}
                  </div>
                  <button onClick={disconnectWallet} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    Desconectar
                  </button>
                </div>
              ) : (
                <button onClick={connectWallet} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg">
                  Conectar Carteira
                </button>
              )}
            </div>

            <div className="flex md:hidden items-center space-x-2">
              {isConnected ? (
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-2 py-1 rounded text-xs mr-2">
                  {formatWalletAddress(walletAddress)}
                </div>
              ) : (
                <button onClick={connectWallet} className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded text-xs font-semibold mr-2">
                  Conectar
                </button>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white p-2 transition-colors">
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-xl">
              <div className="flex flex-col space-y-0 p-4">
                <Link href="/apostas" className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setIsMenuOpen(false)}>Apostas</Link>
                <Link href="/invest-bet" className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setIsMenuOpen(false)}>Invest-Bet</Link>
                <Link href="/como-jogar" className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setIsMenuOpen(false)}>Como Jogar</Link>
                <Link href="/premiacao" className="text-emerald-400 font-semibold py-3 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20" onClick={() => setIsMenuOpen(false)}>Premiação</Link>
                <Link href="/admin" className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors" onClick={() => setIsMenuOpen(false)}>Painel Admin</Link>
                
                <div className="pt-4 mt-4 border-t border-slate-700">
                  {isConnected ? (
                    <button onClick={() => { disconnectWallet(); setIsMenuOpen(false); }} className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium">
                      Desconectar Carteira
                    </button>
                  ) : (
                    <button onClick={() => { connectWallet(); setIsMenuOpen(false); }} className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-semibold">
                      Conectar Carteira
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-white text-center mb-8">Tabela de Premiação</h1>

            {/* Aposta Básica */}
            <div className="bg-slate-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-emerald-400 mb-6 text-center">🎯 Aposta Básica - R$ 5,00</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-400">Pontuação</th>
                      <th className="text-right py-3 text-slate-400">Prêmio Máximo</th>
                      <th className="text-right py-3 text-slate-400">Distribuição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="py-3"><span className="font-bold text-green-400">5 pontos</span></td>
                      <td className="text-right py-3 font-bold text-green-400">R$ 50.000,00</td>
                      <td className="text-right py-3 text-slate-300">50% do pote</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3"><span className="font-bold text-blue-400">4 pontos</span></td>
                      <td className="text-right py-3 font-bold text-blue-400">R$ 5.000,00</td>
                      <td className="text-right py-3 text-slate-300">20% do pote</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3"><span className="font-bold text-yellow-400">3 pontos</span></td>
                      <td className="text-right py-3 font-bold text-yellow-400">R$ 500,00</td>
                      <td className="text-right py-3 text-slate-300">15% do pote</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3"><span className="font-bold text-orange-400">2 pontos</span></td>
                      <td className="text-right py-3 font-bold text-orange-400">R$ 50,00</td>
                      <td className="text-right py-3 text-slate-300">10% do pote</td>
                    </tr>
                    <tr>
                      <td className="py-3"><span className="font-bold text-purple-400">1 ponto</span></td>
                      <td className="text-right py-3 font-bold text-purple-400">R$ 5,00</td>
                      <td className="text-right py-3 text-slate-300">5% do pote</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invest-Bet */}
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">💎 Invest-Bet - R$ 1.000,00</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-400">Pontuação</th>
                      <th className="text-right py-3 text-slate-400">Prêmio Máximo</th>
                      <th className="text-right py-3 text-slate-400">Distribuição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700">
                      <td className="py-3"><span className="font-bold text-green-400">5 pontos</span></td>
                      <td className="text-right py-3 font-bold text-green-400">R$ 10.000.000,00</td>
                      <td className="text-right py-3 text-slate-300">50% do pote</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3"><span className="font-bold text-blue-400">4 pontos</span></td>
                      <td className="text-right py-3 font-bold text-blue-400">R$ 1.000.000,00</td>
                      <td className="text-right py-3 text-slate-300">20% do pote</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3"><span className="font-bold text-yellow-400">3 pontos</span></td>
                      <td className="text-right py-3 font-bold text-yellow-400">R$ 100.000,00</td>
                      <td className="text-right py-3 text-slate-300">15% do pote</td>
                    </tr>
                    <tr className="border-b border-slate-700">
                      <td className="py-3"><span className="font-bold text-orange-400">2 pontos</span></td>
                      <td className="text-right py-3 font-bold text-orange-400">R$ 10.000,00</td>
                      <td className="text-right py-3 text-slate-300">10% do pote</td>
                    </tr>
                    <tr>
                      <td className="py-3"><span className="font-bold text-purple-400">1 ponto</span></td>
                      <td className="text-right py-3 font-bold text-purple-400">R$ 1.000,00</td>
                      <td className="text-right py-3 text-slate-300">5% do pote</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sistema de Bônus */}
            <div className="mt-8 bg-amber-500/20 rounded-lg p-6 border border-amber-500/30">
              <h2 className="text-2xl font-bold text-amber-300 mb-4 text-center">🎁 Sistema de Bônus</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-amber-200 mb-3">Bônus por Zero Pontos</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-amber-500/30">
                      <span className="text-amber-100">Aposta Básica:</span>
                      <span className="font-bold text-amber-300">R$ 0,625</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-amber-100">Invest-Bet:</span>
                      <span className="font-bold text-amber-300">R$ 125,00</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-amber-200 mb-3">Free Bets</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-amber-500/30">
                      <span className="text-amber-100">Aposta Básica:</span>
                      <span className="font-bold text-amber-300">R$ 5,00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-amber-100">Invest-Bet:</span>
                      <span className="font-bold text-amber-300">R$ 1.000,00</span>
                    </div>
                  </div>
                  <p className="text-amber-100 text-sm mt-3 text-center">🎯 8 apostas com zero pontos = 1 Free Bet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}