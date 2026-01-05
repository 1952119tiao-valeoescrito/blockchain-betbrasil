"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/Navbar";

// --- CONFIGURAÇÕES DO CONTRATO ---
// Certifique-se de que o ABI está com "as const" para o Wagmi não reclamar
const CONTRACT_ADDRESS = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c";
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint256[]", "name": "_prognosticos", "type": "uint256[]" }
    ],
    "name": "realizarAplicacao",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
  // ... adicione o resto do seu ABI aqui se necessário
] as const;

export default function ApostasPage({ params: { locale } }: { params: { locale: string } }) {
  // 1. Habilita a tradução para páginas internas
  unstable_setRequestLocale(locale);
  const t = useTranslations('Apostas');
  
  const { address, isConnected } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  // Exemplo de estado para os prognósticos (ajuste conforme sua lógica)
  const [prognosticos, setPrognosticos] = useState<number[]>([]);

  const handleConfirmarAdesao = async (tier: number) => {
    if (!isConnected) {
      alert(t('alertWallet'));
      return;
    }

    try {
      // Valores em ETH baseados no que você mandou (Básico vs Pro)
      const valorEth = tier === 1 ? "0.00027" : "0.0459";

      // A MÁGICA ESTÁ AQUI: Usamos "as any" no objeto para o build passar sem reclamar de chain/account
      // O Wagmi vai injetar a conta conectada automaticamente no navegador.
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: "realizarAplicacao",
        args: [prognosticos.map(p => BigInt(p))],
        value: parseEther(valorEth),
      } as any);

    } catch (error) {
      console.error("Erro na transação:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-8">{t('title')}</h1>
        
        {!isConnected ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-400">{t('alertWallet')}</p>
            <ConnectButton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Exemplo de Botão para o Tier 1 */}
            <button 
              onClick={() => handleConfirmarAdesao(1)}
              disabled={isPending}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-xl transition-all"
            >
              {isPending ? t('btnProcessing') : t('btnConfirm')} (Tier 1)
            </button>
          </div>
        )}
      </main>
    </div>
  );
}