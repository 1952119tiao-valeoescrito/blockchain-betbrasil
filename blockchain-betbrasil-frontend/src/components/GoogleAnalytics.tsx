"use client";
import Script from "next/script";

export default function GoogleAnalytics() {
  // --- AQUI ESTÁ A CORREÇÃO ---
  // Trocamos o AW-... pelo G-MGWSEGKZ0V (que está na sua imagem)
  const GA_MEASUREMENT_ID = "G-MGWSEGKZ0V"; 

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}