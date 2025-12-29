const { ethers } = require("hardhat");

// ENDEREÇO DO DEPLOY FINAL (DOMINGO)
const CONTRACT_ADDRESS = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c";

async function main() {
  const BetBrasil = await ethers.getContractFactory("BlockchainBetBrasil");
  const contrato = BetBrasil.attach(CONTRACT_ADDRESS);

  console.log("🔍 LENDO O CRONOGRAMA DA RODADA 1...");
  console.log("-----------------------------------");

  // Pega os dados da Rodada 1
  const rodada = await contrato.rodadas(1);
  
  // Converte o Timestamp (segundos) para Data Legível
  const inicioTimestamp = Number(rodada.timestampInicio);
  const dataInicio = new Date(inicioTimestamp * 1000);
  
  // Calcula o fechamento (142 horas depois)
  const fimTimestamp = inicioTimestamp + (142 * 3600);
  const dataFim = new Date(fimTimestamp * 1000);

  // Calcula o reinício (168 horas depois - Ciclo Semanal)
  const reinicioTimestamp = inicioTimestamp + (168 * 3600);
  const dataReinicio = new Date(reinicioTimestamp * 1000);

  console.log(`🟢 INÍCIO REAL:          ${dataInicio.toLocaleString("pt-BR")}`);
  console.log(`🔴 FECHAMENTO (Sorteio): ${dataFim.toLocaleString("pt-BR")}`);
  console.log(`🔄 REINÍCIO (Auto):      ${dataReinicio.toLocaleString("pt-BR")}`);
  console.log("-----------------------------------");
  
  console.log("📊 STATUS FINANCEIRO:");
  // Agora mostramos os dois potes separados
  console.log(`💰 Pote Básico: ${ethers.formatEther(rodada.totalBasic)} ETH`);
  console.log(`💎 Pote Pro:    ${ethers.formatEther(rodada.totalPro)} ETH`);
  
  console.log("-----------------------------------");
  console.log("ESTADO TÉCNICO:");
  console.log(`- Aberta: ${rodada.aberta ? "SIM ✅" : "NÃO ❌"}`);
  console.log(`- Sorteada: ${rodada.sorteada ? "SIM ✅" : "NÃO ❌"}`);
  console.log(`- Finalizada: ${rodada.finalizada ? "SIM ✅" : "NÃO ❌"}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});