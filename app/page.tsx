'use client';

import { useState } from 'react';
import Navigation from './components/Navigation';
import WalletConnect from './components/WalletConnect';
import HomeSections from './components/HomeSections';

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    try {
      console.log('Conectando carteira...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const MOCK_ERC20_ADDRESS = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
      setWalletAddress(MOCK_ERC20_ADDRESS);
      setIsConnected(true);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        isConnected={isConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />
      
      <HomeSections connectWallet={connectWallet} />
      
      <footer className="bg-slate-900/80 border-t border-slate-700 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 Blockchain Bet Brasil. Todos os direitos reservados.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Plataforma de interação e estratégia gamificada
          </p>
        </div>
      </footer>
    </div>
  );
}