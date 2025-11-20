// ENDEREÇO OFICIAL (REDE SEPOLIA - TESTNET)
export const CONTRACT_ADDRESS = "0xF00aA01e9d1f8E81fd070FBE52A917bE07710469";

// ABI (O Manual de Instruções do Contrato V5)
export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "uint8[10]", "name": "_coords", "type": "uint8[10]" },
      { "internalType": "uint8", "name": "_tier", "type": "uint8" }
    ],
    "name": "realizarAplicacao",
    "outputs": [],
    "stateMutability": "nonpayable", // Na Sepolia estamos usando o MockToken, então não precisa enviar ETH direto na função (payable), o pagamento é via transferFrom do token
    "type": "function"
  }
] as const;