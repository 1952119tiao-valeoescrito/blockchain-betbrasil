// app/utils/blockchain.js
const { ethers } = require('ethers');
const contracts = require('../../lib/config/contracts');

class BlockchainUtils {
    static getProvider() {
        if (typeof window !== 'undefined' && window.ethereum) {
            return new ethers.providers.Web3Provider(window.ethereum);
        }
        return new ethers.providers.JsonRpcProvider(contracts.network.rpcUrl);
    }

    static getContract(contractName, signer = false) {
        const provider = this.getProvider();
        const contractAddress = contracts[contractName];
        const abi = contracts.abis[contractName].abi; // Acessando o .abi
        
        if (!contractAddress) {
            throw new Error(`Contrato ${contractName} não encontrado na configuração`);
        }
        
        if (!abi) {
            throw new Error(`ABI do contrato ${contractName} não encontrado`);
        }
        
        const contractWithSigner = signer ? provider.getSigner() : provider;
        return new ethers.Contract(contractAddress, abi, contractWithSigner);
    }

    // ... o resto do código permanece igual
}

module.exports = BlockchainUtils;