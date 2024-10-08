// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/** 
 * @title BRC Token Contract
 * @notice BRICS Reserve Currency
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BRC is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    constructor()
        ERC20("BRICS Reserve Currency", "BRC")
        ERC20Permit("BRICS Reserve Currency")
        Ownable(msg.sender)
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}