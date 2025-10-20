'use client';

import { useState } from 'react';

interface PrognosticsTableProps {
  onPrognosticSelect?: (prognostic: string) => void;
  selectedPrognostics?: string[];
}

export default function PrognosticsTable({ 
  onPrognosticSelect, 
  selectedPrognostics = [] 
}: PrognosticsTableProps) {
  const handlePrognosticClick = (prognostic: string) => {
    onPrognosticSelect?.(prognostic);
  };

  const isSelected = (prognostic: string) => {
    return selectedPrognostics.includes(prognostic);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white text-center mb-2">
          Matriz Completa 25×25
        </h3>
        <p className="text-slate-400 text-center text-sm">
          625 prognósticos disponíveis - Clique para selecionar 5
        </p>
      </div>

      {/* TABELA GIGANTE 25×25 */}
      <div className="overflow-x-auto overflow-y-auto max-h-[600px] rounded-lg border border-gray-700">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr className="bg-slate-700 sticky top-0 z-10">
              <th className="px-3 py-2 text-left border border-gray-600">L/C</th>
              {Array.from({ length: 25 }, (_, index) => (
                <th key={index + 1} className="px-1 py-2 text-center text-xs border border-gray-600">
                  C{index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 25 }, (_, rowIndex) => {
              const row = rowIndex + 1;
              return (
                <tr key={row} className="even:bg-gray-800 odd:bg-gray-900/50">
                  <td className="border border-gray-700 px-3 py-1 text-sm font-semibold bg-slate-700 sticky left-0 z-5">
                    L{row}
                  </td>
                  {Array.from({ length: 25 }, (_, colIndex) => {
                    const col = colIndex + 1;
                    const prognostic = `${row}/${col}`;
                    const selected = isSelected(prognostic);
                    
                    return (
                      <td 
                        key={col}
                        onClick={() => handlePrognosticClick(prognostic)}
                        className={`
                          border border-gray-700 px-1 py-1 text-center text-xs whitespace-nowrap
                          cursor-pointer transition-all duration-200 min-w-[40px]
                          ${selected 
                            ? 'bg-emerald-500 text-white font-bold' 
                            : 'hover:bg-slate-600'
                          }
                        `}
                        title={`Prognóstico ${row}/${col}`}
                      >
                        {prognostic}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* RESUMO E PROGRESSO */}
      <div className="mt-6 space-y-4">
        <div className="text-center text-slate-300">
          {selectedPrognostics.length > 0 ? (
            <div>
              <p className="font-semibold text-emerald-400 mb-2">
                ✅ {selectedPrognostics.length} prognóstico(s) selecionado(s)
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedPrognostics.map((prog, index) => (
                  <span key={prog} className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded text-sm">
                    {index + 1}º: {prog}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-slate-500">
              👆 Clique nas células para selecionar seus 5 prognósticos
            </p>
          )}
        </div>

        {/* BARRA DE PROGRESSO */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-300">Progresso da Seleção:</span>
            <span className="text-emerald-400 font-bold">
              {selectedPrognostics.length}/5
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(selectedPrognostics.length / 5) * 100}%` }}
            ></div>
          </div>
          <p className="text-slate-400 text-sm mt-2 text-center">
            {selectedPrognostics.length === 5 
              ? '🎉 Todos os 5 prognósticos selecionados! Hora de apostar!'
              : `Selecione mais ${5 - selectedPrognostics.length} prognóstico(s)`
            }
          </p>
        </div>
      </div>
    </div>
  );
}