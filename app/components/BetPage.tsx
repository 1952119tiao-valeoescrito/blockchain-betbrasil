'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function BetPage() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const t = useTranslations('Bet');

  const handleConnect = async () => {
    try {
      connect({ connector: injected() });
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const formatWalletAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="pt-20 pb-8">
        <div className="container mx-auto p-6">
          <div className="text-center mb-12">
            <div className="bg-emerald-600/20 border border-emerald-500/30 rounded-2xl p-8 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🎯 APLICAÇÃO REGULAR
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                Para todos que buscam uma chance de ganhar grandes prêmios
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-lg">
                <div className="bg-emerald-500/30 px-4 py-2 rounded-lg">
                  <span className="text-emerald-300">Valor:</span>
                  <span className="text-white font-bold ml-2">R$ 5,00</span>
                </div>
                <div className="bg-emerald-500/30 px-4 py-2 rounded-lg">
                  <span className="text-emerald-300">Prêmio Máximo:</span>
                  <span className="text-white font-bold ml-2">R$ 50.000,00</span>
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
          <div className="w-full max-w-2xl mx-auto p-8 bg-slate-800 rounded-lg shadow-xl border border-emerald-500/30 text-center">
            <div className="text-emerald-400 text-6xl mb-4">
              🔒
            </div>
            <h3 className="text-2xl font-bold text-emerald-300 mb-4">
              {isConnected ? 'Carteira Conectada' : 'Carteira Não Conectada'}
            </h3>
            <p className="text-lg text-slate-300 mb-6">
              {isConnected 
                ? 'Sua carteira está conectada e pronta para aplicar!' 
                : 'Para fazer uma aplicação, conecte sua carteira Web3.'
              }
            </p>
            {isConnected ? (
              <div className="space-y-4">
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-4 py-2 rounded-lg text-sm">
                  {formatWalletAddress(address!)}
                </div>
                <button 
                  onClick={handleDisconnect}
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Desconectar Carteira
                </button>
              </div>
            ) : (
              <button 
                onClick={handleConnect}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                🦊 Conectar Carteira
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}