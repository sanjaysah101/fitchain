import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useWriteContract } from 'wagmi';

import { REWARDS_CONTRACT } from '../constants';
import { FitChainRewardsABI } from '../contracts/contracts';

export const useClaimReward = () => {
  const { writeContract, isPending, isSuccess, isError, error: contractError } = useWriteContract();

  useEffect(() => {
    if (isError && contractError) {
      const errorMessage = contractError.message || 'Transaction failed';

      Alert.alert('Transaction Failed', errorMessage);
    }

    if (isSuccess) {
      Alert.alert('Success', 'Rewards claimed successfully!');
    }
  }, [isError, isSuccess, contractError, isPending]);

  const handleClaim = async (steps: number) => {
    try {
      writeContract({
        address: REWARDS_CONTRACT,
        abi: FitChainRewardsABI,
        functionName: 'claimRewards',
        args: [BigInt(steps)],
      });
    } catch (err) {
      console.error('Failed to send transaction:', err);
    }
  };

  return {
    handleClaim,
    isPending,
    isSuccess,
    isError,
    error: contractError,
  };
};
