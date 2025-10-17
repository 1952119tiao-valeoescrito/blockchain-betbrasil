'use client';

import Script from 'next/script';

const GoogleAnalytics = () => {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  // Não carregar analytics em desenvolvimento
  if (process.env.NODE_ENV !== 'production' || !gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', {
              page_title: document.title,
              page_location: window.location.href,
              debug_mode: ${process.env.NODE_ENV === 'development'}
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;