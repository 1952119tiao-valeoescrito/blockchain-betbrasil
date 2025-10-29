'use client';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  formatWalletAddress: (address: string) => string;
}

function WalletConnect({ 
  isConnected, 
  walletAddress, 
  connectWallet, 
  disconnectWallet,
  formatWalletAddress 
}: WalletConnectProps) {
  return (
    <div className="flex items-center space-x-4">
      {isConnected ? (
        <div className="flex items-center space-x-3">
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">
            {formatWalletAddress(walletAddress)}
          </span>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300 text-sm font-semibold"
          >
            Desconectar
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition duration-300 font-semibold shadow-lg"
        >
          Conectar Carteira
        </button>
      )}
    </div>
  );
}

interface NavigationProps {
  isConnected: boolean;
  walletAddress: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  formatWalletAddress: (address: string) => string;
}

export default function Navigation({ 
  isConnected, 
  walletAddress, 
  connectWallet, 
  disconnectWallet,
  formatWalletAddress 
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          <a href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">B³</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:inline">Blockchain Bet Brasil</span>
            <span className="text-white font-bold text-xl sm:hidden">B³</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-emerald-400 font-semibold">Início</a>
            <a href="/apostas" className="text-slate-300 hover:text-white transition-colors">Apostas</a>
            <a href="/admin" className="text-slate-300 hover:text-white transition-colors">Painel Admin</a>
          </div>

          <WalletConnect
            isConnected={isConnected}
            walletAddress={walletAddress}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            formatWalletAddress={formatWalletAddress}
          />
        </div>
      </div>
    </nav>
  );
}