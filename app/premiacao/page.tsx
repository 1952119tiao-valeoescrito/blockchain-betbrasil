'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Chart, registerables } from 'chart.js';

// Registrar todos os componentes do Chart.js
Chart.register(...registerables);

// Função para calcular percentuais no modo cascata
function calcularPercentuaisCascata(faixasComGanhadores: {[key: number]: boolean}) {
    // Percentuais iniciais de cada faixa (BASE 100%)
    const percentuaisBase = {
        5: 50,  // 5 pontos
        4: 20,  // 4 pontos  
        3: 15,  // 3 pontos
        2: 10,  // 2 pontos
        1: 5    // 1 ponto
    };

    // Cria uma cópia dos percentuais
    let percentuais = { ...percentuaisBase };
    let percentualAcumulado = 0;

    // Percorre da faixa mais alta (5) até a mais baixa (1)
    for (let faixa = 5; faixa >= 1; faixa--) {
        if (!faixasComGanhadores[faixa]) {
            // Se não tem ganhador nesta faixa, acumula o percentual
            percentualAcumulado += percentuaisBase[faixa];
            percentuais[faixa] = 0;
        } else {
            // Se tem ganhador, distribui o percentual acumulado
            percentuais[faixa] += percentualAcumulado;
            percentualAcumulado = 0;
        }
    }

    // Se sobrou percentual acumulado, vai tudo pra faixa 1
    if (percentualAcumulado > 0) {
        percentuais[1] += percentualAcumulado;
    }

    return percentuais;
}

// Função para calcular multiplicadores baseado no cenário
function calcularMultiplicadores(scenario: string, percentuaisBase: any) {
    const multiplicadores = {
        padrao: 1,
        cascata: 2,      // 200%
        turbinada: 4,    // 400%
        mega_turbinada: 8 // 800%
    };

    const multiplicador = multiplicadores[scenario as keyof typeof multiplicadores] || 1;
    
    return {
        5: percentuaisBase[5] * multiplicador,
        4: percentuaisBase[4] * multiplicador,
        3: percentuaisBase[3] * multiplicador,
        2: percentuaisBase[2] * multiplicador,
        1: percentuaisBase[1] * multiplicador
    };
}

export default function PremiacaoPage() {
  const [arrecadacao, setArrecadacao] = useState(2500000);
  const [scenario, setScenario] = useState('padrao');
  const [winners, setWinners] = useState({
    '5-Pontos': 1,
    '4-Pontos': 1,
    '3-Pontos': 1,
    '2-Pontos': 1,
    '1-Ponto': 1
  });
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Percentuais base (100%)
  const percentuaisBase = {
    5: 50,  // 5 pontos
    4: 20,  // 4 pontos  
    3: 15,  // 3 pontos
    2: 10,  // 2 pontos
    1: 5    // 1 ponto
  };

  // Cálculos baseados na arrecadação
  const premioTotal = arrecadacao * 0.95;
  const taxaAdmin = arrecadacao * 0.05;

  // Calcular percentuais baseado no cenário e ganhadores
  const getCurrentPercentuais = () => {
    if (scenario === 'cascata') {
      // Verifica quais faixas têm ganhadores
      const faixasComGanhadores = {
        5: winners['5-Pontos'] > 0,
        4: winners['4-Pontos'] > 0,
        3: winners['3-Pontos'] > 0,
        2: winners['2-Pontos'] > 0,
        1: winners['1-Ponto'] > 0
      };
      
      return calcularPercentuaisCascata(faixasComGanhadores);
    } else {
      return calcularMultiplicadores(scenario, percentuaisBase);
    }
  };

  const currentPercentuais = getCurrentPercentuais();

  // Calcular prêmios por faixa
  const premiosPorFaixa = {
    '5-Pontos': (premioTotal * currentPercentuais[5]) / 100,
    '4-Pontos': (premioTotal * currentPercentuais[4]) / 100,
    '3-Pontos': (premioTotal * currentPercentuais[3]) / 100,
    '2-Pontos': (premioTotal * currentPercentuais[2]) / 100,
    '1-Ponto': (premioTotal * currentPercentuais[1]) / 100
  };

  // Calcular prêmio por ganhador (considerando 0 ganhadores = prêmio acumulado)
  const premioPorGanhador = {
    '5-Pontos': winners['5-Pontos'] > 0 ? premiosPorFaixa['5-Pontos'] / winners['5-Pontos'] : 0,
    '4-Pontos': winners['4-Pontos'] > 0 ? premiosPorFaixa['4-Pontos'] / winners['4-Pontos'] : 0,
    '3-Pontos': winners['3-Pontos'] > 0 ? premiosPorFaixa['3-Pontos'] / winners['3-Pontos'] : 0,
    '2-Pontos': winners['2-Pontos'] > 0 ? premiosPorFaixa['2-Pontos'] / winners['2-Pontos'] : 0,
    '1-Ponto': winners['1-Ponto'] > 0 ? premiosPorFaixa['1-Ponto'] / winners['1-Ponto'] : 0
  };

  // Descrições dos cenários
  const scenarioDescriptions = {
    padrao: {
      title: 'Cenário Padrão (100%)',
      description: 'Distribuição padrão do prêmio entre as 5 faixas de acertos. Caso não haja ganhadores, o prêmio acumula para o próximo cenário.'
    },
    cascata: {
      title: 'Cenário Cascata (200%)', 
      description: 'Prêmio acumulado da rodada anterior é redistribuído. Sistema inteligente que garante premiação mesmo com menos ganhadores.'
    },
    turbinada: {
      title: 'Rodada Turbinada (400%)',
      description: 'Prêmio acumulado de múltiplas rodadas sem ganhadores. Valor total multiplicado por 4, criando premiações extraordinárias.'
    },
    mega_turbinada: {
      title: 'Bet Turbinada (800%)',
      description: 'Status máximo de acumulação! Prêmio total multiplicado por 8. Se houver ganhadores, o sistema retorna ao cenário padrão.'
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calcular multiplicador atual
  const getMultiplicadorAtual = () => {
    const multiplicadores = {
      padrao: 1,
      cascata: 2,
      turbinada: 4,
      mega_turbinada: 8
    };
    return multiplicadores[scenario as keyof typeof multiplicadores];
  };

  // Função para verificar se o modo cascata está ativo
  const isCascataAtivo = () => {
    return scenario === 'cascata' && Object.values(winners).some((count, index) => 
      index < 4 && count === 0
    );
  };

  // 1. Exportar dados do gráfico
  const exportChartData = () => {
    const data = {
      arrecadacao,
      scenario: scenarioDescriptions[scenario as keyof typeof scenarioDescriptions].title,
      percentuaisBase,
      percentuaisAtuais: currentPercentuais,
      multiplicador: getMultiplicadorAtual(),
      premiosPorFaixa,
      premioTotal,
      taxaAdmin,
      premioPorGanhador,
      winners,
      modoCascataAtivo: isCascataAtivo(),
      dataExportacao: new Date().toISOString(),
      projeto: 'Blockchain Bet Brasil'
    };
    
    // Criar e baixar arquivo JSON
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `premiacao-betbrasil-${scenario}-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('📊 Dados exportados com sucesso!');
  };

  // 2. Compartilhar cenário
  const shareScenario = () => {
    const url = `${window.location.origin}/premiacao?scenario=${scenario}&arrecadacao=${arrecadacao}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Blockchain Bet Brasil - Simulador de Premiação',
        text: `Confira o cenário "${scenarioDescriptions[scenario as keyof typeof scenarioDescriptions].title}" no simulador de premiação!`,
        url: url,
      })
      .catch((error) => console.log('Erro ao compartilhar:', error));
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
        .then(() => {
          alert('🔗 Link copiado para a área de transferência!');
        })
        .catch((error) => {
          console.error('Erro ao copiar:', error);
          alert('❌ Erro ao copiar o link.');
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('🔗 Link copiado para a área de transferência!');
    }
  };

  const toggleAccordion = (article: string) => {
    setActiveAccordion(activeAccordion === article ? null : article);
  };

  // Efeito para o gráfico
  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Dados para o gráfico
    const labels = ['5 Pontos', '4 Pontos', '3 Pontos', '2 Pontos', '1 Ponto'];
    const data = Object.values(premiosPorFaixa);
    const backgroundColors = [
      'rgba(34, 197, 94, 0.8)',  // Verde
      'rgba(59, 130, 246, 0.8)', // Azul
      'rgba(234, 179, 8, 0.8)',  // Amarelo
      'rgba(249, 115, 22, 0.8)', // Laranja
      'rgba(139, 92, 246, 0.8)'  // Roxo
    ];
    const borderColors = [
      'rgb(34, 197, 94)',
      'rgb(59, 130, 246)',
      'rgb(234, 179, 8)',
      'rgb(249, 115, 22)',
      'rgb(139, 92, 246)'
    ];

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 2,
            hoverOffset: 15
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#e2e8f0',
              font: {
                size: 12,
                family: "'Inter', sans-serif"
              },
              padding: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw as number;
                const percentage = ((value / premioTotal) * 100).toFixed(1);
                return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
              }
            },
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#f1f5f9',
            bodyColor: '#cbd5e1',
            borderColor: '#475569',
            borderWidth: 1
          }
        },
        cutout: '60%',
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [premiosPorFaixa, premioTotal]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 py-12">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <header className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2 rounded-lg transition-colors">
              ← Voltar para a Home
            </button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Regulamento Interativo
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Descubra como nosso sistema revolucionário recompensa todos os participantes!
          </p>
        </header>

        {/* Overview Section */}
        <section id="overview" className="mb-16">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 p-6 rounded-xl shadow-sm border border-slate-700">
              <h3 className="text-xl font-bold text-amber-400 mb-2">O Que É?</h3>
              <p className="text-slate-300">
                A Blockchain Bet Brasil é um ecossistema de prognósticos baseada nos 5 prêmios da <strong>Loteria Oficial do Brasil</strong>. ACERTANDO APENAS 1 PONTO VOCÊ JÁ PODE IR PRA GALERA!
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl shadow-sm border border-slate-700">
              <h3 className="text-xl font-bold text-amber-400 mb-2">Como Apostar?</h3>
              <p className="text-slate-300">
                Cada aposta consiste na escolha aleatória de 5 prognósticos de uma{' '}
                <a href="/tabela-de-prognosticos" className="text-blue-400 hover:underline">
                  tabela matriz 25x25, um para cada faixa de prêmio
                </a>. <Link href="/" className="text-blue-400 hover:underline">VALE O ESCRITO.</Link>
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl shadow-sm border border-slate-700">
              <h3 className="text-xl font-bold text-amber-400 mb-2">Como Ganhar?</h3>
              <p className="text-slate-300">
                A pontuação é baseada no número de acertos entre seus prognósticos e os resultados oficiais, na ordem exata. E ganha mesmo, quer seja com 5, 4, 3, 2 ou 1 ponto apenas, o segredo é a PERSISTÊNCIA.
              </p>
            </div>
          </div>
        </section>

        {/* Simulador de Prêmios */}
        <section className="bg-slate-800/50 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-700 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Simulador de Prêmios</h2>
            <p className="mt-2 text-slate-300">Veja como a premiação funciona na prática. Ajuste a arrecadação e explore os cenários.</p>
          </div>

          {/* Slider de Arrecadação */}
          <div className="mb-8">
            <label htmlFor="arrecadacao-slider" className="block text-lg font-semibold text-center mb-2">
              Arrecadação da Rodada: <span className="font-bold text-amber-400">{formatCurrency(arrecadacao)}</span>
            </label>
            <input
              id="arrecadacao-slider"
              type="range"
              min="100000"
              max="5000000"
              step="100000"
              value={arrecadacao}
              onChange={(e) => setArrecadacao(Number(e.target.value))}
              className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Montantes */}
          <div className="grid md:grid-cols-2 gap-6 mb-10 text-center">
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <p className="text-sm text-slate-400">Montante Base para Prêmios (95%)</p>
              <p className="text-2xl font-bold text-green-400">{formatCurrency(premioTotal)}</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
              <p className="text-sm text-slate-400">Taxa Administrativa (5%)</p>
              <p className="text-2xl font-bold text-red-400">{formatCurrency(taxaAdmin)}</p>
            </div>
          </div>

          {/* Cenários e Gráfico */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-center mb-4 text-white">Explore os Cenários de Premiação</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {Object.keys(scenarioDescriptions).map((key) => (
                    <button
                      key={key}
                      onClick={() => setScenario(key)}
                      className={`font-semibold py-2 px-4 rounded-lg transition-colors ${
                        scenario === key
                          ? 'bg-amber-500 text-white shadow'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      }`}
                    >
                      {scenarioDescriptions[key as keyof typeof scenarioDescriptions].title.split(' ').slice(1).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Indicador do Multiplicador */}
              <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                <p className="text-blue-300 text-sm font-semibold text-center">
                  🚀 MULTIPLICADOR ATIVO: {getMultiplicadorAtual()}x • {getMultiplicadorAtual() * 100}% do prêmio base
                </p>
              </div>

              {/* Indicador do Modo Cascata */}
              {isCascataAtivo() && (
                <div className="mb-4 p-3 bg-amber-500/20 border border-amber-500/50 rounded-lg">
                  <p className="text-amber-300 text-sm font-semibold text-center">
                    🎯 MODO CASCATA ATIVO! Prêmios sendo redistribuídos para faixas inferiores.
                  </p>
                </div>
              )}

              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 min-h-[140px]">
                <h4 className="font-bold text-lg mb-1 text-white">
                  {scenarioDescriptions[scenario as keyof typeof scenarioDescriptions].title}
                </h4>
                <p className="text-sm text-slate-300">
                  {scenarioDescriptions[scenario as keyof typeof scenarioDescriptions].description}
                </p>
              </div>

              {/* Botões de Ação */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={exportChartData}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exportar Dados
                </button>
                <button
                  onClick={shareScenario}
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartilhar
                </button>
              </div>
            </div>
            <div className="chart-container h-80">
              <canvas 
                ref={chartRef} 
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Distribuição dos Prêmios */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-center mb-4 text-white">
              Distribuição do Prêmio por Faixa • Multiplicador: {getMultiplicadorAtual()}x
            </h3>
            <div className="space-y-3">
              {['5-Pontos', '4-Pontos', '3-Pontos', '2-Pontos', '1-Ponto'].map((faixa, index) => {
                const faixaNum = 5 - index;
                const temGanhadores = winners[faixa as keyof typeof winners] > 0;
                const percentualBase = percentuaisBase[faixaNum as keyof typeof percentuaisBase];
                const percentualAtual = currentPercentuais[faixaNum as keyof typeof currentPercentuais];
                
                return (
                  <div key={faixa} className={`bg-slate-700/30 p-4 rounded-lg border ${
                    !temGanhadores && scenario === 'cascata' 
                      ? 'border-red-500/50 bg-red-500/10' 
                      : 'border-slate-600'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2">
                      <span className="font-semibold text-lg text-amber-400">{faixa}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">
                          {percentualAtual}% {percentualAtual !== percentualBase && `(${percentualBase}% × ${getMultiplicadorAtual()}x)`}
                        </span>
                        {!temGanhadores && scenario === 'cascata' && (
                          <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">SEM GANHADORES</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <p className="text-sm text-slate-400">Total para a Faixa</p>
                        <p className="font-bold text-xl text-green-400">
                          {formatCurrency(premiosPorFaixa[faixa as keyof typeof premiosPorFaixa])}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <label htmlFor={`winners-${faixa}`} className="text-sm text-slate-400">
                          Nº de Ganhadores
                        </label>
                        <input
                          id={`winners-${faixa}`}
                          type="number"
                          min="0"
                          value={winners[faixa as keyof typeof winners]}
                          onChange={(e) => setWinners({
                            ...winners,
                            [faixa]: Math.max(0, Number(e.target.value))
                          })}
                          className="winner-input w-24 text-right border border-slate-600 bg-slate-800 rounded-md p-1 mt-1 text-white"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400 text-right">Prêmio por Ganhador</p>
                        <p className="font-bold text-xl text-green-400">
                          {temGanhadores 
                            ? formatCurrency(premioPorGanhador[faixa as keyof typeof premioPorGanhador])
                            : 'R$ 0,00'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Resto do código permanece igual */}
        {/* ... (Sistema de Bônus, Regras Detalhadas, CTA, Footer) */}
      </div>
    </div>
  );
}