'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Header() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { trackWalletConnection, trackNavigation } = useAnalytics();

 const formatWalletAddress = (addr: string | undefined) => {
  return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Conectando...';
};

  const handleConnect = async () => {
    try {
      connect({ connector: injected() });
      trackWalletConnection('injected', true);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      trackWalletConnection('injected', false);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    trackWalletConnection('injected', false);
  };

  const handleNavClick = (path: string) => {
    const currentPath = pathname;
    trackNavigation(currentPath, path);
    setIsMenuOpen(false);
    router.push(path);
  };

  const locale = pathname.split('/')[1] || 'pt';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button onClick={() => handleNavClick(`/${locale}`)} className="flex items-center space-x-2">
           <div className="flex items-center space-x-3">
  {/* Logo com borda e sombra */}
  <div className="flex items-center justify-center bg-white/10 p-1 rounded-lg border border-emerald-400/20 shadow-lg">
    <img 
      src="/images/logo.png" 
      alt="Blockchain Bet Brasil" 
      className="h-7 w-7 object-contain"
    />
  </div>
  
  {/* Texto para desktop */}
  <span className="text-white font-bold text-xl hidden sm:inline bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
    Blockchain Bet BRASIL
  </span>
  
  {/* Texto alternativo para mobile */}
  <span className="text-white font-bold text-xl sm:hidden">
    B³
  </span>
</div>
          </button>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              className="text-slate-300 hover:text-white transition-colors" 
              onClick={() => handleNavClick(`/${locale}/bet`)}
            >
              Aplicações
            </button>
            <button className="text-slate-300 hover:text-white transition-colors" onClick={() => handleNavClick(`/${locale}/premiacao`)}>
              Premiação
            </button>
            <button className="text-slate-300 hover:text-white transition-colors" onClick={() => handleNavClick(`/${locale}/como-funciona`)}>
              Como Funciona
            </button>
            <button className="text-slate-300 hover:text-white transition-colors" onClick={() => handleNavClick(`/${locale}/admin`)}>
              Admin
            </button>
          </div>

          {/* Botão Conectar Carteira (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3 rounded-xl bg-slate-800 p-1 border border-slate-700">
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-3 py-1 rounded-lg text-sm font-mono">
                  {formatWalletAddress(address)}
                </div>
                <button
                  onClick={handleDisconnect}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg transition-colors text-sm font-semibold"
                >
                  Desconectar
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg shadow-emerald-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                </svg>
                Conectar Carteira
              </button>
            )}
          </div>

          {/* Menu Mobile */}
          <div className="flex md:hidden items-center space-x-2">
            {isConnected ? (
              <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-2 py-1 rounded text-xs mr-2 font-mono">
                {formatWalletAddress(address)}
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded text-xs font-semibold mr-2"
              >
                Conectar
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white p-2 transition-colors rounded-lg bg-slate-800/50"
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

        {/* Menu Mobile Expandido */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-xl">
            <div className="flex flex-col space-y-0 p-4">
              <button className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors text-left" onClick={() => handleNavClick(`/${locale}/bet`)}>
                Aplicações
              </button>
              <button className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors text-left" onClick={() => handleNavClick(`/${locale}/premiacao`)}>
                Premiação
              </button>
              <button className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors text-left" onClick={() => handleNavClick(`/${locale}/como-funciona`)}>
                Como Funciona
              </button>
              <button className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors text-left" onClick={() => handleNavClick(`/${locale}/admin`)}>
                Admin
              </button>
              
              <div className="pt-4 mt-4 border-t border-slate-700">
                {isConnected ? (
                  <button
                    onClick={handleDisconnect}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                  >
                    Desconectar Carteira
                  </button>
                ) : (
                  <button
                    onClick={handleConnect}
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
  );
}