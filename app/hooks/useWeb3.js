import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES } from '../../contracts/addresses';
import MockTokenABI from '../../contracts/abis/MockERC20Fixed.json';
import BetBrasilABI from '../../contracts/abis/BlockchainBetBrasilV3.json';

export const useWeb3 = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState('');
  const [contracts, setContracts] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
      
      checkConnection();
      setupEventListeners();
    }
  }, []);

  const checkConnection = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        await setupContracts(accounts[0]);
      }
    } catch (error) {
      console.error('Erro ao verificar conexão:', error);
    }
  };

  const setupContracts = async (account) => {
    try {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();

      const mockToken = new ethers.Contract(
        CONTRACT_ADDRESSES.mockToken,
        MockTokenABI,
        web3Signer
      );

      const betBrasil = new ethers.Contract(
        CONTRACT_ADDRESSES.betBrasil,
        BetBrasilABI,
        web3Signer
      );

      setContracts({ mockToken, betBrasil });
      setSigner(web3Signer);
    } catch (error) {
      console.error('Erro ao configurar contratos:', error);
    }
  };

  const setupEventListeners = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setupContracts(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Por favor, instale o MetaMask!');
      return;
    }

    try {
      await switchToSepolia();
      
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      setAccount(accounts[0]);
      setIsConnected(true);
      await setupContracts(accounts[0]);
      
      console.log('✅ Carteira conectada com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro ao conectar carteira:', error);
      alert('Erro ao conectar carteira: ' + error.message);
    }
  };

  const switchToSepolia = async () => {
    const sepoliaChainId = '0xaa36a7';
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: sepoliaChainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: sepoliaChainId,
              chainName: 'Sepolia Test Network',
              rpcUrls: ['https://sepolia.infura.io/v3/'],
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18
              },
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }],
          });
        } catch (addError) {
          console.error('Erro ao adicionar rede Sepolia:', addError);
        }
      }
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setIsConnected(false);
    setContracts({});
    setSigner(null);
  };

  return { 
    provider, 
    signer, 
    account, 
    contracts, 
    isConnected,
    network,
    connectWallet, 
    disconnectWallet 
  };
};