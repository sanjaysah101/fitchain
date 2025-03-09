import { Address, formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { REWARDS_CONTRACT } from '../constants';
import { FitChainRewardsABI } from '../contracts/contracts';

export function useFitChain() {
  const { address } = useAccount();
  const {
    data: userStats,
    isLoading,
    error,
    isError,
  } = useReadContract({
    address: REWARDS_CONTRACT,
    abi: FitChainRewardsABI,
    functionName: 'getUserStats',
    args: [address as Address],
  });

  console.log('userStats', { userStats, isLoading, error, isError });

  return {
    data: {
      totalSteps: userStats?.[0],
      etnClaimed: userStats?.[1] ? formatUnits(userStats[1], 18) : '0',
      nextMilestone: userStats?.[2],
      cooldown: userStats?.[3],
    },
    isLoading,
    error,
    isError,
  };
}
