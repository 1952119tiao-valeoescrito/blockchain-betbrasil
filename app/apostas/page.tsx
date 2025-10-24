'use client';

import { useState } from 'react';
import Link from 'next/link';
import CountdownTimer from '../components/CountdownTimer';
import { useWeb3 } from '../hooks/useWeb3';
import { CONTRACT_ADDRESSES } from '../../contracts/addresses';
import { ethers } from 'ethers';

export default function AplicacoesPage() {
  const [prognosticos, setPrognosticos] = useState<Array<{ x: string; y: string }>>(
    Array(5).fill({ x: '', y: '' })
  );
  const [tipoAplicacao, setTipoAplicacao] = useState<'regular' | 'premium'>('regular');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aplicacaoEnviada, setAplicacaoEnviada] = useState(false);

  // HOOK WEB3 REAL - SUBSTITUI os estados antigos
  const { 
    isConnected, 
    account, 
    contracts, 
    connectWallet, 
    disconnectWallet 
  } = useWeb3();

  const handleInputChange = (index: number, campo: 'x' | 'y', valor: string) => {
    const apenasNumeros = valor.replace(/[^0-9]/g, '');
    const numero = parseInt(apenasNumeros);
    
    if (apenasNumeros === '' || (numero >= 1 && numero <= 25)) {
      const novosPrognosticos = [...prognosticos];
      novosPrognosticos[index] = {
        ...novosPrognosticos[index],
        [campo]: apenasNumeros.slice(0, 2)
      };
      setPrognosticos(novosPrognosticos);
    }
  };

  // FUNÇÃO handleSubmit ATUALIZADA PARA BLOCKCHAIN REAL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('🔗 Conecte sua carteira primeiro!');
      return;
    }

    if (!todosPreenchidos) {
      alert('📝 Preencha todos os prognósticos!');
      return;
    }

    const numerosInvalidos = prognosticos.some(p => {
      const numX = parseInt(p.x);
      const numY = parseInt(p.y);
      return numX < 1 || numX > 25 || numY < 1 || numY > 25;
    });

    if (numerosInvalidos) {
      alert('❌ Todos os números devem estar entre 1 e 25!');
      return;
    }

    setIsLoading(true);

    try {
      // CONVERTE PROGNÓSTICOS PARA O FORMATO DO CONTRATO
      const prognosticosArray = prognosticos.map(p => [
        BigInt(parseInt(p.x)), 
        BigInt(parseInt(p.y))
      ]);

      console.log('📤 Enviando aplicação para blockchain...', {
        tipo: tipoAplicacao,
        prognosticos: prognosticosArray,
        wallet: account
      });

      // VERIFICA SE CONTRATOS ESTÃO CARREGADOS
      if (!contracts.mockToken || !contracts.betBrasil) {
        throw new Error('Contratos não carregados. Reconecte a carteira.');
      }

      // VALOR DA APLICAÇÃO EM WEI
      const valorAplicacao = tipoAplicacao === 'regular' ? 
        ethers.parseUnits("5", 18) : // 5 tokens
        ethers.parseUnits("1000", 18); // 1000 tokens

      // VERIFICA SALDO ANTES
      const saldo = await contracts.mockToken.balanceOf(account);
      if (saldo < valorAplicacao) {
        throw new Error(`Saldo insuficiente! Necessário: ${tipoAplicacao === 'regular' ? '5' : '1000'} tokens`);
      }

      // 1. APROVAÇÃO DO TOKEN
      console.log('⏳ Aprovando tokens...');
      const approveTx = await contracts.mockToken.approve(
        CONTRACT_ADDRESSES.betBrasil,
        valorAplicacao
      );
      await approveTx.wait();
      console.log('✅ Tokens aprovados!');

      // 2. FAZER A APOSTA
      console.log('⏳ Enviando aplicação...');
      const betTx = await contracts.betBrasil.aplicar(prognosticosArray);
      
      console.log('⏳ Aguardando confirmação...');
      const receipt = await betTx.wait();
      
      console.log('✅ Aplicação confirmada!', receipt);
      
      setAplicacaoEnviada(true);
      
      alert(`🎯 APLICAÇÃO CONFIRMADA NA BLOCKCHAIN!\n\nHash: ${receipt.hash.slice(0, 10)}...\nPrógnosticos: ${prognosticos.map(p => `${p.x}/${p.y}`).join(', ')}`);

    } catch (error: any) {
      console.error('❌ Erro na aplicação:', error);
      
      if (error.message.includes('user rejected')) {
        alert('❌ Transação rejeitada pelo usuário.');
      } else if (error.message.includes('Saldo insuficiente')) {
        alert(`❌ ${error.message}`);
      } else if (error.message.includes('Contratos não carregados')) {
        alert('❌ Erro de conexão. Reconecte a carteira.');
      } else {
        alert('❌ Erro ao processar aplicação: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // FUNÇÃO connectWallet ATUALIZADA
  const connectWalletReal = async () => {
    try {
      await connectWallet();
      console.log('✅ Carteira conectada via hook Web3');
    } catch (error) {
      console.error('❌ Erro ao conectar carteira:', error);
      alert('❌ Erro ao conectar carteira');
    }
  };

  // FUNÇÃO disconnectWallet ATUALIZADA
  const disconnectWalletReal = () => {
    disconnectWallet();
    setAplicacaoEnviada(false);
    setPrognosticos(Array(5).fill({ x: '', y: '' }));
  };

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const todosPreenchidos = prognosticos.every(p => p.x && p.y);

  const resetarAplicacao = () => {
    setPrognosticos(Array(5).fill({ x: '', y: '' }));
    setAplicacaoEnviada(false);
  };

  const bonusConfig = {
    regular: {
      bonusZero: 'R$ 0,625',
      bonusTexto: '8 bônus = 1 aplicação grátis'
    },
    premium: {
      bonusZero: 'R$ 125,00', 
      bonusTexto: '8 bônus = 1 aplicação grátis'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B³</span>
              </div>
              <span className="text-white font-bold text-xl">Blockchain Bet Brasil</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/como-jogar" className="text-emerald-400 font-semibold">
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

            <div className="hidden md:flex items-center space-x-4">
              {isConnected ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-3 py-1 rounded-lg text-sm">
                    {formatWalletAddress(account)}
                  </div>
                  <button
                    onClick={disconnectWalletReal}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Desconectar
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWalletReal}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-6 py-2 rounded-lg transition-all duration-300 font-semibold shadow-lg"
                >
                  Conectar Carteira
                </button>
              )}
            </div>

            <div className="flex md:hidden items-center space-x-2">
              {isConnected ? (
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 px-2 py-1 rounded text-xs mr-2">
                  {formatWalletAddress(account)}
                </div>
              ) : (
                <button
                  onClick={connectWalletReal}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded text-xs font-semibold mr-2"
                >
                  Conectar
                </button>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white p-2 transition-colors"
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-xl">
              <div className="flex flex-col space-y-0 p-4">
                <Link href="/aplicacoes" className="text-emerald-400 font-semibold py-3 px-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  Aplicações
                </Link>
                <Link href="/invest-bet" className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                  Invest-Bet
                </Link>
                <Link href="/como-jogar" className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                  Como Jogar
                </Link>
                <Link href="/premiacao" className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                  Premiação
                </Link>
                <Link href="/admin" className="text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-slate-800/50 transition-colors">
                  Painel Admin
                </Link>
                
                <div className="pt-4 mt-4 border-t border-slate-700">
                  {isConnected ? (
                    <button
                      onClick={disconnectWalletReal}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors text-sm font-medium"
                    >
                      Desconectar Carteira
                    </button>
                  ) : (
                    <button
                      onClick={connectWalletReal}
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

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">🎯 Faça sua Aplicação</h1>
            <p className="text-slate-300 text-lg">
              Escolha entre nossa aplicação regular de R$5,00 ou a premium Invest-Bet de R$1.000,00
            </p>
          </div>

          <div className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => {
                setTipoAplicacao('regular');
                resetarAplicacao();
              }}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                tipoAplicacao === 'regular'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              🎯 Aplicação Regular
            </button>
            <button
              onClick={() => {
                setTipoAplicacao('premium');
                resetarAplicacao();
              }}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                tipoAplicacao === 'premium'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              💎 Invest-Bet Premium
            </button>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 shadow-2xl">
            <div className="w-full p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {tipoAplicacao === 'regular' ? '🎯 Aplicação Regular' : '💎 Invest-Bet Premium'}
                </h2>
                <div className="bg-amber-500 text-black p-2 rounded-lg text-sm">
                  <p className="font-bold">Bônus Zero Pontos: {bonusConfig[tipoAplicacao].bonusZero}</p>
                  <p>{bonusConfig[tipoAplicacao].bonusTexto}</p>
                </div>
              </div>

              {aplicacaoEnviada ? (
                <div className="text-center space-y-4">
                  <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-4 rounded-lg">
                    <p className="text-xl font-bold">✅ APLICAÇÃO CONFIRMADA NA BLOCKCHAIN!</p>
                    <p className="text-sm mt-2">Prógnosticos enviados:</p>
                    <p className="font-mono text-sm bg-slate-700 p-2 rounded mt-2">
                      {prognosticos.map((p, i) => `${p.x}/${p.y}`).join(' | ')}
                    </p>
                  </div>
                  <button
                    onClick={resetarAplicacao}
                    className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Fazer Nova Aplicação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-slate-700/30 p-4 rounded-lg">
                    <label className="block text-lg font-bold text-white mb-4 text-center">
                      Seus 5 Prognósticos (1-25)
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {prognosticos.map((prognostico, index) => (
                        <div key={index} className="text-center">
                          <div className="text-sm text-slate-300 mb-1">#{index + 1}</div>
                          <div className={`flex items-center justify-center border rounded-lg p-1 ${
                            isConnected 
                              ? 'bg-slate-600 border-slate-500' 
                              : 'bg-slate-700 border-slate-600'
                          }`}>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              className="w-8 bg-transparent text-white text-center text-sm font-bold focus:outline-none"
                              placeholder="X"
                              maxLength={2}
                              value={prognostico.x}
                              onChange={(e) => handleInputChange(index, 'x', e.target.value)}
                              disabled={!isConnected}
                            />
                            <span className="text-white text-sm font-bold mx-1">/</span>
                            <input
                              type="text"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              className="w-8 bg-transparent text-white text-center text-sm font-bold focus:outline-none"
                              placeholder="Y"
                              maxLength={2}
                              value={prognostico.y}
                              onChange={(e) => handleInputChange(index, 'y', e.target.value)}
                              disabled={!isConnected}
                            />
                          </div>
                          <div className="text-slate-400 text-xs mt-1 h-4">
                            {prognostico.x && (parseInt(prognostico.x) < 1 || parseInt(prognostico.x) > 25) && (
                              <span className="text-red-400">1-25</span>
                            )}
                            {prognostico.y && (parseInt(prognostico.y) < 1 || parseInt(prognostico.y) > 25) && (
                              <span className="text-red-400">1-25</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!isConnected || !todosPreenchidos || isLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando na Blockchain...
                      </>
                    ) : isConnected ? (
                      `Confirmar Aplicação - ${tipoAplicacao === 'regular' ? 'R$ 5,00' : 'R$ 1.000,00'}`
                    ) : (
                      'Conecte Carteira'
                    )}
                  </button>
                </form>
              )}

              {!isConnected && !aplicacaoEnviada && (
                <div className="mt-3 text-center">
                  <div className="text-amber-400 text-xs bg-amber-500/10 p-2 rounded">
                    🔗 Conecte sua carteira para fazer aplicações na blockchain
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <CountdownTimer />

          <div className="text-center mt-8 text-slate-500 text-sm">
            <p>© 2025 Blockchain Bet Brasil - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
}