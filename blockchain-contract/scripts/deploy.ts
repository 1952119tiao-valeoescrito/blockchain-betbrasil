const hre = require("hardhat");

async function main() {
  // Pega todas as contas disponíveis
  const signers = await hre.ethers.getSigners();
  
  // Pega a primeira conta (Sua carteira real)
  const owner = signers[0];

  // VERIFICAÇÃO DE SEGURANÇA
  if (!owner) {
    throw new Error("❌ ERRO CRÍTICO: Nenhuma conta encontrada! Verifique se você colocou a PRIVATE_KEY no arquivo .env dentro da pasta blockchain-contract.");
  }

  // Se não tiver uma segunda conta, usa a primeira como Tesouro também
  const treasury = signers.length > 1 ? signers[1] : owner;

  console.log("🚀 Iniciando Deploy na rede:", hre.network.name);
  console.log("👤 Conta de Deploy (Owner):", owner.address);
  console.log("🏦 Conta do Tesouro:", treasury.address);
  
  const balance = await hre.ethers.provider.getBalance(owner.address);
  console.log("💰 Saldo da conta:", hre.ethers.formatEther(balance), "MATIC/ETH");

  // 1. DEPLOY DO DÓLAR FALSO (USDT Mock)
  // Nota: Em produção real, você poderia usar o endereço do USDT real, mas vamos manter o Mock para garantir que funcione agora.
  console.log("\n1️⃣ Implantando Token Mock...");
  const MockToken = await hre.ethers.getContractFactory("MockTether");
  const token = await MockToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✅ Mock USDT:", tokenAddress);

  // 2. DEPLOY DO JOGO
  console.log("\n2️⃣ Implantando Jogo...");
  const Game = await hre.ethers.getContractFactory("BlockchainBetBrasilGamified");
  const game = await Game.deploy(tokenAddress, treasury.address);
  await game.waitForDeployment();
  const gameAddress = await game.getAddress();

  console.log("✅ Blockchain Bet Brasil:", gameAddress);

  console.log("\n----------------------------------------------------");
  console.log("⚠️  COPIE ESTE ENDEREÇO PARA O SEU SITE  ⚠️");
  console.log("----------------------------------------------------");
  console.log("CONTRACT_ADDRESS = \"" + gameAddress + "\"");
  console.log("----------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});