// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FitChainRewards {
    address public owner;
    IERC20 public etnToken;
    
    // Track user steps
    mapping(address => uint256) public userSteps;
    // Track if steps have been claimed
    mapping(address => uint256) public claimedSteps;

    event StepsRecorded(address indexed user, uint256 steps);
    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _etnToken) {
        owner = msg.sender;
        etnToken = IERC20(_etnToken);
    }
    
    // Only owner can record steps (from your backend)
    function recordSteps(address user, uint256 steps) external {
        require(msg.sender == owner, "Unauthorized");
        userSteps[user] += steps;
        emit StepsRecorded(user, steps);
    }

    // Any user can claim their own rewards
    function claimRewards() external {
        uint256 unclaimedSteps = userSteps[msg.sender] - claimedSteps[msg.sender];
        require(unclaimedSteps > 0, "No steps to claim");
        
        uint256 reward = unclaimedSteps * 1e18; // 1 ETN per step
        claimedSteps[msg.sender] = userSteps[msg.sender];
        
        require(etnToken.balanceOf(address(this)) >= reward, "Insufficient contract balance");
        etnToken.transfer(msg.sender, reward);
        emit RewardClaimed(msg.sender, reward);
    }
    
    // Fund the contract
    function fundContract(uint256 amount) external {
        require(etnToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }
    
    // Get unclaimed steps for a user
    function getUnclaimedSteps(address user) external view returns (uint256) {
        return userSteps[user] - claimedSteps[user];
    }
    
    // Get potential reward amount for a user
    function getPotentialReward(address user) external view returns (uint256) {
        uint256 unclaimedSteps = userSteps[user] - claimedSteps[user];
        return unclaimedSteps * 1e18; // 1 ETN per step
    }

    // Add this function to your FitChainRewards.sol contract
function getContractBalance() external view returns (uint256) {
    return etnToken.balanceOf(address(this));
}
}
