import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16 text-center">
        {/* Aviso de testes */}
        <div className="bg-amber-500/20 border border-amber-500/50 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
          <p className="text-amber-400 font-bold text-lg">
            PLATAFORMA DE INVESTIMENTO E ENTRETENIMENTO GAMIFICADO.
          </p>
          <p className="text-amber-300 mt-2">
            AINDA ESTAMOS EM FASE DE TESTES, NÃO UTILIZE FUNDOS REAIS.
          </p>
          <p className="text-amber-200 mt-2">
            NÃO SE TRATA DE JOGO DE AZAR: Na Blockchain Bet Brasil, a grande diferença está no sistema de premiação, que ACABA com a ideia de &quot;perdedor absoluto&quot;.
          </p>
        </div>

        {/* Conteúdo principal */}
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-6">
          Bem-vindo...
          <br />
          BBB & Invest-Bet!
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Blockchain Bet Brasil - O BBB da Web3. Investimento e diversão sem paredão.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto mb-12">
          <div className="bg-slate-800/50 p-4 rounded-lg border border-emerald-500/20">
            <span className="text-3xl">🎯</span>
            <p className="text-sm mt-2 text-emerald-400">5 Pontos</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-green-500/20">
            <span className="text-3xl">💰</span>
            <p className="text-sm mt-2 text-green-400">4 Pontos</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
            <span className="text-3xl">⚡</span>
            <p className="text-sm mt-2 text-cyan-400">3 Pontos</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-amber-500/20">
            <span className="text-3xl">🔥</span>
            <p className="text-sm mt-2 text-amber-400">2 Pontos</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border border-purple-500/20">
            <span className="text-3xl">💎</span>
            <p className="text-sm mt-2 text-purple-400">1 Ponto</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-6 mb-12">
          <p className="text-lg text-slate-300 leading-relaxed">
            <strong className="text-emerald-400">Ganha com 5, 4, 3, 2 e até com 1 ponto apenas!</strong>
          </p>
          
          <p className="text-lg text-slate-300 leading-relaxed">
            Prepare-se para uma experiência de apostas descentralizada como nunca vista antes. Com tecnologia blockchain e um sistema de premiação inovador, com bônus para zero ponto, sua sorte e estratégia se unem para transformar o jogo.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/apostas" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg">
            🎯 Começar a Apostar Agora
          </Link>
          <Link href="/como-jogar" className="bg-slate-800 hover:bg-slate-700 border border-emerald-500/30 text-white font-bold py-4 px-8 rounded-xl transition-all">
            📚 Como Funciona
          </Link>
        </div>

        {/* Badge de lançamento */}
        <div className="mt-12">
          <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold py-2 px-4 rounded-full">
            🚀 AGORA NO AR - LANÇAMENTO OFICIAL!
          </span>
        </div>
      </div>
    </div>
  );
}