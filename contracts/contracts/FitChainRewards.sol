// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./FitChainNFT.sol";

contract FitChainRewards {
    FitChainNFT public nft;
    address public owner;
    string public displayName;

    uint256 public stepsPerETN = 1000;
    uint256[] public milestones = [5000, 15000, 30000];
    uint256 public cooldown = 86400; // 24 hours

    mapping(address => User) public users;

    // Track total ETN distributed and user ETN claimed
    uint256 public totalETNDistributed;
    mapping(address => uint256) public userETNClaimed;

    event ContractFunded(address sender, uint256 amount);

    struct User {
        uint256 totalSteps;
        uint256 milestoneCount;
        uint256 lastClaim;
    }

    constructor(address _nftAddress) {
        nft = FitChainNFT(_nftAddress);
        owner = msg.sender;
        displayName = "FitChain Rewards";
    }

    function fundContract() external payable {
        require(msg.value > 0, "Must send at least 1 ETN");
        emit ContractFunded(msg.sender, msg.value);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
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

        require(
            address(this).balance >= etnAmount,
            "Insufficient contract funds"
        );

        payable(msg.sender).transfer(etnAmount);

        // Track rewards
        userETNClaimed[msg.sender] += etnAmount;
        totalETNDistributed += etnAmount;

        // Mint milestone NFTs
        for (uint256 i = user.milestoneCount; i < milestones.length; i++) {
            if (user.totalSteps >= milestones[i]) {
                nft.mint(msg.sender);
                user.milestoneCount++;
            }
        }
    }

    // This function is used to get the user's stats for the frontend
    function getUserStats(
        address user
    )
        public
        view
        returns (
            uint256 totalSteps,
            uint256 etnClaimed,
            uint256 nextMilestone,
            uint256 claimCooldown
        )
    {
        User memory u = users[user];
        return (
            u.totalSteps,
            userETNClaimed[user],
            milestones.length > u.milestoneCount
                ? milestones[u.milestoneCount]
                : 0,
            u.lastClaim + cooldown > block.timestamp
                ? (u.lastClaim + cooldown) - block.timestamp
                : 0
        );
    }

    // Withdraw Function (Owner Only)
    function withdrawFunds(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Overbalance");
        payable(owner).transfer(amount);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    receive() external payable {
        emit ContractFunded(msg.sender, msg.value);
    } // Allow contract to hold ETN
}
