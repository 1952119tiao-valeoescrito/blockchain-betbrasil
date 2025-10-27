// lib/web3.ts - CONFIGURAÇÃO MAINNET (para uso externo)
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const NETWORK_CONFIG = {
  chainId: '0x1',
  chainName: 'Ethereum Mainnet',
  rpcUrls: ['https://eth-mainnet.g.alchemy.com/v2/_QsTs9Aqs2O157OI3lgir'],
  blockExplorerUrls: ['https://etherscan.io'],
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  }
};

export const connectWallet = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error('MetaMask não detectado');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    
    if (chainId !== NETWORK_CONFIG.chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: NETWORK_CONFIG.chainId }],
        });
      } catch (error: any) {
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [NETWORK_CONFIG],
          });
        } else {
          throw error;
        }
      }
    }

    console.log('✅ Conectado à Ethereum Mainnet');
    return accounts[0];
    
  } catch (error) {
    console.error('❌ Erro ao conectar:', error);
    throw error;
  }
};

export const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};

export const checkNetwork = async (): Promise<boolean> => {
  if (!window.ethereum) return false;
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  return chainId === NETWORK_CONFIG.chainId;
};