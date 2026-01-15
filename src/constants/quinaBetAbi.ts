// ⚠️ ATENÇÃO: SUBSTITUA PELO ENDEREÇO DO NOVO CONTRATO QUINA-BET APÓS O DEPLOY
export const QUINA_BET_ADDRESS = "0x0000000000000000000000000000000000000000";

export const QUINA_BET_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_vrf",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_subId",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "_keyHash",
        "type": "bytes32"
      },
      {
        "internalType": "address",
        "name": "_treasury",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_usdcToken",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "have",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "want",
        "type": "address"
      }
    ],
    "name": "OnlyCoordinatorCanFulfill",
    "type": "error"
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
        "name": "apostador",
        "type": "address"
      }
    ],
    "name": "NovaApostaQuina",
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
      }
    ],
    "name": "SorteioSolicitado",
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
        "internalType": "uint8[5]",
        "name": "resultado",
        "type": "uint8[5]"
      }
    ],
    "name": "SorteioRealizadoQuina",
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
        "name": "apostador",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "acertos",
        "type": "uint8"
      }
    ],
    "name": "VitoriaQuinaRegistrada",
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
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "boloPremios",
        "type": "uint256"
      }
    ],
    "name": "CascataCalculadaQuina",
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
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "NovaRodadaIniciada",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "apostador",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "valor",
        "type": "uint256"
      }
    ],
    "name": "SaqueRealizado",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MAX_PROGNOSTICOS",
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
    "name": "VALOR_ENTRADA",
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
    "name": "HOUSE_FEE_PERCENT",
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
    "name": "DURACAO_RODADA",
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
    "name": "JANELA_CHECKIN",
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
    "name": "CICLO_TOTAL",
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
    "name": "TREASURY",
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
    "name": "USDC_TOKEN",
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
    "inputs": [
      {
        "internalType": "uint8[25]",
        "name": "_prognosticos",
        "type": "uint8[25]"
      }
    ],
    "name": "realizarApostaQuina",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "solicitarSorteio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rodadaId",
        "type": "uint256"
      }
    ],
    "name": "reclamarPremio",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "checkUpkeep",
    "outputs": [
      {
        "internalType": "bool",
        "name": "upkeepNeeded",
        "type": "bool"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "performUpkeep",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rodadaId",
        "type": "uint256"
      }
    ],
    "name": "getRodadaInfo",
    "outputs": [
      {
        "internalType": "bool",
        "name": "aberta",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "totalArrecadado",
        "type": "uint256"
      },
      {
        "internalType": "uint8[5]",
        "name": "resultado",
        "type": "uint8[5]"
      },
      {
        "internalType": "uint256",
        "name": "qtdVencedores",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "premioPorVencedor",
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
        "name": "_rodadaId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_apostador",
        "type": "address"
      }
    ],
    "name": "getApostasParticipante",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "apostador",
            "type": "address"
          },
          {
            "internalType": "uint8[25]",
            "name": "prognosticos",
            "type": "uint8[25]"
          },
          {
            "internalType": "bool",
            "name": "verificado",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "pago",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "acertos",
            "type": "uint8"
          }
        ],
        "internalType": "struct QuinaBet.ApostaQuina[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_rodadaId",
        "type": "uint256"
      }
    ],
    "name": "getTotalApostasRodada",
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
    "inputs": [],
    "name": "saldoRollover",
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
        "name": "sorteada",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "finalizada",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestampInicio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "timestampSorteio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalArrecadado",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "boloPremios",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "qtdVencedores",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "premioPorVencedor",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
