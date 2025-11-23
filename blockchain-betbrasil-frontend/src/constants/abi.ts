// ENDEREÇO OFICIAL (REDE BASE - MAINNET)
export const CONTRACT_ADDRESS = "0xf00aa01e9d1f8e81fd070fbe52a917be07710469"; 
// ABI HÍBRIDA (Funções do Jogo + Funções Administrativas)
export const CONTRACT_ABI = [
  // --- 1. FUNÇÃO DE APOSTA ---
  {
    "inputs": [
      { "internalType": "uint8[10]", "name": "_coords", "type": "uint8[10]" },
      { "internalType": "uint8", "name": "_tier", "type": "uint8" }
    ],
    "name": "realizarAplicacao",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },

  // --- 2. FUNÇÕES ADMINISTRATIVAS (Para o Painel) ---
  { "inputs": [], "name": "owner", "outputs": [{ "type": "address" }], "type": "function" },
  { "inputs": [], "name": "paused", "outputs": [{ "type": "bool" }], "type": "function" },
  { "inputs": [], "name": "currentRoundId", "outputs": [{ "type": "uint256" }], "type": "function" },
  { "inputs": [], "name": "togglePause", "outputs": [], "type": "function" },
  { "inputs": [], "name": "withdrawFees", "outputs": [], "type": "function" },
  { "inputs": [], "name": "startNextRound", "outputs": [], "type": "function" }
] as const;