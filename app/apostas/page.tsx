"use client";

import React, { useState } from 'react';
import CountdownTimer from '../components/CountdownTimer';

const ApostasPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedBetType, setSelectedBetType] = useState('regular');
  const [prognostics, setPrognostics] = useState(Array(5).fill({ x: '', y: '' }));

  const handleConnectWallet = async () => {
    try {
      // Simulação de conexão com Ethereum Mainnet
      console.log('Conectando à Ethereum Mainnet...');
      setIsConnected(true);
      console.log('Conectado à Ethereum Mainnet - Modo Real');
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      alert('Erro ao conectar carteira. Verifique se o MetaMask está instalado e configurado para Ethereum Mainnet.');
    }
  };

  const handlePrognosticChange = (index: number, field: 'x' | 'y', value: string) => {
    if (!isConnected) return;
    
    const newPrognostics = [...prognostics];
    newPrognostics[index] = {
      ...newPrognostics[index],
      [field]: value.replace(/[^0-9]/g, '').slice(0, 2)
    };
    setPrognostics(newPrognostics);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      await handleConnectWallet();
      return;
    }
    
    if (!isFormValid) {
      alert('Por favor, preencha todos os prognósticos antes de apostar.');
      return;
    }
    
    try {
      // Simulação de transação na Mainnet
      console.log('Iniciando transação na Ethereum Mainnet...', { 
        type: selectedBetType, 
        prognostics,
        valor: selectedBetType === 'regular' ? 'R$ 5,00' : 'R$ 1.000,00',
        network: 'Ethereum Mainnet'
      });
      
      // Simulação de confirmação de transação
      alert(`🎉 Transação enviada para Ethereum Mainnet!\n\nAposta: ${selectedBetType === 'regular' ? 'Regular' : 'Premium'}\nValor: ${selectedBetType === 'regular' ? 'R$ 5,00' : 'R$ 1.000,00'}\nPrognósticos: ${prognostics.map(p => `${p.x}/${p.y}`).join(', ')}\n\nAguarde a confirmação na blockchain.`);
      
      // Limpa o formulário
      setPrognostics(Array(5).fill({ x: '', y: '' }));
      
    } catch (error) {
      console.error('Erro na transação:', error);
      alert('Erro ao processar transação. Verifique seu saldo e tente novamente.');
    }
  };

  const isFormValid = isConnected && prognostics.every(p => p.x && p.y);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a className="flex items-center space-x-2" href="/">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B³</span>
              </div>
              <span className="text-white font-bold text-xl">Blockchain Bet Brasil</span>
            </a>
            
            {/* MENU ATUALIZADO */}
            <div className="hidden md:flex items-center space-x-8">
              <a className="text-slate-300 hover:text-white transition-colors" href="/como-jogar">Como Proceder</a>
              <a className="text-slate-300 hover:text-white transition-colors" href="/apostas">Game</a>
              <a className="text-slate-300 hover:text-white transition-colors" href="/premiacao">Premiação</a>
              <a className="text-slate-300 hover:text-white transition-colors" href="/admin">Painel Admin</a>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={handleConnectWallet}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg ${
                  isConnected 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white'
                }`}
              >
                {isConnected ? '✅ Conectado - Mainnet' : '🔗 Conectar Carteira'}
              </button>
            </div>
            
            <div className="flex md:hidden items-center space-x-2">
              <button 
                onClick={handleConnectWallet}
                className={`px-3 py-1 rounded text-xs font-semibold mr-2 ${
                  isConnected 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
                }`}
              >
                {isConnected ? '✅' : '🔗'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">🎯 Monte sua Estratégia no Game</h1>
            <p className="text-slate-300 text-lg">
              🌐 <strong>Ethereum Mainnet</strong> - Escolha entre interação regular de R$5,00 ou premium de R$1.000,00
            </p>
          </div>

          {/* BOTÕES DE SELEÇÃO DE TIPO DE APOSTA */}
          <div className="flex gap-4 mb-8 justify-center">
            <button 
              onClick={() => setSelectedBetType('regular')}
              className={`px-6 py-3 rounded-lg font-bold transition-all shadow-lg ${
                selectedBetType === 'regular' 
                  ? 'bg-emerald-600 text-white border-2 border-emerald-400' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-transparent'
              }`}
            >
              🎯 Interação Regular - R$ 5,00
            </button>
            <button 
              onClick={() => setSelectedBetType('premium')}
              className={`px-6 py-3 rounded-lg font-bold transition-all shadow-lg ${
                selectedBetType === 'premium' 
                  ? 'bg-blue-600 text-white border-2 border-blue-400' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-transparent'
              }`}
            >
              💎 Inter-Bet Premium - R$ 1.000,00
            </button>
          </div>

          {/* FORMULÁRIO DE APOSTAS */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 shadow-2xl">
            <div className="w-full p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {selectedBetType === 'regular' ? '🎯 Interação Regular' : '💎 Inter-Bet Premium'}
                </h2>
                <div className="bg-amber-500 text-black p-3 rounded-lg text-sm font-bold">
                  <p>Bônus Zero Pontos: {selectedBetType === 'regular' ? 'R$ 0,625' : 'R$ 125,00'}</p>
                  <p className="text-xs mt-1">8 bônus = 1 interação grátis</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <label className="block text-lg font-bold text-white mb-4 text-center">
                    Seus 5 Prognósticos (1-25)
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {prognostics.map((prognostic, index) => (
                      <div key={index} className="text-center">
                        <div className="text-sm text-slate-300 mb-2 font-semibold">Prognóstico #{index + 1}</div>
                        <div className={`flex items-center justify-center border-2 rounded-lg p-2 ${
                          isConnected 
                            ? prognostic.x && prognostic.y 
                              ? 'border-emerald-500 bg-emerald-500/10' 
                              : 'border-slate-600 bg-slate-700'
                            : 'border-slate-700 bg-slate-800'
                        }`}>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className={`w-10 text-center text-lg font-bold focus:outline-none ${
                              isConnected
                                ? 'bg-transparent text-white'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                            placeholder="X"
                            maxLength={2}
                            value={prognostic.x}
                            onChange={(e) => handlePrognosticChange(index, 'x', e.target.value)}
                            disabled={!isConnected}
                          />
                          <span className={`text-lg font-bold mx-2 ${
                            isConnected ? 'text-white' : 'text-slate-500'
                          }`}>/</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className={`w-10 text-center text-lg font-bold focus:outline-none ${
                              isConnected
                                ? 'bg-transparent text-white'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                            placeholder="Y"
                            maxLength={2}
                            value={prognostic.y}
                            onChange={(e) => handlePrognosticChange(index, 'y', e.target.value)}
                            disabled={!isConnected}
                          />
                        </div>
                        <div className="text-slate-400 text-xs mt-2 h-4 font-medium">
                          {!isConnected 
                            ? '🔒 Conecte a carteira' 
                            : (!prognostic.x || !prognostic.y 
                                ? '⏳ Aguardando...' 
                                : '✅ Preenchido'
                              )
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTÃO DE ENVIAR APOSTA */}
                <button
                  type="submit"
                  disabled={!isConnected || !isFormValid}
                  className={`w-full font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center text-lg ${
                    isConnected && isFormValid
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white transform hover:scale-105'
                      : isConnected
                      ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  }`}
                >
                  {isConnected 
                    ? (isFormValid 
                        ? `🎯 APOSTAR AGORA - ${selectedBetType === 'regular' ? 'R$ 5,00' : 'R$ 1.000,00'}` 
                        : '📝 Preencha todos os prognósticos'
                      )
                    : '🔗 Conectar Carteira para Interagir'
                  }
                </button>

                {/* RELÓGIO DE INÍCIO/ENCERRAMENTO DAS APOSTAS */}
                <div className="mt-6">
                  <CountdownTimer />
                </div>
              </form>

              {!isConnected && (
                <div className="mt-4 text-center">
                  <div className="text-blue-400 text-sm bg-blue-500/10 p-3 rounded-lg border border-blue-500/30">
                    🔗 Conecte sua carteira para habilitar as interações
                  </div>
                </div>
              )}

              {isConnected && isFormValid && (
                <div className="mt-4 text-center">
                  <div className="text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30">
                    ✅ Formulário pronto! Clique em "APOSTAR AGORA" para enviar sua aplicação.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8 text-slate-500 text-sm">
            <p>© 2024 Blockchain Bet Brasil - Todos os direitos reservados</p>
            <p className="mt-1 text-xs">🌐 Ethereum Mainnet - Plataforma operando em modo real</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApostasPage;