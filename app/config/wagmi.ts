import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// IDs para Web3 Connectors
const projectId = 'SUA_WALLETCONNECT_PROJECT_ID'; // Substitua pelo seu ID

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Tipos para interagir com o contrato
import { Abi } from 'viem';
// import AplicacaoSorteioAbi from './abis/AplicacaoSorteio.json'; // COMENTADO - arquivo não existe
const AplicacaoSorteioAbi = []; // ABI vazio temporário

// Endereços de Exemplo (Substituir pelos Endereços Reais de Deploy)
export const APLICACAO_SORTEIO_ADDRESS = '0x123...'; // Endereço do AplicacaoSorteio
export const INVESTIMENTO_GAMIFICADO_ADDRESS = '0x456...'; // Endereço do InvestimentoGamificado

// Configuração do Contrato AplicacaoSorteio
export const aplicacaoSorteioConfig = {
  address: APLICACAO_SORTEIO_ADDRESS as `0x${string}`,
  abi: AplicacaoSorteioAbi as Abi,
};

// Configuração do Contrato InvestimentoGamificado (Assumindo a mesma ABI simplificada por agora)
export const investimentoGamificadoConfig = {
  address: INVESTIMENTO_GAMIFICADO_ADDRESS as `0x${string}`,
  abi: AplicacaoSorteioAbi as Abi, // Usar a ABI correta após geração
};