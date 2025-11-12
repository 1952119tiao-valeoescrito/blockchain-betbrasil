import '@/globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        {/* Meta tags importantes para analytics */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}