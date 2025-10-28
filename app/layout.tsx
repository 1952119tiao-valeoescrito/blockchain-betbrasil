import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono", 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blockchain Bet Brasil - Plataforma de Entretenimento",
  description: "Sistema de entretenimento gamificado com recompensas e elementos educativos",
  keywords: "blockchain, entretenimento, gamificação, recompensas, sistema educativo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}