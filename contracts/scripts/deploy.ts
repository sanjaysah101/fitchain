import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with:', deployer.address);

  // Deploy ETN Mock (for testing)
  const ETNMock = await ethers.getContractFactory('ETNMock');
  const etn = await ETNMock.deploy();
  console.log('ETNMock deployed to:', await etn.getAddress());

  // Deploy Rewards Contract
  const FitChainRewards = await ethers.getContractFactory('FitChainRewards');
  const rewards = await FitChainRewards.deploy(await etn.getAddress());
  console.log('Rewards deployed to:', await rewards.getAddress());

  // Deploy NFT Contract
  const FitChainNFT = await ethers.getContractFactory('FitChainNFT');
  const nft = await FitChainNFT.deploy();
  console.log('NFT deployed to:', await nft.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
