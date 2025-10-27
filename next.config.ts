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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
