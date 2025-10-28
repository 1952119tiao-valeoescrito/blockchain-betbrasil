'use client';

export function useAnalytics() {
  const trackEvent = (event: string, data?: any) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data);
    }
    
    // Console log para desenvolvimento
    console.log('📊 Analytics Event:', event, data);
  };

  const trackPageView = (page: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-5P5C08L3SD', {
        page_title: page,
        page_location: window.location.href
      });
    }
    console.log('📊 Page View:', page);
  };

  // ✅ FUNÇÕES ESPECÍFICAS QUE O HEADER PRECISA
  const trackWalletConnection = (provider: string, success: boolean) => {
    trackEvent('wallet_connection', {
      provider,
      success,
      timestamp: new Date().toISOString()
    });
  };

  const trackNavigation = (from: string, to: string) => {
    trackEvent('navigation', {
      from_path: from,
      to_path: to,
      timestamp: new Date().toISOString()
    });
  };

  return { 
    trackEvent,
    trackPageView,
    trackWalletConnection, // ✅ ADICIONADA
    trackNavigation // ✅ ADICIONADA
  };
}