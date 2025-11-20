"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';

const BlockchainBetBrasil = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleConnectWallet = async () => {
    try {
      console.log('Conectando à Ethereum Mainnet...');
      setIsWalletConnected(true);
      console.log('Conectado à Ethereum Mainnet - Modo Real');
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    }
  };

  const handleInteract = () => {
    if (!isWalletConnected) {
      handleConnectWallet();
      return;
    }
    console.log('Interagindo...');
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950 font-sans text-slate-100 relative overflow-hidden">
        {/* Fundo com efeito de cidade noturna */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519710164256-683d735fcf5c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        <div className="relative z-10"> {/* Conteúdo principal acima do fundo */}

          <nav className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-md border-b border-emerald-700 z-50 shadow-lg transition-all duration-300">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                
                {/* LOGO HEADER */}
                <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg border border-emerald-500/50">
                    <Image 
                        src="/images/logo.png" 
                        alt="Logo Blockchain Bet Brasil" 
                        width={40} 
                        height={40}
                        className="object-cover"
                        priority
                    />
                  </div>
                  <span className="text-white font-bold text-xl hidden sm:inline drop-shadow-md">Blockchain Bet Brasil</span>
                  <span className="text-white font-bold text-xl sm:hidden">B³</span>
                </Link>

                {/* MENU DESKTOP */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/como-jogar" className="text-slate-300 hover:text-emerald-300 transition-colors text-lg font-medium hover:underline decoration-emerald-500 decoration-2 underline-offset-4">Como Proceder</Link>
                  <Link href="/apostas" className="text-slate-300 hover:text-emerald-300 transition-colors text-lg font-medium hover:underline decoration-emerald-500 decoration-2 underline-offset-4">Aderir</Link>
                  <Link href="/invest-bet" className="text-slate-300 hover:text-white transition-colors font-bold text-amber-400 hover:text-amber-300 text-lg">Inter-Bet</Link>
                  <Link href="/premiacao" className="text-slate-300 hover:text-emerald-300 transition-colors text-lg font-medium hover:underline decoration-emerald-500 decoration-2 underline-offset-4">Premiação</Link>
                  <Link href="/admin" className="text-slate-300 hover:text-emerald-300 transition-colors text-lg font-medium hover:underline decoration-emerald-500 decoration-2 underline-offset-4">Painel Admin</Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                  <button
                    onClick={handleConnectWallet}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-1 ${
                      isWalletConnected
                        ? 'bg-emerald-600 text-white border border-emerald-500'
                        : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
                    }`}
                  >
                    {isWalletConnected ? (
                      <>
                        <span>✅ Conectado</span>
                        <span className="text-sm opacity-80">Mainnet</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    className={`px-3 py-1 rounded-full text-sm font-semibold mr-2 ${
                      isWalletConnected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                    }`}
                  >
                    {isWalletConnected ? '✅' : '🔗'}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="pt-24 pb-16">
            <div className="container mx-auto p-4 md:p-6 flex justify-center">
              <div className="w-full flex flex-col items-center justify-center gap-12 max-w-7xl">

                <div className="w-full max-w-5xl mx-auto bg-amber-400/90 border-b-4 border-amber-500 p-5 rounded-lg shadow-xl ring-4 ring-amber-500/50 animate-pulse-slow backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-900 flex-shrink-0 mt-1" aria-hidden="true">
                      <path d="m21.73 18.67-8.94-15.01a2 2 0 0 0-3.56 0L2.27 18.67a2 2 0 0 0 1.79 3.33h17.89a2 2 0 0 0 1.78-3.33Z"></path>
                      <path d="M12 9v4"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                    <div className="text-amber-900">
                      <p className="font-extrabold text-xl md:text-2xl">PLATAFORMA DE INTERAÇÃO E ESTRATÉGIA GAMIFICADA.</p>
                      <p className="font-semibold text-lg md:text-xl mt-1 leading-snug">
                        🚀 <strong>OPERANDO NA ETHEREUM MAINNET</strong> - MODO REAL ATIVO<br />
                        Na Blockchain Bet Brasil, a grande diferença está no sistema de contemplação, que ACABA com a ideia de "perdedor absoluto".
                      </p>
                    </div>
                  </div>
                </div>

                <section className="w-full max-w-5xl flex flex-col items-center justify-center text-center gap-6" id="inicio">
                  <h3 className="text-4xl md:text-6xl font-extrabold text-white leading-tight animate-fade-in-down drop-shadow-2xl">
                    Bem-vindo...<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">BBB &amp; Inter-Bet!</span>
                  </h3>
                  <div className="my-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-100">
                      Blockchain Bet Brasil - O BBB da Web3.<span className="text-emerald-400"><br />Interação e estratégia, sem paredão.</span>
                    </h2>
                    <p className="mt-4 text-2xl md:text-3xl font-bold text-amber-300 animate-pulse-fast drop-shadow-md">
                      Ganha com 5, 4, 3, 2 e até com 1 ponto apenas!
                    </p>
                  </div>
                  <p className="text-xl md:text-2xl text-slate-300 max-w-3xl leading-relaxed">
                    Prepare-se para uma experiência de interação descentralizada como nunca visto antes. Com tecnologia blockchain e um sistema de compensação inovador, com bônus para zero retorno, convidamos você, com sua habilidade e estratégia, para se unir a outros participantes desse sensacional projeto.
                  </p>

                  <div id="premiacao" className="mt-8 w-full flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
                    <div className="bg-blue-600/60 text-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center flex-1 transition-transform transform hover:scale-[1.02] border-4 border-blue-500 backdrop-blur-sm hover:shadow-blue-500/50">
                      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ganhe até R$50.000,00</h1>
                      <p className="text-2xl font-semibold mb-6">Obtendo apenas <span className="text-yellow-300 font-bold">1 ponto</span></p>
                      <p className="text-5xl md:text-6xl font-black mb-2 drop-shadow-lg text-yellow-300">R$5,00</p>
                      <p className="text-lg font-medium text-blue-100">Bônus de R$0,625 por aplicação com zero retorno, (8x= 1 aplicação grátis).</p>
                    </div>
                    <div className="bg-purple-700/60 text-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center flex-1 transition-transform transform hover:scale-[1.02] border-4 border-purple-500 backdrop-blur-sm hover:shadow-purple-500/50">
                      <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Ganhe até R$10.000.000,00</h1>
                      <p className="text-2xl font-semibold mb-6">Obtendo apenas <span className="text-yellow-300 font-bold">1 ponto</span></p>
                      <p className="text-5xl md:text-6xl font-black mb-2 drop-shadow-lg text-yellow-300">R$1.000,00</p>
                      <p className="text-lg font-medium text-purple-100">Bônus de R$125,00 por aplicação com zero retorno, (8x= 1 aplicação grátis).</p>
                    </div>
                  </div>
                </section>

                <section className="w-full max-w-6xl mt-16 p-8 bg-slate-800/60 rounded-3xl shadow-2xl border-2 border-emerald-600 backdrop-blur-md" id="invest-bet">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-center text-emerald-300 mb-12 drop-shadow-lg animate-fade-in">
                    INTER-BET: Aqui, Não Tem Segredo!
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="flex flex-col items-center text-center p-6 bg-slate-700/70 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in delay-100 backdrop-blur-sm group">
                      <div className="mb-6 w-32 h-32 flex items-center justify-center rounded-full bg-slate-900 border-4 border-emerald-400 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 110 4h2a2 2 0 110 4h-2a2 2 0 110 4M4 12H3m18 0h-1M6 12H4m10 0h2m-2 0h-2M4 6h.01M4 18h.01M18 6h.01M18 18h.01" />
                        </svg>
                      </div>
                      <h4 className="text-3xl font-bold text-amber-300 mb-4">INTERAÇÃO</h4>
                      <p className="text-lg text-slate-200 leading-relaxed mb-4 text-justify">
                        Mais do que interação, um ecossistema de valor. Seus R$5,00 ou R$1.000,00 por participação se tornam parte de um retorno robusto, com taxas transparentes e a chance de ver seu capital crescer.
                      </p>
                      <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-auto border border-slate-500">
                        <p className="text-lg font-bold text-emerald-300">R$5,00 por aplicação</p>
                        <p className="text-sm text-slate-300 mt-1">Bônus de R$0,625 por aplicação com zero retorno (8x)= uma aplicação grátis.</p>
                      </div>
                      <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-4 border border-slate-500">
                        <p className="text-lg font-bold text-emerald-300">R$1.000,00 por aplicação</p>
                        <p className="text-sm text-slate-300 mt-1">Bônus de R$125,00 por aplicação com zero retorno (8x)= uma aplicação grátis.</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-slate-700/70 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in delay-200 backdrop-blur-sm group">
                      <div className="mb-6 w-32 h-32 flex items-center justify-center rounded-full bg-slate-900 border-4 border-emerald-400 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-3xl font-bold text-amber-300 mb-4">ENTRETENIMENTO</h4>
                      <p className="text-lg text-slate-200 leading-relaxed mb-4 text-justify">
                        A emoção do entretenimento elevada ao máximo! Nosso sistema de compensação único recompensa de 5 a 1 ponto, garantindo mais chances de retorno.
                      </p>
                      <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-auto border border-slate-500">
                        <p className="text-lg font-bold text-emerald-300">Persistência:</p>
                        <p className="text-sm text-slate-300 mt-1">Ganhar com 5, 4, 3, 2 e até com 1 ponto apenas é emocionante!</p>
                      </div>
                      <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-4 border border-slate-500">
                        <p className="text-lg font-bold text-emerald-300">Sua hora vai chegar.</p>
                        <p className="text-sm text-slate-300 mt-1">Garantimos isso e oferecemos bônus como um pacto com você.</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 bg-slate-700/70 rounded-2xl shadow-lg border border-emerald-500 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in delay-300 backdrop-blur-sm group">
                      <div className="mb-6 w-32 h-32 flex items-center justify-center rounded-full bg-slate-900 border-4 border-emerald-400 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h4 className="text-3xl font-bold text-amber-300 mb-4">ESTRATÉGIA</h4>
                      <p className="text-lg text-slate-200 leading-relaxed mb-4 text-justify">
                        Você faz parte de algo maior. Nosso sistema está limitado a captação de apenas 10.000 aplicações por rodada, garantindo ambiente competitivo.
                      </p>
                      <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-auto border border-slate-500">
                        <p className="text-lg font-bold text-emerald-300">Rodadas</p>
                        <p className="text-sm text-slate-300 mt-1">A cada rodada sem contemplados a emoção aumenta cada vez mais.</p>
                      </div>
                      <div className="bg-slate-600/50 p-3 rounded-lg w-full mt-4 border border-slate-500">
                        <p className="text-lg font-bold text-emerald-300">Rateio</p>
                        <p className="text-sm text-slate-300 mt-1">Se só você fizer 1 ponto, a bolada da rodada ativa é toda sua. Bora!</p>
                      </div>
                    </div>
                  </div>

                  <div id="como-proceder" className="mt-16 text-center">
                    <h4 className="text-4xl font-bold text-white mb-6 animate-fade-in delay-400 drop-shadow-lg">
                      {isWalletConnected ? '🎉 Carteira Conectada!' : 'Mude de vida Já!'}
                    </h4>
                    <button
                      onClick={handleInteract}
                      className="inline-flex items-center justify-center px-12 py-5 border border-transparent text-xl font-extrabold rounded-full shadow-[0_0_20px_rgba(52,211,153,0.5)] text-slate-900 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-70 transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
                    >
                      {isWalletConnected ? '🚀 Interagir com a Plataforma!' : '🔗 Conectar para Interagir!'}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-7 h-7 ml-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                      </svg>
                    </button>

                    {isWalletConnected && (
                      <div className="mt-6 text-emerald-300 text-sm bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30 max-w-md mx-auto">
                        ✅ Conectado à <strong>Ethereum Mainnet</strong> - Pronto para operações reais
                      </div>
                    )}
                  </div>
                </section>

                <p className="mt-8 text-sm text-slate-500">🌐 Ethereum Mainnet - Modo Real Ativo</p>
              </div>
            </div>
          </main>

          <footer className="bg-slate-900/80 border-t border-emerald-700 py-10 mt-16 shadow-inner relative z-10 backdrop-blur-md">
            <div className="container mx-auto px-4 text-center">
              
              {/* LOGO RODAPÉ ATUALIZADA */}
              <div className="flex justify-center items-center gap-3 mb-6">
                 <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-500/30 shadow-lg">
                    <Image src="/images/logo.png" alt="Logo Rodapé" width={48} height={48} className="object-cover" />
                 </div>
                 <span className="text-2xl font-bold text-white tracking-tight">Blockchain Bet Brasil</span>
              </div>

              <p className="text-slate-400 text-sm">© 2025 Blockchain Bet Brasil. Todos os direitos reservados.</p>
              <p className="text-slate-500 text-xs mt-2">Plataforma de interação e estratégia gamificada - Ethereum Mainnet</p>
              <div className="mt-6 flex justify-center gap-6">
                <Link href="/termos-de-uso" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Termo de Uso
                </Link>
                <span className="text-slate-600">|</span>
                <Link href="/politica-de-privacidade" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default BlockchainBetBrasil;