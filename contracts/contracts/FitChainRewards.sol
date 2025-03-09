// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./FitChainNFT.sol";

contract FitChainRewards {
    FitChainNFT public nft;
    address public owner;

    uint256 public stepsPerETN = 1000;
    uint256[] public milestones = [5000, 15000, 30000];
    uint256 public cooldown = 86400; // 24 hours

    mapping(address => User) public users;

    struct User {
        uint256 totalSteps;
        uint256 milestoneCount;
        uint256 lastClaim;
    }

    constructor(address _nftAddress) {
        nft = FitChainNFT(_nftAddress);
        owner = msg.sender;
    }

    function claimRewards(uint256 steps) external {
        User storage user = users[msg.sender];

        require(
            block.timestamp >= user.lastClaim + cooldown,
            "Wait 24h between claims"
        );

        user.totalSteps += steps;
        user.lastClaim = block.timestamp;

        // Send ETN rewards (1 ETN = 1e18 wei)
        uint256 etnAmount = (steps / stepsPerETN) * 1e18;
        payable(msg.sender).transfer(etnAmount);

        // Mint milestone NFTs
        for (uint256 i = user.milestoneCount; i < milestones.length; i++) {
            if (user.totalSteps >= milestones[i]) {
                nft.mint(msg.sender);
                user.milestoneCount++;
            }
        }
    }

    receive() external payable {} // Allow contract to hold ETN
}
