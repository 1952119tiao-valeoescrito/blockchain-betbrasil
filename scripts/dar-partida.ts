const { ethers } = require("hardhat");

// SEU ENDEREÇO (CONFIRA SE É O DO ÚLTIMO DEPLOY)
const CONTRACT_ADDRESS = "0x476A5790E01BB399026675e966713884707556C3";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("👑 Conectado como Dono:", owner.address);

  // USA getContractAt (Mais seguro para pegar a versão atualizada do código)
  const contrato = await ethers.getContractAt("BlockchainBetBrasil", CONTRACT_ADDRESS);

  console.log("------------------------------------------------");
  console.log("🏎️  DANDO A PARTIDA MANUALMENTE...");
  
  try {
    console.log("1️⃣  Tentando fechar a rodada...");
    
    // Tenta chamar a função
    const tx = await contrato.encerrarRodada();
    
    console.log("⏳ Transação enviada! Hash:", tx.hash);
    await tx.wait();
    
    console.log("✅ SUCESSO! O Chainlink foi acionado.");
    console.log("👉 Aguarde 1 minuto e recarregue a página de Resultados.");
    
  } catch (error: any) {
    // Tratamento de erro amigável
    if (error.message.includes("Ja fechada")) {
        console.log("⚠️ AVISO: A rodada JÁ ESTAVA fechada! O sorteio já deve ter acontecido.");
    } else {
        console.log("❌ ERRO TÉCNICO:", error.message || error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});