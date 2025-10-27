import React from 'react';

export default function PoliticaPrivacidade() {
  const platformName = "Blockchain Bet Brasil";
  const currentDate = "23 de Outubro de 2024";
  const supportEmail = "suporte@blockchainbetbrasil.com";
  const phoneNumber = "+55 (21) 99352-7957";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">POLÍTICA DE PRIVACIDADE</h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-slate-300"><strong>Última atualização: {currentDate}</strong></p>

            <p className="text-slate-300">
              A {platformName} valoriza a sua privacidade e está comprometida em proteger as informações 
              pessoais que você nos confia. Esta Política de Privacidade descreve como coletamos, usamos, 
              armazenamos e protegemos suas informações.
            </p>

            <h2 className="text-xl font-bold text-white mt-6 mb-3">1. Informações que Coletamos</h2>
            <p className="text-slate-300">
              Coletamos apenas informações essenciais para o funcionamento da plataforma:
            </p>
            <ul className="text-slate-300 list-disc list-inside space-y-2 ml-4">
              <li>Endereço público da sua carteira de criptoativos</li>
              <li>Dados de transação na blockchain</li>
              <li>Informações de uso da plataforma (anonimizadas)</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-6 mb-3">2. Como Usamos Suas Informações</h2>
            <p className="text-slate-300">
              Utilizamos as informações coletadas exclusivamente para:
            </p>
            <ul className="text-slate-300 list-disc list-inside space-y-2 ml-4">
              <li>Operacionalizar a plataforma e processar aplicações</li>
              <li>Distribuir prêmios conforme os contratos inteligentes</li>
              <li>Garantir a segurança e integridade do sistema</li>
              <li>Melhorar a experiência do usuário</li>
            </ul>

            <h2 className="text-xl font-bold text-white mt-6 mb-3">3. Segurança</h2>
            <p className="text-slate-300">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações. 
              No entanto, lembre-se que você é responsável pela segurança de sua carteira e chaves privadas.
            </p>

            <h2 className="text-xl font-bold text-white mt-6 mb-3">4. Contato</h2>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-300">
                Para dúvidas sobre privacidade ou tratamento de dados:
              </p>
              <p className="text-emerald-400 mt-2">
                <strong>E-mail:</strong> {supportEmail}<br/>
                <strong>Telefone:</strong> {phoneNumber}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="/" 
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold"
            >
              Voltar para o Início
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}