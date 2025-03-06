// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ETNMock is ERC20 {
    constructor() ERC20("ETN Mock", "ETN") {
        _mint(msg.sender, 1000000 * 1e18);
    }
}
