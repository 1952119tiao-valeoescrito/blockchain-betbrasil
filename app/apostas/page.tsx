'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import WalletConnect from '../components/WalletConnect';
import BetForm from '../components/BetForm';
import Notification from '../components/Notification';

export default function ApostasPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [notification, setNotification] = useState<{type: 'success' | 'error' | 'info' | 'warning', message: string} | null>(null);

  const connectWallet = async () => {
    try {
      console.log('Conectando carteira...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const MOCK_ERC20_ADDRESS = '0xdc64a140aa3e981100a9beca4e685f962f0cf6c9';
      setWalletAddress(MOCK_ERC20_ADDRESS);
      setIsConnected(true);
      showNotification('success', '✅ Carteira conectada com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      showNotification('error', '❌ Erro ao conectar carteira');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
    showNotification('info', '🔌 Carteira desconectada');
  };

  const showNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        isConnected={isConnected}
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      {/* Sistema de Notificação */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <main className="pt-16">
        <BetForm 
          isConnected={isConnected}
          connectWallet={connectWallet}
          showNotification={showNotification}
        />
      </main>

      <footer className="bg-slate-900/80 border-t border-slate-700 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 Blockchain Bet Brasil. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}