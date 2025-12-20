// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract BlockchainBetBrasil is ReentrancyGuard, VRFConsumerBaseV2Plus, AutomationCompatibleInterface {
    
    // --- CONFIGURAÇÕES ---
    uint256 public constant MAX_NUM = 25; 
    uint256 public constant MAX_APLICACOES = 10000; 
    uint256 public constant HOUSE_FEE_PERCENT = 10;
    
    // --- CRONOGRAMA SEMANAL (Sábado a Sábado) ---
    uint256 public constant DURACAO_RODADA = 142 hours; // Fecha Sexta
    uint256 public constant JANELA_CHECKIN = 24 hours;  // Paga Sábado (antes da nova)
    uint256 public constant CICLO_TOTAL = 168 hours;    // Reinicia Sábado (7 dias exatos)

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
    event NovaRodadaIniciada(uint256 indexed rodadaId, uint256 timestamp);
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
        
        // Inicia o Jogo (Rodada 1)
        rodadaAtualId = 1;
        _iniciarRodada(1);
    }

    // --- 1. APLICAR ---
    function realizarAplicacao(uint8[10] calldata _prognosticos) external payable nonReentrant {
        Rodada storage r = rodadas[rodadaAtualId];
        require(r.aberta, "Rodada fechada/Intervalo");
        require(msg.value > 0, "Valor invalido");
        require(aplicacoesDaRodada[rodadaAtualId].length < MAX_APLICACOES, "Lotacao maxima");

        for(uint i=0; i<10; i++){
            require(_prognosticos[i] >= 1 && _prognosticos[i] <= MAX_NUM, "Prognostico invalido");
        }

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
    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        Rodada storage r = rodadas[rodadaAtualId];
        
        // Ação 1: Fechar Rodada (142h após início)
        bool horaDeSortear = r.aberta && (block.timestamp > r.timestampInicio + DURACAO_RODADA);
        
        // Ação 2: Pagar Cascata (24h após sorteio)
        bool horaDeFinalizar = r.sorteada && !r.finalizada && (block.timestamp > r.timestampSorteio + JANELA_CHECKIN);

        // Ação 3: Iniciar Nova Rodada (168h após início da anterior)
        // Só abre a nova se a anterior já estiver paga/finalizada
        bool horaDeReiniciar = !r.aberta && r.finalizada && (block.timestamp > r.timestampInicio + CICLO_TOTAL);

        upkeepNeeded = horaDeSortear || horaDeFinalizar || horaDeReiniciar;
        
        if (horaDeSortear) performData = abi.encode(1);
        else if (horaDeFinalizar) performData = abi.encode(2);
        else if (horaDeReiniciar) performData = abi.encode(3);
    }

    function performUpkeep(bytes calldata performData) external override {
        uint8 action = abi.decode(performData, (uint8));
        if (action == 1) _encerrarRodadaInternal();
        else if (action == 2) _finalizarCascataInternal();
        else if (action == 3) _abrirNovaRodadaInternal();
    }

    // --- AÇÕES INTERNAS ---

    function _encerrarRodadaInternal() internal {
        Rodada storage r = rodadas[rodadaAtualId];
        if (!r.aberta) return; 
        r.aberta = false;

        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: CALLBACK_GAS_LIMIT,
                numWords: NUM_WORDS,
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: true}))
            })
        );
        r.requestId = requestId;
        requestToRodadaId[requestId] = rodadaAtualId;
        emit SorteioSolicitado(rodadaAtualId);
    }

    function _finalizarCascataInternal() internal {
        Rodada storage r = rodadas[rodadaAtualId];
        if (!r.sorteada || r.finalizada) return;

        uint256 poteTotal = r.totalArrecadado + r.boloAcumulado;
        uint256[6] memory potes;
        potes[5] = (poteTotal * 50) / 100; 
        potes[4] = (poteTotal * 20) / 100; 
        potes[3] = (poteTotal * 15) / 100; 
        potes[2] = (poteTotal * 10) / 100; 
        potes[1] = (poteTotal * 5) / 100;  

        if (r.qtdVencedores[5] == 0) { potes[4] += potes[5]; potes[5] = 0; }
        if (r.qtdVencedores[4] == 0) { potes[3] += potes[4]; potes[4] = 0; }
        if (r.qtdVencedores[3] == 0) { potes[2] += potes[3]; potes[3] = 0; }
        if (r.qtdVencedores[2] == 0) { potes[1] += potes[2]; potes[2] = 0; }
        
        if (r.qtdVencedores[1] == 0) saldoRollover = potes[1];
        else {
            saldoRollover = 0;
            for(uint i=1; i<=5; i++) {
                if (r.qtdVencedores[i] > 0) r.premioPorGanhador[i] = potes[i] / r.qtdVencedores[i];
            }
        }
        r.finalizada = true;
        emit CascataCalculada(rodadaAtualId, poteTotal);
        
        // NOTA: Removemos o início automático aqui para respeitar o intervalo de 168h
    }

    function _abrirNovaRodadaInternal() internal {
        // Proteção: Só abre se a próxima ainda não existir
        if (rodadas[rodadaAtualId + 1].id != 0) return;

        rodadaAtualId++;
        _iniciarRodada(rodadaAtualId);
        emit NovaRodadaIniciada(rodadaAtualId, block.timestamp);
    }

    // --- AUXILIARES (VRF, Check-in, Saque) ---

    function fulfillRandomWords(uint256 requestId, uint256[] calldata randomWords) internal override {
        uint256 id = requestToRodadaId[requestId];
        Rodada storage r = rodadas[id];
        for(uint256 i=0; i<10; i++) {
            r.resultado[i] = uint8((uint256(keccak256(abi.encode(randomWords[0], i))) % MAX_NUM) + 1);
        }
        r.sorteada = true;
        r.timestampSorteio = block.timestamp;
        emit SorteioRealizado(id, r.resultado);
    }

    function verificarAplicacao(uint256 _rodadaId, uint256 _indiceApp) external nonReentrant {
        Rodada storage r = rodadas[_rodadaId];
        require(r.sorteada && !r.finalizada, "Fora da janela de check-in"); 
        Aplicacao storage a = aplicacoesDaRodada[_rodadaId][_indiceApp];
        require(a.participante == msg.sender && !a.verificado, "Erro verificacao");

        uint8 pts = _calcularPontos(a.prognosticos, r.resultado);
        a.pontos = pts;
        a.verificado = true;
        if (pts >= 1 && pts <= 5) {
            r.qtdVencedores[pts]++;
            emit VitoriaRegistrada(_rodadaId, msg.sender, pts);
        }
    }

    function sacarRendimento(uint256 _rodadaId, uint256 _indiceApp) external nonReentrant {
        Rodada storage r = rodadas[_rodadaId];
        require(r.finalizada, "Aguarde finalizacao");
        Aplicacao storage a = aplicacoesDaRodada[_rodadaId][_indiceApp];
        require(a.participante == msg.sender && a.verificado && !a.pago && a.pontos > 0, "Erro saque");

        uint256 valor = r.premioPorGanhador[a.pontos];
        require(valor > 0 && address(this).balance >= valor, "Erro saldo");
        a.pago = true;
        payable(msg.sender).transfer(valor);
        emit SaqueRealizado(msg.sender, valor);
    }

    function _iniciarRodada(uint256 _id) internal {
        rodadas[_id].id = _id;
        rodadas[_id].aberta = true;
        rodadas[_id].boloAcumulado = saldoRollover;
        rodadas[_id].timestampInicio = block.timestamp;
    }

    function _calcularPontos(uint8[10] memory _aposta, uint8[10] memory _resultado) internal pure returns (uint8) {
        uint8 paresAcertados = 0;
        for(uint i=0; i<5; i++) {
            uint256 idxX = i * 2;
            uint256 idxY = idxX + 1;
            if (_aposta[idxX] == _resultado[idxX] && _aposta[idxY] == _resultado[idxY]) paresAcertados++;
        }
        return paresAcertados;
    }

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