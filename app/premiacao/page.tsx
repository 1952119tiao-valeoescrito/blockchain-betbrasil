'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Chart, registerables } from 'chart.js';

// Registrar todos os componentes do Chart.js
Chart.register(...registerables);

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

  // Cálculos baseados na arrecadação
  const premioTotal = arrecadacao * 0.95;
  const taxaAdmin = arrecadacao * 0.05;

  // Percentuais por cenário
  const scenarios = {
    padrao: { 5: 50, 4: 20, 3: 15, 2: 10, 1: 5 },
    cascata: { 5: 40, 4: 25, 3: 20, 2: 10, 1: 5 },
    turbinada: { 5: 60, 4: 15, 3: 10, 2: 10, 1: 5 },
    mega_turbinada: { 5: 70, 4: 15, 3: 8, 2: 5, 1: 2 }
  };

  const currentScenario = scenarios[scenario as keyof typeof scenarios];

  // Calcular prêmios por faixa
  const premiosPorFaixa = {
    '5-Pontos': (premioTotal * currentScenario[5]) / 100,
    '4-Pontos': (premioTotal * currentScenario[4]) / 100,
    '3-Pontos': (premioTotal * currentScenario[3]) / 100,
    '2-Pontos': (premioTotal * currentScenario[2]) / 100,
    '1-Ponto': (premioTotal * currentScenario[1]) / 100
  };

  // Calcular prêmio por ganhador
  const premioPorGanhador = {
    '5-Pontos': premiosPorFaixa['5-Pontos'] / winners['5-Pontos'],
    '4-Pontos': premiosPorFaixa['4-Pontos'] / winners['4-Pontos'],
    '3-Pontos': premiosPorFaixa['3-Pontos'] / winners['3-Pontos'],
    '2-Pontos': premiosPorFaixa['2-Pontos'] / winners['2-Pontos'],
    '1-Ponto': premiosPorFaixa['1-Ponto'] / winners['1-Ponto']
  };

  // Descrições dos cenários
  const scenarioDescriptions = {
    padrao: {
      title: 'Cenário Padrão',
      description: 'O prêmio é distribuído entre 5 faixas de acertos, de acordo com os percentuais padrão.'
    },
    cascata: {
      title: 'Cenário Cascata', 
      description: 'Distribuição mais equilibrada entre as faixas, beneficiando acertadores de 4 e 3 pontos.'
    },
    turbinada: {
      title: 'Rodada Turbinada',
      description: 'Maior concentração no prêmio principal, ideal para rodadas com grande arrecadação.'
    },
    mega_turbinada: {
      title: 'Bet Turbinada',
      description: 'Foco máximo no prêmio principal, criando jackpots extraordinários.'
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // 1. Exportar dados do gráfico
  const exportChartData = () => {
    const data = {
      arrecadacao,
      scenario: scenarioDescriptions[scenario as keyof typeof scenarioDescriptions].title,
      premiosPorFaixa,
      premioTotal,
      taxaAdmin,
      premioPorGanhador,
      winners,
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

    console.log('Dados exportados:', data);
    alert('📊 Dados exportados com sucesso!');
  };

  // 2. Compartilhar cenário
  const shareScenario = () => {
    const url = `${window.location.origin}/premiacao?scenario=${scenario}&arrecadacao=${arrecadacao}`;
    
    if (navigator.share) {
      // Compartilhar nativo (dispositivos móveis)
      navigator.share({
        title: 'Blockchain Bet Brasil - Simulador de Premiação',
        text: `Confira o cenário "${scenarioDescriptions[scenario as keyof typeof scenarioDescriptions].title}" no simulador de premiação!`,
        url: url,
      })
      .catch((error) => console.log('Erro ao compartilhar:', error));
    } else if (navigator.clipboard) {
      // Copiar para área de transferência
      navigator.clipboard.writeText(url)
        .then(() => {
          alert('🔗 Link copiado para a área de transferência!');
        })
        .catch((error) => {
          console.error('Erro ao copiar:', error);
          alert('❌ Erro ao copiar o link.');
        });
    } else {
      // Fallback para navegadores antigos
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

    // Destruir gráfico anterior se existir
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

    // Cleanup function
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
                  {Object.entries(scenarios).map(([key, _]) => (
                    <button
                      key={key}
                      data-scenario={key}
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
            <h3 className="text-xl font-semibold text-center mb-4 text-white">Distribuição do Prêmio por Faixa</h3>
            <div className="space-y-3">
              {['5-Pontos', '4-Pontos', '3-Pontos', '2-Pontos', '1-Ponto'].map((faixa) => (
                <div key={faixa} className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                  <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2">
                    <span className="font-semibold text-lg text-amber-400">{faixa}</span>
                    <span className="text-sm text-slate-400">
                      {currentScenario[parseInt(faixa.charAt(0)) as keyof typeof currentScenario]}%
                    </span>
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
                        min="1"
                        value={winners[faixa as keyof typeof winners]}
                        onChange={(e) => setWinners({
                          ...winners,
                          [faixa]: Math.max(1, Number(e.target.value))
                        })}
                        className="winner-input w-24 text-right border border-slate-600 bg-slate-800 rounded-md p-1 mt-1 text-white"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 text-right">Prêmio por Ganhador</p>
                      <p className="font-bold text-xl text-green-400">
                        {formatCurrency(premioPorGanhador[faixa as keyof typeof premioPorGanhador])}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sistema de Bônus */}
        <section className="bg-slate-800/50 rounded-2xl p-8 mb-12 border border-amber-500/30">
          <h2 className="text-3xl font-bold text-amber-400 mb-6">💰 Sistema de Bônus</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-amber-500/10 p-6 rounded-lg border border-amber-500/30">
              <h3 className="text-xl font-bold text-amber-300 mb-4">🎁 Bônus por Zero Pontos</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 text-amber-900 rounded-full p-2">
                    <span className="font-bold">R$</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Blockchain Bet Brasil</p>
                    <p className="text-slate-300">R$ 0,625 por aposta com zero pontos</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 text-amber-900 rounded-full p-2">
                    <span className="font-bold">R$</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Invest Bet</p>
                    <p className="text-slate-300">R$ 125,00 por aposta com zero pontos</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-emerald-500/10 p-6 rounded-lg border border-emerald-500/30">
              <h3 className="text-xl font-bold text-emerald-300 mb-4">🔄 Apostas Grátis</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500 text-emerald-900 rounded-full p-2">
                    <span className="font-bold">8×</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Acumule 8 apostas com zero pontos</p>
                    <p className="text-slate-300">E ganhe 1 aposta grátis automaticamente!</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mt-4">
                  Seu progresso é salvo na blockchain e pode ser verificado a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Regras Detalhadas */}
        <section id="detailed-rules" className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Regras Detalhadas</h2>
            <p className="mt-2 text-slate-300">Consulte os artigos completos do regulamento.</p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {/* Accordion Item 1 */}
            <div className="border border-slate-700 rounded-lg bg-slate-800/50">
              <button
                onClick={() => toggleAccordion('art2')}
                className="accordion-button w-full text-left p-4 font-semibold text-lg flex justify-between items-center text-white hover:bg-slate-700/50 transition-colors"
              >
                <span>Art. 2º - Mecânica da Aposta</span>
                <span>{activeAccordion === 'art2' ? '▴' : '▾'}</span>
              </button>
              {activeAccordion === 'art2' && (
                <div className="accordion-content px-4 pb-4 text-slate-300">
                  <p className="mb-3">
                    2.1. Para concorrer, o participante pode realizar até 5 aplicacoes por rodada, que consiste na escolha aleatoria de 5 (cinco) prognósticos da tabela matriz 25x25.
                  </p>
                  <p className="mb-3">
                    2.2. Cada um dos 5 prognósticos escolhidos corresponde, a 16 diferentes milhares da <strong>Loteria Oficial do Brasil</strong>cuja pontuação deve obedecer a colocação dos prêmios (1º ao 5º prêmio). A premiacao real em cada rodada sera o equivalente a 95% do total que tiver sido arrecadado ate o fechamento das aplicacoes, distribuidos percentualmente em partes iguais entre os acertadores em cada faixa de pontuacao.
                  </p>
                  <p className="mb-3">
                    2.3. É permitida a repetição de prognósticos dentro de uma mesma aplicacao no formulario de captacao de aplicacoes.
                  </p>
                  <p>
                    2.4. A aplicacao é considerada válida após a confirmação e o devido registro na plataforma.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion Item 2 */}
            <div className="border border-slate-700 rounded-lg bg-slate-800/50">
              <button
                onClick={() => toggleAccordion('art89')}
                className="accordion-button w-full text-left p-4 font-semibold text-lg flex justify-between items-center text-white hover:bg-slate-700/50 transition-colors"
              >
                <span>Art. 8º e 9º - Normalidade e Disposições Gerais</span>
                <span>{activeAccordion === 'art89' ? '▴' : '▾'}</span>
              </button>
              {activeAccordion === 'art89' && (
                <div className="accordion-content px-4 pb-4 text-slate-300">
                  <p className="mb-3">
                    <strong>Art. 8º:</strong> Após a conclusão de qualquer rodada com premiação distribuída, a estrutura de premiação para a rodada subsequente retornará imediatamente ao modelo Padrão.
                  </p>
                  <p className="mb-3">
                    <strong>Art. 9.1:</strong> Os prêmios são distribuídos em partes iguais entre os acertadores em cada uma das faixas de pontuação os quais podem solicitar imediatamente após o sorteio.
                  </p>
                  <p className="mb-3">
                    <strong>Art. 9.2:</strong> As decisões da administração da Bet Brasil sobre a interpretação destas regras são finais.
                  </p>
                  <p>
                    <strong>Art. 9.3:</strong> Este regulamento pode ser alterado a qualquer momento, com a devida comunicação aos usuários.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12">
          <Link href="/apostas">
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              🎯 Fazer Minha Aposta!
            </button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 text-sm text-slate-400">
        <p>
          <a href="https://blockchain-betbrasil.io" className="text-blue-400 hover:underline">
            voltar a página inicial
          </a>
        </p>
        <br />
        <p>
          <a href="https://blockchain-betbrasil.io" className="text-blue-400 hover:underline">
           DEUS SEJA LOUVADO.
          </a>
        </p>
        <br />
        <p>Rio de Janeiro, 17 de Outubro de 2025.</p>
      </footer>
    </div>
  );
}