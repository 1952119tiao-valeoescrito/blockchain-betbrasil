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
    
    // --- CICLO SEMANAL (Baseado no Deploy de Domingo 21h) ---
    uint256 public constant DURACAO_RODADA = 142 hours; 
    uint256 public constant JANELA_CHECKIN = 24 hours; 
    uint256 public constant CICLO_TOTAL = 168 hours;

    // Valores de Entrada (Em Wei/ETH)
    uint256 public constant VALOR_BASIC_MIN = 0.0002 ether; // Aprox R$ 4-5
    uint256 public constant VALOR_PRO_MIN = 0.04 ether;     // Aprox R$ 800-1000

    address public immutable TREASURY;

    // Chainlink VRF
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
        bool isPro; // True = Pote Pro, False = Pote Básico
    }

    struct Rodada {
        uint256 id;
        bool aberta;
        bool sorteada; 
        bool finalizada; 
        uint8[10] resultado;
        uint256 requestId;
        uint256 timestampInicio;
        uint256 timestampSorteio;
        
        // --- POTE BÁSICO ---
        uint256 totalBasic;      
        uint256 boloBasic;       
        uint256[6] qtdVencedoresBasic; 
        uint256[6] premioPorGanhadorBasic; 

        // --- POTE PRO ---
        uint256 totalPro;        
        uint256 boloPro;         
        uint256[6] qtdVencedoresPro; 
        uint256[6] premioPorGanhadorPro;
    }

    mapping(uint256 => Rodada) public rodadas;
    mapping(uint256 => Aplicacao[]) public aplicacoesDaRodada;
    mapping(uint256 => uint256) private requestToRodadaId;

    uint256 public rodadaAtualId;
    
    // Rollovers separados
    uint256 public saldoRolloverBasic; 
    uint256 public saldoRolloverPro;

    event NovaAplicacao(uint256 indexed rodadaId, address indexed participante, bool isPro);
    event SorteioSolicitado(uint256 indexed rodadaId);
    event SorteioRealizado(uint256 indexed rodadaId, uint8[10] resultado);
    event VitoriaRegistrada(uint256 indexed rodadaId, address indexed participante, uint8 pontos, bool isPro);
    event CascataCalculada(uint256 indexed rodadaId, uint256 poteBasic, uint256 potePro);
    event NovaRodadaIniciada(uint256 indexed rodadaId, uint256 timestamp);
    event SaqueRealizado(address indexed participante, uint256 valor);

    constructor(address _vrf, uint256 _subId, bytes32 _keyHash, address _treasury) VRFConsumerBaseV2Plus(_vrf) {
        s_subscriptionId = _subId;
        keyHash = _keyHash;
        TREASURY = _treasury;
        rodadaAtualId = 1;
        _iniciarRodada(1);
    }

    function realizarAplicacao(uint8[10] calldata _prognosticos) external payable nonReentrant {
        Rodada storage r = rodadas[rodadaAtualId];
        require(r.aberta, "Rodada fechada");
        require(aplicacoesDaRodada[rodadaAtualId].length < MAX_APLICACOES, "Lotacao maxima");

        for(uint i=0; i<10; i++){
            require(_prognosticos[i] >= 1 && _prognosticos[i] <= MAX_NUM, "Prognostico invalido");
        }

        bool isPro = false;
        if (msg.value >= VALOR_PRO_MIN) {
            isPro = true;
        } else {
            require(msg.value >= VALOR_BASIC_MIN, "Valor insuficiente");
        }

        uint256 fee = (msg.value * HOUSE_FEE_PERCENT) / 100;
        payable(TREASURY).transfer(fee);
        
        if (isPro) r.totalPro += (msg.value - fee);
        else r.totalBasic += (msg.value - fee);

        aplicacoesDaRodada[rodadaAtualId].push(Aplicacao({
            participante: msg.sender,
            prognosticos: _prognosticos,
            verificado: false,
            pago: false,
            pontos: 0,
            isPro: isPro
        }));

        emit NovaAplicacao(rodadaAtualId, msg.sender, isPro);
    }

    // --- AUTOMAÇÃO ---
    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        Rodada storage r = rodadas[rodadaAtualId];
        bool horaDeSortear = r.aberta && (block.timestamp > r.timestampInicio + DURACAO_RODADA);
        bool horaDeFinalizar = r.sorteada && !r.finalizada && (block.timestamp > r.timestampSorteio + JANELA_CHECKIN);
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

        uint256 poteTotalBasic = r.totalBasic + r.boloBasic;
        _calcularDistribuicao(poteTotalBasic, r.qtdVencedoresBasic, r.premioPorGanhadorBasic, true);

        uint256 poteTotalPro = r.totalPro + r.boloPro;
        _calcularDistribuicao(poteTotalPro, r.qtdVencedoresPro, r.premioPorGanhadorPro, false);

        r.finalizada = true;
        emit CascataCalculada(rodadaAtualId, poteTotalBasic, poteTotalPro);
    }

    function _calcularDistribuicao(uint256 total, uint256[6] storage vencedores, uint256[6] storage premios, bool isBasic) internal {
        if (total == 0) return;

        uint256[6] memory fatias;
        fatias[5] = (total * 50) / 100; 
        fatias[4] = (total * 20) / 100; 
        fatias[3] = (total * 15) / 100; 
        fatias[2] = (total * 10) / 100; 
        fatias[1] = (total * 5) / 100;  

        if (vencedores[5] == 0) { fatias[4] += fatias[5]; fatias[5] = 0; }
        if (vencedores[4] == 0) { fatias[3] += fatias[4]; fatias[4] = 0; }
        if (vencedores[3] == 0) { fatias[2] += fatias[3]; fatias[3] = 0; }
        if (vencedores[2] == 0) { fatias[1] += fatias[2]; fatias[2] = 0; }
        
        if (vencedores[1] == 0) {
            if (isBasic) saldoRolloverBasic = fatias[1];
            else saldoRolloverPro = fatias[1];
        } else {
            if (isBasic) saldoRolloverBasic = 0;
            else saldoRolloverPro = 0;

            for(uint i=1; i<=5; i++) {
                if (vencedores[i] > 0) premios[i] = fatias[i] / vencedores[i];
            }
        }
    }

    function _abrirNovaRodadaInternal() internal {
        if (rodadas[rodadaAtualId + 1].id != 0) return;
        rodadaAtualId++;
        _iniciarRodada(rodadaAtualId);
        emit NovaRodadaIniciada(rodadaAtualId, block.timestamp);
    }

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
        require(r.sorteada && !r.finalizada, "Fora de hora");
        Aplicacao storage a = aplicacoesDaRodada[_rodadaId][_indiceApp];
        require(a.participante == msg.sender && !a.verificado, "Erro verificacao");

        uint8 pts = _calcularPontos(a.prognosticos, r.resultado);
        a.pontos = pts;
        a.verificado = true;

        if (pts >= 1 && pts <= 5) {
            if (a.isPro) r.qtdVencedoresPro[pts]++;
            else r.qtdVencedoresBasic[pts]++;
            emit VitoriaRegistrada(_rodadaId, msg.sender, pts, a.isPro);
        }
    }

    function sacarRendimento(uint256 _rodadaId, uint256 _indiceApp) external nonReentrant {
        Rodada storage r = rodadas[_rodadaId];
        require(r.finalizada, "Aguarde");
        Aplicacao storage a = aplicacoesDaRodada[_rodadaId][_indiceApp];
        require(a.participante == msg.sender && a.verificado && !a.pago && a.pontos > 0, "Erro saque");

        uint256 valor = a.isPro ? r.premioPorGanhadorPro[a.pontos] : r.premioPorGanhadorBasic[a.pontos];
        require(valor > 0 && address(this).balance >= valor, "Erro saldo");
        
        a.pago = true;
        payable(msg.sender).transfer(valor);
        emit SaqueRealizado(msg.sender, valor);
    }

    function _iniciarRodada(uint256 _id) internal {
        rodadas[_id].id = _id;
        rodadas[_id].aberta = true;
        rodadas[_id].boloBasic = saldoRolloverBasic;
        rodadas[_id].boloPro = saldoRolloverPro;
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