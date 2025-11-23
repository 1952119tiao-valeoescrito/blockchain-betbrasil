// src/components/ResultSimulator.tsx

'use client';

import { useState } from 'react';

// A interface para guardar os resultados, agora com o número do prêmio
interface IResult {
  prizeNum: number;
  milhar: string;
  dezena1: number;
  dezena2: number;
  grupo1: number;
  grupo2: number;
  prognostico: string;
}

export default function ResultSimulator() {
  // Estado para guardar os 5 números da loteria
  const [lotteryNumbers, setLotteryNumbers] = useState({
    prize1: '', prize2: '', prize3: '', prize4: '', prize5: '',
  });
  
  // Estado para guardar um ARRAY de resultados
  const [results, setResults] = useState<IResult[] | null>(null);

  // Função para atualizar o estado quando o usuário digita em um dos campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, prizeNum: number) => {
    setLotteryNumbers({
      ...lotteryNumbers,
      [`prize${prizeNum}`]: e.target.value,
    });
  };

  const handleSimulate = () => {
    const allResults: IResult[] = [];
    
    // Loop que passa por cada um dos 5 prêmios
    for (let i = 1; i <= 5; i++) {
      const numStr = lotteryNumbers[`prize${i}` as keyof typeof lotteryNumbers];
      
      // Só processa se o campo tiver pelo menos 4 dígitos
      if (numStr && numStr.length >= 4) {
        const milharStr = numStr.slice(-4);
        const milharNum = parseInt(milharStr, 10);
        
        let d1 = Math.floor(milharNum / 100) % 100;
        let d2 = milharNum % 100;
        
        if (d1 === 0) d1 = 100;
        if (d2 === 0) d2 = 100;

        const g1 = Math.floor((d1 - 1) / 4) + 1;
        const g2 = Math.floor((d2 - 1) / 4) + 1;
        
        // Adiciona o resultado processado ao nosso array
        allResults.push({
          prizeNum: i,
          milhar: milharStr,
          dezena1: d1,
          dezena2: d2,
          grupo1: g1,
          grupo2: g2,
          prognostico: `${g1}/${g2}`
        });
      }
    }
    
    if (allResults.length === 0) {
      alert('Por favor, preencha ao menos um campo com um número de 4 ou 5 dígitos.');
      return;
    }

    setResults(allResults);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h2 className="text-2xl font-semibold text-center text-white mb-2">Simulador de Resultados</h2>
      <p className="text-center text-gray-300 mb-6">
        Tire a prova você mesmo! Insira os milhares sorteados, do 1º ao 5º prêmio, e veja a conversão.
      </p>
      
      <div className="max-w-lg mx-auto">
        {/* Formulário com 5 campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((prizeNum) => (
            <div key={prizeNum}>
              <label htmlFor={`lottery-sim-${prizeNum}`} className="block text-sm font-medium text-gray-300 mb-1">
                Número do {prizeNum}º Prêmio
              </label>
              <input 
                type="text" 
                id={`lottery-sim-${prizeNum}`}
                placeholder="Ex: 95467"
                value={lotteryNumbers[`prize${prizeNum}` as keyof typeof lotteryNumbers]}
                onChange={(e) => handleInputChange(e, prizeNum)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white"
              />
            </div>
          ))}
        </div>
        <button onClick={handleSimulate} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md">
          Simular
        </button>
      </div>

      {/* Área de Resultados */}
      {results && results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-center text-white mb-4">Resultados da Simulação</h3>
          <div className="space-y-4">
            {/* Mapeia e exibe o resultado para cada prêmio simulado */}
            {results.map((res) => (
              <div key={res.prizeNum} className="p-4 bg-slate-900 rounded-md text-base">
                <h4 className="font-bold text-lg text-cyan-400 mb-2">{res.prizeNum}º Prêmio:</h4>
                <p>Milhar Utilizado: <b className="text-yellow-400 float-right">{res.milhar}</b></p>
                <hr className="border-slate-700 my-1"/>
                <p>Dezena 1: <b className="text-green-400 float-right">{res.dezena1}</b></p>
                <p>Dezena 2: <b className="text-blue-400 float-right">{res.dezena2}</b></p>
                <hr className="border-slate-700 my-1"/>
                <p>Grupo 1 (da Dezena 1): <b className="text-green-400 float-right">{res.grupo1}</b></p>
                <p>Grupo 2 (da Dezena 2): <b className="text-blue-400 float-right">{res.grupo2}</b></p>
                <hr className="border-slate-700 my-1"/>
                <p className="text-xl mt-2 text-center">Prognóstico Final: <b className="text-cyan-400">{res.prognostico}</b></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}