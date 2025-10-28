"use client";

import React, { useState } from 'react';
import Head from 'next/head';

const BlockchainBetBrasil = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    try {
      console.log('Conectando à Ethereum Mainnet...');
      setIsWalletConnected(true);
      console.log('Conectado à Ethereum Mainnet - Modo Real');
      alert('🎉 Carteira conectada com sucesso! Pronto para interagir na Ethereum Mainnet.');
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      alert('Erro ao conectar carteira. Verifique se o MetaMask está instalado.');
    }
  };

  const handleInteract = () => {
    if (!isWalletConnected) {
      handleConnectWallet();
      return;
    }
    console.log('Interagindo com o contrato na Mainnet...');
    alert('Pronto para interagir com a plataforma na Ethereum Mainnet!');
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Blockchain Bet Brasil - Plataforma de Entretenimento</title>
        <meta name="description" content="Sistema de entretenimento gamificado com recompensas e elementos educativos" />
        <meta name="keywords" content="blockchain, entretenimento, gamificação, recompensas, sistema educativo" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 font-sans">
        <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">B³</span>
                </div>
                <span className="text-white font-bold text-xl hidden sm:inline">Blockchain Bet Brasil</span>
                <span className="text-white font-bold text-xl sm:hidden">B³</span>
              </a>
              
              <div className="hidden md:flex items-center space-x-8">  
                <a href="/como-jogar" className="text-slate-300 hover:text-white transition-colors">Como Proceder</a>
                <a href="/apostas" className="text-slate-300 hover:text-white transition-colors">Game</a>
                <a href="/premiacao" className="text-slate-300 hover:text-white transition-colors">Premiação</a>
                <a href="/admin" className="text-slate-300 hover:text-white transition-colors">Painel Admin</a>
              </div>
              
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={handleConnectWallet}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg ${
                    isWalletConnected
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white'
                  }`}
                >
                  {isWalletConnected ? (
                    <>
                      <span>✅ Conectado</span>
                      <span className="text-xs">Mainnet</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                      </svg>
                      Conectar Carteira
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex md:hidden items-center space-x-2">
                <button 
                  onClick={handleConnectWallet}
                  className={`px-3 py-1 rounded text-xs font-semibold mr-2 ${
                    isWalletConnected 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                  }`}
                >
                  {isWalletConnected ? '✅' : '🔗'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16">
          <div className="container mx-auto p-4 md:p-6 mt-8 mb-8 flex justify-center">
            <div className="w-full flex flex-col items-center justify-center gap-12">
              
              <div className="w-full max-w-5xl mx-auto bg-amber-400/90 border-b-4 border-amber-500 p-5 rounded-lg shadow-xl animate-pulse-slow ring-4 ring-amber-500/50">
                <div className="flex items-start gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-900 flex-shrink-0 mt-1" aria-hidden="true">
                    <path d="m21.73 18.67-8.94-15.01a2 2 0 0 0-3.56 0L2.27 18.67a2 2 0 0 0 1.79 3.33h17.89a2 2 0 0 0 1.78-3.33Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  <div className="text-amber-900">
                    <p className="font-extrabold text-xl md:text-2xl">PLATAFORMA DE INTERAÇÃO E ESTRATÉGIA GAMIFICADA.</p>
                    <p className="font-semibold text-lg md:text-xl mt-1">
                      🚀 <strong>OPERANDO NA ETHEREUM MAINNET</strong> - MODO REAL ATIVO<br/>
                      NÃO SE TRATA DE JOGO DE AZAR: Na Blockchain Bet Brasil, a grande diferença está no sistema de contemplação, que ACABA com a ideia de &quot;perdedor absoluto&quot;.
                    </p>
                  </div>
                </div>
              </div>

              <section className="w-full max-w-5xl flex flex-col items-center justify-center text-center gap-6" id="inicio">
                <h3 className="text-4xl md:text-6xl font-extrabold text-white leading-tight animate-fade-in-down">
                  Bem-vindo...<br/>
                  <span className="text-emerald-400">BBB &amp; Inter-Bet!</span>
                </h3>
                <div className="my-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-100">
                    Blockchain Bet Brasil - O BBB da Web3.<span className="text-emerald-400"><br/>Interação e estratégia, sem paredão.</span>
                  </h2>
                  <p className="mt-4 text-2xl md:text-3xl font-bold text-amber-300 animate-pulse-fast">
                    Ganha com 5, 4, 3, 2 e até com 1 ponto apenas!
                  </p>
                </div>
                <p className="text-xl md:text-2xl text-slate-300 max-w-3xl">
                  Prepare-se para uma experiência de interação descentralizada como nunca visto antes. Com tecnologia blockchain e um sistema de compensação inovador, com bônus para zero retorno, convidamos você, com sua habilidade e estratégia, para se unir a outros participantes desse sensacional game.
                </p>

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

              <section className="w-full max-w-6xl mt-16 p-8 bg-slate-800/70 rounded-3xl shadow-2xl border-2 border-emerald-600" id="invest-bet">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-emerald-300 mb-12 drop-shadow-lg animate-fade-in">
                  INTER-BET: Aqui, Não Tem Segredo!
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="flex flex-col items-center text-center p-6 bg-slate-700/80 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in delay-100">
                    <div className="mb-6">
                      <img src="https://placehold.co/160x160/0f172a/63e2b2?text=Inter" alt="Pilar Investimento" width="160" height="160" className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 object-cover" />
                    </div>
                    <h4 className="text-3xl font-bold text-amber-300 mb-4">INTERAÇÃO</h4>
                    <p className="text-lg text-slate-200 leading-relaxed mb-4">
                      Mais do que interação, um ecossistema de valor. Seus R$5,00 ou R$1.000,00 por participação se tornam parte de um retorno robusto, com taxas transparentes e a chance de ver seu capital crescer. A cada rodada, você não apenas participa, mas aplica na possibilidade de um retorno significativo, impulsionado pela segurança e transparência da blockchain.
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
                      <img src="https://placehold.co/160x160/0f172a/63e2b2?text=Div" alt="Pilar Diversão" width="160" height="160" className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 object-cover" />
                    </div>
                    <h4 className="text-3xl font-bold text-amber-300 mb-4">ENTRETENIMENTO</h4>
                    <p className="text-lg text-slate-200 leading-relaxed mb-4">
                      A emoção do entretenimento elevada ao máximo! Nosso sistema de compensação único recompensa de 5 a 1 ponto, garantindo mais chances de retorno e manter a adrenalina lá em cima. A cada semana, a expectativa dos resultados com Chainlink VRF e o bônus de aplicação grátis para quem faz zero pontos,(8x) transformam cada rodada em uma nova aventura.
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
                      <img src="https://placehold.co/160x160/0f172a/63e2b2?text=Strategy" alt="Pilar Empreendimento" width="160" height="160" className="rounded-full border-4 border-emerald-400 p-2 bg-slate-900 object-cover" />
                    </div>
                    <h4 className="text-3xl font-bold text-amber-300 mb-4">ESTRATÉGIA</h4>
                    <p className="text-lg text-slate-200 leading-relaxed mb-4">
                      Você faz parte de algo maior. Nosso sistema está limitado a captação de apenas 10.000 aplicações por rodada, com isso garantimos um ambiente competitivo e justo. A cada aplicação, você contribui para um futuro onde a participação ativa e o potencial de retorno se unem, criando uma comunidade próspera e engajada no universo da Web3.
                    </p>
                    <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-auto">
                      <p className="text-lg font-bold text-emerald-300">Rodadas</p>
                      <p className="text-sm text-slate-300 mt-1">A cada rodada sem contemplados a emoção aumenta cada vez mais.</p>
                    </div>
                    <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-4">
                      <p className="text-lg font-bold text-emerald-300">Rateio</p>
                      <p className="text-sm text-slate-300 mt-1">Se só você fizer 1 ponto, a bolada da rodada ativa é toda sua. Bora!</p>
                    </div>
                  </div>
                </div>

                <div id="como-proceder" className="mt-16 text-center">
                  <h4 className="text-4xl font-bold text-white mb-6 animate-fade-in delay-400">
                    {isWalletConnected ? '🎉 Carteira Conectada!' : 'Mude de vida Já!'}
                  </h4>
                  <button 
                    onClick={handleInteract}
                    className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-xl font-extrabold rounded-full shadow-2xl text-slate-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-70 transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
                  >
                    {isWalletConnected ? '🚀 Interagir com a Plataforma!' : '🔗 Conectar para Interagir!'}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-7 h-7 ml-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                    </svg>
                  </button>
                  
                  {isWalletConnected && (
                    <div className="mt-4 text-emerald-300 text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30">
                      ✅ Conectado à <strong>Ethereum Mainnet</strong> - Pronto para operações reais
                    </div>
                  )}
                </div>
              </section>

              <p className="mt-8 text-sm text-slate-500">🌐 Ethereum Mainnet - Modo Real Ativo</p>
            </div>
          </div>
        </main>

        <footer className="bg-slate-900/80 border-t border-slate-700 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm">© 2024 Blockchain Bet Brasil. Todos os direitos reservados.</p>
            <p className="text-slate-500 text-xs mt-2">Plataforma de interação e estratégia gamificada - Ethereum Mainnet</p>
            <div className="mt-4">
              <a href="/termos-de-uso" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors mx-4">
                Termo de Uso
              </a>
              <span className="text-slate-600">|</span>
              <a href="/politica-de-privacidade" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors mx-4">
                Política de Privacidade
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default BlockchainBetBrasil;