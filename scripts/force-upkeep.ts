const { ethers } = require("hardhat");

// ENDEREÇO NOVO (COM NATIVE PAYMENT)
const CONTRACT_ADDRESS = "0x0B65F76D58cA4319714D0eAa15D70c484696f2f0";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("👷‍♂️ Iniciando Força Bruta com a conta:", owner.address);

  const contrato = await ethers.getContractAt("BlockchainBetBrasil", CONTRACT_ADDRESS);

  console.log("------------------------------------------------");
  console.log("⚡ TENTANDO FORÇAR O SORTEIO (AÇÃO 1)...");

  try {
    // Código 1 = Encerrar Rodada
    const performDataSorteio = ethers.AbiCoder.defaultAbiCoder().encode(["uint8"], [1]);
    const tx = await contrato.performUpkeep(performDataSorteio);
    
    console.log("⏳ Transação enviada! Hash:", tx.hash);
    await tx.wait();
    console.log("✅ SUCESSO! Rodada encerrada e Sorteio solicitado.");

  } catch (error: any) {
    console.log("❌ Sorteio não executado (Talvez já tenha sido pedido).");
    
    console.log("\n⚡ TENTANDO FORÇAR O PAGAMENTO/CASCATA (AÇÃO 2)...");
    try {
        // Código 2 = Pagar Cascata
        const performDataCascata = ethers.AbiCoder.defaultAbiCoder().encode(["uint8"], [2]);
        const tx2 = await contrato.performUpkeep(performDataCascata);
        console.log("⏳ Transação de Pagamento enviada! Hash:", tx2.hash);
        await tx2.wait();
        console.log("✅ SUCESSO! Cascata calculada e pagamento liberado.");
    } catch (e: any) {
        console.log("❌ Nenhuma ação pendente ou erro na execução.");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});