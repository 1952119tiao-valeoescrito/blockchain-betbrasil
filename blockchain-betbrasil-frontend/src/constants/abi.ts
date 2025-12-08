// ENDEREÇO DO CONTRATO (BASE MAINNET)
export const CONTRACT_ADDRESS = "0x58fCD04D16147C0D9A0B1d7EA244b4992f405F1B";

export const CONTRACT_ABI = [
  // --- 1. JOGADOR ---
  {
    "inputs": [
      { "internalType": "uint8[10]", "name": "_coords", "type": "uint8[10]" },
      { "internalType": "uint8", "name": "_tier", "type": "uint8" }
    ],
    "name": "realizarAplicacao",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },

  // --- 2. LEITURAS ---
  {
    "inputs": [],
    "name": "rodadaAtualId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "rodadas",
    "outputs": [
      { "internalType": "uint256", "name": "id", "type": "uint256" },
      { "internalType": "bool", "name": "aberta", "type": "bool" },
      { "internalType": "bool", "name": "finalizada", "type": "bool" },
      { "internalType": "uint256", "name": "totalArrecadadoBasic", "type": "uint256" },
      { "internalType": "uint256", "name": "totalArrecadadoInvest", "type": "uint256" },
      { "internalType": "uint8[10]", "name": "resultadoSorteado", "type": "uint8[10]" },
      { "internalType": "uint256", "name": "timestampInicio", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },

  // --- 3. ADMIN ---
  {
    "inputs": [],
    "name": "fecharRodada",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint8[10]", "name": "_resultado", "type": "uint8[10]" }],
    "name": "definirResultado",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "iniciarNovaRodada",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }],
    "name": "sacarFundos",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sacarTudo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  
  // --- 4. EMERGÊNCIA ---
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;