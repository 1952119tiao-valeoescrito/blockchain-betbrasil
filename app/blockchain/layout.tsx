export const metadata = {
  title: 'O que é Blockchain? - Guia Completo',
  description: 'Aprenda tudo sobre blockchain, como funciona, aplicações no Brasil e tendências futuras.',
};

export default function BlockchainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}