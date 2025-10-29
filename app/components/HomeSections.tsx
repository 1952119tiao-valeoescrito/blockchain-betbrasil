// app/components/HomeSections.tsx
'use client';

export default function HomeSections() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Bego-cúnden-a-PAPP
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          <strong>Bolshota: sua carreira para acontecer.</strong>
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Conecte sua carteira memorável para começar a apostar
        </p>
        
        {/* Wallet Connect Section */}
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 border border-yellow-500">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">💰 Conectar Carteira</h3>
          <p className="text-gray-400 text-sm mb-4">
            Conecte sua MetaMask para acessar a plataforma
          </p>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition duration-300">
            Conectar Wallet
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-400">
            Recursos Exclusivos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition duration-300">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-black font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Feature 1</h3>
              <p className="text-gray-400">
                Descrição do primeiro recurso
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition duration-300">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-black font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Feature 2</h3>
              <p className="text-gray-400">
                Descrição do segundo recurso
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition duration-300">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-black font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Feature 3</h3>
              <p className="text-gray-400">
                Descrição do terceiro recurso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-400">
            Estatísticas
          </h2>
          <p className="text-gray-400 text-lg">
            Algumas stats legais aqui...
          </p>
          
          {/* Stats Grid - você pode adicionar números reais depois */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-2xl font-bold text-yellow-400">1.2K</div>
              <div className="text-gray-400 text-sm">Usuários</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-2xl font-bold text-yellow-400">5.8K</div>
              <div className="text-gray-400 text-sm">Apostas</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-2xl font-bold text-yellow-400">25.4</div>
              <div className="text-gray-400 text-sm">ETH em Prêmios</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-2xl font-bold text-yellow-400">98%</div>
              <div className="text-gray-400 text-sm">Taxa de Sucesso</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2024 Blockchain Bet Brasil. Todos os direitos reservados.
          </p>
          <p className="text-yellow-400 font-semibold">
            Plataforma de interação e estratégia gamificada
          </p>
        </div>
      </footer>
    </div>
  );
}