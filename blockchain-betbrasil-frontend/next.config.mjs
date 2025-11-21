/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Ignora módulos que causam warnings no build com Wagmi/RainbowKit
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    return config;
  },
};

module.exports = nextConfig;