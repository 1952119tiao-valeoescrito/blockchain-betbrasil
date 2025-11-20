// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Este contrato simula um USDT ou Real Digital para testes
contract MockTether is ERC20 {
    constructor() ERC20("Mock Tether Brasil", "mUSDT") {
        // Cria 1 milhão de tokens para quem fizer o deploy (você)
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Função para dar dinheiro grátis para as carteiras de teste (Faucet)
    function faucet(address to, uint256 amount) external {
        _mint(to, amount);
    }
}