'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
export const config = getDefaultConfig({
  appName: 'Blockchain Bet Brasil',

  projectId: 'edee62a1f005a9d0ba32911ada1ef2c9',

  chains: [base],

  ssr: true,
  
});