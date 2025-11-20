"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye } from 'lucide-react';

export default function PoliticaPrivacidade() {
  const platformName = "Blockchain Bet Brasil";
  const currentDate = "23 de Outubro de 2024";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 font-sans">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Botão Voltar */}
        <div className="mb-8">
            <Link href="/">
                <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-bold">
                    <ArrowLeft size={20} /> Voltar para o Início
                </button>
            </Link>
        </div>

        <div className="bg-slate-800/50 rounded-xl border border-slate-700 shadow-2xl p-8 md:p-12">
          <header className="text-center mb-10 border-b border-slate-700 pb-8">
            <div className="inline-block p-4 bg-emerald-500/10 rounded-full mb-4">
                <Shield size={48} className="text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              POLÍTICA DE PRIVACIDADE
            </h1>
            <p className="text-slate-400 text-sm">
              <strong>Última atualização: {currentDate}</strong>
            </p>
          </header>
          
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed space-y-6">
            <p>
              A <strong>{platformName}</strong> valoriza a sua privacidade e está comprometida em proteger as informações 
              pessoais que você nos confia. Esta Política de Privacidade descreve como coletamos, usamos, 
              armazenamos e protegemos suas informações.
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
              <Eye className="text-emerald-500" size={20} /> 1. Informações que Coletamos
            </h2>
            <p>
              Coletamos apenas informações essenciais para o funcionamento da plataforma:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400 bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <li>Endereço público da sua carteira de criptoativos (Public Key).</li>
              <li>Dados de transação na blockchain (Hash, Timestamp, Valor).</li>
              <li>Informações técnicas de uso da plataforma (Cookies essenciais, anonimizados).</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
              <Shield className="text-emerald-500" size={20} /> 2. Como Usamos Suas Informações
            </h2>
            <p>
              Utilizamos as informações coletadas exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
              <li>Operacionalizar a plataforma e processar suas aplicações no Smart Contract.</li>
              <li>Distribuir prêmios e bônus automaticamente conforme as regras.</li>
              <li>Garantir a segurança, auditoria e integridade do sistema Web3.</li>
              <li>Melhorar a experiência do usuário e performance da interface.</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
              <Lock className="text-emerald-500" size={20} /> 3. Segurança
            </h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações. 
              No entanto, lembre-se que você é o único responsável pela segurança de sua carteira (Wallet) e chaves privadas (Private Keys). 
              A {platformName} nunca solicitará sua frase de recuperação (Seed Phrase).
            </p>

            <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Contato</h2>
            <div className="bg-slate-700/30 p-6 rounded-lg border border-slate-600">
              <p className="mb-3">
                Para dúvidas sobre privacidade ou tratamento de dados, entre em contato com nosso DPO:
              </p>
              <div className="text-emerald-400 font-mono space-y-1">
                <p><strong>E-mail:</strong> sfchagasfilho@yahoo.com.br</p>
                <p><strong>Telefone:</strong> +55 (21) 99352-7957</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center border-t border-slate-700 pt-8">
            <Link href="/">
              <button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-full transition-all duration-300 font-semibold shadow-lg hover:shadow-emerald-500/20">
                Li e Concordo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}