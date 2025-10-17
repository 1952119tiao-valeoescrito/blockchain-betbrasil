'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const connectWallet = async () => {
    try {
      console.log('Conectando carteira...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = '0x742...d35E1';
      setWalletAddress(mockAddress);
      setIsConnected(true);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Menu Fixo Padronizado */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
           {/* Logo */}
            <Link href="apostas" className="flex items-center space-x-2 sm:space-x-3">
  {/* Logo responsivo */}
  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center overflow-hidden">
    <img 
      src="/images/logo.png" 
      alt="Blockchain Bet Brasil Logo" 
      className="w-full h-full object-cover"
    />
  </div>
  <span className="text-white font-bold text-lg sm:text-xl">BLOCKCHAIN BET BRASIL</span>
</Link>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/como-jogar" className="text-slate-300 hover:text-white transition-colors">
                Como Funciona
              </Link>
              <Link href="/apostas" className="text-slate-300 hover:text-white transition-colors">
                Investir
              </Link>
              <Link href="/invest-bet" className="text-slate-300 hover:text-white transition-colors">
                Invest-Bet
              </Link>
              <Link href="/premiacao" className="text-slate-300 hover:text-white transition-colors">
                Premiação
              </Link>
              <Link href="/admin" className="text-slate-300 hover:text-white transition-colors">
                Painel Admin
              </Link>
            </div>

            {/* Botão Conectar Carteira */}
            <div className="hidden md:flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-3 py-1 rounded-lg text-sm">
                    {formatWalletAddress(walletAddress)}
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Desconectar
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg"
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

            {/* Menu Mobile - Hamburger */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Botão Conectar Carteira Mobile */}
              {isConnected ? (
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-2 py-1 rounded text-xs mr-2">
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
                className="text-slate-300 hover:text-white p-2 transition-colors"
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
                <Link 
                  href="/apostas" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apostas
                </Link>
                <Link 
                  href="/invest-bet" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Invest-Bet
                </Link>
                <Link 
                  href="/como-jogar" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Como Jogar
                </Link>
                <Link 
                  href="/premiacao" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Premiação
                </Link>
                <Link 
                  href="/admin" 
                  className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Painel Admin
                </Link>
                
                {/* Ações Mobile */}
                <div className="pt-4 mt-4 border-t border-slate-700">
                  {isConnected ? (
                    <button
                      onClick={() => {
                        disconnectWallet();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                    >
                      Desconectar Carteira
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        connectWallet();
                        setIsMenuOpen(false);
                      }}
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

      {/* Conteúdo Principal */}
      <div className="pt-20">
        <div className="container mx-auto p-4 md:p-6 mt-8 mb-8 flex justify-center">
          <div className="w-full flex flex-col items-center justify-center gap-12">
            <div className="w-full max-w-5xl mx-auto bg-amber-400/90 border-b-4 border-amber-500 p-5 rounded-lg shadow-xl animate-pulse-slow">
              <div className="flex items-center gap-4">
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
                  className="text-amber-900 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="m21.73 18.67-8.94-15.01a2 2 0 0 0-3.56 0L2.27 18.67a2 2 0 0 0 1.79 3.33h17.89a2 2 0 0 0 1.78-3.33Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <div className="text-amber-900">
                  <p className="font-extrabold text-xl md:text-2xl">🚀 BLOCKCHAIN BET BRASIL - O BBB DA WEB3 ESTÁ NO AR!</p>
                  <p className="font-semibold text-lg md:text-xl">
                    📍 ALÔ MUNDO... CHEGUEI, AVISA LÁ! 🌎<br />
                    É com grande alegria que anuncio o lançamento oficial da Blockchain Bet Brasil - a plataforma que vai revolucionar o universo de investimentos gamificados na Web3!
                  </p>
                </div>
              </div>
            </div>
            <section className="w-full max-w-5xl flex flex-col items-center justify-center text-center gap-6">
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
              <div className="mt-8 w-full flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
                <div className="bg-blue-600 text-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center flex-1 transition-transform transform hover:scale-105">
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ganhe até R$50.000,00</h1>
                  <p className="text-2xl font-semibold mb-6">Obtendo apenas <span className="text-yellow-300">1 ponto</span></p>
                  <p className="text-5xl md:text-6xl font-black mb-2 drop-shadow-lg"><span className="text-yellow-300">R$5,00</span></p>
                  <p className="text-lg font-medium">Bônus de R$0,625 por aplicação com zero retorno, (8x= 1 aplicação grátis).</p>
                </div>
                <div className="bg-purple-700 text-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center flex-1 transition-transform transform hover:scale-105">
                  <h1 className="text-4xl md:text-4xl font-extrabold mb-4">Ganhe até R$10.000.000,00</h1>
                  <p className="text-2xl font-semibold mb-6">Obtendo apenas <span className="text-yellow-300">1 ponto</span></p>
                  <p className="text-5xl md:text-6xl font-black mb-2 drop-shadow-lg"><span className="text-yellow-300">R$1.000,00</span></p>
                  <p className="text-lg font-medium">Bônus de R$125,00 por aplicação com zero retorno, (8x= 1 aplicação grátis).</p>
                </div>
              </div>
            </section>
            <section className="w-full max-w-6xl mt-16 p-8 bg-slate-800/70 rounded-3xl shadow-2xl border-2 border-emerald-600">
              <h2 className="text-4xl md:text-5xl font-extrabold text-center text-emerald-300 mb-12 drop-shadow-lg animate-fade-in">
                INVEST-BET: Aqui, Não Tem Segredo!
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center p-6 bg-slate-700/80 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in delay-100">
                  <div className="mb-6">
                    <img
                      src="https://placehold.co/160x160/0f172a/63e2b2?text=Invest"
                      alt="Pilar Investimento"
                      width="160"
                      height="160"
                      className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900"
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
                <div className="flex flex-col items-center text-center p-6 bg-slate-700/80 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in delay-200">
                  <div className="mb-6">
                    <img
                      src="https://placehold.co/160x160/0f172a/63e2b2?text=Fun"
                      alt="Pilar Diversão"
                      width="160"
                      height="160"
                      className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900"
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
                    <p className="text-sm text-slate-300 mt-1">Garantimos isso e oferecemos bônus como um pacto com você.</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-700/80 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in delay-300">
                  <div className="mb-6">
                    <img
                      src="https://placehold.co/160x160/0f172a/63e2b2?text=Enterprise"
                      alt="Pilar Empreendimento"
                      width="160"
                      height="160"
                      className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900"
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
              <div className="mt-16 text-center">
                <h4 className="text-4xl font-bold text-white mb-6 animate-fade-in delay-400">Mude de vida já!</h4>
                <button
                  onClick={connectWallet}
                  className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-xl font-extrabold rounded-full shadow-lg text-slate-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
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
            <p className="mt-8 text-sm text-slate-500">(Idioma detectado: pt)</p>
          </div>
        </div>
      </div>

      {/* Footer Padronizado */}
      <footer className="w-full bg-slate-800 mt-auto border-t border-slate-700">
        <div className="container mx-auto text-center p-6 text-slate-400 text-sm">
          <p className="mb-2">© 2025 Blockchain Bet Brasil. Todos os direitos reservados.</p>
          <p className="mt-2">Source: 601700 | Auditoria de Segurança Ativa</p>
          <div className="flex justify-center gap-4 mt-4">
            <a className="hover:text-emerald-400 transition-colors duration-200" href="termos-de-uso">
              Termos de Uso
            </a>
            <span>|</span>
            <a className="hover:text-emerald-400 transition-colors duration-200" href="politica-de-privacidade">
              Política de Privacidade
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;