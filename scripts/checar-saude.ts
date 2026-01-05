import { ethers } from "hardhat";

async function main() {
  console.log("--- Iniciando Diagnóstico de Saúde do Protocolo ---");

  // --- CONFIGURAÇÕES ---
  const SEU_CONTRATO = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c";

  try {
    const provider = ethers.provider;
    const balance = await provider.getBalance(SEU_CONTRATO);
    
    console.log(`Contrato: ${SEU_CONTRATO}`);
    console.log(`Saldo no Contrato: ${ethers.formatEther(balance)} ETH`);
    console.log("Status: Conectado à Rede Base");
  } catch (error) {
    console.error("Erro ao checar saúde:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export {}; // Garante que o arquivo seja tratado como um módulo isolado