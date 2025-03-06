import { ethers } from 'ethers';
import { FitChainRewards, FitChainNFT } from '../types/contracts';

const ANKR_RPC =
  'https://rpc.ankr.com/electroneum_testnet/1c6169c4ee8bdb5aff458250248024f1a5852e00b6211210aa745864b6e94498';
const provider = new ethers.JsonRpcProvider(ANKR_RPC);

// Contract Addresses (from deployment)
const REWARDS_ADDRESS = '0x30c6132F1062650aB11a466Bd19B94f4950B42F1';
const NFT_ADDRESS = '0xd99CCF958702e1298291F503f0877e45a6dc68A3';

// ABI (simplified for TypeScript)
const rewardsABI = ['function rewardUser(address user, uint256 steps)'];
const nftABI = ['function mintBadge(address user)'];

export const getRewardsContract = (signer: ethers.Signer): FitChainRewards => {
  return new ethers.Contract(
    REWARDS_ADDRESS,
    rewardsABI,
    signer || provider
  ) as FitChainRewards;
};

export const getNFTContract = (signer: ethers.Signer): FitChainNFT => {
  return new ethers.Contract(
    NFT_ADDRESS,
    nftABI,
    signer || provider
  ) as FitChainNFT;
};
