const { ethers } = require("hardhat");

// --- SUAS CONFIGURAÇÕES ---
const SEU_CONTRATO = "0xBD1cBDE25d135E5BF228E546f7C248b2d9efEBf7"; // Contrato Oficial
const VRF_SUB_ID = "29574306574099432236311817104098705224295120407155089140736933246380503803700";

// --- ENDEREÇOS OFICIAIS BASE ---
const VRF_COORDINATOR = "0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE";
const LINK_TOKEN = "0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("\n🏥 INICIANDO CHECK-UP DO SISTEMA...");
  console.log("==================================================");

  // 1. CHECAR CARTEIRA DO CEO
  const saldoEth = await ethers.provider.getBalance(owner.address);
  const LinkContract = await ethers.getContractAt(["function balanceOf(address) view returns (uint256)"], LINK_TOKEN);
  const saldoLink = await LinkContract.balanceOf(owner.address);

  console.log(`👤 SUA CARTEIRA (Reserva):`);
  console.log(`   Endereço: ${owner.address}`);
  console.log(`   Saldo ETH:  ${ethers.formatEther(saldoEth)} ETH`);
  console.log(`   Saldo LINK: ${ethers.formatEther(saldoLink)} LINK`);
  console.log("--------------------------------------------------");

  // 2. CHECAR CONTRATO DO JOGO
  const BetBrasil = await ethers.getContractFactory("BlockchainBetBrasil");
  const contrato = BetBrasil.attach(SEU_CONTRATO);
  
  const idAtual = await contrato.rodadaAtualId();
  const rodada = await contrato.rodadas(idAtual);
  
  // Cálculo de Tempo
  const inicio = Number(rodada.timestampInicio);
  const agora = Math.floor(Date.now() / 1000);
  const duracao = 142 * 3600; // 142 horas
  const fim = inicio + duracao;
  const horasRestantes = ((fim - agora) / 3600).toFixed(1);

  console.log(`🏟️  RODADA ATUAL (#${idAtual}):`);
  console.log(`   Status: ${rodada.aberta ? "🟢 ABERTA" : "🔴 FECHADA"}`);
  console.log(`   Total Basic: ${ethers.formatEther(rodada.totalBasic)} ETH`);
  console.log(`   Total Pro:   ${ethers.formatEther(rodada.totalPro)} ETH`);
  
  if (rodada.aberta) {
      if (agora < fim) {
          console.log(`   ⏳ Tempo Restante: ${horasRestantes} horas`);
      } else {
          console.log(`   ⚠️ TEMPO ESGOTADO! O Robô deve fechar a qualquer momento.`);
      }
  }
  console.log("--------------------------------------------------");

  // 3. CHECAR SAÚDE DO SORTEIO (VRF)
  const Coordinator = await ethers.getContractAt(["function getSubscription(uint256) view returns (uint96, uint64, address, address[], address)"], VRF_COORDINATOR);
  
  try {
      const sub = await Coordinator.getSubscription(VRF_SUB_ID);
      const saldoVrf = ethers.formatEther(sub[0]);
      
      console.log(`🎲 SISTEMA DE SORTEIO (VRF):`);
      console.log(`   Saldo da Assinatura: ${saldoVrf} ETH`);
      
      if (Number(saldoVrf) < 0.002) {
          console.log(`   🚨 ALERTA: Combustível Baixo! Deposite ETH no VRF.`);
      } else {
          console.log(`   ✅ Status: Operacional (Tanque Cheio)`);
      }

  } catch (e) {
      console.log("❌ Não foi possível ler o VRF (Verifique o ID).");
  }
  
  console.log("--------------------------------------------------");
  console.log("🤖 SISTEMA DE AUTOMAÇÃO (ROBÔ):");
  console.log("   👉 Para ver o saldo do Robô, acesse: automation.chain.link");
  console.log("   (A leitura via script é bloqueada por segurança na V2)");
  console.log("==================================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});