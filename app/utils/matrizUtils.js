// app/utils/matrizUtils.js
export class Matriz25x25 {
  // Converte coordenadas (x,y) para número único (1-625)
  static coordenadasParaNumero(x, y) {
    if (x < 1 || x > 25 || y < 1 || y > 25) {
      throw new Error('Coordenadas X e Y devem estar entre 1 e 25');
    }
    return (x - 1) * 25 + y;
  }

  // Converte número único (1-625) para coordenadas (x,y)
  static numeroParaCoordenadas(numero) {
    if (numero < 1 || numero > 625) {
      throw new Error('Número deve estar entre 1 e 625');
    }
    
    const x = Math.floor((numero - 1) / 25) + 1;
    const y = ((numero - 1) % 25) + 1;
    
    return { 
      x, 
      y, 
      formato: `${x}/${y}`,
      descricao: `Posição ${x}/${y} na matriz 25×25`
    };
  }

  // Gera um prognóstico aleatório (x,y)
  static gerarPrognosticoAleatorio() {
    const x = Math.floor(Math.random() * 25) + 1;
    const y = Math.floor(Math.random() * 25) + 1;
    return {
      x,
      y,
      numero: this.coordenadasParaNumero(x, y),
      formato: `${x}/${y}`
    };
  }

  // Gera múltiplos prognósticos aleatórios
  static gerarPrognosticosAleatorios(quantidade = 5) {
    return Array.from({ length: quantidade }, () => this.gerarPrognosticoAleatorio());
  }

  // Valida se um array de prognósticos é válido
  static validarPrognosticos(prognosticos) {
    if (!Array.isArray(prognosticos) || prognosticos.length !== 5) {
      return false;
    }
    
    return prognosticos.every(p => 
      Number.isInteger(p) && p >= 1 && p <= 625
    );
  }

  // Converte array de coordenadas para array de números
  static converterCoordenadasParaNumeros(coordenadasArray) {
    return coordenadasArray.map(coord => this.coordenadasParaNumero(coord.x, coord.y));
  }
}