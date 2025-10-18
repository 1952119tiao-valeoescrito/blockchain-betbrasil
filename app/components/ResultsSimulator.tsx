// Caminho: /src/components/ResultsSimulator.tsx - VERSÃO FINAL INTEGRADA
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('SimulatorPage');
  const [lotteryNumbers, setLotteryNumbers] = useState({
    prize1: '', prize2: '', prize3: '', prize4: '', prize5: '',
  });
  
  const [results, setResults] = useState<IResult[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, prizeNum: number) => {
    if (/^\d*$/.test(e.target.value)) {
        setLotteryNumbers({
          ...lotteryNumbers,
          [`prize${prizeNum}`]: e.target.value,
        });
    }
  };

  const handleSimulate = () => {
    setResults(null);
    setErrorMessage(null);
    const allResults: IResult[] = [];
    
    for (let i = 1; i <= 5; i++) {
      const numStr = lotteryNumbers[`prize${i}` as keyof typeof lotteryNumbers];
      if (numStr && numStr.length >= 4) {
        const milharStr = numStr.slice(-4);
        let d1 = parseInt(milharStr.slice(0, 2), 10);
        let d2 = parseInt(milharStr.slice(2, 4), 10);
        if (d1 === 0) d1 = 100;
        if (d2 === 0) d2 = 100;
        const g1 = Math.floor((d1 - 1) / 4) + 1;
        const g2 = Math.floor((d2 - 1) / 4) + 1;
        allResults.push({
          prizeNum: i, milhar: milharStr, dezena1: d1, dezena2: d2,
          grupo1: g1, grupo2: g2, prognostico: `${g1}/${g2}`
        });
      }
    }
    
    if (allResults.length === 0) {
      setErrorMessage(t('error_message'));
      return;
    }
    setResults(allResults);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 w-full max-w-5xl">
      <h2 className="text-2xl font-semibold text-center text-white mb-2">{t('title')}</h2>
      <p className="text-center text-gray-300 mb-6">{t('subtitle')}</p>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          {[1, 2, 3, 4, 5].map((prizeNum) => (
            <div key={prizeNum}>
              <label htmlFor={`lottery-sim-${prizeNum}`} className="block text-sm font-medium text-gray-300 mb-1 text-center">
                {t('prize_label', { num: prizeNum })}
              </label>
              <input 
                type="text" 
                id={`lottery-sim-${prizeNum}`}
                placeholder={t('placeholder')}
                value={lotteryNumbers[`prize${prizeNum}` as keyof typeof lotteryNumbers]}
                onChange={(e) => handleInputChange(e, prizeNum)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white text-center"
                maxLength={5}
              />
            </div>
          ))}
        </div>
        
        {errorMessage && (
            <div className="mb-4 p-3 rounded-md text-center font-semibold bg-red-500/20 text-red-300">
                {errorMessage}
            </div>
        )}

        <button onClick={handleSimulate} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-colors">
          {t('simulate_button')}
        </button>
      </div>

      {results && results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-center text-white mb-4">{t('results_title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((res) => (
              <div key={res.prizeNum} className="p-4 bg-slate-900 rounded-lg text-base border border-slate-700">
                <h4 className="font-bold text-lg text-cyan-400 mb-2">{t('prize_label', { num: res.prizeNum })}:</h4>
                <div className="space-y-1">
                  <div className="flex justify-between"><span>{t('milhar_used')}:</span> <b className="text-yellow-400">{res.milhar}</b></div>
                  <hr className="border-slate-700"/>
                  <div className="flex justify-between"><span>{t('dezena1')}:</span> <b className="text-green-400">{res.dezena1}</b></div>
                  <div className="flex justify-between"><span>{t('dezena2')}:</span> <b className="text-blue-400">{res.dezena2}</b></div>
                  <hr className="border-slate-700"/>
                  <div className="flex justify-between"><span>{t('grupo1')}:</span> <b className="text-green-400">{res.grupo1}</b></div>
                  <div className="flex justify-between"><span>{t('grupo2')}:</span> <b className="text-blue-400">{res.grupo2}</b></div>
                  <hr className="border-slate-700"/>
                  <div className="text-xl mt-2 text-center">{t('final_prognostico')}: <b className="text-cyan-400">{res.prognostico}</b></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
