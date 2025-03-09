// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FitChainNFT is ERC721 {
    uint256 private _tokenIdCounter;
    address public owner;
    string public displayName;

    constructor() ERC721("FitChainMilestone", "FITNFT") {
        owner = msg.sender;
        displayName = "FitChain NFT Collection"; // Human-readable name
    }

    function mint(address to) external {
        require(msg.sender == owner, "Unauthorized");
        _tokenIdCounter++;
        _safeMint(to, _tokenIdCounter);
    }
}
