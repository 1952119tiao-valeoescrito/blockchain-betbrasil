'use client';

import { useState, useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { parseAbiItem } from 'viem';
import { CONTRACT_ADDRESS } from '@/constants/abi';
import { Loader2, History, ExternalLink, Trophy } from 'lucide-react';

interface BetHistory {
  hash: string;
  rodadaId: string;
  tier: string;
  blockNumber: bigint;
}

export default function MyBets() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient(); // Cliente para ler a blockchain
  
  const [bets, setBets] = useState<BetHistory[]>([]);
  const [loading, setLoading] = useState(false);

  // Função que busca os eventos na Blockchain
  const fetchMyBets = async () => {
    if (!address || !publicClient) return;
    
    setLoading(true);
    try {
      // Busca logs do evento "NovaAposta" filtrados pelo usuário
      const logs = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: parseAbiItem('event NovaAposta(uint256 indexed rodadaId, address indexed user, uint8 tier, bool usouFreeBet)'),
        args: {
          user: address, // Filtra só as minhas apostas
        },
        fromBlock: 'earliest', // Busca desde o início
      });

      // Formata os dados para exibir
      const formattedBets = logs.map((log) => ({
        hash: log.transactionHash,
        rodadaId: log.args.rodadaId?.toString() || '?',
        tier: log.args.tier === 1 ? 'BÁSICO' : 'INTER-BET',
        blockNumber: log.blockNumber,
      })).reverse(); // Mostra as mais recentes primeiro

      setBets(formattedBets);
    } catch (error) {
      console.error("Erro ao buscar apostas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Busca assim que conecta ou abre o componente
  useEffect(() => {
    if (isConnected) {
        fetchMyBets();
    }
  }, [address, isConnected]);

  if (!isConnected) return null;

  return (
    <div className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-xl max-h-[500px] overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="text-emerald-500" /> Histórico de Apostas
        </h3>
        <button onClick={fetchMyBets} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
            {loading ? <Loader2 size={12} className="animate-spin" /> : "Atualizar"}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500 gap-2">
            <Loader2 className="animate-spin text-emerald-500" size={32} />
            <p className="text-xs">Buscando na Blockchain...</p>
        </div>
      ) : bets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
            <p>Nenhuma aposta encontrada nesta carteira.</p>
        </div>
      ) : (
        <div className="space-y-3">
            {bets.map((bet) => (
                <div key={bet.hash} className="bg-[#0a0a0a] p-4 rounded-lg border border-white/5 flex justify-between items-center hover:border-emerald-500/30 transition-colors group">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded">
                                Rodada #{bet.rodadaId}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${bet.tier === 'INTER-BET' ? 'bg-white text-black' : 'bg-yellow-600/20 text-yellow-500'}`}>
                                {bet.tier}
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-500">ID Transação: {bet.hash.slice(0, 6)}...{bet.hash.slice(-4)}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {/* Botão para ver no Explorer */}
                        <a 
                            href={`https://basescan.org/tx/${bet.hash}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all"
                            title="Ver recibo na Blockchain"
                        >
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
      )}
      
      <p className="text-[10px] text-gray-600 mt-4 text-center">
        * Para conferir se ganhou, compare o número da <strong>Rodada</strong> com o Resultado Oficial no Simulador.
      </p>
    </div>
  );
}