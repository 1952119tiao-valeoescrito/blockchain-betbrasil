import { useContract, useContractRead, useContractWrite } from 'wagmi';
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from '../config/contracts';

export function useBetBrasil() {
  return useContract({
    address: CONTRACT_ADDRESSES.betBrasil,
    abi: CONTRACT_ABIS.betBrasil,
  });
}

// Hook para fazer aplicações (apostas)
export function useAplicar() {
  const { write, data, isLoading, isError, isSuccess } = useContractWrite({
    address: CONTRACT_ADDRESSES.betBrasil,
    abi: CONTRACT_ABIS.betBrasil,
    functionName: 'aplicar',
  });

  return {
    aplicar: (prognosticos) => {
      // Validação: deve ser array de 5 números representando coordenadas únicas
      if (!Array.isArray(prognosticos) || prognosticos.length !== 5) {
        throw new Error('Deve fornecer exatamente 5 prognósticos');
      }
      
      // Cada prognóstico deve ser um número entre 1 e 625 (25×25)
      const prognosticosValidos = prognosticos.every(p => 
        Number.isInteger(p) && p >= 1 && p <= 625
      );
      
      if (!prognosticosValidos) {
        throw new Error('Cada prognóstico deve representar uma posição válida na matriz 25×25 (1-625)');
      }

      write({ args: [prognosticos] });
    },
    isLoading,
    isError,
    isSuccess,
    transactionHash: data?.hash,
  };
}

// Hook para converter coordenadas x/y para número único
export function useCoordenadasParaPrognostico() {
  const converter = (x, y) => {
    // Converte coordenadas (x=1-25, y=1-25) para número único (1-625)
    if (x < 1 || x > 25 || y < 1 || y > 25) {
      throw new Error('Coordenadas X e Y devem estar entre 1 e 25');
    }
    return (x - 1) * 25 + y;
  };

  const converterArray = (coordenadasArray) => {
    return coordenadasArray.map(coord => converter(coord.x, coord.y));
  };

  return { converter, converterArray };
}

// Hook para converter número único para coordenadas x/y
export function usePrognosticoParaCoordenadas() {
  const converter = (prognostico) => {
    if (prognostico < 1 || prognostico > 625) {
      throw new Error('Prognóstico deve estar entre 1 e 625');
    }
    
    const x = Math.floor((prognostico - 1) / 25) + 1;
    const y = ((prognostico - 1) % 25) + 1;
    
    return { 
      x, 
      y, 
      formato: `${x}/${y}`,
      descricao: `Posição ${x}/${y} na matriz`
    };
  };

  return { converter };
}

// Hook para ler dados da rodada atual
export function useRodadaAtual() {
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESSES.betBrasil,
    abi: CONTRACT_ABIS.betBrasil,
    functionName: 'rodadaAtualId',
    watch: true,
  });

  return {
    rodadaAtual: data,
    isLoading,
    isError,
  };
}

// Hook para verificar status do jogador
export function useStatusJogador(endereco) {
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESSES.betBrasil,
    abi: CONTRACT_ABIS.betBrasil,
    functionName: 'getStatusJogador',
    args: [endereco],
    watch: true,
  });

  return {
    status: data,
    isLoading,
    isError,
  };
}