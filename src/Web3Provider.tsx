'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
// Importa a configuração do arquivo vizinho wagmi.ts
import { config } from './wagmi';

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
            // Tradução para Português
            locale="pt-BR"
            
            // Personalização Visual (Identidade Black & Gold)
            theme={darkTheme({
                accentColor: '#cfb16d', // Dourado Oficial do Projeto
                accentColorForeground: 'black', // Texto preto no botão para contraste
                borderRadius: 'medium',
                overlayBlur: 'small',
            })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}