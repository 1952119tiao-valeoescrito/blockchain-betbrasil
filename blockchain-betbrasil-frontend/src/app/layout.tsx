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
      <body className={inter.className + " min-h-screen flex flex-col"}>
        <Web3Provider>
            <GoogleAnalytics />
            
            {/* AQUI ERA ONDE ESTAVA A FAIXA - JÁ REMOVI ELA DAQUI */}

            {/* Conteúdo Principal (O site todo carrega aqui) */}
            <div className="flex-grow">
                {children}
            </div>

            {/* --- NOVA FAIXA NO FINAL DA PÁGINA (RODAPÉ) --- */}
            <footer className="w-full bg-amber-500 text-black text-[10px] md:text-xs font-black py-3 px-4 text-center uppercase tracking-widest border-t-4 border-amber-700">
               ⚠️ Ambiente de Testes (Beta) • Conectado na Rede Sepolia • Não use fundos reais ⚠️
            </footer>
            {/* ------------------------------------------------ */}
            
        </Web3Provider>
      </body>
    </html>
  );
}