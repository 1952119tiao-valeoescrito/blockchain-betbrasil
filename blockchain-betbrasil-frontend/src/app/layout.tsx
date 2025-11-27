import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

// Imports Oficiais e Otimizados
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

import { Web3Provider } from "@/Web3Provider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blockchain Bet Brasil | Web3",
  description: "Plataforma de Investimento Gamificado na Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + " min-h-screen flex flex-col bg-black text-white"}>
        <Web3Provider>
            
            {/* 1. Navbar */}
            <Navbar />

            {/* 2. Conteúdo Principal */}
            <main className="flex-grow">
                {children}
            </main>

            {/* 3. Rodapé Atualizado para Produção (Base Mainnet) */}
            <footer className="w-full bg-emerald-950/50 text-emerald-500 text-[10px] md:text-xs font-bold py-4 px-4 text-center uppercase tracking-widest border-t border-emerald-900">
               🔒 Ambiente Seguro • Operando na Rede Base (Mainnet)
            </footer>
            
        </Web3Provider>

        {/* 4. Google Analytics (Seu ID Oficial) */}
        <GoogleAnalytics gaId="G-MGWSEGKZ0V" />

        {/* 5. JivoChat (Suporte ao Vivo) */}
        <Script 
          src="//code.jivosite.com/widget/uIZfU1ccP5" 
          strategy="lazyOnload" 
        />
        
      </body>
    </html>
  );
}