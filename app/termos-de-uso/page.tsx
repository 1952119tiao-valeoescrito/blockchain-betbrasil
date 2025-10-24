import React from 'react';

export default function TermosDeUso() {
  const platformName = "Blockchain Bet Brasil";
  const currentDate = "23 de Outubro de 2024";
  const companyName = "Blockchain Bet Brasil Ltda";
  const cnpj = "12.345.678/0001-90";
  const address = "Av. das Américas, 5000, Rio de Janeiro - RJ";
  const jurisdiction = "República Federativa do Brasil";
  const cityState = "Rio de Janeiro, RJ";
  const supportEmail = "suporte@blockchainbetbrasil.com";
  const phoneNumber = "+55 (21) 99352-7957";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">TERMOS DE USO</h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-slate-300"><strong>Última atualização: {currentDate}</strong></p>

            <p className="text-slate-300">Bem-vindo(a) à {platformName}!</p>

            <p className="text-slate-300">
              Estes Termos de Uso ("Termos") regem o acesso e a utilização da nossa plataforma de investimento 
              e entretenimento gamificado ("Plataforma"). Ao acessar, navegar ou utilizar a Plataforma, você 
              concorda em cumprir e estar vinculado(a) a estes Termos, à nossa Política de Privacidade e a 
              todas as leis e regulamentos aplicáveis.
            </p>

            <h2 className="text-xl font-bold text-white mt-6 mb-3">1. Aceitação dos Termos</h2>
            <p className="text-slate-300">
              Ao utilizar a Plataforma, você declara ter lido, compreendido e aceito integralmente estes 
              Termos de Uso. Estes Termos podem ser atualizados periodicamente, e a continuidade do uso da 
              Plataforma após tais alterações constitui sua aceitação dos Termos revisados.
            </p>

            <h2 className="text-xl font-bold text-white mt-6 mb-3">2. Elegibilidade e Restrições de Idade</h2>
            <p className="text-slate-300">
              A Plataforma é destinada exclusivamente a indivíduos maiores de 18 (dezoito) anos de idade. 
              Ao aceitar estes Termos, você declara e garante que possui a idade legal mínima exigida.
            </p>

            <h2 className="text-xl font-bold text-white mt-6 mb-3">3. Natureza da Plataforma</h2>
            <p className="text-slate-300">
              A {platformName} oferece uma experiência de entretenimento gamificado baseada em aplicações 
              e prognósticos em um ambiente descentralizado (blockchain). A Plataforma não se destina a ser 
              um serviço de consultoria financeira.
            </p>

            <h2 className="text-xl font-bold text-white mt-6 mb-3">4. Contato</h2>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-300">
                Para quaisquer dúvidas sobre estes Termos de Uso, entre em contato conosco:
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