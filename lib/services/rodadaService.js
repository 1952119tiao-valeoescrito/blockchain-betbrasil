const { ethers } = require('ethers');
const contracts = require('../config/contracts');

class RodadaService {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.isInitialized = false;
        
        this.initialize();
    }

    async initialize() {
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                this.provider = new ethers.providers.Web3Provider(window.ethereum);
                this.signer = this.provider.getSigner();
                
                // CONFIGURAÇÃO DO CONTRATO - USANDO CONFIG CENTRALIZADO
                this.contractAddress = contracts.BlockchainBetBrasilV3;
                
                // CARREGANDO ABI DINAMICAMENTE - funciona com qualquer formato
                let contractABI = contracts.abis.BlockchainBetBrasilV3;
                
                // Se o ABI está no formato {abi: [...]} ou é o array direto
                if (contractABI && contractABI.abi) {
                    contractABI = contractABI.abi;
                }
                
                this.contractABI = contractABI || [];
                
                console.log('🔧 Inicializando RodadaService:');
                console.log('- Endereço do contrato:', this.contractAddress);
                console.log('- Tamanho do ABI:', this.contractABI.length);
                
                if (!this.contractAddress || this.contractAddress === "0x5FbDB2315678afecb367f032d93F642f64180aa3") {
                    console.error('❌ Endereço do contrato não configurado! Configure NEXT_PUBLIC_CONTRACT_ADDRESS no .env.local');
                    return;
                }
                
                if (!this.contractABI || this.contractABI.length === 0) {
                    console.error('❌ ABI do contrato não encontrado! Verifique contracts/abis/BlockchainBetBrasilV3.json');
                    return;
                }
                
                this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);
                this.isInitialized = true;
                
                console.log('✅ RodadaService inicializado com sucesso!');
                
            } catch (error) {
                console.error('❌ Erro ao inicializar RodadaService:', error);
            }
        } else {
            console.warn('⚠️  MetaMask não detectado. RodadaService funcionará em modo limitado.');
        }
    }

    async ensureInitialized() {
        if (!this.isInitialized) {
            await this.initialize();
        }
        if (!this.contract) {
            throw new Error('Serviço não inicializado. Verifique: 1) MetaMask instalado, 2) Endereço do contrato configurado, 3) ABI do contrato disponível');
        }
    }

    async connect() {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                await this.initialize(); // Re-inicializa após conectar
                return true;
            } catch (error) {
                console.error('Erro ao conectar MetaMask:', error);
                return false;
            }
        }
        return false;
    }

    async verificarLimiteAplicacoes(userAddress) {
        await this.ensureInitialized();

        try {
            const [aplicacoesFeitas, limiteRestante] = await this.contract.getLimiteAplicacoesUsuario(userAddress);
            return {
                aplicacoesFeitas: aplicacoesFeitas.toNumber(),
                limiteRestante: limiteRestante.toNumber()
            };
        } catch (error) {
            console.error('Erro ao verificar limite:', error);
            throw new Error('Falha ao verificar limite de aplicações. Verifique a conexão com a blockchain.');
        }
    }

    async fazerAplicacao(prognosticos) {
        await this.ensureInitialized();

        try {
            console.log('🎯 Fazendo aplicação com prognósticos:', prognosticos);
            const tx = await this.contract.aplicar(prognosticos);
            console.log('📝 Transação enviada:', tx.hash);
            
            const receipt = await tx.wait();
            console.log('✅ Transação confirmada:', receipt.transactionHash);
            
            return receipt;
        } catch (error) {
            console.error('❌ Erro ao fazer aplicação:', error);
            
            if (error.message.includes("Limite de 5 aplicacoes por rodada atingido")) {
                throw new Error('🎯 Você atingiu o limite de 5 aplicações nesta rodada!');
            }
            if (error.message.includes("Rodada nao esta aberta")) {
                throw new Error('⏰ A rodada não está aberta para apostas no momento!');
            }
            if (error.message.includes("user rejected transaction")) {
                throw new Error('❌ Transação rejeitada pelo usuário.');
            }
            
            throw new Error('Falha ao fazer aplicação. Tente novamente.');
        }
    }

    async getStatusRodada(rodadaId) {
        await this.ensureInitialized();
        
        try {
            const status = await this.contract.getStatusRodada(rodadaId);
            return {
                id: status[0].toNumber(),
                status: status[1],
                totalArrecadado: ethers.utils.formatEther(status[2]),
                premioTotal: ethers.utils.formatEther(status[3]),
                totalAplicacoes: status[4].toNumber(),
                timestampAbertura: new Date(status[5].toNumber() * 1000),
                timestampFechamento: new Date(status[6].toNumber() * 1000),
                resultadosForamInseridos: status[7],
                poteAcumulado: ethers.utils.formatEther(status[8])
            };
        } catch (error) {
            console.error('Erro ao buscar status da rodada:', error);
            throw new Error('Falha ao buscar status da rodada.');
        }
    }

    async getRodadaAtualId() {
        await this.ensureInitialized();
        
        try {
            const rodadaAtualId = await this.contract.rodadaAtualId();
            return rodadaAtualId.toNumber();
        } catch (error) {
            console.error('Erro ao buscar rodada atual:', error);
            throw new Error('Falha ao buscar rodada atual.');
        }
    }

    async reivindicarPremio(rodadaId) {
        await this.ensureInitialized();

        try {
            const tx = await this.contract.reivindicarPremio(rodadaId);
            const receipt = await tx.wait();
            return receipt;
        } catch (error) {
            console.error('Erro ao reivindicar prêmio:', error);
            throw new Error('Falha ao reivindicar prêmio.');
        }
    }

    // Funções administrativas (apenas owner)
    async abrirRodada() {
        await this.ensureInitialized();

        try {
            const tx = await this.contract.abrirRodada();
            const receipt = await tx.wait();
            return receipt;
        } catch (error) {
            console.error('Erro ao abrir rodada:', error);
            throw error;
        }
    }

    async fecharRodada() {
        await this.ensureInitialized();

        try {
            const tx = await this.contract.fecharRodada();
            const receipt = await tx.wait();
            return receipt;
        } catch (error) {
            console.error('Erro ao fechar rodada:', error);
            throw error;
        }
    }

    // Event listeners
    onNovaAplicacao(callback) {
        if (!this.contract) return;
        
        this.contract.on('NovaAplicacaoFeita', (rodadaId, jogador, prognosticos, aplicacaoNumero, event) => {
            callback({
                rodadaId: rodadaId.toNumber(),
                jogador,
                prognosticos: prognosticos.map(p => p.toNumber()),
                aplicacaoNumero: aplicacaoNumero.toNumber(),
                transactionHash: event.transactionHash
            });
        });
    }

    onLimiteAtingido(callback) {
        if (!this.contract) return;
        
        this.contract.on('LimiteAplicacoesAtingido', (jogador, rodadaId, aplicacoesFeitas, event) => {
            callback({
                jogador,
                rodadaId: rodadaId.toNumber(),
                aplicacoesFeitas: aplicacoesFeitas.toNumber(),
                transactionHash: event.transactionHash
            });
        });
    }

    removeAllListeners() {
        if (this.contract) {
            this.contract.removeAllListeners();
        }
    }

    // Status do serviço
    getStatus() {
        return {
            initialized: this.isInitialized,
            hasProvider: !!this.provider,
            hasContract: !!this.contract,
            contractAddress: this.contractAddress
        };
    }
}

module.exports = RodadaService;