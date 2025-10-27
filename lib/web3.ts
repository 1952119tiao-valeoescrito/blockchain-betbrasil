// lib/web3.ts - VERSÃO PRODUÇÃO FINAL
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// 🔥 CONFIGURAÇÃO ETHEREUM MAINNET
export const NETWORK_CONFIG = {
  chainId: '0x1', // 1 - ETHEREUM MAINNET
  chainName: 'Ethereum Mainnet',
  rpcUrls: ['https://eth-mainnet.g.alchemy.com/v2/_QsTs9Aqs2O157OI3lgir'],
  blockExplorerUrls: ['https://etherscan.io/0xF00aA01e9d1f8E81fd070FBE52A917bE07710469'],
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  }
};

// 🔥 ENDEREÇOS MAINNET - SUBSTITUA COM SEUS CONTRATOS
export const CONTRACT_ADDRESSES = {
  stablecoin: process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS || "0xd3a5Ec24959F38E9aF48423D7d3E8e2618870229",
  betBrasil: process.env.NEXT_PUBLIC_BETBRASIL_ADDRESS || "0xE491A5fDd61B8896a6C072480Da0D7e127D673BB",
  deployer: process.env.NEXT_PUBLIC_DEPLOYER_ADDRESS || "0xF00aA01e9d1f8E81fd070FBE52A917bE07710469"
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