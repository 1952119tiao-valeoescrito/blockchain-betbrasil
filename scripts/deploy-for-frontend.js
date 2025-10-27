// blockchain-betbrasil-frontend/scripts/deploy-for-frontend.js

const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  
  // ======================================================================
  //              INFORMAÇÕES DE CONFIGURAÇÃO (AJUSTE AQUI)
  // ======================================================================
  // Estes são os argumentos para os construtores dos seus contratos.
  // **ATENÇÃO:** Para testes locais com `npx hardhat node`, você pode precisar
  // deployar contratos mock para `stablecoin` e `vrfCoordinator` antes,
  // ou usar endereços de testnet (se deployando para testnet).
  
  // Endereço da stablecoin (ERC20)
  // Para ambiente de desenvolvimento local, podemos deployar um mock ERC20.
  let stablecoinAddress;
  // Se você já tem um mock ERC20 deployado, coloque o endereço aqui:
  // stablecoinAddress = "0x..."; 
  
  // Chainlink VRF Coordinator e outros parâmetros
  // Para ambiente de desenvolvimento local, podemos deployar um mock VRFCoordinator.
  let vrfCoordinatorAddress;
  let subscriptionId;
  let keyHash;
  
  // ======================================================================
  //              MOCKS PARA DESENVOLVIMENTO LOCAL (OPCIONAL, MAS RECOMENDADO)
  // ======================================================================
  // Se você está deployando para `localhost` com `hardhat node`,
  // é uma boa prática deployar mocks para dependências externas como Stablecoin e Chainlink VRF.
  // Certifique-se de ter `@chainlink/contracts` instalado para VRFCoordinatorV2Mock.

  if (hre.network.name === "localhost") {
    console.log("Deploying mock contracts for localhost development...");
    
    // Deploy Mock Stablecoin (ERC20)
    const MockERC20 = await hre.ethers.getContractFactory("MockERC20"); // Você precisaria criar este mock
                                                                       // Ex: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/mocks/ERC20Mock.sol
    const mockStablecoin = await MockERC20.deploy("Mock Stablecoin", "MSC", deployer.address, ethers.utils.parseUnits("1000000", 18));
    await mockStablecoin.waitForDeployment();
    stablecoinAddress = await mockStablecoin.getAddress();
    console.log("Mock Stablecoin deployed to:", stablecoinAddress);

    // Deploy Mock VRFCoordinatorV2 and fund subscription
    const VRFCoordinatorV2Mock = await hre.ethers.getContractFactory("VRFCoordinatorV2Mock");
    const vrfCoordinatorMock = await VRFCoordinatorV2Mock.deploy(
      ethers.utils.parseEther("0.1"), // baseFee
      1000000000 // gasPriceLink (1 Gwei)
    );
    await vrfCoordinatorMock.waitForDeployment();
    vrfCoordinatorAddress = await vrfCoordinatorMock.getAddress();
    console.log("Mock VRFCoordinatorV2 deployed to:", vrfCoordinatorAddress);

    // Create a subscription and fund it
    const tx = await vrfCoordinatorMock.createSubscription();
    const receipt = await tx.wait();
    subscriptionId = receipt.events[0].args.subId; // Depende da versão do Hardhat/Ethers. Pode precisar de ajuste.
    console.log("VRF Subscription created with ID:", subscriptionId);

    // Fund subscription
    await vrfCoordinatorMock.fundSubscription(subscriptionId, ethers.utils.parseEther("1")); // Fund with 1 LINK (mock)
    console.log(`VRF Subscription ${subscriptionId} funded.`);

    // Get a valid keyHash for the mock
    keyHash = "0x79d3d8832d904592c07559193131018e521d794de470f2550256ade22097bac4"; // Exemplo, verifique a doc do Chainlink VRF Mock

  } else {
    // Se não for localhost, use os endereços reais da rede
    stablecoinAddress = "0x..."; // Endereço real da stablecoin na sua testnet/mainnet
    vrfCoordinatorAddress = "0x..."; // Endereço real do VRF Coordinator
    subscriptionId = 123;   // Seu Subscription ID real
    keyHash = "0x...";      // Seu Key Hash real
    console.warn("Deploying to a non-localhost network. Ensure provided addresses are correct!");
  }

  // ======================================================================
  //              DEPLOY DOS SEUS CONTRATOS REAIS
  // ======================================================================

  // 1. Deploy SistemaTodoMundoGanha
  const SistemaTodoMundoGanhaFactory = await hre.ethers.getContractFactory("SistemaTodoMundoGanha");
  const sistema = await SistemaTodoMundoGanhaFactory.deploy(deployer.address);
  await sistema.waitForDeployment();
  const sistemaAddress = await sistema.getAddress();
  console.log("SistemaTodoMundoGanha deployed to:", sistemaAddress);

  // 2. Deploy BlockchainBetBrasilV2
  const BlockchainBetBrasilV2Factory = await hre.ethers.getContractFactory("BlockchainBetBrasilV2");
  const betBrasil = await BlockchainBetBrasilV2Factory.deploy(
    stablecoinAddress,
    vrfCoordinatorAddress,
    subscriptionId,
    keyHash
  );
  await betBrasil.waitForDeployment();
  const betBrasilAddress = await betBrasil.getAddress();
  console.log("BlockchainBetBrasilV2 deployed to:", betBrasilAddress);

  // 3. Deploy InvestBetV2
  const InvestBetV2Factory = await hre.ethers.getContractFactory("InvestBetV2");
  const investBet = await InvestBetV2Factory.deploy(
    betBrasilAddress, // Argumento _blockchainBetBrasil (endereço do BlockchainBetBrasilV2)
    stablecoinAddress
  );
  await investBet.waitForDeployment();
  const investBetAddress = await investBet.getAddress();
  console.log("InvestBetV2 deployed to:", investBetAddress);

  // ======================================================================
  //              SALVAR ARTEFATOS PARA O FRONTEND
  // ======================================================================

  const frontendPath = path.join(__dirname, '..', '..', 'betbrasil-frontend-react', 'src', 'contracts');
  
  // Cria o diretório se não existir
  if (!fs.existsSync(frontendPath)) {
    fs.mkdirSync(frontendPath, { recursive: true });
  }

  // Salvar os endereços de TODOS os contratos (SistemaTodoMundoGanha, BlockchainBetBrasilV2, InvestBetV2)
  fs.writeFileSync(
    path.join(frontendPath, "contract-address.json"),
    JSON.stringify({ 
      SistemaTodoMundoGanha: sistemaAddress,
      BlockchainBetBrasilV2: betBrasilAddress,
      InvestBetV2: investBetAddress,
      MockStablecoin: stablecoinAddress // Opcional: para o frontend saber o endereço do mock ERC20
    }, undefined, 2)
  );

  // Salvar as ABIs de todos os contratos
  const SistemaTodoMundoGanhaArtifact = await hre.artifacts.readArtifact("SistemaTodoMundoGanha");
  fs.writeFileSync(
    path.join(frontendPath, "SistemaTodoMundoGanha.json"),
    JSON.stringify(SistemaTodoMundoGanhaArtifact.abi, undefined, 2)
  );

  const BlockchainBetBrasilV2Artifact = await hre.artifacts.readArtifact("BlockchainBetBrasilV2");
  fs.writeFileSync(
    path.join(frontendPath, "BlockchainBetBrasilV2.json"),
    JSON.stringify(BlockchainBetBrasilV2Artifact.abi, undefined, 2)
  );

  const InvestBetV2Artifact = await hre.artifacts.readArtifact("InvestBetV2");
  fs.writeFileSync(
    path.join(frontendPath, "InvestBetV2.json"),
    JSON.stringify(InvestBetV2Artifact.abi, undefined, 2)
  );
  
  // Salvar ABI do MockERC20 (se você o deployou no script e quiser interagir com ele no frontend)
  if (hre.network.name === "localhost") {
      const MockERC20Artifact = await hre.artifacts.readArtifact("MockERC20");
      fs.writeFileSync(
          path.join(frontendPath, "MockERC20.json"),
          JSON.stringify(MockERC20Artifact.abi, undefined, 2)
      );
  }

  console.log("Contract artifacts saved to frontend directory:", frontendPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});