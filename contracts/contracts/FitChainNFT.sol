// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FitChainNFT is ERC721 {
    uint256 public tokenIdCounter;
    address public owner;

    event BadgeMinted(address indexed user, uint256 tokenId);

    constructor() ERC721("FitChainBadges", "FIT") {
        owner = msg.sender;
    }

    function mintBadge(address user) external {
        require(msg.sender == owner, "Unauthorized");
        _safeMint(user, tokenIdCounter);
        emit BadgeMinted(user, tokenIdCounter);
        tokenIdCounter++;
    }
}
