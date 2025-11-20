"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermosDeUso() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="mb-8">
            <Link href="/">
                <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold">
                    <ArrowLeft size={20} /> Voltar para o Início
                </button>
            </Link>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 shadow-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center border-b border-slate-700 pb-6">
            TERMOS DE USO
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none space-y-6 text-slate-300 leading-relaxed">
            <p>
              <strong>Última atualização: 23 de Outubro de 2024</strong>
            </p>
            
            <p>
              Bem-vindo(a) à Blockchain Bet Brasil!
            </p>
            
            <p>
              Estes Termos de Uso ("Termos") regem o acesso e a utilização da nossa 
              plataforma de investimento e entretenimento gamificado ("Plataforma"). 
              Ao acessar, navegar ou utilizar a Plataforma, você concorda em cumprir e estar 
              vinculado(a) a estes Termos, à nossa Política de Privacidade e a todas as leis 
              e regulamentos aplicáveis.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-3 flex items-center gap-2">
              <span className="text-emerald-500">1.</span> Aceitação dos Termos
            </h2>
            <p>
              Ao utilizar a Plataforma, você declara ter lido, compreendido e aceito 
              integralmente estes Termos de Uso. Estes Termos podem ser atualizados 
              periodicamente, e a continuidade do uso da Plataforma após tais alterações 
              constitui sua aceitação dos Termos revisados.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-3 flex items-center gap-2">
              <span className="text-emerald-500">2.</span> Elegibilidade e Restrições de Idade
            </h2>
            <p>
              A Plataforma é destinada exclusivamente a indivíduos maiores de 18 (dezoito) 
              anos de idade. Ao aceitar estes Termos, você declara e garante que possui a 
              idade legal mínima exigida.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-3 flex items-center gap-2">
               <span className="text-emerald-500">3.</span> Natureza da Plataforma
            </h2>
            <p>
              A Blockchain Bet Brasil oferece uma experiência de entretenimento gamificado 
              baseada em aplicações e prognósticos em um ambiente descentralizado (blockchain). 
              A Plataforma não se destina a ser um serviço de consultoria financeira.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-3 flex items-center gap-2">
               <span className="text-emerald-500">4.</span> Contato
            </h2>
            
            <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
              <p className="mb-2">
                Para quaisquer dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <div className="text-emerald-400 mt-2 font-mono">
                <p><strong>E-mail:</strong> sfchagasfilho@yahoo.com.br</p>
                <p><strong>Telefone:</strong> +55 (21) 99352-7957</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center border-t border-slate-700 pt-8">
            <Link href="/">
                <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-bold shadow-lg hover:shadow-emerald-500/20">
                Entendi e Concordo
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}