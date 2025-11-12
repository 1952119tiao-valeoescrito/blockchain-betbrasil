'use client';

import { useCallback } from 'react';

interface EventParameters {
  [key: string]: string | number | boolean;
}

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, parameters: EventParameters = {}) => {
    if (typeof window === 'undefined') return;

    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    } else {
      console.log('📊 Analytics Event:', eventName, parameters);
    }
  }, []);

  // EVENTOS WEB3 ESPECÍFICOS
  const trackWalletConnection = useCallback((walletType: string, success: boolean) => {
    trackEvent('wallet_connected', {
      wallet_type: walletType,
      success,
      connection_method: 'web3'
    });
  }, [trackEvent]);

  const trackTransaction = useCallback(
    (txType: 'deposit' | 'withdrawal' | 'bet' | 'claim', 
     amount: string, 
     currency: string, 
     txHash: string,
     success: boolean) => {
    trackEvent('transaction', {
      transaction_type: txType,
      amount,
      currency,
      transaction_hash: txHash,
      success,
      network: 'ethereum'
    });
  }, [trackEvent]);

  const trackBet = useCallback((
    amount: string, 
    currency: string, 
    game: string,
    betType: string,
    outcome: 'win' | 'lose' | 'pending'
  ) => {
    trackEvent('bet_placed', {
      amount,
      currency,
      game,
      bet_type: betType,
      outcome,
      platform: 'web3'
    });
  }, [trackEvent]);

  const trackContractInteraction = useCallback((
    contractAddress: string,
    functionName: string,
    success: boolean,
    gasUsed?: string
  ) => {
    trackEvent('contract_interaction', {
      contract_address: contractAddress,
      function_name: functionName,
      success,
      gas_used: gasUsed || ''
    });
  }, [trackEvent]);

  const trackNetworkSwitch = useCallback((fromNetwork: string, toNetwork: string) => {
    trackEvent('network_switched', {
      from_network: fromNetwork,
      to_network: toNetwork
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackWalletConnection,
    trackTransaction,
    trackBet,
    trackContractInteraction,
    trackNetworkSwitch
  };
};

// TIPAGEM DO GTAG - ADICIONA ISSO NO FINAL
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}