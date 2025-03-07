import { expect } from 'chai';
import { ethers } from 'hardhat';
import { FitChainRewards, ETNMock } from '../types';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

describe('FitChainRewards', function () {
  let rewards: FitChainRewards;
  let etnToken: ETNMock;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let otherAccount: SignerWithAddress;

  beforeEach(async function () {
    // Get signers
    [owner, user, otherAccount] = await ethers.getSigners();

    // Deploy ETN Mock token
    const ETNMockFactory = await ethers.getContractFactory('ETNMock');
    etnToken = await ETNMockFactory.deploy();

    // Deploy FitChainRewards contract
    const FitChainRewardsFactory = await ethers.getContractFactory('FitChainRewards');
    rewards = await FitChainRewardsFactory.deploy(await etnToken.getAddress());

    // Transfer some tokens to the rewards contract
    await etnToken.transfer(await rewards.getAddress(), ethers.parseEther('10000'));
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await rewards.owner()).to.equal(owner.address);
    });

    it('Should set the correct ETN token address', async function () {
      expect(await rewards.etnToken()).to.equal(await etnToken.getAddress());
    });
  });

  describe('Reward User', function () {
    it('Should allow owner to reward users', async function () {
      const steps = 100;
      const expectedReward = ethers.parseEther(steps.toString()); // 1 ETN per step

      // Check user balance before reward
      const initialBalance = await etnToken.balanceOf(user.address);
      
      // Owner rewards the user
      await expect(rewards.rewardUser(user.address, steps))
        .to.emit(rewards, 'RewardClaimed')
        .withArgs(user.address, expectedReward);

      // Check user balance after reward
      const finalBalance = await etnToken.balanceOf(user.address);
      expect(finalBalance - initialBalance).to.equal(expectedReward);
    });

    it('Should revert if called by non-owner', async function () {
      // Try to reward from non-owner account
      await expect(
        rewards.connect(otherAccount).rewardUser(user.address, 100)
      ).to.be.revertedWith('Unauthorized');
    });

    it('Should handle zero steps correctly', async function () {
      // Reward with zero steps
      await rewards.rewardUser(user.address, 0);
      
      // Check balance (should be unchanged)
      expect(await etnToken.balanceOf(user.address)).to.equal(0);
    });

    it('Should handle large step counts', async function () {
      const largeSteps = 1000;
      const expectedReward = ethers.parseEther(largeSteps.toString());
      
      // Ensure contract has enough tokens
      await etnToken.transfer(await rewards.getAddress(), ethers.parseEther('10000'));
      
      // Reward user with large step count
      await rewards.rewardUser(user.address, largeSteps);
      
      // Check balance
      expect(await etnToken.balanceOf(user.address)).to.equal(expectedReward);
    });

    it('Should fail if contract has insufficient token balance', async function () {
      // Deploy a new rewards contract with no tokens
      const FitChainRewardsFactory = await ethers.getContractFactory('FitChainRewards');
      const emptyRewards = await FitChainRewardsFactory.deploy(await etnToken.getAddress());
      
      // Try to reward (should fail due to insufficient balance)
      await expect(
        emptyRewards.rewardUser(user.address, 100)
      ).to.be.reverted; // ERC20 will revert with insufficient balance
    });
  });
}); 