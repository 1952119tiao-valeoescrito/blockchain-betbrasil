"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, AlertTriangle, Coins } from 'lucide-react';

export default function TermosDeUso() {
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
          
          {/* Efeito de Fundo */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#cfb16d]/5 rounded-full blur-[80px] pointer-events-none"></div>

          <header className="text-center mb-10 border-b border-[#2a2d35] pb-8 relative z-10">
            <div className="inline-block p-4 bg-[#cfb16d]/10 rounded-2xl mb-4 border border-[#cfb16d]/20">
                <FileText size={40} className="text-[#cfb16d]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight uppercase">
              Termos de Uso <br/><span className="text-[#cfb16d] text-lg md:text-xl font-medium tracking-widest">Protocolo & Smart Contracts</span>
            </h1>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-4">
              Última atualização: {currentDate}
            </p>
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-8 relative z-10 text-sm md:text-base">
            
            <p>
              Estes Termos de Uso regem o acesso e a utilização do Protocolo Descentralizado <strong>Blockchain Bet Brasil</strong> na rede Base.
              Ao conectar sua carteira Web3, você reconhece que está interagindo diretamente com um Contrato Inteligente autônomo, auditável e imutável.
            </p>

            {/* SEÇÃO 1 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <Scale className="text-[#cfb16d]" size={20} /> 1. Natureza Descentralizada (Non-Custodial)
                </h2>
                <p>
                  A plataforma não atua como custodiante de seus ativos. Todo o valor arrecadado é gerido automaticamente pelo código na Blockchain.
                  A administração do protocolo <strong>não possui poder técnico</strong> para reverter transações confirmadas, pausar saques arbitrariamente ou acessar sua chave privada.
                </p>
            </div>

            {/* SEÇÃO 2 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                  <Coins className="text-[#cfb16d]" size={20} /> 2. Regras de Distribuição e Taxas
                </h2>
                <ul className="list-disc pl-5 space-y-2 marker:text-[#cfb16d]">
                    <li>
                        <strong>Taxa Administrativa:</strong> O protocolo retém automaticamente <strong>10%</strong> do valor bruto arrecadado para manutenção e custos operacionais.
                    </li>
                    <li>
                        <strong>Premiação (90%):</strong> O restante do valor é destinado integralmente ao Pote de Distribuição da rodada.
                    </li>
                    <li>
                        <strong>Sistema de Cascata:</strong> Caso não haja acertadores na faixa máxima (5 pontos), o valor do prêmio "desce" e é somado às faixas inferiores, garantindo maior probabilidade de distribuição.
                    </li>
                    <li>
                        <strong>Rollover:</strong> Na hipótese de nenhum participante pontuar em nenhuma faixa, o saldo acumula automaticamente para o pote da rodada seguinte.
                    </li>
                </ul>
            </div>

            {/* SEÇÃO 3 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
                   <AlertTriangle className="text-[#cfb16d]" size={20} /> 3. Riscos e Elegibilidade
                </h2>
                <p>
                  O uso do protocolo é destinado estritamente a maiores de 18 anos. Ao interagir com o DApp, você declara compreender os riscos inerentes à tecnologia Blockchain, incluindo:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-[#cfb16d]">
                    <li>Volatilidade das taxas de gás da rede Base.</li>
                    <li>Irreversibilidade das transações on-chain.</li>
                    <li>Responsabilidade exclusiva pela segurança da sua própria carteira (Wallet).</li>
                </ul>
            </div>

            {/* SEÇÃO 4 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                   4. Auditoria e Aleatoriedade
                </h2>
                <p>
                  Os resultados dos prognósticos são gerados externamente e verificados on-chain através do serviço <strong>Chainlink VRF (Verifiable Random Function)</strong>. 
                  Isso garante matematicamente que nem os desenvolvedores, nem os participantes, podem prever ou manipular os resultados da Matriz.
                </p>
            </div>

            {/* SEÇÃO 5 */}
            <div>
                <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">5. Suporte</h2>
                <div className="bg-[#0b0c10] p-6 rounded-2xl border border-[#2a2d35]">
                  <p className="mb-2 text-sm text-gray-400">
                    Dúvidas técnicas ou reporte de bugs na interface:
                  </p>
                  <div className="text-white font-mono text-sm">
                    <p><strong>E-mail:</strong> <span className="text-[#cfb16d]">sfchagasfilho@yahoo.com.br</span></p>
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