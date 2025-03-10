import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with:', deployer.address);

  // Deploy NFT contract first
  const NFT = await ethers.getContractFactory('FitChainNFT');
  const nft = await NFT.deploy();

  // Deploy Rewards contract with NFT address
  const Rewards = await ethers.getContractFactory('FitChainRewards');
  const rewards = await Rewards.deploy(await nft.getAddress());

  console.log('NFT contract deployed to:', await nft.getAddress());
  console.log('Rewards contract deployed to:', await rewards.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
