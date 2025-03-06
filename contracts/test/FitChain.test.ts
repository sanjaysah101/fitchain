import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FitChain', () => {
  let etn: any, rewards: any, nft: any;

  beforeEach(async () => {
    const ETNMock = await ethers.getContractFactory('ETNMock');
    etn = await ETNMock.deploy();
    const FitChainRewards = await ethers.getContractFactory('FitChainRewards');
    rewards = await FitChainRewards.deploy(etn.address);
    const FitChainNFT = await ethers.getContractFactory('FitChainNFT');
    nft = await FitChainNFT.deploy();
  });

  it('Should reward ETN', async () => {
    await etn.transfer(rewards.address, 1000);
    await rewards.rewardUser(
      await ethers.provider.getSigner(0).getAddress(),
      100
    );
    expect(
      await etn.balanceOf(await ethers.provider.getSigner(0).getAddress())
    ).to.equal(100);
  });

  it('Should mint NFT', async () => {
    await nft.mintBadge(await ethers.provider.getSigner(0).getAddress());
    expect(
      await nft.balanceOf(await ethers.provider.getSigner(0).getAddress())
    ).to.equal(1);
  });
});
