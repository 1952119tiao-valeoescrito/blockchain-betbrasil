'use client';

import React, { useState } from 'react';

// ✅ INTERFACES PARA AS PROPS
interface BetsPageContentProps {
  isConnected: boolean;
  connectWallet: () => void;
  handleNavClick: (path: string) => void;
}

interface HomePageContentProps {
  connectWallet: () => void;
  handleNavClick: (path: string, sectionId?: string | null) => void;
}

// --- Componente de Conteúdo da Página de Apostas ---
const BetsPageContent = ({ isConnected, connectWallet, handleNavClick }: BetsPageContentProps) => {
  const [betType, setBetType] = useState('regular'); // 'regular' or 'premium'
  const [prognostics, setPrognostics] = useState<(string | null)[]>([null, null, null, null, null]);

  const prognosticsOptions = ['X', 'Y']; // Opções simplificadas

  const handlePrognosticChange = (index: number, value: string) => {
    setPrognostics(prev => {
      const newProgs = [...prev];
      // Alterna o valor (se for o mesmo, limpa; se for diferente ou nulo, define)
      newProgs[index] = prev[index] === value ? null : value;
      return newProgs;
    });
  };

  // Verifica se todos os 5 prognósticos foram selecionados
  const isComplete = prognostics.every(p => p !== null);

  // Dados baseados na imagem e descrições da Homepage
  const regularBetData = {
    value: 'R$ 5,00',
    bonusZero: 'R$ 0,625',
    bonusAcum: 'R$ 2,50', // Dado de simulação
    gratis: '1', // Dado de simulação
    buttonText: 'Apostar R$ 5,00'
  };

  const premiumBetData = {
    value: 'R$ 1.000,00',
    bonusZero: 'R$ 125,00',
    bonusAcum: 'R$ 500,00', // Dado de simulação
    gratis: '1', // Dado de simulação
    buttonText: 'Apostar R$ 1.000,00'
  };

  const currentBetData = betType === 'regular' ? regularBetData : premiumBetData;
  const currentBetTitle = betType === 'regular' ? 'Aposta Regular' : 'Invest-Bet Premium';

  return (
    <div className="container mx-auto p-4 md:p-6 mt-8 mb-8 flex justify-center">
      <div className="w-full max-w-xl flex flex-col items-center justify-center gap-8 animate-fade-in">
        
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
          Faça sua Aposta
        </h2>
        <p className="text-slate-300 text-center text-lg max-w-md">
          Escolha entre nossa aposta regular de R$5,00 ou a premium Invest-Bet de R$1.000,00
        </p>

        {/* Botões de Seleção de Tipo de Aposta */}
        <div className="flex space-x-4 bg-slate-800 p-2 rounded-xl shadow-inner border border-slate-700">
          <button
            onClick={() => setBetType('regular')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 font-semibold text-sm md:text-base ${
              betType === 'regular'
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600/50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            Aposta Regular
          </button>
          <button
            onClick={() => setBetType('premium')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-200 font-semibold text-sm md:text-base ${
              betType === 'premium'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600/50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 11V3"></path><path d="m18 7 4-4"></path><path d="m18 3 4 4"></path></svg>
            Invest-Bet Premium
          </button>
        </div>
        
        {/* Card Principal da Aposta */}
        <div className="w-full p-6 md:p-8 bg-slate-800/80 rounded-3xl shadow-2xl border-2 border-emerald-600">
          
          <h3 className="text-3xl font-bold text-slate-100 mb-6 text-center">{currentBetTitle}</h3>

          {/* Alerta de Bônus Zero Pontos */}
          <div className="bg-amber-500/90 p-4 rounded-xl shadow-inner mb-8 text-center border-b-4 border-amber-600">
            <p className="font-extrabold text-lg text-amber-900">
              Bônus Zero Pontos: {currentBetData.bonusZero}
            </p>
            <p className="font-semibold text-sm text-amber-900 mt-1">
              8x Bônus = 1 Aposta grátis
            </p>
          </div>

          {/* Prognósticos - Seleção de X ou Y */}
          <h4 className="text-xl font-semibold text-slate-300 mb-4 text-center">Seus 5 Prognósticos</h4>
          <div className="flex justify-between items-center space-x-2 mb-8">
            {prognostics.map((selection, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <span className="text-slate-400 text-sm mb-2">#{index + 1}</span>
                <div className="flex space-x-1 p-1 bg-slate-700 rounded-lg shadow-inner">
                  {prognosticsOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => handlePrognosticChange(index, option)}
                      className={`px-3 py-2 rounded-md font-bold text-sm transition-colors duration-150 ${
                        selection === option
                          ? 'bg-emerald-500 text-white shadow-md'
                          : 'bg-slate-600 text-slate-400 hover:bg-slate-500'
                      }`}
                      aria-label={`Prognóstico ${index + 1}: ${option}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Resumo da Aposta */}
          <div className="grid grid-cols-2 gap-4 text-center bg-slate-700/50 p-4 rounded-xl mb-8">
            <div className="flex flex-col items-center p-2">
              <span className="text-slate-400 text-sm">Valor</span>
              <span className="text-xl font-extrabold text-emerald-400">{currentBetData.value}</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-slate-400 text-sm">Bônus Zero</span>
              <span className="text-xl font-extrabold text-amber-300">{currentBetData.bonusZero}</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-slate-400 text-sm">Bônus Acum.</span>
              <span className="text-xl font-extrabold text-sky-400">{currentBetData.bonusAcum}</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <span className="text-slate-400 text-sm">Grátis</span>
              <span className="text-xl font-extrabold text-pink-400">{currentBetData.gratis}</span>
            </div>
          </div>

          {/* Botão de Aposta */}
          {isConnected ? (
            <button
              disabled={!isComplete}
              className={`w-full py-4 rounded-xl text-xl font-extrabold transition-all duration-300 shadow-lg ${
                isComplete
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-emerald-500/40'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
              }`}
            >
              {currentBetData.buttonText}
              {!isComplete && ' (Selecione 5 Prognósticos)'}
            </button>
          ) : (
            <button
                onClick={connectWallet}
                className="w-full py-4 rounded-xl text-xl font-extrabold transition-all duration-300 shadow-lg bg-red-500 hover:bg-red-600 text-white shadow-red-500/40"
            >
                Conecte a Carteira para Apostar
            </button>
          )}

          {/* Status da Carteira */}
          <div className="mt-4 text-center">
            {isConnected ? (
              <p className="text-emerald-400 text-sm flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse-fast"><path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z"/><path d="m9 12 2 2 4-4"/></svg>
                Carteira Conectada
              </p>
            ) : (
              <p className="text-slate-500 text-sm">Carteira Desconectada</p>
            )}
          </div>

          {/* Voltar para a Home */}
          <div className="mt-8 pt-4 border-t border-slate-700 text-center">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center justify-center mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Voltar para Página Inicial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
// --- Fim do Componente de Conteúdo da Página de Apostas ---

// --- Componente de Conteúdo da Página Inicial ---
const HomePageContent = ({ connectWallet, handleNavClick }: HomePageContentProps) => (
  <div className="container mx-auto p-4 md:p-6 mt-8 mb-8 flex justify-center">
    <div className="w-full flex flex-col items-center justify-center gap-12">
      
      {/* Alerta de Testes */}
      <div className="w-full max-w-5xl mx-auto bg-amber-400/90 border-b-4 border-amber-500 p-5 rounded-lg shadow-xl animate-pulse-slow ring-4 ring-amber-500/50">
        <div className="flex items-start gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-900 flex-shrink-0 mt-1"
            aria-hidden="true"
          >
            <path d="m21.73 18.67-8.94-15.01a2 2 0 0 0-3.56 0L2.27 18.67a2 2 0 0 0 1.79 3.33h17.89a2 2 0 0 0 1.78-3.33Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
          <div className="text-amber-900">
            <p className="font-extrabold text-xl md:text-2xl">PLATAFORMA DE INVESTIMENTO E ENTRETENIMENTO GAMIFICADO.</p>
            <p className="font-semibold text-lg md:text-xl mt-1">
              AINDA ESTAMOS EM FASE DE TESTES, NÃO UTILIZE FUNDOS REAIS.<br />
              NÃO SE TRATA DE JOGO DE AZAR: Na Blockchain Bet Brasil, a grande diferença está no sistema de contemplação, que ACABA com a ideia de
              &quot;perdedor absoluto&quot;.
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="w-full max-w-5xl flex flex-col items-center justify-center text-center gap-6" id="inicio">
        <h3 className="text-4xl md:text-6xl font-extrabold text-white leading-tight animate-fade-in-down">
          Bem-vindo...<br /><span className="text-emerald-400">BBB &amp; Invest-Bet!</span>
        </h3>
        <div className="my-4">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100">
            Blockchain Bet Brasil - O BBB da Web3.<span className="text-emerald-400"><br />Investimento e diversão sem paredão.</span>
          </h2>
          <p className="mt-4 text-2xl md:text-3xl font-bold text-amber-300 animate-pulse-fast">Ganha com 5, 4, 3, 2 e até com 1 ponto apenas!</p>
        </div>
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl">
          Prepare-se para uma experiência de investimento descentralizada como nunca visto antes. Com tecnologia blockchain e um sistema de compensação
          inovador, com bônus para zero retorno, sua habilidade e estratégia se unem para revolucionar essa escassez econômica que você vive hoje.
        </p>
        
        {/* Boxes de Premiação (Mantenha o ID para navegação, se necessário) */}
        <div id="premiacao" className="mt-8 w-full flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
          <div className="bg-blue-600/80 text-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center flex-1 transition-transform transform hover:scale-[1.02] border-4 border-blue-500">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ganhe até R$50.000,00</h1>
            <p className="text-2xl font-semibold mb-6">Obtendo apenas <span className="text-yellow-300">1 ponto</span></p>
            <p className="text-5xl md:text-6xl font-black mb-2 drop-shadow-lg text-yellow-300">R$5,00</p>
            <p className="text-lg font-medium text-blue-100">Bônus de R$0,625 por aplicação com zero retorno, (8x= 1 aplicação grátis).</p>
          </div>
          <div className="bg-purple-700/80 text-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center flex-1 transition-transform transform hover:scale-[1.02] border-4 border-purple-500">
            <h1 className="text-4xl md:text-4xl font-extrabold mb-4">Ganhe até R$10.000.000,00</h1>
            <p className="text-2xl font-semibold mb-6">Obtendo apenas <span className="text-yellow-300">1 ponto</span></p>
            <p className="text-5xl md:text-6xl font-black mb-2 drop-shadow-lg text-yellow-300">R$1.000,00</p>
            <p className="text-lg font-medium text-purple-100">Bônus de R$125,00 por aplicação com zero retorno, (8x= 1 aplicação grátis).</p>
          </div>
        </div>
      </section>

      {/* Seção Invest-Bet */}
      <section className="w-full max-w-6xl mt-16 p-8 bg-slate-800/70 rounded-3xl shadow-2xl border-2 border-emerald-600" id="invest-bet">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-emerald-300 mb-12 drop-shadow-lg animate-fade-in">
          INVEST-BET: Aqui, Não Tem Segredo!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Pilar 1: Investimento */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-700/80 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in delay-100">
            <div className="mb-6">
              <img
                src="https://placehold.co/160x160/0f172a/63e2b2?text=Invest"
                alt="Pilar Investimento"
                width="160"
                height="160"
                className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/160x160/0f172a/63e2b2?text=Investimento' }}
              />
            </div>
            <h4 className="text-3xl font-bold text-amber-300 mb-4">INVESTIMENTO</h4>
            <p className="text-lg text-slate-200 leading-relaxed mb-4">
              Mais do que investimento, um ecossistema de valor. Seus R$5,00 ou R$1.000,00 por aplicação se tornam parte de um retorno robusto, com taxas
              transparentes e a chance de ver seu capital crescer. A cada rodada, você não apenas participa, mas investe na possibilidade de um
              retorno significativo, impulsionado pela segurança e transparência da blockchain.
            </p>
            <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-auto">
              <p className="text-lg font-bold text-emerald-300">R$5,00 por aplicação</p>
              <p className="text-sm text-slate-300 mt-1">Bônus de R$0,625 por aplicação com zero retorno (8x)= uma aplicação grátis.</p>
            </div>
            <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-4">
              <p className="text-lg font-bold text-emerald-300">R$1.000,00 por aplicação</p>
              <p className="text-sm text-slate-300 mt-1">Bônus de R$125,00 por aplicação com zero retorno (8x)= uma aplicação grátis.</p>
            </div>
          </div>

          {/* Pilar 2: Diversão */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-700/80 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in delay-200">
            <div className="mb-6">
              <img
                src="https://placehold.co/160x160/0f172a/63e2b2?text=Fun"
                alt="Pilar Diversão"
                width="160"
                height="160"
                className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/160x160/0f172a/63e2b2?text=Diversão' }}
              />
            </div>
            <h4 className="text-3xl font-bold text-amber-300 mb-4">DIVERSÃO</h4>
            <p className="text-lg text-slate-200 leading-relaxed mb-4">
              A emoção do entretenimento elevada ao máximo! Nosso sistema de compensação único recompensa de 5 a 1 ponto, garantindo mais chances de retorno e
              manter a adrenalina lá em cima. A cada semana, a expectativa de sorteio com Chainlink VRF e o bônus de aplicação grátis para quem faz
              zero pontos,(8x) transformam cada rodada em uma nova aventura.
            </p>
            <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-auto">
              <p className="text-lg font-bold text-emerald-300">Persistência:</p>
              <p className="text-sm text-slate-300 mt-1">Ganhar com 5, 4, 3, 2 e até com 1 ponto apenas é emocionante!</p>
            </div>
            <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-4">
              <p className="text-lg font-bold text-emerald-300">Sua hora vai chegar.</p>
              <p className="text-sm text-slate-300 mt-1">Garantimos isso e oferecemos bônus como um pacto com você. </p>
            </div>
          </div>

          {/* Pilar 3: Empreendimento */}
          <div className="flex flex-col items-center text-center p-6 bg-slate-700/80 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in delay-300">
            <div className="mb-6">
              <img
                src="https://placehold.co/160x160/0f172a/63e2b2?text=Enterprise"
                alt="Pilar Empreendimento"
                width="160"
                height="160"
                className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/160x160/0f172a/63e2b2?text=Empreendimento' }}
              />
            </div>
            <h4 className="text-3xl font-bold text-amber-300 mb-4">EMPREENDIMENTO</h4>
            <p className="text-lg text-slate-200 leading-relaxed mb-4">
              Você faz parte de algo maior. Nosso sistema está limitado a captação de apenas 10.000 aplicações por rodada, com isso garantimos um
              ambiente competitivo e justo. A cada aplicação, você contribui para um futuro onde a participação ativa e o potencial de retorno se unem,
              criando uma comunidade próspera e engajada no universo da Web3.
            </p>
            <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-auto">
              <p className="text-lg font-bold text-emerald-300">Rodadas</p>
              <p className="text-sm text-slate-300 mt-1">A cada rodada sem contemplados a emoção aumenta cada vez mais.</p>
            </div>
            <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-4">
              <p className="text-lg font-bold text-emerald-300">Rateio</p>
              <p className="text-sm text-slate-300 mt-1">Se só você fizer 1 ponto, a bolada da rodada ativa é toda sua. Bora! </p>
            </div>
          </div>
        </div>
        
        {/* CTA Final */}
        <div id="como-proceder" className="mt-16 text-center">
          <h4 className="text-4xl font-bold text-white mb-6 animate-fade-in delay-400">Mude de vida Já!</h4>
          <button
            onClick={connectWallet}
            className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-xl font-extrabold rounded-full shadow-2xl text-slate-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-70 transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
          >
            Conectar para Investir!
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-7 h-7 ml-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
            </svg>
          </button>
        </div>
      </section>
      <p className="mt-8 text-sm text-slate-500">(Idioma: Português)</p>
      
    </div>
  </div>
);
// --- Fim do Componente de Conteúdo da Página Inicial ---


// Componente principal App
const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Novo estado para controlar a página atual ('home' ou 'bets')
  const [currentPage, setCurrentPage] = useState('home');

  // Simulação de conexão de carteira
  const connectWallet = async () => {
    try {
      console.log('Conectando carteira...');
      // Simula um delay de conexão
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = '0x74258d4F25c0F548e658e4B13d7E8d35E1';
      setWalletAddress(mockAddress);
      setIsConnected(true);
      // Fecha o menu mobile após conectar, se estiver aberto
      if (isMenuOpen) setIsMenuOpen(false);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Função centralizada para navegação (page switch e scroll de seção)
  const handleNavClick = (page: string, sectionId: string | null = null) => {
    setIsMenuOpen(false); // Fecha o menu mobile
    setCurrentPage(page); // Muda o estado da página

    if (page === 'home' && sectionId) {
      // Pequeno delay para garantir que o componente 'HomePageContent' tenha sido renderizado
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          // Calcula o offset para compensar o menu fixo (h-16 = 64px) + margin
          const offset = 80; 
          const elementPosition = section.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Se não encontrar, apenas rola para o topo da página
          window.scrollTo(0, 0); 
        }
      }, 100); 
    } else {
      // Rola para o topo ao mudar de página (home -> bets ou bets -> home)
      window.scrollTo(0, 0);
    }
  };


  return (
    // Estilos CSS customizados para as animações Tailwind que não são nativas
    <>
      <style>
        {`
        @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: .7; }
        }
        .animate-pulse-slow {
            animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-fast {
            0%, 100% { opacity: 1; }
            50% { opacity: .8; }
        }
        .animate-pulse-fast {
            animation: pulse-fast 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
            animation: fade-in-down 0.8s ease-out;
        }

        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.6s ease-out;
        }

        @keyframes bounce-slow {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 4s infinite;
        }
        `}
      </style>

      {/* Container Principal */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-sans">
        
        {/* Menu Fixo Padronizado */}
        <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              
              {/* Logo */}
              <a href="#" className="flex items-center space-x-2" onClick={() => handleNavClick('home', 'inicio')}>
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">B³</span>
                </div>
                <span className="text-white font-bold text-xl hidden sm:inline">Blockchain Bet Brasil</span>
                <span className="text-white font-bold text-xl sm:hidden">B³</span>
              </a>

              {/* Menu Desktop */}
              <div className="hidden md:flex items-center space-x-8">
                {/* O link "Apostas" agora muda a página para 'bets' */}
                <button 
                    className="text-slate-300 hover:text-white transition-colors" 
                    onClick={() => handleNavClick('bets')}
                >
                  Apostas
                </button>
                {/* Os demais links permanecem na home, apenas rolando para a seção */}
                <button className="text-slate-300 hover:text-white transition-colors" onClick={() => handleNavClick('home', 'invest-bet')}>
                  Invest-Bet
                </button>
                <button className="text-slate-300 hover:text-white transition-colors" onClick={() => handleNavClick('home', 'como-proceder')}>
                  Como Proceder
                </button>
                <button className="text-slate-300 hover:text-white transition-colors" onClick={() => handleNavClick('home', 'premiacao')}>
                  Premiação
                </button>
                {/* REMOVIDO: Link para Painel Admin */}
              </div>

              {/* Botão Conectar Carteira (Desktop) */}
              <div className="hidden md:flex items-center space-x-4">
                {isConnected ? (
                  <div className="flex items-center space-x-3 rounded-xl bg-slate-800 p-1 border border-slate-700">
                    <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-3 py-1 rounded-lg text-sm font-mono">
                      {formatWalletAddress(walletAddress)}
                    </div>
                    <button
                      onClick={disconnectWallet}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg transition-colors text-sm font-semibold"
                    >
                      Desconectar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg shadow-emerald-500/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                    </svg>
                    Conectar Carteira
                  </button>
                )}
              </div>

              {/* Menu Mobile - Ações e Hamburger */}
              <div className="flex md:hidden items-center space-x-2">
                {/* Status Carteira Mobile */}
                {isConnected ? (
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-2 py-1 rounded text-xs mr-2 font-mono">
                    {formatWalletAddress(walletAddress)}
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded text-xs font-semibold mr-2"
                  >
                    Conectar
                  </button>
                )}

                {/* Botão Hamburger */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-slate-300 hover:text-white p-2 transition-colors rounded-lg bg-slate-800/50"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Menu Mobile Expandido - Overlay */}
            {isMenuOpen && (
              <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-xl">
                <div className="flex flex-col space-y-0 p-4">
                  <button className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors text-left" onClick={() => handleNavClick('bets')}>
                    Apostas
                  </button>
                  <button className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors text-left" onClick={() => handleNavClick('home', 'invest-bet')}>
                    Invest-Bet
                  </button>
                  <button className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors text-left" onClick={() => handleNavClick('home', 'como-proceder')}>
                    Como Proceder
                  </button>
                  <button className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors text-left" onClick={() => handleNavClick('home', 'premiacao')}>
                    Premiação
                  </button>
                  {/* REMOVIDO: Link para Painel Admin */}
                  
                  {/* Ações Mobile */}
                  <div className="pt-4 mt-4 border-t border-slate-700">
                    {isConnected ? (
                      <button
                        onClick={disconnectWallet}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                      >
                        Desconectar Carteira
                      </button>
                    ) : (
                      <button
                        onClick={connectWallet}
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 px-4 rounded-lg transition-all duration-300 font-semibold"
                      >
                        Conectar Carteira
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Conteúdo Principal (Renderização Condicional) */}
        <main className="pt-16 min-h-[calc(100vh-64px)]">
          {currentPage === 'home' ? (
            <HomePageContent connectWallet={connectWallet} handleNavClick={handleNavClick} />
          ) : (
            <BetsPageContent 
              isConnected={isConnected} 
              connectWallet={connectWallet} 
              handleNavClick={handleNavClick}
            />
          )}
        </main>

        {/* Footer Padronizado */}
        <footer className="w-full bg-slate-900 mt-auto border-t border-slate-700">
          <div className="container mx-auto text-center p-6 text-slate-400 text-sm">
            <p className="mb-2">© 2024 Blockchain Bet Brasil. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs">Source: 601700 | Auditoria de Segurança Ativa</p>
            <div className="flex justify-center gap-4 mt-4">
              <a className="hover:text-emerald-400 transition-colors duration-200" href="#termos" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'termos')}}>
                Termos de Uso
              </a>
              <span>|</span>
              <a className="hover:text-emerald-400 transition-colors duration-200" href="#privacidade" onClick={(e) => {e.preventDefault(); handleNavClick('home', 'privacidade')}}>
                Política de Privacidade
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;