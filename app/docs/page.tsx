'use client';

import React from 'react';
import Link from 'next/link';
import { useWeb3 } from '../contexts/Web3Context';
import { useLocale } from '../contexts/LocaleContext';

const HomePage: React.FC = () => {
  const { isConnected, account, connectWallet, isLoading } = useWeb3();
  const { t } = useLocale();

 // ESTILOS DE EMERGÊNCIA - REMOVER DEPOIS QUE O TAILWIND FUNCIONAR
  const emergencyStyles = `
    body { 
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%) !important;
      color: white !important;
      margin: 0;
      padding: 0;
      font-family: system-ui, sans-serif;
    }
    .bg-slate-900 { background: #0f172a !important; }
    .bg-slate-800 { background: #1e293b !important; }
    .text-white { color: white !important; }
    .text-emerald-400 { color: #34d399 !important; }
    .text-amber-300 { color: #fcd34d !important; }
    .bg-emerald-500 { background: #10b981 !important; }
    .bg-amber-400 { background: #fbbf24 !important; }
    .bg-blue-600 { background: #2563eb !important; }
    .bg-purple-700 { background: #7c3aed !important; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .flex { display: flex !important; }
    .flex-col { flex-direction: column !important; }
    .items-center { align-items: center !important; }
    .justify-center { justify-content: center !important; }
    .p-4 { padding: 1rem !important; }
    .p-6 { padding: 1.5rem !important; }
    .rounded-lg { border-radius: 0.5rem !important; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3) !important; }
  `;

  // ... resto do seu código

  const handleConnectToInvest = () => {
    connectWallet();
    console.log('Conectando para Invest-Bet...');
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
return (
  <>
    <style jsx global>{emergencyStyles}</style>
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* SEU CÓDIGO ORIGINAL AQUI */}
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      {/* Cabeçalho */}
      <header className="w-full bg-slate-800 shadow-md sticky top-0 z-50 border-b border-emerald-500/30">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-4 group">
            <img
              alt="Blockchain Bet Brasil Logo"
              loading="lazy"
              width="40"
              height="40"
              className="rounded-full group-hover:scale-110 transition-transform duration-300 border-2 border-emerald-400 p-0.5 w-10 h-10 sm:w-12 sm:h-12"
              src="https://placehold.co/48x48/0d2c20/ffffff?text=B"
            />
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-white uppercase tracking-tight sm:tracking-wider">
                Blockchain Bet Brasil
              </span>
              <span className="text-xs sm:text-sm text-emerald-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                *DOSSIÊ*
              </span>
            </div>
          </Link>
          
          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-semibold text-base xl:text-lg">
            <Link href="/apostas" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">
              {t('bets')}
            </Link>
            <Link href="/invest-bet" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">
              Invest-Bet
            </Link>
            <Link href="/como-jogar" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">
              {t('howToPlay')}
            </Link>
            <Link href="/premiacao" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">
              {t('prizes')}
            </Link>
            <Link href="/painel-admin" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200">
              {t('adminPanel')}
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 relative">
              {isConnected && account ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="font-mono text-emerald-300 text-xs sm:text-sm hidden xs:block">
                    {truncateAddress(account)}
                  </span>
                  <div className="bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                    <span className="text-emerald-300 text-xs font-semibold">{t('connected')}</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="wallet-icon"
                  >
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                  </svg>
                  <span className="hidden xs:inline">
                    {isLoading ? t('loading') : t('connectWallet')}
                  </span>
                  <span className="xs:hidden">
                    {isLoading ? t('loading') : t('connect')}
                  </span>
                </button>
              )}
            </div>

            {/* Menu Mobile Hambúrguer */}
            <button className="lg:hidden text-white hover:text-emerald-400 transition-colors p-2" aria-label="Abrir menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-grow w-full">
        <div className="container mx-auto p-3 sm:p-4 md:p-6 mt-6 sm:mt-8 mb-6 sm:mb-8 flex justify-center">
          <div className="w-full flex flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12">
            {/* Alerta de Testes */}
            <div className="w-full max-w-5xl mx-auto bg-amber-400/90 border-b-4 border-amber-500 p-4 sm:p-5 rounded-lg shadow-xl animate-pulse-slow">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-900 flex-shrink-0 mt-1 sm:mt-0"
                  aria-hidden="true"
                >
                  <path d="m21.73 18.67-8.94-15.01a2 2 0 0 0-3.56 0L2.27 18.67a2 2 0 0 0 1.79 3.33h17.89a2 2 0 0 0 1.78-3.33Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <div className="text-amber-900">
                  <p className="font-extrabold text-lg sm:text-xl md:text-2xl leading-tight">
                    PLATAFORMA DE INVESTIMENTO E ENTRETENIMENTO GAMIFICADO.
                  </p>
                  <p className="font-semibold text-sm sm:text-base md:text-lg mt-2 leading-relaxed">
                    AINDA ESTAMOS EM FASE DE TESTES, NÃO UTILIZE FUNDOS REAIS.
                    <br className="hidden sm:block" />
                    NÃO SE TRATA DE JOGO DE AZAR: Na Blockchain Bet Brasil, a grande diferença está no sistema de premiação, que ACABA com a ideia de "perdedor absoluto".
                  </p>
                </div>
              </div>
            </div>

            {/* Títulos e Descrição Principal */}
            <section className="w-full max-w-5xl flex flex-col items-center justify-center text-center gap-4 sm:gap-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold text-white leading-tight">
                {t('welcome')}
                <br />
                <span className="text-emerald-400">BBB & Invest-Bet!</span>
              </h3>
              
              <div className="my-2 sm:my-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-slate-100 leading-tight">
                  Blockchain Bet Brasil - O BBB da Web3.
                  <span className="text-emerald-400 block mt-2">
                    Investimento e diversão sem paredão.
                  </span>
                </h2>
                <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-amber-300 animate-pulse">
                  Ganha com 5, 4, 3, 2 e até com 1 ponto apenas!
                </p>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl leading-relaxed px-4">
                Prepare-se para uma experiência de apostas descentralizada como nunca vista antes. 
                Com tecnologia blockchain e um sistema de premiação inovador, com bônus para zero ponto, 
                sua sorte e estratégia se unem para transformar o jogo.
              </p>

              {/* Cards de Promoção */}
              <div className="mt-6 sm:mt-8 w-full flex flex-col md:flex-row justify-center items-stretch gap-4 sm:gap-6 md:gap-8 px-3 sm:px-4">
                {/* Card da promoção de R$5,00 */}
                <div className="bg-blue-600 text-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 max-w-md w-full text-center flex-1 transition-transform transform hover:scale-105">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight">
                    Ganhe até R$50.000,00
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
                    Acertando apenas <span className="text-yellow-300">1 ponto</span>
                  </p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 drop-shadow-lg">
                    <span className="text-yellow-300">R$5,00</span>
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-medium">por aposta</p>
                </div>

                {/* Card da promoção de R$1.000,00 */}
                <div className="bg-purple-700 text-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 max-w-md w-full text-center flex-1 transition-transform transform hover:scale-105">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 leading-tight">
                    Ganhe até R$10.000.000,00
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
                    Acertando apenas <span className="text-yellow-300">1 ponto</span>
                  </p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 drop-shadow-lg">
                    <span className="text-yellow-300">R$1.000,00</span>
                  </p>
                  <p className="text-sm sm:text-base md:text-lg font-medium">por aposta</p>
                </div>
              </div>
            </section>

            {/* Seção "INVEST-BET" */}
            <section className="w-full max-w-6xl mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 bg-slate-800/70 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border-2 border-emerald-600">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-emerald-300 mb-8 sm:mb-10 md:mb-12 drop-shadow-lg leading-tight">
                INVEST-BET: Aqui, Não Tem Segredo!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
                {/* Pilar Investimento */}
                <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-slate-700/80 rounded-xl sm:rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2">
                  <div className="mb-4 sm:mb-6">
                    <img
                      src="https://placehold.co/120x120/0f172a/63e2b2?text=Invest"
                      alt="Pilar Investimento"
                      width="120"
                      height="120"
                      className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
                    />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-300 mb-3 sm:mb-4">INVESTIMENTO</h4>
                  <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed mb-4">
                    Mais do que apostas, um ecossistema de valor. Seus R$5,00 ou R$1.000,00 por aposta se tornam parte de um prêmio robusto, com taxas transparentes e a chance de ver seu capital crescer.
                  </p>
                  <div className="bg-slate-600/50 p-2 sm:p-3 rounded-lg w-full mt-auto">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-300">R$5,00 por aposta</p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">Bônus de R$0,625 por aposta com zero ponto (8x)= uma aposta grátis.</p>
                  </div>
                  <div className="bg-slate-600/50 p-2 sm:p-3 rounded-lg w-full mt-2 sm:mt-4">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-300">R$1.000,00 por aposta</p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">Bônus de R$125,00 por aposta com zero ponto (8x)= uma aposta grátis.</p>
                  </div>
                </div>

                {/* Pilar Diversão */}
                <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-slate-700/80 rounded-xl sm:rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2">
                  <div className="mb-4 sm:mb-6">
                    <img
                      src="https://placehold.co/120x120/0f172a/63e2b2?text=Fun"
                      alt="Pilar Diversão"
                      width="120"
                      height="120"
                      className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
                    />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-300 mb-3 sm:mb-4">DIVERSÃO</h4>
                  <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed mb-4">
                    A emoção do jogo elevada ao máximo! Nosso sistema de premiação único recompensa de 5 a 1 ponto, garantindo mais chances de ganhar e manter a adrenalina lá em cima.
                  </p>
                  <div className="bg-slate-600/50 p-2 sm:p-3 rounded-lg w-full mt-auto">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-300">Persistência:</p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">Ganha com 5, 4, 3, 2 e até com 1 ponto apenas. É emocionante!</p>
                  </div>
                  <div className="bg-slate-600/50 p-2 sm:p-3 rounded-lg w-full mt-2 sm:mt-4">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-300">Sua hora vai chegar.</p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">Garantimos isso e oferecemos bônus como um pacto com você.</p>
                  </div>
                </div>

                {/* Pilar Empreendimento */}
                <div className="flex flex-col items-center text-center p-4 sm:p-6 bg-slate-700/80 rounded-xl sm:rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2">
                  <div className="mb-4 sm:mb-6">
                    <img
                      src="https://placehold.co/120x120/0f172a/63e2b2?text=Enterprise"
                      alt="Pilar Empreendimento"
                      width="120"
                      height="120"
                      className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
                    />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-300 mb-3 sm:mb-4">EMPREENDIMENTO</h4>
                  <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed mb-4">
                    Você faz parte de algo maior. Nosso sistema está limitado a captação de apenas 10.000 apostas por rodada, com isso garantimos um ambiente competitivo e justo.
                  </p>
                  <div className="bg-slate-600/50 p-2 sm:p-3 rounded-lg w-full mt-auto">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-300">Rodadas</p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">A cada rodada sem ganhadores a emoção aumenta cada vez mais.</p>
                  </div>
                  <div className="bg-slate-600/50 p-2 sm:p-3 rounded-lg w-full mt-2 sm:mt-4">
                    <p className="text-sm sm:text-base md:text-lg font-bold text-emerald-300">Rateio</p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">Se só você fizer 1 ponto, a bolada da rodada ativa é toda sua. Bora! </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 sm:mt-12 md:mt-16 text-center">
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Pronto para virar o jogo?
                </h4>
                <button
                  onClick={handleConnectToInvest}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 border border-transparent text-base sm:text-lg md:text-xl font-extrabold rounded-full shadow-lg text-slate-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnected ? 'Ir para Invest-Bet!' : (isLoading ? 'Conectando...' : 'Conectar para Investir!')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ml-2 sm:ml-3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                  </svg>
                </button>
                {isConnected && (
                  <p className="mt-3 text-sm text-emerald-300 font-semibold">
                    ✅ Carteira conectada! Pronto para investir.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="w-full bg-slate-800 mt-auto border-t border-emerald-500/30">
        <div className="container mx-auto text-center p-4 sm:p-6 text-slate-400 text-xs sm:text-sm">
          <p className="mb-2">© 2025 Blockchain Bet Brasil. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            <Link href="/termos" className="hover:text-emerald-400 transition-colors duration-200">
              Termos de Uso
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link href="/privacidade" className="hover:text-emerald-400 transition-colors duration-200">
              Política de Privacidade
            </Link>
          </div>
          <p className="mt-3 sm:mt-4 text-xs text-slate-600">
            Desenvolvido por sfchagasfilho, com <span className="text-red-500">❤️</span> em Web3.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;