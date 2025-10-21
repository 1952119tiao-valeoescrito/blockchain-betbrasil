'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InvestBetPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connectWallet = async () => {
    try {
      console.log('Conectando carteira...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9
';
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
      {/* Menu Fixo Padronizado */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B³</span>
              </div>
              <span className="text-white font-bold text-xl">Blockchain Bet Brasil</span>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/como-jogar" className="text-slate-300 hover:text-white transition-colors">
               Como Funciona
              </Link>
              <Link href="/apostas" className="text-emerald-400 font-semibold">
                Investir
              </Link>
              <Link href="/invest-bet" className="text-slate-300 hover:text-white transition-colors">
                Invest-Bet
              </Link>
              <Link href="/premiacao" className="text-slate-300 hover:text-white transition-colors">
                Premiação
              </Link>
              <Link href="/admin" className="text-slate-300 hover:text-white transition-colors">
                Painel Admin
              </Link>
            </div>

            {/* Botão Conectar Carteira */}
            <div className="hidden md:flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-3 py-1 rounded-lg text-sm">
                    {formatWalletAddress(walletAddress)}
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Desconectar
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg"
                >
                  Conectar Carteira
                </button>
              )}
            </div>

            {/* Menu Mobile - Hamburger */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Botão Conectar Carteira Mobile */}
              {isConnected ? (
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-2 py-1 rounded text-xs mr-2">
                  {formatWalletAddress(walletAddress)}
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded text-xs font-semibold mr-2"
                >
                  Conectar
                </button>
              )}

              {/* Botão Hamburger */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white p-2 transition-colors"
              >
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

          {/* Menu Mobile Expandido - Overlay */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-xl">
              <div className="flex flex-col space-y-0 p-4">
                <Link 
                  href="/aplicacoes" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Aplicações
                </Link>
                <Link 
                  href="/invest-bet" 
                  className="text-emerald-400 font-semibold py-3 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Invest-Bet
                </Link>
                <Link 
                  href="/como-jogar" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Como Proceder
                </Link>
                <Link 
                  href="/premiacao" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Premiação
                </Link>
                <Link 
                  href="/admin" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Painel Admin
                </Link>
                
                {/* Ações Mobile */}
                <div className="pt-4 mt-4 border-t border-slate-700">
                  {isConnected ? (
                    <button
                      onClick={() => {
                        disconnectWallet();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                    >
                      Desconectar Carteira
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        connectWallet();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-semibold"
                    >
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
        <div className="container mx-auto p-6">
          <div className="text-center mb-12">
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-2xl p-8 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                💼 INVEST-BET PREMIUM
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                Para investidores que buscam retornos extraordinários
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-lg">
                <div className="bg-purple-500/30 px-4 py-2 rounded-lg">
                  <span className="text-purple-300">Valor:</span>
                  <span className="text-white font-bold ml-2">R$ 1.000,00</span>
                </div>
                <div className="bg-purple-500/30 px-4 py-2 rounded-lg">
                  <span className="text-purple-300">Prêmio Máximo:</span>
                  <span className="text-white font-bold ml-2">R$ 10.000.000,00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Opções de Aplicação */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Aplicação Regular */}
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-emerald-500/30">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">
                🎯 Aplicação Regular
              </h3>
              <ul className="text-slate-300 space-y-3">
                <li>• <strong>Valor:</strong> R$ 5,00</li>
                <li>• <strong>Prêmio Máximo:</strong> R$ 50.000,00</li>
                <li>• <strong>Bônus Zero Pontos:</strong> R$ 0,625</li>
                <li>• <strong>Aplicação Grátis:</strong> A cada 8 aplicações</li>
              </ul>
            </div>

            {/* Invest-Bet */}
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">
                💼 Invest-Bet
              </h3>
              <ul className="text-slate-300 space-y-3">
                <li>• <strong>Valor:</strong> R$ 1.000,00</li>
                <li>• <strong>Prêmio Máximo:</strong> R$ 10.000.000,00</li>
                <li>• <strong>Bônus Zero Pontos:</strong> R$ 125,00</li>
                <li>• <strong>Invest-Bet Grátis:</strong> A cada 8 invest-bets</li>
              </ul>
            </div>
          </div>

          {/* Conexão da Carteira */}
          <div className="w-full max-w-2xl mx-auto p-8 bg-slate-800 rounded-lg shadow-xl border border-purple-500/30 text-center">
            <div className="text-purple-400 text-6xl mb-4">
              🔒
            </div>
            <h3 className="text-2xl font-bold text-purple-300 mb-4">
              {isConnected ? 'Carteira Conectada' : 'Carteira Não Conectada'}
            </h3>
            <p className="text-lg text-slate-300 mb-6">
              {isConnected 
                ? 'Sua carteira está conectada e pronta para investir!' 
                : 'Para acessar o Invest-Bet Premium, conecte sua carteira Web3.'
              }
            </p>
            {isConnected ? (
              <div className="space-y-4">
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-4 py-2 rounded-lg text-sm">
                  {formatWalletAddress(walletAddress)}
                </div>
                <button 
                  onClick={disconnectWallet}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Desconectar Carteira
                </button>
              </div>
            ) : (
              <button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                🦊 Conectar Carteira
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="w-full bg-slate-800 mt-16 border-t border-slate-700">
        <div className="container mx-auto text-center p-6 text-slate-400 text-sm">
          <p>© 2025 Blockchain Bet Brasil. Todos os direitos reservados.</p>
          <p className="mt-2">Source: 601700 | Auditoria de Segurança Ativa</p>
        </div>
      </footer>
    </div>
  );
}