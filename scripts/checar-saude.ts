const { ethers } = require("hardhat");

// --- SUAS CONFIGURAÇÕES ---
const SEU_CONTRATO = "0xDE71dFe53E98c8a032448F077c1FEB253313C45c"; 
// Seu ID (Garanta que não tem espaços em branco no final)
const VRF_SUB_ID = "29574306574099432236311817104098705224295120407155089140736933246380503803700";

// Endereço Oficial VRF V2.5 (Base)
const VRF_COORDINATOR = "0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE";
const LINK_TOKEN = "0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("\n🏥 INICIANDO CHECK-UP (V2.5 - TUPLE FIX)...");
  console.log("==================================================");

  // 1. CHECAR CARTEIRA
  const saldoEth = await ethers.provider.getBalance(owner.address);
  let saldoLink = "---";
  try {
      const LinkContract = await ethers.getContractAt(["function balanceOf(address) view returns (uint256)"], LINK_TOKEN);
      saldoLink = ethers.formatEther(await LinkContract.balanceOf(owner.address));
  } catch(e) {}

  console.log(`👤 SUA CARTEIRA:`);
  console.log(`   Endereço: ${owner.address}`);
  console.log(`   Saldo ETH:  ${ethers.formatEther(saldoEth)} ETH`);
  console.log(`   Saldo LINK: ${saldoLink} LINK`);
  console.log("--------------------------------------------------");

  // 2. CHECAR CONTRATO
  const BetBrasil = await ethers.getContractFactory("BlockchainBetBrasil");
  const contrato = BetBrasil.attach(SEU_CONTRATO);
  
  const idAtual = await contrato.rodadaAtualId();
  const rodada = await contrato.rodadas(idAtual);
  
  // Cálculo de Tempo
  const inicio = Number(rodada.timestampInicio);
  const agora = Math.floor(Date.now() / 1000);
  const duracao = 142 * 3600; 
  const fim = inicio + duracao;
  const horasRestantes = ((fim - agora) / 3600).toFixed(1);

  console.log(`🏟️  RODADA ATUAL (#${idAtual}):`);
  console.log(`   Status: ${rodada.aberta ? "🟢 ABERTA" : "🔴 FECHADA"}`);
  console.log(`   Total Basic: ${ethers.formatEther(rodada.totalBasic)} ETH`);
  console.log(`   Total Pro:   ${ethers.formatEther(rodada.totalPro)} ETH`);
  
  if (rodada.aberta) {
      console.log(`   ⏳ Tempo Restante: ${horasRestantes} horas`);
  }
  console.log("--------------------------------------------------");

  // 3. CHECAR SAÚDE DO SORTEIO (VRF) - CORREÇÃO DE LEITURA
  // Usando sintaxe de Tupla para evitar erro BAD_DATA
  const Coordinator = await ethers.getContractAt([
      "function getSubscription(uint256 subId) view returns (uint96 balance, uint96 nativeBalance, uint64 reqCount, address owner, address[] consumers)"
  ], VRF_COORDINATOR);
  
  try {
      // Tenta ler como array simples (v6)
      const sub = await Coordinator.getSubscription(VRF_SUB_ID);
      
      // Na V2.5, nativeBalance é o segundo item
      const saldoEthVrf = ethers.formatEther(sub[1]); 
      
      console.log(`🎲 SISTEMA DE SORTEIO (VRF):`);
      console.log(`   Saldo ETH (Combustível): ${saldoEthVrf} ETH`);
      
      if (Number(saldoEthVrf) < 0.002) {
          console.log(`   🚨 ALERTA: Nível baixo! Deposite ETH no vrf.chain.link`);
      } else {
          console.log(`   ✅ Status: Operacional (Tanque Cheio)`);
      }

  } catch (e: any) {
      console.log("⚠️ AVISO VISUAL (O Script falhou ao ler, mas o site deve estar OK):");
      console.log("   Motivo:", e.shortMessage || e.message);
      console.log("   👉 Para certeza absoluta, verifique o saldo em: vrf.chain.link");
  }
  
  console.log("--------------------------------------------------");
  console.log("🤖 SISTEMA DE AUTOMAÇÃO (ROBÔ):");
  console.log("   👉 Verifique em: automation.chain.link");
  console.log("==================================================\n");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});