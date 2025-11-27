
Model
ThinkingThoughts
Expand to view model thoughts

chevron_right
Fala, meu nobre! Grande dia! 🚀👔
Virar a chave para o Mundo Real (Base Mainnet) é o momento onde a brincadeira fica séria. Agora vai envolver dinheiro de verdade (USDC) e taxas de gás reais (ETH na Base).
Vamos fazer essa migração com calma e precisão cirúrgica. Segue o roteiro oficial do Deploy em Produção:
FASE 1: O Backend (Smart Contract) 🏗️
Na rede real, nós NÃO criamos dinheiro falso. Nós usamos o USDC Oficial da Base.
1. Atualize o Script de Deploy (scripts/deploy.ts)
Vá na pasta blockchain-contract/scripts/ e substitua o conteúdo do deploy.ts por este código blindado para a Mainnet.
Ele já contém o endereço oficial do USDC na Base.
code
TypeScript
import { ethers, network } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("🚨 INICIANDO DEPLOY EM PRODUÇÃO (REAL) 🚨");
  console.log("------------------------------------------");
  console.log("📡 Rede:", network.name);
  console.log("👤 Dono (Owner):", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Saldo para Gás:", ethers.formatEther(balance), "ETH");

  // --- 1. DEFINIÇÃO DO DINHEIRO (USDC OFICIAL NA BASE) ---
  let tokenAddress: string;

  if (network.name === "base") {
    // Endereço Oficial do USDC na Base Mainnet
    tokenAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; 
    console.log("💵 Usando USDC Real:", tokenAddress);
  } else {
    // Fallback para testes (se rodar errado)
    console.log("⚠️ ALERTA: Você não está na rede Base Mainnet!");
    tokenAddress = "0x...."; // Mock
  }

  // --- 2. DEFINIÇÃO DO TESOURO ---
  const treasuryAddress = deployer.address;

  // --- 3. DEPLOY DO CONTRATO ---
  console.log("\n🎲 Implantando Blockchain Bet Brasil (Manual/Mainnet)...");
  const Game = await ethers.getContractFactory("BlockchainBetBrasilGamified");
  
  const game = await Game.deploy(tokenAddress, treasuryAddress);
  await game.waitForDeployment();
  
  const gameAddress = await game.getAddress();

  console.log("\n✅ SUCESSO! CONTRATO REAL NO AR!");
  console.log("------------------------------------------------");
  console.log(`export const CONTRACT_ADDRESS = "${gameAddress}";`);
  console.log("------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
2. O Comando de Deploy (Hora da Verdade) 💸
Pré-requisito: Você precisa ter ETH real na rede Base (uns USD 5,00 já dá e sobra) na sua carteira 0xF00a... para pagar o gás do deploy.
Se tiver o saldo, rode no terminal:
code
Bash
npx hardhat run scripts/deploy.ts --network base
Copie o endereço novo que vai aparecer (0x...). Esse é o endereço final.
FASE 2: O Frontend (Site) 💻
Agora vamos apontar o site para a rede real e tirar os avisos de "Teste".
1. Atualize o src/wagmi.ts
Vamos trocar baseSepolia por base.
code
TypeScript
'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
// 👇 MUDANÇA CRÍTICA: Importar 'base' (Mainnet)
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Blockchain Bet Brasil', // Pode tirar o (BETA) se quiser
  projectId: 'edee62a1f005a9d0ba32911ada1ef2c9',

  // 👇 MUDANÇA CRÍTICA: Usar a rede Base
  chains: [base],

  transports: {
    [base.id]: http(),
  },

  ssr: true,
});
2. Atualize o Endereço no src/constants/abi.ts
Cole o endereço novo que você gerou na Fase 1.
code
TypeScript
// 🚀 ENDEREÇO OFICIAL (BASE MAINNET)
export const CONTRACT_ADDRESS = "0x_COLE_SEU_ENDERECO_REAL_AQUI";

// A ABI continua a mesma (Manual/Híbrida)
export const CONTRACT_ABI = [ ... ] as const;
FASE 3: Limpeza Visual (Tirar placas de "Teste") 🎨
Vou te passar os pontos rápidos para você editar manualmente, ou se preferir, me pede que eu mando os arquivos inteiros.
src/app/layout.tsx (Rodapé):
Troque: ⚠️ Ambiente de Testes (Beta)...
Por: 🔒 Ambiente Seguro • Operando na Rede Base (Mainnet) (ou remova o aviso).
src/app/page.tsx (Home):
Troque: 🧪 AMBIENTE DE TESTES (SEPOLIA)
Por: 🚀 OPERANDO NA REDE BASE (L2)
src/app/apostas/page.tsx (App):
Troque a barra amarela de alerta por algo verde ou remova.
Na barra de status: TESTNET: ONLINE -> MAINNET: ONLINE.
Resumo do Plano:
Tem ETH na Base? -> Roda o Deploy.
Pegou o endereço? -> Atualiza abi.ts.
Muda a rede? -> Atualiza wagmi.ts.
Limpa os textos? -> Atualiza as páginas.
Manda bala no Deploy primeiro e me avisa se deu certo (se gerou o endereço real)! Tmj! 👊🚀