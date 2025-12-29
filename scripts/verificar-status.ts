const { ethers } = require("hardhat");

// SEU CONTRATO NOVO (DEPLOY DE SÁBADO)
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
  
  // Calcula o final (142 horas depois)
  const fimTimestamp = inicioTimestamp + (142 * 3600);
  const dataFim = new Date(fimTimestamp * 1000);

  // Calcula o reinício (168 horas depois)
  const reinicioTimestamp = inicioTimestamp + (168 * 3600);
  const dataReinicio = new Date(reinicioTimestamp * 1000);

  console.log(`🟢 INÍCIO REAL (Deploy):   ${dataInicio.toLocaleString("pt-BR")}`);
  console.log(`🔴 FECHAMENTO PREVISTO:    ${dataFim.toLocaleString("pt-BR")} (Sexta)`);
  console.log(`🔄 PRÓXIMA RODADA (Auto):  ${dataReinicio.toLocaleString("pt-BR")} (Sábado)`);
  console.log("-----------------------------------");
  console.log("STATUS ATUAL:");
  console.log(`- Aberta: ${rodada.aberta ? "SIM ✅" : "NÃO ❌"}`);
  console.log(`- Total no Pote: ${ethers.formatEther(rodada.totalArrecadado)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});