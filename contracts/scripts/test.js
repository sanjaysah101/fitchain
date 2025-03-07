const { ethers } = require('hardhat');

async function main() {
  const [owner] = await ethers.getSigners();
  const rewardsAddress = '0xe69F6Dc85450EDC7eB41B7E91Ec60caAb8c8AF6F'; // Replace with your contract address
  const Rewards = await ethers.getContractAt('FitChainRewards', rewardsAddress);

  // Test read function
  const ownerAddress = await Rewards.owner();
  console.log('Contract owner:', ownerAddress);

  // Test write function (send 100 steps)
  const tx = await Rewards.rewardUser(owner.address, 1);
  await tx.wait();
  console.log('Reward sent:', tx.hash);
}

main();
