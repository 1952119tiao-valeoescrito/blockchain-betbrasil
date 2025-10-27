/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 DESATIVA TURBOPACK PARA PRODUÇÃO
  experimental: {
    turbo: undefined
  },
  
  // ✅ SUAS CONFIGURAÇÕES ATUAIS
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig