'use client';

import { useState, useEffect } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { parseAbiItem } from 'viem';
import { CONTRACT_ADDRESS } from '@/constants/abi';
import { Loader2, History, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

interface BetHistory {
  hash: string;
  rodadaId: string;
  blockNumber: bigint;
}

export default function MyBetsHistory() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient(); 
  
  const [bets, setBets] = useState<BetHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyBets = async () => {
    if (!address || !publicClient) return;
    
    setLoading(true);
    try {
      // Monitora o evento do novo contrato descentralizado: NovaAplicacao
      const logs = await publicClient.getLogs({
        address: CONTRACT_ADDRESS as `0x${string}`,
        event: parseAbiItem('event NovaAplicacao(uint256 indexed rodadaId, address indexed participante)'),
        args: {
          participante: address, 
        },
        fromBlock: 'earliest', 
      });

      const formattedBets = logs.map((log) => ({
        hash: log.transactionHash,
        rodadaId: log.args.rodadaId?.toString() || '?',
        blockNumber: log.blockNumber,
      })).reverse(); // Mais recentes primeiro

      setBets(formattedBets);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
        fetchMyBets();
    }
  }, [address, isConnected]);

  if (!isConnected) return null;

  return (
    <div className="bg-[#13151a] p-6 rounded-2xl border border-[#2a2d35] shadow-2xl max-h-[500px] overflow-y-auto custom-scrollbar">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 border-b border-[#2a2d35] pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-widest">
            <History className="text-[#cfb16d]" size={20} /> Minhas Aplicações
        </h3>
        <button 
          onClick={fetchMyBets} 
          disabled={loading}
          className="text-[10px] font-bold text-gray-500 hover:text-[#cfb16d] flex items-center gap-1 transition-colors uppercase tracking-widest"
        >
            {loading ? <Loader2 size={12} className="animate-spin" /> : "Atualizar Lista"}
        </button>
      </div>

      {/* BODY */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500 gap-3">
            <Loader2 className="animate-spin text-[#cfb16d]" size={32} />
            <p className="text-xs uppercase tracking-widest font-medium">Sincronizando Blockchain...</p>
        </div>
      ) : bets.length === 0 ? (
        <div className="text-center py-12 text-gray-600 border border-dashed border-[#2a2d35] rounded-xl bg-[#0b0c10]/50">
            <p className="text-sm">Nenhum registro de adesão encontrado para esta carteira.</p>
        </div>
      ) : (
        <div className="space-y-3">
            {bets.map((bet) => (
                <div key={bet.hash} className="bg-[#0b0c10] p-4 rounded-xl border border-[#2a2d35] flex justify-between items-center hover:border-[#cfb16d]/40 transition-all group">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-[#cfb16d] bg-[#cfb16d]/10 px-2 py-0.5 rounded border border-[#cfb16d]/20 uppercase">
                                Rodada #{bet.rodadaId}
                            </span>
                            <div className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase tracking-tighter">
                                <ShieldCheck size={12} /> Confirmada
                            </div>
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono mt-1">
                           <span className="opacity-50 uppercase mr-1">TX:</span>
                           {bet.hash.slice(0, 10)}...{bet.hash.slice(-8)}
                        </div>
                    </div>
                    
                    <div className="flex items-center">
                        <a 
                            href={`https://basescan.org/tx/${bet.hash}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-[#cfb16d] p-2 hover:bg-[#cfb16d]/5 rounded-lg transition-all"
                            title="Ver no BaseScan"
                        >
                            <ExternalLink size={18} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* FOOTER DO CARD */}
      <div className="mt-6 pt-4 border-t border-[#2a2d35] text-center">
          <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em] font-medium">
              Dados extraídos em tempo real da Rede Base
          </p>
      </div>
    </div>
  );
}