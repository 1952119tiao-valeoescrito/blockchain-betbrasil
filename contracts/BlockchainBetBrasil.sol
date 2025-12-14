// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
// Chainlink VRF (Sorteio)
import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
// Chainlink Automation (Robô)
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract BlockchainBetBrasil is ReentrancyGuard, VRFConsumerBaseV2Plus, AutomationCompatibleInterface {
    
    // --- CONFIGURAÇÕES ---
    uint256 public constant MAX_NUM = 25; 
    uint256 public constant MAX_APLICACOES = 10000; 
    uint256 public constant HOUSE_FEE_PERCENT = 10;
    
    // Tempos do Ciclo (Automático)
    uint256 public constant DURACAO_RODADA = 24 hours; 
    uint256 public constant JANELA_CHECKIN = 24 hours; 

    address public immutable TREASURY;

    // --- CHAINLINK VRF ---
    uint256 private immutable s_subscriptionId;
    bytes32 private immutable keyHash;
    uint32 private constant CALLBACK_GAS_LIMIT = 2500000;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    struct Aplicacao {
        address participante;
        uint8[10] prognosticos; 
        bool verificado; 
        bool pago;
        uint8 pontos;
    }

    struct Rodada {
        uint256 id;
        bool aberta;
        bool sorteada; 
        bool finalizada; 
        uint256 totalArrecadado;
        uint256 boloAcumulado; 
        uint8[10] resultado;
        uint256 requestId;
        uint256 timestampInicio;
        uint256 timestampSorteio;
        
        uint256[6] qtdVencedores; 
        uint256[6] premioPorGanhador; 
    }

    mapping(uint256 => Rodada) public rodadas;
    mapping(uint256 => Aplicacao[]) public aplicacoesDaRodada;
    mapping(uint256 => uint256) private requestToRodadaId;

    uint256 public rodadaAtualId;
    uint256 public saldoRollover; 

    event NovaAplicacao(uint256 indexed rodadaId, address indexed participante);
    event SorteioSolicitado(uint256 indexed rodadaId);
    event SorteioRealizado(uint256 indexed rodadaId, uint8[10] resultado);
    event VitoriaRegistrada(uint256 indexed rodadaId, address indexed participante, uint8 pontos);
    event CascataCalculada(uint256 indexed rodadaId, uint256 poteTotal);
    event SaqueRealizado(address indexed participante, uint256 valor);

    constructor(
        address _vrfCoordinator,
        uint256 _subscriptionId,
        bytes32 _keyHash,
        address _treasury
    ) VRFConsumerBaseV2Plus(_vrfCoordinator) {
        s_subscriptionId = _subscriptionId;
        keyHash = _keyHash;
        TREASURY = _treasury;
        
        // Inicia o jogo assim que nasce
        rodadaAtualId = 1;
        _iniciarRodada(1);
    }

    // --- 1. APLICAR (Usuário) ---
    function realizarAplicacao(uint8[10] calldata _prognosticos) external payable nonReentrant {
        Rodada storage r = rodadas[rodadaAtualId];
        require(r.aberta, "Rodada fechada/Sorteando");
        require(msg.value > 0, "Valor invalido");
        require(aplicacoesDaRodada[rodadaAtualId].length < MAX_APLICACOES, "Lotacao maxima");

        // Envia taxa imediatamente para você (Sem retenção)
        uint256 fee = (msg.value * HOUSE_FEE_PERCENT) / 100;
        payable(TREASURY).transfer(fee);
        
        r.totalArrecadado += (msg.value - fee);

        aplicacoesDaRodada[rodadaAtualId].push(Aplicacao({
            participante: msg.sender,
            prognosticos: _prognosticos,
            verificado: false,
            pago: false,
            pontos: 0
        }));

        emit NovaAplicacao(rodadaAtualId, msg.sender);
    }

    // --- CÉREBRO DA AUTOMAÇÃO (ROBÔ) ---
    // A Chainlink fica monitorando essa função a cada bloco para saber se precisa agir.
    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory performData) {
        Rodada storage r = rodadas[rodadaAtualId];
        
        // Gatilho 1: Passou 24h do início? -> Fechar e Sortear
        bool horaDeSortear = r.aberta && (block.timestamp > r.timestampInicio + DURACAO_RODADA);
        
        // Gatilho 2: Passou 24h do Sorteio (Check-in)? -> Calcular Cascata e Pagar
        bool horaDeFinalizar = r.sorteada && !r.finalizada && (block.timestamp > r.timestampSorteio + JANELA_CHECKIN);

        upkeepNeeded = horaDeSortear || horaDeFinalizar;
        
        if (horaDeSortear) {
            performData = abi.encode(1); // Código 1 = Sortear
        } else if (horaDeFinalizar) {
            performData = abi.encode(2); // Código 2 = Finalizar
        }
    }

    // A Chainlink chama essa função quando o checkUpkeep diz "SIM"
    function performUpkeep(bytes calldata performData) external override {
        uint8 action = abi.decode(performData, (uint8));
        
        if (action == 1) {
            _encerrarRodadaInternal();
        } else if (action == 2) {
            _finalizarCascataInternal();
        }
        // Nota: Não tem onlyOwner. O Robô é quem chama.
    }

    // --- AÇÕES INTERNAS (Executadas pelo Robô) ---

    function _encerrarRodadaInternal() internal {
        Rodada storage r = rodadas[rodadaAtualId];
        // Proteção para o robô não chamar duas vezes
        if (!r.aberta) return; 
        
        r.aberta = false;

        // Chama o VRF (Sorteio)
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: CALLBACK_GAS_LIMIT,
                numWords: NUM_WORDS,
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
            })
        );
        r.requestId = requestId;
        requestToRodadaId[requestId] = rodadaAtualId;
        emit SorteioSolicitado(rodadaAtualId);
    }

    function _finalizarCascataInternal() internal {
        Rodada storage r = rodadas[rodadaAtualId];
        // Proteção
        if (!r.sorteada || r.finalizada) return;

        uint256 poteTotal = r.totalArrecadado + r.boloAcumulado;
        
        // Matemática da Distribuição (50, 20, 15, 10, 5)
        uint256[6] memory potes;
        potes[5] = (poteTotal * 50) / 100; 
        potes[4] = (poteTotal * 20) / 100; 
        potes[3] = (poteTotal * 15) / 100; 
        potes[2] = (poteTotal * 10) / 100; 
        potes[1] = (poteTotal * 5) / 100;  

        // Lógica de Cascata
        if (r.qtdVencedores[5] == 0) { potes[4] += potes[5]; potes[5] = 0; }
        if (r.qtdVencedores[4] == 0) { potes[3] += potes[4]; potes[4] = 0; }
        if (r.qtdVencedores[3] == 0) { potes[2] += potes[3]; potes[3] = 0; }
        if (r.qtdVencedores[2] == 0) { potes[1] += potes[2]; potes[2] = 0; }
        
        // Rollover (Acumula para a próxima se ninguém ganhar nada)
        if (r.qtdVencedores[1] == 0) {
            saldoRollover = potes[1];
        } else {
            saldoRollover = 0;
            // Calcula valor por pessoa
            for(uint i=1; i<=5; i++) {
                if (r.qtdVencedores[i] > 0) {
                    r.premioPorGanhador[i] = potes[i] / r.qtdVencedores[i];
                }
            }
        }

        r.finalizada = true;
        emit CascataCalculada(rodadaAtualId, poteTotal);
        
        // Inicia o próximo ciclo imediatamente
        rodadaAtualId++;
        _iniciarRodada(rodadaAtualId);
    }

    // --- RECEBIMENTO DO RESULTADO (VRF) ---
    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        uint256 id = requestToRodadaId[requestId];
        Rodada storage r = rodadas[id];
        
        // Gera Matriz (Com repetição)
        for(uint256 i=0; i<10; i++) {
            r.resultado[i] = uint8((uint256(keccak256(abi.encode(randomWords[0], i))) % MAX_NUM) + 1);
        }
        r.sorteada = true;
        r.timestampSorteio = block.timestamp;
        emit SorteioRealizado(id, r.resultado);
    }

    // --- CHECK-IN (Otimização de Gás - Usuário Chama) ---
    function verificarAplicacao(uint256 _rodadaId, uint256 _indiceApp) external nonReentrant {
        Rodada storage r = rodadas[_rodadaId];
        require(r.sorteada, "Sorteio pendente");
        require(!r.finalizada, "Janela de check-in fechada");
        
        Aplicacao storage a = aplicacoesDaRodada[_rodadaId][_indiceApp];
        require(a.participante == msg.sender, "Nao e sua aplicacao"); // Segurança
        require(!a.verificado, "Ja verificado");

        uint8 pts = _calcularPontos(a.prognosticos, r.resultado);
        a.pontos = pts;
        a.verificado = true;

        // Se pontuou, entra na contagem para a Cascata
        if (pts >= 1 && pts <= 5) {
            r.qtdVencedores[pts]++;
            emit VitoriaRegistrada(_rodadaId, msg.sender, pts);
        }
    }

    // --- SAQUE (Usuário Chama) ---
    function sacarRendimento(uint256 _rodadaId, uint256 _indiceApp) external nonReentrant {
        Rodada storage r = rodadas[_rodadaId];
        require(r.finalizada, "Aguarde o calculo final");

        Aplicacao storage a = aplicacoesDaRodada[_rodadaId][_indiceApp];
        require(a.participante == msg.sender, "Nao e dono");
        require(a.verificado, "Faca o check-in antes");
        require(!a.pago, "Ja pago");
        require(a.pontos > 0, "Nao premiado");

        uint256 valor = r.premioPorGanhador[a.pontos];
        require(valor > 0, "Sem rendimento na faixa");
        require(address(this).balance >= valor, "Erro saldo contrato");

        a.pago = true;
        payable(msg.sender).transfer(valor);
        emit SaqueRealizado(msg.sender, valor);
    }

    // --- AUXILIARES ---
    function _iniciarRodada(uint256 _id) internal {
        rodadas[_id].id = _id;
        rodadas[_id].aberta = true;
        rodadas[_id].boloAcumulado = saldoRollover;
        rodadas[_id].timestampInicio = block.timestamp;
    }

    function _calcularPontos(uint8[10] memory _aposta, uint8[10] memory _resultado) internal pure returns (uint8) {
        uint8 paresAcertados = 0;
        // Compara os 5 Pares
        for(uint i=0; i<5; i++) {
            uint256 idxX = i * 2;
            uint256 idxY = idxX + 1;
            if (_aposta[idxX] == _resultado[idxX] && _aposta[idxY] == _resultado[idxY]) {
                paresAcertados++;
            }
        }
        return paresAcertados;
    }

    // Helper para o site listar
    function getAplicacoesUsuario(uint256 _rodadaId, address _user) external view returns (Aplicacao[] memory, uint256[] memory) {
        uint256 total = aplicacoesDaRodada[_rodadaId].length;
        uint256 count = 0;
        for (uint256 i = 0; i < total; i++) {
            if (aplicacoesDaRodada[_rodadaId][i].participante == _user) count++;
        }
        
        Aplicacao[] memory lista = new Aplicacao[](count);
        uint256[] memory indices = new uint256[](count);
        uint256 u = 0;
        for (uint256 i = 0; i < total; i++) {
            if (aplicacoesDaRodada[_rodadaId][i].participante == _user) {
                lista[u] = aplicacoesDaRodada[_rodadaId][i];
                indices[u] = i; 
                u++;
            }
        }
        return (lista, indices);
    }

    receive() external payable {}
}