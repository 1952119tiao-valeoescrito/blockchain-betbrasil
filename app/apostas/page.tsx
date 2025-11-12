'use client';

import { useState } from 'react';

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

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const showNotification = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation removido */}
      
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg ${
          notification.type === 'success' ? 'bg-green-500' :
          notification.type === 'error' ? 'bg-red-500' :
          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        } text-white`}>
          {notification.message}
        </div>
      )}

      <main className="pt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Página de Apostas</h1>
          <p className="text-center text-gray-600">Funcionalidade em desenvolvimento...</p>
          
          <div className="mt-8 text-center">
            <button 
              onClick={connectWallet}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Conectar Carteira
            </button>
          </div>
        </div>
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