// ENDEREÇO OFICIAL (REDE SEPOLIA - TESTNET)
export const CONTRACT_ADDRESS = "0xF00aA01e9d1f8E81fd070FBE52A917bE07710469";

// ABI (O Manual de Instruções do Contrato V5)
export const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_treasury",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "valor",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contagemAtual",
          "type": "uint256"
        }
      ],
      "name": "BonusZeroConcedido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "tier",
          "type": "uint8"
        }
      ],
      "name": "FreeBetGanho",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "tier",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "usouFreeBet",
          "type": "bool"
        }
      ],
      "name": "NovaAposta",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Paused",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "faixa",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "valorTotal",
          "type": "uint256"
        }
      ],
      "name": "PremioDistribuido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint8[10]",
          "name": "resultado",
          "type": "uint8[10]"
        }
      ],
      "name": "ResultadoDefinido",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "totalArrecadado",
          "type": "uint256"
        }
      ],
      "name": "RodadaFechada",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "Unpaused",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "BONUS_ZERO_BASIC",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "BONUS_ZERO_INVEST",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "META_FREE_BET",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRECO_BASIC",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PRECO_INVEST",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "apostasDaRodada",
      "outputs": [
        {
          "internalType": "address",
          "name": "apostador",
          "type": "address"
        },
        {
          "internalType": "uint8",
          "name": "tier",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "processada",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "pontos",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[10]",
          "name": "_resultado",
          "type": "uint8[10]"
        }
      ],
      "name": "definirResultado",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fecharRodada",
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
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_inicio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_fim",
          "type": "uint256"
        }
      ],
      "name": "processarResultadosBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8[10]",
          "name": "_coords",
          "type": "uint8[10]"
        },
        {
          "internalType": "uint8",
          "name": "_tier",
          "type": "uint8"
        }
      ],
      "name": "realizarAplicacao",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rodadaAtualId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "rodadas",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "aberta",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "finalizada",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "totalArrecadadoBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalArrecadadoInvest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestampInicio",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "sacarFundos",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "stats",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "contadorZeroBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "contadorZeroInvest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "freeBetsBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "freeBetsInvest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "saldoBonus",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenAplicacao",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "treasury",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
    "name": "realizarAplicacao",
    "outputs": [],
    "stateMutability": "nonpayable", // Na Sepolia estamos usando o MockToken, então não precisa enviar ETH direto na função (payable), o pagamento é via transferFrom do token
    "type": "function"
  }
] as const;