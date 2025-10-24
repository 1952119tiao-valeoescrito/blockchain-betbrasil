// lib/web3.ts
import { ethers } from 'ethers';
import contractAddresses from '../contract-addresses.json';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const CONTRACT_ADDRESSES = contractAddresses;

export const NETWORK_CONFIG = {
  chainId: '0xAA36A7', // 11155111
  chainName: 'Sepolia Testnet',
  rpcUrls: ['https://rpc.sepolia.org'],
  blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  }
};

export const connectWallet = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error('MetaMask não instalado!');
  }

  // Solicitar conexão da conta
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  });

  // Verificar/alterar para rede Sepolia
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: NETWORK_CONFIG.chainId }],
    });
  } catch (error: any) {
    // Se a rede não existir, adicionar
    if (error.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [NETWORK_CONFIG],
      });
    }
  }

  return accounts[0];
};

export const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  return null;
};