// app/config/index.ts

export const CONFIG = {
  NETWORK: process.env.NEXT_PUBLIC_NETWORK || "localhost",
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x...75707",
  STABLECOIN_ADDRESS: process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS || "0x...cF6C9",
  CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337"),
};