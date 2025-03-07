import { expect } from 'chai';
import { ethers } from 'hardhat';
import { FitChainRewards, ETNMock } from '../types';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';

describe('FitChainRewards V2', function () {
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

  describe('Record Steps', function () {
    it('Should allow owner to record steps', async function () {
      const steps = 100;
      
      await expect(rewards.recordSteps(user.address, steps))
        .to.emit(rewards, 'StepsRecorded')
        .withArgs(user.address, steps);
        
      expect(await rewards.userSteps(user.address)).to.equal(steps);
    });

    it('Should revert if called by non-owner', async function () {
      await expect(
        rewards.connect(otherAccount).recordSteps(user.address, 100)
      ).to.be.revertedWith('Unauthorized');
    });
    
    it('Should accumulate steps for the same user', async function () {
      await rewards.recordSteps(user.address, 100);
      await rewards.recordSteps(user.address, 150);
      
      expect(await rewards.userSteps(user.address)).to.equal(250);
    });
  });

  describe('Claim Rewards', function () {
    beforeEach(async function () {
      // Record steps for the user
      await rewards.recordSteps(user.address, 100);
    });
    
    it('Should allow users to claim their rewards', async function () {
      const expectedReward = ethers.parseEther('100'); // 100 steps * 1 ETN
      
      // Check user balance before claim
      const initialBalance = await etnToken.balanceOf(user.address);
      
      // User claims rewards
      await expect(rewards.connect(user).claimRewards())
        .to.emit(rewards, 'RewardClaimed')
        .withArgs(user.address, expectedReward);
        
      // Check user balance after claim
      const finalBalance = await etnToken.balanceOf(user.address);
      expect(finalBalance - initialBalance).to.equal(expectedReward);
      
      // Check claimed steps
      expect(await rewards.claimedSteps(user.address)).to.equal(100);
    });
    
    it('Should revert if user has no unclaimed steps', async function () {
      // User claims rewards first time
      await rewards.connect(user).claimRewards();
      
      // Try to claim again without new steps
      await expect(
        rewards.connect(user).claimRewards()
      ).to.be.revertedWith('No steps to claim');
    });
    
    it('Should handle multiple claims correctly', async function () {
      // First claim
      await rewards.connect(user).claimRewards();
      
      // Record more steps
      await rewards.recordSteps(user.address, 150);
      
      // Second claim
      const expectedReward = ethers.parseEther('150'); // 150 new steps * 1 ETN
      const balanceBefore = await etnToken.balanceOf(user.address);
      
      await rewards.connect(user).claimRewards();
      
      const balanceAfter = await etnToken.balanceOf(user.address);
      expect(balanceAfter - balanceBefore).to.equal(expectedReward);
      
      // Total claimed steps should be 250
      expect(await rewards.claimedSteps(user.address)).to.equal(250);
    });
  });

  describe('Fund Contract', function () {
    it('Should allow users to fund the contract', async function () {
      const fundAmount = ethers.parseEther('500');
      
      // Approve the contract to spend tokens
      await etnToken.connect(user).approve(await rewards.getAddress(), fundAmount);
      
      // Initial balances
      const initialContractBalance = await etnToken.balanceOf(await rewards.getAddress());
      
      // Fund the contract
      await rewards.connect(user).fundContract(fundAmount);
      
      // Check final balances
      const finalContractBalance = await etnToken.balanceOf(await rewards.getAddress());
      expect(finalContractBalance - initialContractBalance).to.equal(fundAmount);
    });
  });

  describe('View Functions', function () {
    beforeEach(async function () {
      // Record steps for the user
      await rewards.recordSteps(user.address, 100);
    });
    
    it('Should return correct unclaimed steps', async function () {
      expect(await rewards.getUnclaimedSteps(user.address)).to.equal(100);
      
      // After claiming
      await rewards.connect(user).claimRewards();
      expect(await rewards.getUnclaimedSteps(user.address)).to.equal(0);
      
      // After recording more steps
      await rewards.recordSteps(user.address, 150);
      expect(await rewards.getUnclaimedSteps(user.address)).to.equal(150);
    });
    
    it('Should return correct potential reward', async function () {
      expect(await rewards.getPotentialReward(user.address)).to.equal(ethers.parseEther('100'));
      
      // After claiming
      await rewards.connect(user).claimRewards();
      expect(await rewards.getPotentialReward(user.address)).to.equal(0);
      
      // After recording more steps
      await rewards.recordSteps(user.address, 150);
      expect(await rewards.getPotentialReward(user.address)).to.equal(ethers.parseEther('150'));
    });
  });
}); 