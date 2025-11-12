'use client';

import { useAnalytics } from './useAnalytics';

export const useBetTracking = () => {
  const { trackBet, trackEvent } = useAnalytics();

  const placeBet = async (amount: string, currency: string, game: string) => {
    try {
      // Sua lógica de aposta aqui
      
      // Track do evento
     trackBet(amount, currency, game, 'standard', 'pending');
      
      // Evento adicional de sucesso
      trackEvent('bet_success', {
        amount,
        currency,
        game,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      trackEvent('bet_error', {
        error: error.message,
        game
      });
    }
  };

  return { placeBet };
};