// backend/rodadaService.js
class RodadaService {
    // Verificar e aplicar limite
    async verificarAplicacao(userAddress, rodadaId) {
        const contrato = await this.getContrato();
        const [aplicacoesFeitas, limiteRestante] = await contrato.getLimiteAplicacoesUsuario(userAddress);
        
        if (limiteRestante === 0) {
            throw new Error('Limite de 5 aplicações por rodada atingido');
        }
        
        return { aplicacoesFeitas, limiteRestante };
    }

    // Sistema automático baseado no countdown
    async verificarHorarios() {
        const agora = new Date();
        const diaSemana = agora.getDay(); // 0=Domingo, 5=Sexta, 6=Sábado
        const hora = agora.getHours();
        const minuto = agora.getMinutes();

        // Sexta 17:30 - Fechar rodada
        if (diaSemana === 5 && hora === 17 && minuto >= 30) {
            await this.fecharRodadaAtual();
        }
        
        // Sábado 21:00 - Abrir nova rodada
        if (diaSemana === 6 && hora === 21 && minuto >= 0) {
            await this.abrirNovaRodada();
        }
    }
}