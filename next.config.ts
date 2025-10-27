<<<<<<< HEAD
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
=======
import type { NextConfig } from "next";
>>>>>>> 168c98a260b429c60b2c187b2ecebe64fbec360a

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
