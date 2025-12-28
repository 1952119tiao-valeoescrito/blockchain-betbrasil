// ⚠️ ATENÇÃO: SUBSTITUA PELO ENDEREÇO DO NOVO CONTRATO APÓS O DEPLOY
// O endereço antigo NÃO vai funcionar pois a lógica mudou completamente.
export const CONTRACT_ADDRESS = "0x726A85813C2d69C3bf70D32DcAf0201327B2E416";

export const CONTRACT_ABI = [
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
          "indexed": true,
          "internalType": "uint256",
          "name": "rodadaId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "poteBasic",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "potePro",
          "type": "uint256"
        }
      ],
      "name": "CascataCalculada",
      "type": "event"
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
          "name": "participante",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isPro",
          "type": "bool"
        }
      ],
      "name": "NovaAplicacao",
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
          "name": "participante",
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
      "name": "SorteioRealizado",
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
          "indexed": true,
          "internalType": "address",
          "name": "participante",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "pontos",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isPro",
          "type": "bool"
        }
      ],
      "name": "VitoriaRegistrada",
      "type": "event"
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
      "name": "MAX_APLICACOES",
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
      "name": "VALOR_BASIC_MIN",
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
      "name": "VALOR_PRO_MIN",
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
      "name": "aplicacoesDaRodada",
      "outputs": [
        {
          "internalType": "address",
          "name": "participante",
          "type": "address"
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
          "name": "pontos",
          "type": "uint8"
        },
        {
          "internalType": "bool",
          "name": "isPro",
          "type": "bool"
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
      "name": "checkUpkeep",
      "outputs": [
        {
          "internalType": "bool",
          "name": "upkeepNeeded",
          "type": "bool"
        },
        {
          "internalType": "bytes",
          "name": "performData",
          "type": "bytes"
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
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "getAplicacoesUsuario",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "participante",
              "type": "address"
            },
            {
              "internalType": "uint8[10]",
              "name": "prognosticos",
              "type": "uint8[10]"
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
              "name": "pontos",
              "type": "uint8"
            },
            {
              "internalType": "bool",
              "name": "isPro",
              "type": "bool"
            }
          ],
          "internalType": "struct BlockchainBetBrasil.Aplicacao[]",
          "name": "",
          "type": "tuple[]"
        },
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
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
          "internalType": "bytes",
          "name": "performData",
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
          "name": "_prognosticos",
          "type": "uint8[10]"
        }
      ],
      "name": "realizarAplicacao",
      "outputs": [],
      "stateMutability": "payable",
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
          "name": "totalBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "boloBasic",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalPro",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "boloPro",
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
          "internalType": "uint256",
          "name": "_rodadaId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_indiceApp",
          "type": "uint256"
        }
      ],
      "name": "sacarRendimento",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "saldoRolloverBasic",
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
      "name": "saldoRolloverPro",
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
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_rodadaId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_indiceApp",
          "type": "uint256"
        }
      ],
      "name": "verificarAplicacao",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ] as const;