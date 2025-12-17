import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';

// Import Oficial do Google
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

// Componentes do Projeto
import { Web3Provider } from "../Web3Provider";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blockchain Bet Brasil | Protocolo Web3",
  description: "Sistema Descentralizado de Distribuição e Prognósticos na Rede Base.",
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#0b0c10] text-gray-200 selection:bg-[#cfb16d] selection:text-black`}>
        <Web3Provider>
            
            {/* Conteúdo Principal */}
            <main className="flex-grow flex flex-col">
                {children}
            </main>

            {/* Rodapé Global */}
            <Footer />
            
        </Web3Provider>

        {/* 👇 GOOGLE ANALYTICS OFICIAL */}
        <GoogleAnalytics gaId="G-MGWSEGKZ0V" />

        {/* JivoChat (Mantido conforme configuração anterior) */}
        <Script 
          src="//code.jivosite.com/widget/uIZfU1ccP5" 
          strategy="lazyOnload" 
        />
        
      </body>
    </html>
  );
}