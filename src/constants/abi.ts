// ⚠️ ATENÇÃO: SUBSTITUA PELO ENDEREÇO DO NOVO CONTRATO APÓS O DEPLOY
// O endereço antigo NÃO vai funcionar pois a lógica mudou completamente.
export const CONTRACT_ADDRESS = "0x3a8a525af72Ac2dB2CFFFA9199A6b143e9cDa17B";

export const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_vrfCoordinator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_subscriptionId",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "have",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "coordinator",
          "type": "address"
        }
      ],
      "name": "OnlyOwnerOrCoordinator",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ZeroAddress",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "vrfCoordinator",
          "type": "address"
        }
      ],
      "name": "CoordinatorSet",
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
          "internalType": "uint256",
          "name": "valor",
          "type": "uint256"
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
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferRequested",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
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
          "name": "rodadaId",
          "type": "uint256"
        }
      ],
      "name": "PremioPago",
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
          "name": "totalPot",
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
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "requestId",
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
          "indexed": false,
          "internalType": "uint256",
          "name": "valor",
          "type": "uint256"
        }
      ],
      "name": "TreasuryPaga",
      "type": "event"
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
      "name": "INTERVALO_MINIMO_RODADA",
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
      "name": "MAX_APOSTAS_POR_RODADA",
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
      "name": "MAX_NUM",
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
      "name": "NUMS_TO_PICK",
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
      "name": "acceptOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
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
          "internalType": "uint256",
          "name": "valorPago",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "fecharRodadaESolicitarResultado",
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
        },
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getMinhasApostas",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "apostador",
              "type": "address"
            },
            {
              "internalType": "uint8[10]",
              "name": "coordenadas",
              "type": "uint8[10]"
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
              "internalType": "uint256",
              "name": "valorPago",
              "type": "uint256"
            }
          ],
          "internalType": "struct BlockchainBetBrasilTrustless.Aposta[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "requestId",
          "type": "uint256"
        },
        {
          "internalType": "uint256[]",
          "name": "randomWords",
          "type": "uint256[]"
        }
      ],
      "name": "rawFulfillRandomWords",
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
      "stateMutability": "payable",
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
      "name": "reivindicarPremio",
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
          "name": "premioPorGanhadorBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "premioPorGanhadorInvest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestampInicio",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestampFim",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "requestId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "s_vrfCoordinator",
      "outputs": [
        {
          "internalType": "contract IVRFCoordinatorV2Plus",
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
          "name": "_vrfCoordinator",
          "type": "address"
        }
      ],
      "name": "setCoordinator",
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
          "name": "freeBetsBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "freeBetsInvest",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ] as const;