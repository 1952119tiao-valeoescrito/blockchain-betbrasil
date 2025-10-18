// lib/test-integration.js

const RodadaService = require('./services/rodadaService');

async function testIntegration() {
    console.log('🧪 Testando integração com contratos...');
    
    const rodadaService = new RodadaService();
    
    // Aguardar inicialização
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const status = rodadaService.getStatus();
    console.log('📊 Status do serviço:', status);
    
    if (status.initialized) {
        console.log('✅ Serviço inicializado com sucesso!');
        console.log('📝 Endereço do contrato:', status.contractAddress);
        
        try {
            const rodadaAtual = await rodadaService.getRodadaAtualId();
            console.log('🎯 Rodada atual:', rodadaAtual);
        } catch (error) {
            console.log('ℹ️  Não foi possível buscar rodada atual (pode ser normal se o contrato não está deployado):', error.message);
        }
    } else {
        console.log('❌ Serviço não inicializado. Verifique:');
        console.log('   - MetaMask instalado e conectado');
        console.log('   - Endereço do contrato configurado no .env.local');
        console.log('   - ABI do contrato em contracts/abis/');
    }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
    testIntegration();
}

module.exports = testIntegration;