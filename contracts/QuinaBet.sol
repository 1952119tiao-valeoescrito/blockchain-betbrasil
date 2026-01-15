// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract QuinaBet is ReentrancyGuard, VRFConsumerBaseV2Plus, AutomationCompatibleInterface {
    
    // --- CONFIGURAÇÕES QUINA-BET ---
    uint256 public constant MAX_PROGNOSTICOS = 25;  // 25 prognósticos por bilhete
    uint256 public constant VALOR_ENTRADA = 1e6;    // 1 USDC (6 decimais)
    uint256 public constant HOUSE_FEE_PERCENT = 10; // 10% para treasury
    
    // --- CICLO SEMANAL (Baseado no Deploy de Domingo 21h) ---
    uint256 public constant DURACAO_RODADA = 142 hours; 
    uint256 public constant JANELA_CHECKIN = 24 hours; 
    uint256 public constant CICLO_TOTAL = 168 hours;

    address public immutable TREASURY;
    address public immutable USDC_TOKEN;

    // Chainlink VRF
    uint256 private immutable s_subscriptionId;
    bytes32 private immutable keyHash;
    uint32 private constant CALLBACK_GAS_LIMIT = 2500000;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 5;  // 5 números sorteados

    struct ApostaQuina {
        address apostador;
        uint8[25] prognosticos;  // 25 prognósticos
        bool verificado;
        bool pago;
        uint8 acertos;           // 0-5 acertos
    }

    struct Rodada {
        uint256 id;
        bool aberta;
        bool sorteada;
        bool finalizada;
        uint8[5] resultado;      // 5 números sorteados (Quina)
        uint256 requestId;
        uint256 timestampInicio;
        uint256 timestampSorteio;
        
        // Pote Único
        uint256 totalArrecadado;
        uint256 boloPremios;     // 90% do total
        uint256 qtdVencedores;   // Apenas quem acerta 5/5
        uint256 premioPorVencedor;
    }

    mapping(uint256 => Rodada) public rodadas;
    mapping(uint256 => ApostaQuina[]) public apostasDaRodada;
    mapping(uint256 => uint256) private requestToRodadaId;
    mapping(uint256 => mapping(address => uint256[])) public apontadorApostasPorParticipante;

    uint256 public rodadaAtualId;
    uint256 public saldoRollover;  // Jackpot acumulado

    event NovaApostaQuina(uint256 indexed rodadaId, address indexed apostador);
    event SorteioSolicitado(uint256 indexed rodadaId);
    event SorteioRealizadoQuina(uint256 indexed rodadaId, uint8[5] resultado);
    event VitoriaQuinaRegistrada(uint256 indexed rodadaId, address indexed apostador, uint8 acertos);
    event CascataCalculadaQuina(uint256 indexed rodadaId, uint256 totalArrecadado, uint256 boloPremios);
    event NovaRodadaIniciada(uint256 indexed rodadaId, uint256 timestamp);
    event SaqueRealizado(address indexed apostador, uint256 valor);

    constructor(
        address _vrf, 
        uint256 _subId, 
        bytes32 _keyHash, 
        address _treasury,
        address _usdcToken
    ) VRFConsumerBaseV2Plus(_vrf) {
        s_subscriptionId = _subId;
        keyHash = _keyHash;
        TREASURY = _treasury;
        USDC_TOKEN = _usdcToken;
        rodadaAtualId = 1;
        _iniciarRodada(1);
    }

    function realizarApostaQuina(uint8[25] calldata _prognosticos) external nonReentrant {
        Rodada storage r = rodadas[rodadaAtualId];
        require(r.aberta, "Rodada fechada");

        // Validar prognosticos
        for(uint i = 0; i < MAX_PROGNOSTICOS; i++) {
            require(_prognosticos[i] >= 1 && _prognosticos[i] <= MAX_PROGNOSTICOS, "Prognostico invalido");
        }

        // Transferir USDC do apostador para este contrato
        require(
            IERC20(USDC_TOKEN).transferFrom(msg.sender, address(this), VALOR_ENTRADA),
            "Falha na transferencia USDC"
        );

        // Registrar aposta
        uint256 indiceAposta = apostasDaRodada[rodadaAtualId].length;
        apostasDaRodada[rodadaAtualId].push(
            ApostaQuina({
                apostador: msg.sender,
                prognosticos: _prognosticos,
                verificado: false,
                pago: false,
                acertos: 0
            })
        );

        apontadorApostasPorParticipante[rodadaAtualId][msg.sender].push(indiceAposta);
        r.totalArrecadado += VALOR_ENTRADA;

        emit NovaApostaQuina(rodadaAtualId, msg.sender);
    }

    function solicitarSorteio() public {
        Rodada storage r = rodadas[rodadaAtualId];
        require(r.aberta, "Rodada nao esta aberta");
        require(block.timestamp >= r.timestampInicio + DURACAO_RODADA, "Rodada ainda aberta");
        require(!r.sorteada, "Sorteio ja solicitado");

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

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        uint256 rodadaId = requestToRodadaId[requestId];
        Rodada storage r = rodadas[rodadaId];

        require(!r.sorteada, "Sorteio ja realizado");

        // Extrair 5 números de 1 a 25
        for(uint i = 0; i < 5; i++) {
            r.resultado[i] = uint8((randomWords[i] % MAX_PROGNOSTICOS) + 1);
        }

        r.sorteada = true;
        r.timestampSorteio = block.timestamp;

        // Calcular vencedores
        _calcularVencedoresQuina(rodadaId);

        emit SorteioRealizadoQuina(rodadaId, r.resultado);
    }

    function _calcularVencedoresQuina(uint256 _rodadaId) internal {
        Rodada storage r = rodadas[_rodadaId];
        uint256 totalApostas = apostasDaRodada[_rodadaId].length;

        for(uint i = 0; i < totalApostas; i++) {
            ApostaQuina storage aposta = apostasDaRodada[_rodadaId][i];
            uint8 acertos = 0;

            // Contar acertos
            for(uint j = 0; j < MAX_PROGNOSTICOS; j++) {
                for(uint k = 0; k < 5; k++) {
                    if(aposta.prognosticos[j] == r.resultado[k]) {
                        acertos++;
                    }
                }
            }

            aposta.acertos = acertos;

            // Apenas quem acerta 5/5 ganha prêmio
            if(acertos == 5) {
                r.qtdVencedores++;
            }
        }

        // Calcular cascata e prêmios
        _calcularCascata(_rodadaId);
    }

    function _calcularCascata(uint256 _rodadaId) internal {
        Rodada storage r = rodadas[_rodadaId];

        // 10% para treasury, 90% para prêmios
        uint256 taxaTreasury = (r.totalArrecadado * HOUSE_FEE_PERCENT) / 100;
        r.boloPremios = r.totalArrecadado - taxaTreasury;

        if(r.qtdVencedores > 0) {
            r.premioPorVencedor = r.boloPremios / r.qtdVencedores;
        } else {
            // Sem vencedores = rollover (acumula para próxima rodada)
            saldoRollover += r.boloPremios;
            r.boloPremios = 0;
        }

        // Transferir taxa para treasury
        IERC20(USDC_TOKEN).transfer(TREASURY, taxaTreasury);

        r.finalizada = true;
        emit CascataCalculadaQuina(_rodadaId, r.totalArrecadado, r.boloPremios);

        // Iniciar nova rodada
        _iniciarRodada(_rodadaId + 1);
    }

    function _iniciarRodada(uint256 _rodadaId) internal {
        rodadaAtualId = _rodadaId;
        rodadas[_rodadaId] = Rodada({
            id: _rodadaId,
            aberta: true,
            sorteada: false,
            finalizada: false,
            resultado: [uint8(0), uint8(0), uint8(0), uint8(0), uint8(0)],
            requestId: 0,
            timestampInicio: block.timestamp,
            timestampSorteio: 0,
            totalArrecadado: 0,
            boloPremios: 0,
            qtdVencedores: 0,
            premioPorVencedor: 0
        });

        emit NovaRodadaIniciada(_rodadaId, block.timestamp);
    }

    function reclamarPremio(uint256 _rodadaId) external nonReentrant {
        Rodada storage r = rodadas[_rodadaId];
        require(r.finalizada, "Rodada nao foi finalizada");
        require(r.premioPorVencedor > 0, "Sem vencedores nesta rodada");

        uint256[] storage apostasIndices = apontadorApostasPorParticipante[_rodadaId][msg.sender];
        bool ganhou = false;

        for(uint i = 0; i < apostasIndices.length; i++) {
            ApostaQuina storage aposta = apostasDaRodada[_rodadaId][apostasIndices[i]];
            if(aposta.acertos == 5 && !aposta.pago) {
                aposta.pago = true;
                ganhou = true;
            }
        }

        require(ganhou, "Voce nao eh vencedor nesta rodada");

        // Transferir prêmio
        IERC20(USDC_TOKEN).transfer(msg.sender, r.premioPorVencedor);
        emit SaqueRealizado(msg.sender, r.premioPorVencedor);
    }

    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory) {
        Rodada storage r = rodadas[rodadaAtualId];
        upkeepNeeded = r.aberta && (block.timestamp >= r.timestampInicio + DURACAO_RODADA);
        return (upkeepNeeded, "");
    }

    function performUpkeep(bytes calldata) external override {
        Rodada storage r = rodadas[rodadaAtualId];
        if(r.aberta && (block.timestamp >= r.timestampInicio + DURACAO_RODADA)) {
            solicitarSorteio();
        }
    }

    // --- VIEW FUNCTIONS ---
    function getApostasParticipante(uint256 _rodadaId, address _apostador) 
        external 
        view 
        returns (ApostaQuina[] memory) 
    {
        uint256[] memory indices = apontadorApostasPorParticipante[_rodadaId][_apostador];
        ApostaQuina[] memory apostas = new ApostaQuina[](indices.length);

        for(uint i = 0; i < indices.length; i++) {
            apostas[i] = apostasDaRodada[_rodadaId][indices[i]];
        }

        return apostas;
    }

    function getTotalApostasRodada(uint256 _rodadaId) external view returns (uint256) {
        return apostasDaRodada[_rodadaId].length;
    }

    function getRodadaInfo(uint256 _rodadaId) 
        external 
        view 
        returns (
            bool aberta,
            uint256 totalArrecadado,
            uint8[5] memory resultado,
            uint256 qtdVencedores,
            uint256 premioPorVencedor,
            uint256 timestampInicio
        ) 
    {
        Rodada storage r = rodadas[_rodadaId];
        return (
            r.aberta,
            r.totalArrecadado,
            r.resultado,
            r.qtdVencedores,
            r.premioPorVencedor,
            r.timestampInicio
        );
    }
}
