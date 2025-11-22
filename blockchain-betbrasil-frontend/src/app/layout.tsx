import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Web3Provider } from "@/Web3Provider";
import Navbar from "@/components/Navbar"; // <--- IMPORTE AQUI

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
      {/* min-h-screen garante que o rodapé vá lá pra baixo */}
      <body className={inter.className + " min-h-screen flex flex-col bg-black text-white"}>
        <Web3Provider>
            <GoogleAnalytics />
            
            {/* 1. O NAV BAR NOVO VEM AQUI (Já inclui o botão de conectar) */}
            <Navbar />

            {/* 2. Conteúdo do Site */}
            <main className="flex-grow">
                {children}
            </main>

            {/* 3. Rodapé com Aviso */}
            <footer className="w-full bg-amber-500 text-black text-[10px] md:text-xs font-black py-4 px-4 text-center uppercase tracking-widest border-t-4 border-amber-700">
               ⚠️ Ambiente de Testes (Beta) • Conectado na Rede Sepolia • Não use fundos reais ⚠️
            </footer>
            
        </Web3Provider>
      </body>
    </html>
  );
}