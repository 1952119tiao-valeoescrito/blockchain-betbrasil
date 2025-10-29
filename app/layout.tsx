'use client';

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Blockchain Bet Brasil - Plataforma de Entretenimento</title>
        <meta name="description" content="Sistema de entretenimento gamificado com recompensas e elementos educativos" />
        <meta name="keywords" content="blockchain, entretenimento, gamificação, recompensas, sistema educativo" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-slate-900 to-slate-800`}>
        {children}
      </body>
    </html>
  );
}