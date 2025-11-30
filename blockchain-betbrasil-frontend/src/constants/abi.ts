// Certifique-se que o endereço está certo!
export const CONTRACT_ADDRESS = "0x7a3FF967aA0de97F3bDD334a94bc52A2F0f916Cf";

export const CONTRACT_ABI = [
  // --- LEITURAS ---
  {
    "inputs": [],
    "name": "rodadaAtualId", // Nome exato do contrato
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

  // --- AÇÕES DO ADMIN (PORTUGUÊS) ---
  {
    "inputs": [],
    "name": "fecharRodada", // <--- IMPORTANTE: Tem que fechar antes de definir
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
  
  // --- PAUSE/UNPAUSE (Padrão OpenZeppelin - Inglês) ---
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