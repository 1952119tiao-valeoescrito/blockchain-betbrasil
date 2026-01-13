"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReadContract } from 'wagmi';
import { Trophy, Ticket, Loader2, Search } from 'lucide-react';

// Endereço do seu contrato (o mesmo da página de apostas)
const CONTRACT_ADDRESS = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c"; 
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "_rodadaId", "type": "uint256" },
      { "internalType": "address", "name": "_user", "type": "address" }
    ],
    "name": "getAplicacoesUsuario",
    "outputs": [
      {
        "components": [
          { "internalType": "address", "name": "participante", "type": "address" },
          { "internalType": "uint8[10]", "name": "prognosticos", "type": "uint8[10]" },
          { "internalType": "bool", "name": "verificado", "type": "bool" },
          { "internalType": "bool", "name": "pago", "type": "bool" },
          { "internalType": "uint8", "name": "pontos", "type": "uint8" },
          { "internalType": "bool", "name": "isPro", "type": "bool" }
        ],
        "internalType": "struct BlockchainBetBrasil.Aplicacao[]",
        "name": "",
        "type": "tuple[]"
      },
      { "internalType": "uint256[]", "name": "", "type": "uint256[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rodadaAtualId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_rodadaId", "type": "uint256" }],
    "name": "getResultadoRodada",
    "outputs": [
      { "internalType": "uint8[10]", "name": "resultado", "type": "uint8[10]" },
      { "internalType": "bytes32", "name": "txHash", "type": "bytes32" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export default function ResultadosPage() {
  const t = useTranslations('Resultados');
  const { address, isConnected } = useAccount();

  // 1. Busca o ID da Rodada Atual
  const { data: rodadaId } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'rodadaAtualId',
  });

  // 2. Busca o Resultado da Rodada Anterior (se rodadaId > 1)
  const resultadoRodadaId = rodadaId && rodadaId > 1n ? rodadaId - 1n : undefined;
  const { data: resultadoData } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getResultadoRodada',
    args: resultadoRodadaId ? [resultadoRodadaId] : undefined,
    query: { enabled: !!resultadoRodadaId }
  });

  // 3. Busca os Tickets do Usuário
  const { data: userData, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getAplicacoesUsuario',
    args: rodadaId && address ? [rodadaId, address] : undefined,
    query: { enabled: !!address && !!rodadaId }
  });

  const tickets = userData ? userData[0] : [];
  const resultado = resultadoData ? resultadoData[0] : [];
  const txHash = resultadoData ? resultadoData[1] : undefined;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100">
      <Navbar />
      <main className="container mx-auto px-4 pt-40 pb-20 text-center">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">{t('title')}</h1>
          <p className="text-gray-400 italic">{t('banner')}</p>
        </header>

        {/* Card de Resultado Oficial */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-yellow-500/10 to-purple-500/10 border border-yellow-500/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">{t('officialResult')}</h2>
            {resultadoRodadaId && (
              <p className="text-lg text-gray-300 mb-8">{t('contestNumber')} {resultadoRodadaId.toString()}</p>
            )}
            {resultado && resultado.length >= 10 ? (
              <div className="space-y-4 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex justify-center items-center gap-4">
                    <span className="text-yellow-500 font-bold text-lg">{i + 1}º {t('prize')}:</span>
                    <span className="text-white font-mono text-xl">({resultado[i*2]}/{resultado[i*2+1]})</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Aguardando resultado...</p>
            )}
            {txHash && (
              <a
                href={`https://basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors"
              >
                {t('viewTransaction')}
              </a>
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-900/50 border border-white/5 p-6 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
            {!isConnected ? (
              <div className="py-8">
                <Trophy size={64} className="text-gray-700 mx-auto mb-6" />
                <p className="text-gray-400 mb-8">{t('connectWallet')}</p>
                <div className="flex justify-center"><ConnectButton label="Conectar Carteira" /></div>
              </div>
            ) : isLoading ? (
              <div className="py-12 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-yellow-500" size={40} />
                <p className="text-gray-400 animate-pulse">Sincronizando com a rede Base...</p>
              </div>
            ) : tickets.length > 0 ? (
              <div className="space-y-6">
                <h3 className="text-yellow-500 font-black uppercase tracking-widest text-sm mb-4">Seus Tickets na Rodada #{rodadaId?.toString()}</h3>
                <div className="grid gap-4">
                  {tickets.map((ticket: any, idx: number) => (
                    <div key={idx} className="bg-black/40 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-left">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${ticket.isPro ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                          <Ticket size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{ticket.isPro ? 'Inter-Bet PRO' : 'Adesão Básica'}</p>
                          <p className="font-mono text-sm text-yellow-500 font-bold">
                            {/* Formata o array de prognósticos para X/Y */}
                            {Array.from({ length: 5 }).map((_, i) => `${ticket.prognosticos[i*2]}/${ticket.prognosticos[i*2+1]}`).join(' | ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-center md:text-right">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase text-gray-400 border border-white/5">
                           {ticket.verificado ? `${ticket.pontos} Pontos` : 'Aguardando Sorteio'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-12">
                <Search size={48} className="text-gray-800 mx-auto mb-4" />
                <p className="text-gray-500 italic">Nenhum ticket encontrado para esta carteira na Rodada #{rodadaId?.toString()}.</p>
                <div className="mt-8">
                   <ConnectButton accountStatus="address" />
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}