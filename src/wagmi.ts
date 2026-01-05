// src/wagmi.ts

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Blockchain Bet Brasil',
  // DICA: Para produção, crie um ID gratuito em https://cloud.walletconnect.com
  projectId: 'edee62a1f005a9d0ba32911ada1ef2c9', 
  chains: [base],
  ssr: true, // Necessário para Next.js
});