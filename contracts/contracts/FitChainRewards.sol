// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FitChainRewards {
    address public owner;
    IERC20 public etnToken;

    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _etnToken) {
        owner = msg.sender;
        etnToken = IERC20(_etnToken);
    }

    function rewardUser(address user, uint256 steps) external {
        require(msg.sender == owner, "Unauthorized");
        uint256 reward = steps * 1e18; // 1 ETN per step
        etnToken.transfer(user, reward);
        emit RewardClaimed(user, reward);
    }
}
