import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Web3Provider } from "@/Web3Provider";

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
      <body className={inter.className}>
        <Web3Provider>
            <GoogleAnalytics />
            
            {/* --- FAIXA DE AVISO TESTNET (FIXA NO TOPO) --- */}
            <div className="bg-amber-500 text-black text-[10px] md:text-xs font-black py-2 px-4 text-center uppercase tracking-widest border-b-2 border-amber-600 sticky top-0 z-[9999] shadow-md">
               ⚠️ Ambiente de Testes (Beta) • Conectado na Rede Sepolia • Não use fundos reais ⚠️
            </div>
            {/* ---------------------------------------------- */}

            {children}
        </Web3Provider>
      </body>
    </html>
  );
}