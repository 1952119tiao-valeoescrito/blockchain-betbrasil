'use client';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  formatWalletAddress: (address: string) => string;
}

export default function WalletConnect({ 
  isConnected, 
  walletAddress, 
  connectWallet, 
  disconnectWallet,
  formatWalletAddress 
}: WalletConnectProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center space-x-4">
        {isConnected ? (
          <div className="flex items-center space-x-3 rounded-xl bg-slate-800 p-1 border border-slate-700">
            <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-3 py-1 rounded-lg text-sm font-mono">
              {formatWalletAddress(walletAddress)}
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg transition-colors text-sm font-semibold"
            >
              Desconectar
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
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

      <div className="flex md:hidden items-center space-x-2">
        {isConnected ? (
          <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-2 py-1 rounded text-xs mr-2 font-mono">
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
      </div>
    </div>
  );
}