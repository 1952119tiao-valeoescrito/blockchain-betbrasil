import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // Necessário para evitar erros de compatibilidade em algumas L2s como a Base
      evmVersion: "paris", 
    },
  },
  networks: {
    base: {
      url: "https://1rpc.io/base",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 8453,
      // Configurações de Gas para garantir que a transação não trave
      gasPrice: "auto", 
    },
  },
  // 👇 Configuração para verificar o código no Basescan
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  },
  sourcify: {
    enabled: true
  }
};

export default config;