'use client';

import { useState, useEffect } from 'react';
import { Calculator, RefreshCw, ExternalLink } from 'lucide-react';

// Interface dos resultados
interface IResult {
  prizeNum: number;
  milhar: string;
  dezena1: number;
  dezena2: number;
  grupo1: number;
  grupo2: number;
  prognostico: string;
}

// Props opcionais: se vierem dados da blockchain
interface ResultSimulatorProps {
  blockchainData?: {
    milhares: string[];
    grupos: number[];
    timestamp: bigint;
  } | null;
}

export default function ResultSimulator({ blockchainData }: ResultSimulatorProps) {
  const [lotteryNumbers, setLotteryNumbers] = useState({
    prize1: '', prize2: '', prize3: '', prize4: '', prize5: '',
  });
  
  const [results, setResults] = useState<IResult[] | null>(null);

  // EFEITO MÁGICO: Se vier dados da blockchain, preenche sozinho!
  useEffect(() => {
    if (blockchainData && blockchainData.milhares.length === 5) {
      const formattedResults: IResult[] = blockchainData.milhares.map((milhar, index) => {
        const milharNum = parseInt(milhar);
        let d1 = Math.floor(milharNum / 100) % 100;
        let d2 = milharNum % 100;
        if (d1 === 0) d1 = 100;
        if (d2 === 0) d2 = 100;
        const g1 = Math.floor((d1 - 1) / 4) + 1;
        const g2 = Math.floor((d2 - 1) / 4) + 1;

        return {
          prizeNum: index + 1,
          milhar: milhar, 
          dezena1: d1,
          dezena2: d2,
          grupo1: g1,
          grupo2: g2,
          prognostico: `${g1}/${g2}`
        };
      });
      setResults(formattedResults);
    }
  }, [blockchainData]);

  // Função manual
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, prizeNum: number) => {
    setLotteryNumbers({ ...lotteryNumbers, [`prize${prizeNum}`]: e.target.value });
  };

  const handleSimulate = () => {
    const allResults: IResult[] = [];
    
    for (let i = 1; i <= 5; i++) {
      const numStr = lotteryNumbers[`prize${i}` as keyof typeof lotteryNumbers];
      
      if (numStr && numStr.length >= 4) {
        const milharStr = numStr.slice(-4);
        const milharNum = parseInt(milharStr, 10);
        
        let d1 = Math.floor(milharNum / 100) % 100;
        let d2 = milharNum % 100;
        
        if (d1 === 0) d1 = 100;
        if (d2 === 0) d2 = 100;

        const g1 = Math.floor((d1 - 1) / 4) + 1;
        const g2 = Math.floor((d2 - 1) / 4) + 1;
        
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
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 relative">
      <div className="flex items-center justify-center gap-2 mb-2">
         {blockchainData ? (
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/50 flex items-center gap-1">
               <RefreshCw size={12} className="animate-spin-slow" /> DADOS DA BLOCKCHAIN (OFICIAL)
            </span>
         ) : (
            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/50">
               MODO SIMULAÇÃO
            </span>
         )}
      </div>

      <h2 className="text-2xl font-semibold text-center text-white mb-2">
        {blockchainData ? 'Último Sorteio Oficial' : 'Simulador de Resultados'}
      </h2>
      
      <p className="text-center text-gray-300 mb-4 text-sm px-4">
        {blockchainData 
          ? 'Estes são os resultados registrados no Smart Contract.' 
          : 'Insira os milhares sorteados para conferir seus prognósticos.'}
      </p>

      {/* --- 👇 O LINK PARA A CAIXA ESTÁ AQUI 👇 --- */}
      <div className="flex justify-center mb-6">
        <a 
          href="https://loterias.caixa.gov.br/Paginas/Federal.aspx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs md:text-sm bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg transition-all group"
        >
          <ExternalLink size={14} className="group-hover:scale-110 transition-transform"/>
          Conferir Resultado Oficial (Caixa/Federal)
        </a>
      </div>
      {/* --------------------------------------------- */}

      {/* SÓ MOSTRA OS INPUTS SE NÃO TIVER DADOS DA BLOCKCHAIN */}
      {!blockchainData && (
        <div className="max-w-lg mx-auto">
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
                  maxLength={5}
                  value={lotteryNumbers[`prize${prizeNum}` as keyof typeof lotteryNumbers]}
                  onChange={(e) => handleInputChange(e, prizeNum)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
          <button onClick={handleSimulate} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
            <Calculator size={18} /> Simular / Conferir
          </button>
        </div>
      )}

      {/* ÁREA DE RESULTADOS */}
      {results && results.length > 0 && (
        <div className="mt-8 border-t border-slate-700 pt-6">
          <h3 className="text-xl font-bold text-center text-white mb-4">Resultados Processados</h3>
          <div className="space-y-4">
            {results.map((res) => (
              <div key={res.prizeNum} className={`p-4 rounded-md text-base border shadow-lg ${blockchainData ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-slate-900 border-slate-700'}`}>
                <div className="flex justify-between items-center mb-2">
                    <h4 className={`font-bold text-lg ${blockchainData ? 'text-emerald-400' : 'text-cyan-400'}`}>{res.prizeNum}º Prêmio</h4>
                    <span className="text-yellow-400 text-xl font-mono tracking-wider font-bold">{res.milhar}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="bg-black/20 p-2 rounded">
                        <span className="block text-gray-400 text-xs">Dezena 1</span>
                        <span className="font-bold text-white">{res.dezena1} <span className="text-gray-500">→</span> Grp {res.grupo1}</span>
                    </div>
                    <div className="bg-black/20 p-2 rounded">
                        <span className="block text-gray-400 text-xs">Dezena 2</span>
                        <span className="font-bold text-white">{res.dezena2} <span className="text-gray-500">→</span> Grp {res.grupo2}</span>
                    </div>
                </div>
                
                <div className="text-center pt-2 border-t border-white/5">
                    <span className="text-gray-400 text-xs uppercase mr-2">Prognóstico Final:</span>
                    <b className={`${blockchainData ? 'text-emerald-400' : 'text-cyan-400'} text-lg`}>{res.prognostico}</b>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}