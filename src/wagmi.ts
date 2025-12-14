import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Blockchain Bet Brasil',
  // DICA: Crie um ID gratuito em https://cloud.walletconnect.com para produção
  projectId: 'YOUR_PROJECT_ID', 
  chains: [base],
  ssr: true, // Necessário para Next.js
});