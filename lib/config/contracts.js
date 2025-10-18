// Configuração centralizada de endereços de contratos
const contracts = {
    // ENDEREÇOS PRINCIPAIS - ATUALIZE COM OS ENDEREÇOS REAIS
    BlockchainBetBrasilV3: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    MockERC20Fixed: process.env.NEXT_PUBLIC_MOCK_ERC20_ADDRESS || "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
    
    // ABIs - USANDO OS ARQUIVOS EXATOS QUE VOCÊ TEM
    abis: {
        BlockchainBetBrasilV3: require('../../contracts/abis/BlockchainBetBrasilV3.json'),
        MockERC20Fixed: require('../../contracts/abis/MockERC20Fixed.json'),
        betBrasilABI: require('../../contracts/abis/betBrasilABI.json'),
        mockERC20ABI: require('../../contracts/abis/mockERC20ABI.json')
    },
    
    // CONFIGURAÇÕES DE REDE
    network: {
        name: process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK || 'sepolia',
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID || 11155111, // Sepolia
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/'
    },
    
    // CONFIGURAÇÕES DO CHAINLINK VRF
    chainlink: {
        subscriptionId: process.env.NEXT_PUBLIC_CHAINLINK_SUBSCRIPTION_ID || '',
        keyHash: process.env.NEXT_PUBLIC_CHAINLINK_KEY_HASH || ''
    }
};

// Validação de configuração
console.log('🔧 Configuração de contratos carregada:');
console.log('- BlockchainBetBrasilV3:', contracts.BlockchainBetBrasilV3);
console.log('- MockERC20Fixed:', contracts.MockERC20Fixed);
console.log('- ABIs disponíveis:', Object.keys(contracts.abis));

if (!contracts.BlockchainBetBrasilV3 || contracts.BlockchainBetBrasilV3 === "0xSEU_ENDERECO_DO_CONTRATO_AQUI") {
    console.warn('⚠️  Endereço do contrato BlockchainBetBrasilV3 não configurado!');
}

if (!contracts.MockERC20Fixed || contracts.MockERC20Fixed === "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9") {
    console.warn('⚠️  Endereço do contrato MockERC20Fixed não configurado!');
}

// Verificar se ABIs existem e têm a propriedade 'abi'
try {
    if (contracts.abis.BlockchainBetBrasilV3) {
        const abi = contracts.abis.BlockchainBetBrasilV3.abi || contracts.abis.BlockchainBetBrasilV3;
        console.log('✅ ABI BlockchainBetBrasilV3 carregado com', abi.length, 'elementos');
    } else {
        console.warn('⚠️  ABI do BlockchainBetBrasilV3 não encontrado');
    }
    
    if (contracts.abis.MockERC20Fixed) {
        const abi = contracts.abis.MockERC20Fixed.abi || contracts.abis.MockERC20Fixed;
        console.log('✅ ABI MockERC20Fixed carregado com', abi.length, 'elementos');
    } else {
        console.warn('⚠️  ABI do MockERC20Fixed não encontrado');
    }
} catch (error) {
    console.warn('⚠️  Erro ao carregar ABIs:', error.message);
}

module.exports = contracts;