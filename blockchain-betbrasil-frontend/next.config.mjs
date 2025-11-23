/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // 1. Mantendo suas configurações atuais (para não quebrar pino/lokijs)
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // 2. Adicionando a CORREÇÃO do erro do Async Storage
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
    };

    return config;
  },
};

export default nextConfig;