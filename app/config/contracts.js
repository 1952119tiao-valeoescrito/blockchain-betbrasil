// app/config/contracts.js

import contractAddresses from '../../contract-addresses.json';

export const CONTRACT_ADDRESSES = contractAddresses;

export const CONTRACT_ABIS = {
  stablecoin: require('../../abis/MockERC20.json'),
  sistema: require('../../abis/SistemaTodoMundoGanha.json'),
  betBrasil: require('../../abis/BlockchainBetBrasilV2.json'),
  investBet: require('../../abis/InvestBetV2.json')
};

export const NETWORK_CONFIG = {
  chainId: 1337,
  name: "Hardhat Local",
  rpcUrl: "http://localhost:8545"
};