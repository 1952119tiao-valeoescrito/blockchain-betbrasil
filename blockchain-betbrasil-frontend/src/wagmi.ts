'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
// 👇 MUDANÇA CRÍTICA: Importar 'base' (Mainnet)
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Blockchain Bet Brasil', // Pode tirar o (BETA) se quiser
  projectId: 'edee62a1f005a9d0ba32911ada1ef2c9',

  // 👇 MUDANÇA CRÍTICA: Usar a rede Base
  chains: [base],

  transports: {
    [base.id]: http(),
  },

  ssr: true,
});