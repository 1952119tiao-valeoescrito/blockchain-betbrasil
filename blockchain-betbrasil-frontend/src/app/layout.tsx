import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Importação direta e absoluta
import "./globals.css"; 
import '@rainbow-me/rainbowkit/styles.css';
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Web3Provider } from "@/Web3Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blockchain Bet Brasil",
  description: "Plataforma Web3 Gamificada",
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