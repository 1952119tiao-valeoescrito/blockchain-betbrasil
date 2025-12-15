const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Iniciando deploy na rede BASE Mainnet (Versão Oficial)...");

  // Pega a conta configurada no .env
  const [deployer] = await ethers.getSigners();
  console.log("👤 Deployando com a conta:", deployer.address);
  
  const saldo = await deployer.provider.getBalance(deployer.address);
  console.log("💰 Saldo para gás:", ethers.formatEther(saldo), "ETH");

  // --- CONFIGURAÇÕES CHAINLINK VRF V2.5 (BASE MAINNET) ---
  // Endereço Oficial do Coordinator V2.5 na Base
  const vrfCoordinator = "0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE";
  
  // KeyHash (30 gwei Key Hash - Padrão da Base Mainnet)
  const keyHash = "0x9e1344a14d322025f6baf9738c6541604a11c8a3069176378c3b174775d78703";

  // SEU ID GIGANTE DA CHAINLINK (Confirme se é este mesmo)
  const subscriptionId = "43006425227731859292746153181735802666457705377193959189252672374584802340013"; 

  // Sua carteira (onde cairão os 10% de taxa)
  const treasury = deployer.address;

  // Carrega o contrato
  console.log("⏳ Compilando e enviando transação...");
  const BlockchainBetBrasil = await ethers.getContractFactory("BlockchainBetBrasil");
  
  // Faz o deploy passando os 4 argumentos do construtor
  const contrato = await BlockchainBetBrasil.deploy(
    vrfCoordinator,
    subscriptionId,
    keyHash,
    treasury
  );

  await contrato.waitForDeployment();
  const endereco = await contrato.getAddress();

  console.log("----------------------------------------------------");
  console.log("✅ SUCESSO ABSOLUTO! Contrato online em:", endereco);
  console.log("----------------------------------------------------");
  console.log("⚠️ PRÓXIMOS PASSOS OBRIGATÓRIOS:");
  console.log("1. Vá em vrf.chain.link e adicione este endereço (" + endereco + ") como CONSUMER.");
  console.log("2. Vá em automation.chain.link e registre este endereço como UPKEEP (Custom Logic).");
  console.log("3. Copie o endereço acima e atualize no arquivo src/constants/abi.ts");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});