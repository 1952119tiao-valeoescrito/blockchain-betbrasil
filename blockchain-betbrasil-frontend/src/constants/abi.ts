// ENDEREÇO DO CONTRATO
export const CONTRACT_ADDRESS = "0x3314c45a23073B73622F24de03985Cd8220D52Fb";

export const CONTRACT_ABI = [
  // --- 1. FUNÇÕES DO JOGADOR ---
  {
    "inputs": [
      { "internalType": "uint8[10]", "name": "_coords", "type": "uint8[10]" },
      { "internalType": "uint8", "name": "_tier", "type": "uint8" }
    ],
    "name": "realizarAplicacao",
    "outputs": [],
    "stateMutability": "payable", // <--- MUDANÇA CRUCIAL: AGORA ACEITA PAGAMENTO (ETH)
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

  // --- 3. AÇÕES DO ADMIN ---
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
  
  // --- 4. PAUSE/UNPAUSE ---
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