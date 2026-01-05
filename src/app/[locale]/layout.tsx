import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"; 
import '@rainbow-me/rainbowkit/styles.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Web3Provider } from "@/Web3Provider"; 
import Footer from "@/components/Footer";      

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({params: {locale}}: {params: {locale: string}}) {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {
    title: t('title'),
    description: t('description'),
    icons: { icon: '/images/logo.png' },
  };
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Habilita a renderização estática para traduções
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#0b0c10] text-gray-200 selection:bg-[#cfb16d] selection:text-black`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Web3Provider>
              <main className="flex-grow flex flex-col">
                  {children}
              </main>
              <Footer />
          </Web3Provider>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-MGWSEGKZ0V" />
        <Script src="//code.jivosite.com/widget/uIZfU1ccP5" strategy="lazyOnload" />
      </body>
    </html>
  );
}