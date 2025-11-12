'use client';

import { useEffect, useState, useCallback } from 'react';
import { submitSelection } from './actions';

export default function HeatmapClient() {
  const [heatmap, setHeatmap] = useState({});
  const [selected, setSelected] = useState([]);
  const [socket, setSocket] = useState(null);

  // Conecta ao WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001/api/websocket'); // Ajuste a URL
    
    ws.onopen = () => {
      console.log('Conectado ao servidor de heatmap');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'heatmap_update') {
        setHeatmap(message.data);
      }
    };

    return () => ws.close();
  }, []);

  // Toggle de seleção de coordenadas
  const toggleSelection = useCallback((x, y) => {
    setSelected(prev => {
      const exists = prev.find(coord => coord.x === x && coord.y === y);
      
      if (exists) {
        return prev.filter(coord => !(coord.x === x && coord.y === y));
      } else if (prev.length < 5) {
        return [...prev, { x, y }];
      }
      
      return prev;
    });
  }, []);

  // Submeter escolhas
  const handleSubmit = async () => {
    if (selected.length !== 5) {
      alert('Selecione exatamente 5 coordenadas!');
      return;
    }

    const result = await submitSelection(selected);
    if (result.success) {
      alert('Escolhas registradas! Aguarde o resultado.');
    }
  };

  // Calcular intensidade para cor
  const getColorIntensity = (x, y) => {
    const count = heatmap[`${x}_${y}`] || 0;
    const max = Math.max(...Object.values(heatmap));
    return max > 0 ? count / max : 0;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mapa Tático - Escolha sua Estratégia</h2>
      
      {/* Heatmap Grid */}
      <div className="grid grid-cols-25 grid-rows-25 gap-1 mb-6">
        {Array.from({ length: 25 }, (_, y) => 
          Array.from({ length: 25 }, (_, x) => {
            const intensity = getColorIntensity(x + 1, y + 1);
            const isSelected = selected.some(coord => coord.x === x + 1 && coord.y === y + 1);
            
            return (
              <button
                key={`${x}-${y}`}
                className={`
                  w-6 h-6 text-xs border transition-all
                  ${isSelected 
                    ? 'border-blue-500 border-2 scale-110' 
                    : 'border-gray-300'
                  }
                `}
                style={{
                  backgroundColor: `rgba(255, ${255 - (intensity * 255)}, 0, ${0.3 + intensity * 0.7})`
                }}
                onClick={() => toggleSelection(x + 1, y + 1)}
                title={`${x + 1}/${y + 1} - ${heatmap[`${x + 1}_${y + 1}`] || 0} jogadores`}
              >
                {isSelected && '✓'}
              </button>
            );
          })
        )}
      </div>

      {/* Painel de Controle */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Suas Escolhas: {selected.length}/5</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((coord, index) => (
            <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded">
              {coord.x}/{coord.y}
            </span>
          ))}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={selected.length !== 5}
          className="bg-green-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          Confirmar Estratégia
        </button>
      </div>

      {/* Legenda */}
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>🟢 Pouco Popular (Alto Risco/Alta Recompensa)</span>
          <span>🟡 Médio Popular</span>
          <span>🔴 Muito Popular (Baixo Risco/Baixa Recompensa)</span>
        </div>
      </div>
    </div>
  );
}