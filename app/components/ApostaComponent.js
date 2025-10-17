// app/components/ApostaComponent.js
'use client';
import { useState } from 'react';
import { 
  useAplicar, 
  useRodadaAtual, 
  useCoordenadasParaPrognostico,
  usePrognosticoParaCoordenadas 
} from '../hooks/useBetBrasil';
import { useAccount } from 'wagmi';

export function ApostaComponent() {
  const { address } = useAccount();
  const { aplicar, isLoading, isSuccess } = useAplicar();
  const { rodadaAtual } = useRodadaAtual();
  const { converter: coordenadasParaPrognostico, converterArray } = useCoordenadasParaPrognostico();
  const { converter: prognosticoParaCoordenadas } = usePrognosticoParaCoordenadas();
  
  // Estado para armazenar os 5 prognósticos como coordenadas {x, y}
  const [prognosticos, setPrognosticos] = useState([
    { x: 1, y: 1 }, // 1/1
    { x: 1, y: 1 }, // 1/1  
    { x: 1, y: 1 }, // 1/1
    { x: 1, y: 1 }, // 1/1
    { x: 1, y: 1 }  // 1/1
  ]);

  const handleCoordenadaChange = (index, campo, valor) => {
    const novoValor = parseInt(valor) || 1;
    
    // Validação: apenas números entre 1-25
    if (novoValor >= 1 && novoValor <= 25) {
      const novosPrognosticos = [...prognosticos];
      novosPrognosticos[index] = {
        ...novosPrognosticos[index],
        [campo]: novoValor
      };
      setPrognosticos(novosPrognosticos);
    }
  };

  const handleAposta = async () => {
    try {
      // Converte coordenadas para números únicos (1-625)
      const prognosticosNumericos = converterArray(prognosticos);
      
      await aplicar(prognosticosNumericos);
    } catch (error) {
      console.error('Erro ao fazer aposta:', error);
      alert(error.message);
    }
  };

  // Gera prognósticos aleatórios baseado na matriz 25×25
  const gerarPrognosticosAleatorios = () => {
    const novosPrognosticos = prognosticos.map(() => ({
      x: Math.floor(Math.random() * 25) + 1,
      y: Math.floor(Math.random() * 25) + 1
    }));
    setPrognosticos(novosPrognosticos);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Fazer Aposta - Matriz 25×25</h2>
      <p className="mb-2">Rodada Atual: {rodadaAtual?.toString()}</p>
      
      <div className="mb-4">
        <button 
          onClick={gerarPrognosticosAleatorios}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          🎲 Gerar Aleatório
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {prognosticos.map((prognostico, index) => {
          const numeroUnico = coordenadasParaPrognostico(prognostico.x, prognostico.y);
          
          return (
            <div key={index} className="border p-3 rounded">
              <h3 className="font-bold mb-2">Prognóstico {index + 1}</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-sm font-medium">X (1-25)</label>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={prognostico.x}
                    onChange={(e) => handleCoordenadaChange(index, 'x', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Y (1-25)</label>
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={prognostico.y}
                    onChange={(e) => handleCoordenadaChange(index, 'y', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              
              <div className="text-center text-sm bg-gray-100 p-1 rounded">
                <strong>Posição: {prognostico.x}/{prognostico.y}</strong>
                <br />
                <span className="text-xs">ID: {numeroUnico}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={handleAposta} 
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {isLoading ? 'Fazendo aposta...' : 'Fazer Aposta'}
      </button>
      
      {isSuccess && <p className="mt-2 text-green-600">✅ Aposta realizada com sucesso!</p>}
    </div>
  );
}