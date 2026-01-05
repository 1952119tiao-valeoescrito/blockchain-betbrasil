"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';

export default function PoliticaPrivacidade() {
  const platformName = "Blockchain Bet Brasil";
  const currentDate = "Dezembro de 2025";

  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-200 py-12 font-sans selection:bg-[#cfb16d] selection:text-black">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Botão Voltar */}
        <div className="mb-8">
            <Link href="/">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-wider group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Voltar para o Início
                </button>
            </Link>
        </div>

        <div className="bg-[#13151a] rounded-[32px] border border-[#2a2d35] shadow-2xl p-8 md:p-12 relative overflow-hidden">
          
          {/* Efeito de fundo leve (Dourado) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#cfb16d]/5 rounded-full blur-[80px] pointer-events-none"></div>

          <header className="text-center mb-10 border-b border-[#2a2d35] pb-8 relative z-10">
            <div className="inline-block p-4 bg-[#cfb16d]/10 rounded-2xl mb-4 border border-[#cfb16d]/20">
                <Shield size={40} className="text-[#cfb16d]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight uppercase">
              Política de Privacidade <br/><span className="text-[#cfb16d] text-lg md:text-xl font-medium tracking-widest">Protocolo Web3 & Blockchain</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-4">
              Última atualização: {currentDate}
            </p>
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-8 relative z-10 text-sm md:text-base">
            <p>
              A <strong>{platformName}</strong> é uma Interface Descentralizada (DApp) que interage diretamente com a rede <strong>Base Mainnet</strong>. 
              Diferente de plataformas tradicionais, nós não mantemos um banco de dados centralizado com suas senhas, e-mails ou dados pessoais sensíveis.
            </p>

            {/* SEÇÃO 1 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Database className="text-[#cfb16d]" size={20} /> 1. Dados Públicos vs. Privados
                </h2>
                <p className="text-gray-400 mb-3">
                Ao conectar sua carteira (Wallet), o sistema lê apenas informações que são, por natureza, <strong>públicas</strong> na Blockchain:
                </p>
                <ul className="list-none space-y-3 bg-[#0b0c10] p-5 rounded-xl border border-[#2a2d35] text-sm">
                    <li className="flex items-start gap-3">
                        <span className="text-[#cfb16d] font-bold">✓</span>
                        <span>Endereço Público da Carteira (Public Address).</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#cfb16d] font-bold">✓</span>
                        <span>Histórico de Interações com o Contrato Inteligente (Adesões e Saques).</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#cfb16d] font-bold">✓</span>
                        <span>Saldo de Token Nativo (ETH) para verificação de capacidade de adesão.</span>
                    </li>
                </ul>
            </div>

            {/* SEÇÃO 2 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Eye className="text-[#cfb16d]" size={20} /> 2. Rastreamento e Analytics
                </h2>
                <p className="text-gray-400">
                Utilizamos ferramentas de análise anônima (Google Analytics) estritamente para métricas de performance (tráfego, origem geográfica geral). 
                <strong>Não realizamos cruzamento de dados</strong> (fingerprinting) para associar sua carteira à sua identidade física.
                </p>
            </div>

            {/* SEÇÃO 3 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Lock className="text-[#cfb16d]" size={20} /> 3. Segurança dos Fundos (Trustless)
                </h2>
                <div className="bg-[#cfb16d]/10 border-l-4 border-[#cfb16d] p-4 rounded-r-lg">
                    <p className="text-sm text-[#cfb16d] font-bold">
                        Nós NUNCA teremos acesso às suas Chaves Privadas (Private Keys) ou Frase de Recuperação (Seed Phrase).
                    </p>
                </div>
                <p className="text-gray-400 mt-4">
                    Todas as transações de valor devem ser assinadas manualmente por você através da sua carteira. 
                    O Contrato Inteligente é <strong>auditável e imutável</strong>, garantindo que as regras de distribuição não podem ser alteradas por terceiros.
                </p>
            </div>

            {/* SEÇÃO 4 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">4. Contato e Suporte</h2>
                <div className="bg-[#0b0c10] p-6 rounded-2xl border border-[#2a2d35]">
                <p className="mb-4 text-sm text-gray-400">
                    Para questões relacionadas à interface ou funcionamento do protocolo:
                </p>
                <div className="text-white font-mono text-sm space-y-2">
                    <p className="flex items-center gap-2">
                        <span className="text-[#cfb16d] font-bold uppercase text-xs">E-mail Oficial:</span> 
                        sfchagasfilho@yahoo.com.br
                    </p>
                </div>
                </div>
            </div>
          </div>

          <div className="mt-12 text-center border-t border-[#2a2d35] pt-8">
            <Link href="/">
              <button className="bg-white text-black hover:bg-[#cfb16d] px-8 py-4 rounded-xl transition-all duration-300 font-bold shadow-lg transform hover:scale-105 uppercase tracking-wide text-sm">
                Li e Concordo com os Termos
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}