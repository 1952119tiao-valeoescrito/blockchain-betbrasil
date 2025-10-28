/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  experimental: {
    webpackBuildWorker: true,
  },
  env: {
    NEXT_PUBLIC_BET_BRASIL_ADDRESS: process.env.NEXT_PUBLIC_BET_BRASIL_ADDRESS || '0xE491A5fDd61B8896a6C072480Da0D7e127D673BB',
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || '11155111',
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'mainnet',
  },
};

module.exports = nextConfig;