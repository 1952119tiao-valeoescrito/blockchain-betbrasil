// app/config/index.ts

export const CONFIG = {
  NETWORK: process.env.NEXT_PUBLIC_NETWORK || "https://eth-sepolia.g.alchemy.com/v2/_QsTs9Aqs2O157OI3lgir",
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  STABLECOIN_ADDRESS: process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS || "0x...cF6C9",
  CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || "31337"),
};