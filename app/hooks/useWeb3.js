// hooks/useWeb3.ts - VERSÃO COM DEBUG COMPLETO
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
      console.log('🔧 [DEBUG] Ethereum detectado, criando provider...');
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);
      
      checkConnection();
      setupEventListeners();
    } else {
      console.log('❌ [DEBUG] Ethereum NÃO detectado no window');
    }
  }, []);

  const checkConnection = async () => {
    try {
      console.log('🔧 [DEBUG] Verificando conexão existente...');
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log('🔧 [DEBUG] Accounts encontrados:', accounts);
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        await setupContracts(accounts[0]);
      } else {
        console.log('🔧 [DEBUG] Nenhuma conta conectada');
      }
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao verificar conexão:', error);
    }
  };

  const setupContracts = async (account) => {
    try {
      console.log('🔧 [DEBUG] Iniciando setupContracts...', { account });
      
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      
      console.log('🔧 [DEBUG] Provider e Signer criados');

      // 🔥 DEBUG: VERIFICA OS ENDEREÇOS ANTES
      console.log('🔧 [DEBUG] Endereços dos contratos:', {
        mockToken: "0xd3a5Ec24959F38E9aF48423D7d3E8e2618870229",
        betBrasil: "0xE491A5fDd61B8896a6C072480Da0D7e127D673BB"
      });

      // 🔥 DEBUG: VERIFICA SE AS ABIs EXISTEM
      console.log('🔧 [DEBUG] MockTokenABI:', MockTokenABI ? '✅ CARREGADA' : '❌ FALTA');
      console.log('🔧 [DEBUG] BetBrasilABI:', BetBrasilABI ? '✅ CARREGADA' : '❌ FALTA');

      if (!MockTokenABI || !BetBrasilABI) {
        throw new Error('ABIs não carregadas corretamente');
      }

      // 🔥 DEBUG: VERIFICA CÓDIGO NA BLOCKCHAIN
      console.log('🔧 [DEBUG] Verificando contratos na blockchain...');
      const tokenCode = await web3Provider.getCode("0xd3a5Ec24959F38E9aF48423D7d3E8e2618870229");
      const betCode = await web3Provider.getCode("0xE491A5fDd61B8896a6C072480Da0D7e127D673BB");
      
      console.log('🔧 [DEBUG] Código MockToken:', tokenCode);
      console.log('🔧 [DEBUG] Código BetBrasil:', betCode);

      if (tokenCode === '0x') {
        throw new Error('❌ MockToken NÃO ENCONTRADO na Mainnet! Endereço: 0xd3a5Ec24959F38E9aF48423D7d3E8e2618870229');
      }
      if (betCode === '0x') {
        throw new Error('❌ BetBrasil NÃO ENCONTRADO na Mainnet! Endereço: 0xE491A5fDd61B8896a6C072480Da0D7e127D673BB');
      }

      // 🔥 TENTA CRIAR OS CONTRATOS
      console.log('🔧 [DEBUG] Criando instâncias dos contratos...');
      const mockToken = new ethers.Contract(
        "0xd3a5Ec24959F38E9aF48423D7d3E8e2618870229",
        MockTokenABI,
        web3Signer
      );

      const betBrasil = new ethers.Contract(
        "0xE491A5fDd61B8896a6C072480Da0D7e127D673BB",
        BetBrasilABI,
        web3Signer
      );

      console.log('🔧 [DEBUG] Contratos criados, testando funções...');

      // 🔥 TESTA OS CONTRATOS - COM FALLBACK SE DER ERRO
      try {
        const tokenName = await mockToken.name();
        console.log('🔧 [DEBUG] Nome do Token:', tokenName);
      } catch (error) {
        console.warn('🔧 [DEBUG] Erro ao chamar token.name():', error.message);
      }

      try {
        const betName = await betBrasil.name();
        console.log('🔧 [DEBUG] Nome do BetBrasil:', betName);
      } catch (error) {
        console.warn('🔧 [DEBUG] Erro ao chamar betBrasil.name():', error.message);
      }

      setContracts({ mockToken, betBrasil });
      setSigner(web3Signer);
      
      console.log('✅ [DEBUG] SetupContracts CONCLUÍDO com SUCESSO!');
      
    } catch (error) {
      console.error('❌ [DEBUG] Erro DETALHADO no setupContracts:', error);
      console.error('❌ [DEBUG] Stack:', error.stack);
      alert('❌ Erro ao carregar contratos: ' + error.message);
    }
  };

  const setupEventListeners = () => {
    if (window.ethereum) {
      console.log('🔧 [DEBUG] Configurando event listeners...');
      
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('🔧 [DEBUG] accountsChanged:', accounts);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setupContracts(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        console.log('🔧 [DEBUG] chainChanged:', chainId);
        window.location.reload();
      });
    }
  };

  const connectWallet = async () => {
    console.log('🔧 [DEBUG] Iniciando connectWallet...');
    
    if (!window.ethereum) {
      console.log('❌ [DEBUG] MetaMask não instalado');
      alert('Por favor, instale o MetaMask!');
      return;
    }

    try {
      console.log('🔧 [DEBUG] Mudando para Mainnet...');
      await switchToMainnet();
      
      console.log('🔧 [DEBUG] Solicitando accounts...');
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      console.log('🔧 [DEBUG] Accounts recebidos:', accounts);
      
      setAccount(accounts[0]);
      setIsConnected(true);
      await setupContracts(accounts[0]);
      
      console.log('✅ [DEBUG] Carteira conectada na Ethereum Mainnet!');
      
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao conectar carteira:', error);
      alert('Erro ao conectar carteira: ' + error.message);
    }
  };

  const switchToMainnet = async () => {
    const mainnetChainId = '0x1';
    
    try {
      console.log('🔧 [DEBUG] Verificando rede atual...');
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('🔧 [DEBUG] Rede atual:', currentChainId);
      
      if (currentChainId === mainnetChainId) {
        console.log('🔧 [DEBUG] Já está na Mainnet');
        return;
      }
      
      console.log('🔧 [DEBUG] Mudando para Mainnet...');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: mainnetChainId }],
      });
      console.log('✅ [DEBUG] Mudou para Mainnet');
      
    } catch (switchError) {
      console.log('🔧 [DEBUG] Erro ao mudar rede:', switchError);
      
      if (switchError.code === 4902) {
        console.log('🔧 [DEBUG] Rede não encontrada, adicionando...');
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: mainnetChainId,
              chainName: 'Ethereum Mainnet',
              rpcUrls: ['https://eth-mainnet.g.alchemy.com/v2/_QsTs9Aqs2O157OI3lgir'],
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              },
              blockExplorerUrls: ['https://etherscan.io']
            }],
          });
          console.log('✅ [DEBUG] Rede Mainnet adicionada');
        } catch (addError) {
          console.error('❌ [DEBUG] Erro ao adicionar rede Mainnet:', addError);
          throw new Error('Não foi possível conectar à Ethereum Mainnet');
        }
      } else {
        console.warn('🔧 [DEBUG] Continuação na rede atual:', switchError);
      }
    }
  };

  const disconnectWallet = () => {
    console.log('🔧 [DEBUG] Desconectando carteira...');
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