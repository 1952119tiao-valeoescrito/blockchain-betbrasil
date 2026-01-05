"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useAccount, useWriteContract } from 'wagmi';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/Navbar";

// --- CONFIGURAÇÕES DO CONTRATO ---
const CONTRACT_ADDRESS = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c";

// O "as const" no final do array é VITAL para o Wagmi v2
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "verificarAplicacao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "sacarPremiacao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export default function ResultadosPage({ params: { locale } }: { params: { locale: string } }) {
  // 1. Habilita suporte a tradução e SEO
  unstable_setRequestLocale(locale);
  const t = useTranslations('Resultados');

  const { isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  // Função unificada para evitar erros de tipagem repetidos
  const executarAcao = (indexApp: number | bigint, funcao: "verificarAplicacao" | "sacarPremiacao") => {
    if (!isConnected) return;

    try {
      // O segredo para o BUILD passar: 'as any' englobando TODO o objeto de configuração
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: funcao,
        args: [BigInt(indexApp)],
      } as any);
    } catch (error) {
      console.error(`Erro ao chamar ${funcao}:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-gray-400">{t('banner')}</p>
        </div>

        {!isConnected ? (
          <div className="flex flex-col items-center gap-6 bg-white/5 p-10 rounded-3xl border border-white/10">
            <p className="text-xl text-gray-300">{t('connectWallet')}</p>
            <div className="scale-110">
              <ConnectButton />
            </div>
          </div>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {/* 
                DICA: Aqui você faria um loop (map) nos seus tickets reais.
                Exemplo de um ticket para teste visual:
            */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-left">
                <p className="text-xs text-yellow-500 font-bold uppercase tracking-widest mb-1">{t('ticket')} #001</p>
                <p className="text-2xl text-white font-mono tracking-tighter">10 | 15 | 22 | 08 | 04</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => executarAcao(0, "verificarAplicacao")}
                  disabled={isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  {isPending ? t('statusCalculating') : t('statusVerify')}
                </button>
                
                <button
                  onClick={() => executarAcao(0, "sacarPremiacao")}
                  disabled={isPending}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
                >
                  {t('statusClaim')}
                </button>
              </div>
            </div>

            <div className="mt-10 p-6 border border-yellow-500/20 bg-yellow-500/5 rounded-2xl text-sm text-yellow-200/70">
              {t('waitingAudit')}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}