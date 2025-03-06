import { ethers } from 'ethers';

export type FitChainRewards = ethers.Contract & {
  rewardUser: (user: string, steps: number) => Promise<void>;
};

export type FitChainNFT = ethers.Contract & {
  mintBadge: (user: string) => Promise<void>;
};
