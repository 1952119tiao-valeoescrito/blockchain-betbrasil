const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  
  // Deploy SistemaTodoMundoGanha primeiro
  const SistemaTodoMundoGanha = await hre.ethers.getContractFactory("SistemaTodoMundoGanha");
  const sistema = await SistemaTodoMundoGanha.deploy(deployer.address);
  await sistema.waitForDeployment();
  console.log("SistemaTodoMundoGanha deployed to:", await sistema.getAddress());

  // Deploy BlockchainBetBrasilV2
  const BlockchainBetBrasilV2 = await hre.ethers.getContractFactory("BlockchainBetBrasilV2");
  const betBrasil = await BlockchainBetBrasilV2.deploy(
    "0x...", // stablecoin address
    "0x...", // vrfCoordinator
    "123",   // subscriptionId
    "0x..."  // keyHash
  );
  await betBrasil.waitForDeployment();
  console.log("BlockchainBetBrasilV2 deployed to:", await betBrasil.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});