import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css'; // CSS do RainbowKit
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Web3Provider } from "@/Web3Provider"; // Importando nosso provedor

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
            {children}
        </Web3Provider>
      </body>
    </html>
  );
}