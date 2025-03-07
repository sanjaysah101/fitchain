import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { FitChainRewardsABI } from '../contracts/contracts';
import { useCallback, useState, useEffect } from 'react';
import { formatEther } from 'viem';

const REWARDS_CONTRACT = '0x71C742ff7c1b728c4cbA53EBF6AFBFe726Ba2590';

export function useFitChainRewards() {
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get unclaimed steps
  const { data: unclaimedSteps, refetch: refetchUnclaimedSteps } = useReadContract({
    address: REWARDS_CONTRACT,
    abi: FitChainRewardsABI,
    functionName: 'getUnclaimedSteps',
    args: [address],
    query: {
      enabled: !!address,
    },
  });
  
  // Get potential reward
  const { data: potentialReward, refetch: refetchPotentialReward } = useReadContract({
    address: REWARDS_CONTRACT,
    abi: FitChainRewardsABI,
    functionName: 'getPotentialReward',
    args: [address],
    query: {
      enabled: !!address,
    },
  });
  
  // Get total steps
  const { data: totalSteps, refetch: refetchTotalSteps } = useReadContract({
    address: REWARDS_CONTRACT,
    abi: FitChainRewardsABI,
    functionName: 'userSteps',
    args: [address],
    query: {
      enabled: !!address,
    },
  });
  
  // Get claimed steps
  const { data: claimedSteps, refetch: refetchClaimedSteps } = useReadContract({
    address: REWARDS_CONTRACT,
    abi: FitChainRewardsABI,
    functionName: 'claimedSteps',
    args: [address],
    query: {
      enabled: !!address,
    },
  });
  
  // Check contract balance
  const { data: contractBalance, refetch: refetchContractBalance } = useReadContract({
    address: REWARDS_CONTRACT,
    abi: FitChainRewardsABI,
    functionName: 'getContractBalance',
    query: {
      enabled: !!address,
    },
  });
  
  // Format values safely
  const formattedReward = potentialReward ? 
    formatEther(typeof potentialReward === 'bigint' ? potentialReward : BigInt(0)) : '0';
  const formattedContractBalance = contractBalance ? 
    formatEther(typeof contractBalance === 'bigint' ? contractBalance : BigInt(0)) : '0';
  
  // Refetch all data
  const refetchAll = useCallback(() => {
    if (address) {
      refetchUnclaimedSteps();
      refetchPotentialReward();
      refetchTotalSteps();
      refetchClaimedSteps();
      refetchContractBalance();
    }
  }, [address, refetchUnclaimedSteps, refetchPotentialReward, refetchTotalSteps, refetchClaimedSteps, refetchContractBalance]);
  
  // Effect to refetch data when transaction status changes
  useEffect(() => {
    if (isSuccess) {
      // Wait a bit for the blockchain to update
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
  
  // Record steps (this would typically be called from a backend)
  const recordSteps = useCallback(async (steps: number) => {
    if (!address || steps <= 0) return;
    
    try {
      setIsLoading(true);
      
      // Note: In a production app, this should be done by the contract owner via a backend
      // For demo purposes, we're allowing the user to record their own steps
      await writeContract({
        address: REWARDS_CONTRACT,
        abi: FitChainRewardsABI,
        functionName: 'recordSteps',
        args: [address, steps],
      });
      
      // The effect will handle refetching data on success
    } catch (error) {
      console.error('Failed to record steps:', error);
      setIsLoading(false);
      throw error;
    }
  }, [address, writeContract]);
  
  // Claim rewards
  const claimRewards = useCallback(async () => {
    if (!address) return;
    
    try {
      setIsLoading(true);
      
      // Check if there are rewards to claim
      if (!unclaimedSteps || Number(unclaimedSteps) <= 0) {
        setIsLoading(false);
        throw new Error('No steps to claim');
      }
      
      // Check if contract has enough balance using string comparison
      if (parseFloat(formattedContractBalance) < parseFloat(formattedReward)) {
        setIsLoading(false);
        throw new Error('Contract has insufficient funds');
      }
      
      await writeContract({
        address: REWARDS_CONTRACT,
        abi: FitChainRewardsABI,
        functionName: 'claimRewards',
      });
      
      // The effect will handle refetching data on success
    } catch (error) {
      console.error('Failed to claim rewards:', error);
      setIsLoading(false);
      throw error;
    }
  }, [address, writeContract, unclaimedSteps, formattedContractBalance, formattedReward]);
  
  return {
    unclaimedSteps: unclaimedSteps ? Number(unclaimedSteps) : 0,
    potentialReward: formattedReward,
    totalSteps: totalSteps ? Number(totalSteps) : 0,
    claimedSteps: claimedSteps ? Number(claimedSteps) : 0,
    contractBalance: formattedContractBalance,
    isLoading: isLoading || isPending,
    isSuccess,
    isError,
    error,
    claimRewards,
    recordSteps,
    refetchAll,
  };
}