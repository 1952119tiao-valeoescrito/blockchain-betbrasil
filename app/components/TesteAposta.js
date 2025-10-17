// app/components/TesteAposta.js

'use client';
import { useState } from 'react';
import { 
  useAplicar, 
  useRodadaAtual,
  useCoordenadasParaPrognostico 
} from '../hooks/useBetBrasil';
import { useAccount } from 'wagmi';

export default function TesteAposta() {
  const { address, isConnected } = useAccount();
  const { aplicar, isLoading, isSuccess, isError } = useAplicar();
  const { rodadaAtual } = useRodadaAtual();
  const { converter: coordenadasParaPrognostico, converterArray } = useCoordenadasParaPrognostico();
  
  const [prognosticos, setPrognosticos] = useState([
    { x: 13, y: 7 },
    { x: 5, y: 19 },
    { x: 22, y: 3 },
    { x: 8, y: 14 },
    { x: 25, y: 25 }
  ]);

  const handleAposta = async () => {
    try {
      console.log('Fazendo aposta com prognósticos:', prognosticos);
      const prognosticosNumericos = converterArray(prognosticos);
      await aplicar(prognosticosNumericos);
    } catch (error) {
      console.error('Erro ao fazer aposta:', error);
    }
  };

  if (!isConnected) {
    return <div>Conecte sua carteira</div>;
  }

  return (
    <div>
      <h2>Teste de Aposta</h2>
      <p>Rodada Atual: {rodadaAtual?.toString()}</p>
      <button onClick={handleAposta} disabled={isLoading}>
        {isLoading ? 'Fazendo aposta...' : 'Fazer Aposta'}
      </button>
      {isSuccess && <p>✅ Aposta realizada com sucesso!</p>}
      {isError && <p>❌ Erro ao fazer aposta</p>}
    </div>
  );
}