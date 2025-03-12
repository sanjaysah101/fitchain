import { useCallback, useEffect, useState } from 'react';
import { Address, formatEther } from 'viem';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { REWARDS_CONTRACT } from '../constants';
import { FitChainRewardsABI } from '../contracts/contracts';

export function useFitChainRewards() {
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);

  // Get user stats (combines multiple stats in one call)
  const { data: userStats, refetch: refetchUserStats } = useReadContract({
    address: REWARDS_CONTRACT,
    abi: FitChainRewardsABI,
    functionName: 'getUserStats',
    args: [address as Address],
    query: {
      enabled: !!address,
    },
  });

  // Get NFT contract address
  const { data: nftAddress } = useReadContract({
    address: REWARDS_CONTRACT,
    abi: FitChainRewardsABI,
    functionName: 'nft',
    query: {
      enabled: !!address,
    },
  });

  // Format values safely
  const formattedETNClaimed = userStats?.[1]
    ? formatEther(typeof userStats[1] === 'bigint' ? userStats[1] : BigInt(0))
    : '0';

  // Refetch all data
  const refetchAll = useCallback(() => {
    if (address) {
      refetchUserStats();
    }
  }, [address, refetchUserStats]);

  // Effect to refetch data when transaction status changes
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        refetchAll();
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (isError) {
      setIsLoading(false);
      console.error('Transaction error:', error);
    }
  }, [isSuccess, isError, error, refetchAll]);

  // Record steps (using claimRewards function from contract)
  const recordSteps = useCallback(
    async (steps: number) => {
      if (!address || steps <= 0) return;

      try {
        setIsLoading(true);
        await writeContract({
          address: REWARDS_CONTRACT,
          abi: FitChainRewardsABI,
          functionName: 'claimRewards',
          args: [BigInt(steps)],
        });
      } catch (err) {
        console.error('Failed to record steps:', err);
        setIsLoading(false);
        throw err;
      }
    },
    [address, writeContract]
  );

  return {
    totalSteps: userStats?.[0] ? Number(userStats[0]) : 0,
    etnClaimed: formattedETNClaimed,
    nextMilestone: userStats?.[2] ? Number(userStats[2]) : 0,
    cooldown: userStats?.[3] ? Number(userStats[3]) : 0,
    nftAddress,
    isLoading: isLoading || isPending,
    isSuccess,
    isError,
    error,
    recordSteps,
    refetchAll,
  };
}
