// contracts/MockERC20.sol

// contracts/MockERC20.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol, address initialHolder, uint256 initialSupply) ERC20(name, symbol) {
        _mint(initialHolder, initialSupply);
    }
}