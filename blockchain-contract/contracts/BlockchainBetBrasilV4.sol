// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BlockchainBetBrasilGamified is Ownable, Pausable, ReentrancyGuard {
    
    // --- ECONOMIA ---
    IERC20 public immutable tokenAplicacao; // Token usado para pagar (USDT/BRL Token)
    
    // Valores em Wei (assumindo 18 decimais)
    uint256 public constant PRECO_BASIC = 5 * 10**18;        // R$ 5,00
    uint256 public constant PRECO_INVEST = 1000 * 10**18;    // R$ 1.000,00
    
    // Bônus de Consolação (Crédito na Plataforma)
    uint256 public constant BONUS_ZERO_BASIC = 625 * 10**15; // R$ 0,625
    uint256 public constant BONUS_ZERO_INVEST = 125 * 10**18;// R$ 125,00
    
    uint256 public constant META_FREE_BET = 8; // 8 Derrotas = 1 Free Bet

    // --- ESTRUTURAS ---
    struct Aposta {
        address apostador;
        uint8[10] coordenadas; // Formato: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5]
        uint8 tier; // 1 = Basic, 2 = Invest
        bool processada;
        uint8 pontos;
    }

    struct ParticipanteStats {
        uint256 contadorZeroBasic;
        uint256 contadorZeroInvest;
        uint256 freeBetsBasic;
        uint256 freeBetsInvest;
        uint256 saldoBonus; // Saldo acumulado dos bônus de zero pontos
    }

    struct Rodada {
        uint256 id;
        bool aberta;
        bool finalizada;
        uint256 totalArrecadadoBasic;
        uint256 totalArrecadadoInvest;
        uint8[10] resultadoSorteado; // [x1, y1, ...]
        uint256 timestampInicio;
    }

    // --- ARMAZENAMENTO ---
    mapping(uint256 => Rodada) public rodadas;
    mapping(uint256 => Aposta[]) public apostasDaRodada;
    mapping(address => ParticipanteStats) public stats;
    
    uint256 public rodadaAtualId;
    address public treasury;

    // --- EVENTOS ---
    event NovaAposta(uint256 indexed rodadaId, address indexed user, uint8 tier, bool usouFreeBet);
    event RodadaFechada(uint256 indexed rodadaId, uint256 totalArrecadado);
    event ResultadoDefinido(uint256 indexed rodadaId, uint8[10] resultado);
    event PremioDistribuido(uint256 indexed rodadaId, uint8 faixa, uint256 valorTotal);
    event BonusZeroConcedido(address indexed user, uint256 valor, uint256 contagemAtual);
    event FreeBetGanho(address indexed user, uint8 tier);

    constructor(address _token, address _treasury) {
        tokenAplicacao = IERC20(_token);
        treasury = _treasury;
        rodadaAtualId = 1;
        rodadas[1].id = 1;
        rodadas[1].aberta = true;
        rodadas[1].timestampInicio = block.timestamp;
    }

    // --- FUNÇÕES DO USUÁRIO ---

    // _coords: Array plano de 10 números [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5]
    // _tier: 1 para Basic, 2 para Invest
    function realizarAplicacao(uint8[10] calldata _coords, uint8 _tier) external nonReentrant whenNotPaused {
        require(rodadas[rodadaAtualId].aberta, "Rodada fechada");
        require(_tier == 1 || _tier == 2, "Tier invalido");
        _validarCoordenadas(_coords);

        uint256 preco = _tier == 1 ? PRECO_BASIC : PRECO_INVEST;
        bool usarFree = false;

        // Verifica Free Bet
        ParticipanteStats storage userStats = stats[msg.sender];
        if (_tier == 1 && userStats.freeBetsBasic > 0) {
            userStats.freeBetsBasic--;
            usarFree = true;
        } else if (_tier == 2 && userStats.freeBetsInvest > 0) {
            userStats.freeBetsInvest--;
            usarFree = true;
        }

        // Cobrança
        if (!usarFree) {
            require(tokenAplicacao.transferFrom(msg.sender, address(this), preco), "Falha no pagamento");
            if (_tier == 1) rodadas[rodadaAtualId].totalArrecadadoBasic += preco;
            else rodadas[rodadaAtualId].totalArrecadadoInvest += preco;
        }

        // Registra Aposta
        apostasDaRodada[rodadaAtualId].push(Aposta({
            apostador: msg.sender,
            coordenadas: _coords,
            tier: _tier,
            processada: false,
            pontos: 0
        }));

        emit NovaAposta(rodadaAtualId, msg.sender, _tier, usarFree);
    }

    // --- FUNÇÕES DO ADMIN (BACKEND) ---

    function fecharRodada() external onlyOwner {
        rodadas[rodadaAtualId].aberta = false;
        emit RodadaFechada(rodadaAtualId, rodadas[rodadaAtualId].totalArrecadadoBasic + rodadas[rodadaAtualId].totalArrecadadoInvest);
    }

    // Define o resultado (no mundo real, viria do Chainlink VRF)
    function definirResultado(uint8[10] calldata _resultado) external onlyOwner {
        require(!rodadas[rodadaAtualId].aberta, "Rodada ainda aberta");
        require(!rodadas[rodadaAtualId].finalizada, "Ja finalizada");
        _validarCoordenadas(_resultado);
        
        rodadas[rodadaAtualId].resultadoSorteado = _resultado;
        rodadas[rodadaAtualId].finalizada = true;
        
        emit ResultadoDefinido(rodadaAtualId, _resultado);
    }

    // Processa vencedores e bônus (Chamado pelo backend em lotes para não estourar o gas)
    function processarResultadosBatch(uint256 _inicio, uint256 _fim) external onlyOwner {
        Rodada storage r = rodadas[rodadaAtualId];
        require(r.finalizada, "Resultado nao definido");

        for (uint256 i = _inicio; i < _fim && i < apostasDaRodada[rodadaAtualId].length; i++) {
            Aposta storage aposta = apostasDaRodada[rodadaAtualId][i];
            if (aposta.processada) continue;

            // Calcular Pontos
            uint8 pontos = _calcularPontos(aposta.coordenadas, r.resultadoSorteado);
            aposta.pontos = pontos;
            aposta.processada = true;

            // Lógica "Todo Mundo Ganha" (Zero Pontos)
            if (pontos == 0) {
                _aplicarBonusZero(aposta.apostador, aposta.tier);
            }
        }
    }

    // --- LÓGICA INTERNA ---

    function _aplicarBonusZero(address _user, uint8 _tier) internal {
        ParticipanteStats storage s = stats[_user];
        uint256 valorBonus = _tier == 1 ? BONUS_ZERO_BASIC : BONUS_ZERO_INVEST;

        // Credita saldo bônus virtual
        s.saldoBonus += valorBonus;

        // Incrementa contador para Free Bet
        if (_tier == 1) {
            s.contadorZeroBasic++;
            emit BonusZeroConcedido(_user, valorBonus, s.contadorZeroBasic);
            if (s.contadorZeroBasic >= META_FREE_BET) {
                s.freeBetsBasic++;
                s.contadorZeroBasic = 0;
                emit FreeBetGanho(_user, 1);
            }
        } else {
            s.contadorZeroInvest++;
            emit BonusZeroConcedido(_user, valorBonus, s.contadorZeroInvest);
            if (s.contadorZeroInvest >= META_FREE_BET) {
                s.freeBetsInvest++;
                s.contadorZeroInvest = 0;
                emit FreeBetGanho(_user, 2);
            }
        }
    }

    function _calcularPontos(uint8[10] memory _aposta, uint8[10] memory _resultado) internal pure returns (uint8 pontos) {
        // Compara pares (X,Y). Índices 0,1 é o par 1. Índices 2,3 é o par 2...
        for (uint256 i = 0; i < 10; i += 2) {
            if (_aposta[i] == _resultado[i] && _aposta[i+1] == _resultado[i+1]) {
                pontos++;
            }
        }
        return pontos;
    }

    function _validarCoordenadas(uint8[10] memory _c) internal pure {
        for (uint256 i = 0; i < 10; i++) {
            require(_c[i] >= 1 && _c[i] <= 25, "Coordenada invalida (1-25)");
        }
    }

    // --- ADMINISTRAÇÃO ---
    
    function iniciarNovaRodada() external onlyOwner {
        require(rodadas[rodadaAtualId].finalizada, "Anterior nao finalizada");
        rodadaAtualId++;
        rodadas[rodadaAtualId].id = rodadaAtualId;
        rodadas[rodadaAtualId].aberta = true;
        rodadas[rodadaAtualId].timestampInicio = block.timestamp;
    }

    function sacarFundos(uint256 amount) external onlyOwner {
        require(tokenAplicacao.transfer(treasury, amount), "Erro saque");
    }
}