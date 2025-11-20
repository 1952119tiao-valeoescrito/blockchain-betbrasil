'use client';

import { http, createConfig } from 'wagmi';
import { mainnet, polygon, sepolia, hardhat } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

// Lendo a variável do arquivo .env.local
// Se não encontrar, usa o ID de teste como fallback de segurança
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64';

export const config = getDefaultConfig({
  appName: 'Blockchain Bet Brasil',
  projectId: projectId,
  chains: [mainnet, polygon, sepolia, hardhat],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
});