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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 5 linhas por página

  const totalPages = 5; // 25 linhas / 5 por página

  const handlePrognosticClick = (prognostic: string) => {
    onPrognosticSelect?.(prognostic);
  };

  const isSelected = (prognostic: string) => {
    return selectedPrognostics.includes(prognostic);
  };

  const renderTablePage = () => {
    const startRow = (currentPage - 1) * itemsPerPage + 1;
    const endRow = startRow + itemsPerPage - 1;

    return (
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full bg-gray-800 text-white">
          <tbody>
            {Array.from({ length: itemsPerPage }, (_, rowIndex) => {
              const row = startRow + rowIndex;
              return (
                <tr key={row} className="even:bg-gray-800 odd:bg-gray-900/50">
                  {Array.from({ length: 25 }, (_, colIndex) => {
                    const col = colIndex + 1;
                    const prognostic = `${row}/${col}`;
                    const selected = isSelected(prognostic);
                    
                    return (
                      <td 
                        key={col}
                        onClick={() => handlePrognosticClick(prognostic)}
                        className={`
                          border-t border-gray-700 px-2 py-1 text-center text-xs md:text-sm whitespace-nowrap
                          cursor-pointer transition-colors
                          ${selected 
                            ? 'bg-emerald-500 text-white' 
                            : 'hover:bg-slate-700'
                          }
                        `}
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
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          Página {currentPage} de {totalPages}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-slate-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-slate-700 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
      
      {renderTablePage()}
      
      <div className="mt-4 text-center text-slate-400 text-sm">
        {selectedPrognostics.length > 0 && (
          <p>Prognósticos selecionados: {selectedPrognostics.join(', ')}</p>
        )}
      </div>
    </div>
  );
}