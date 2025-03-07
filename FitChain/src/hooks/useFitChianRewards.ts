import {useAccount, useReadContract, useWriteContract} from 'wagmi';
import {FitChainRewardsABI} from '../contracts/contracts';
import {useCallback} from 'react';

export function useFitChainRewards() {
  const {address} = useAccount();
  const {writeContract} = useWriteContract();

  const {data, isLoading} = useReadContract({
    address: '0xe69F6Dc85450EDC7eB41B7E91Ec60caAb8c8AF6F',
    abi: FitChainRewardsABI,
    functionName: 'rewardUser',
    account: address,
    args: [address, 100],
  });

  const handleRewardUser = useCallback(
    (userAddress: string, steps: number) => {
      writeContract({
        address: '0xe69F6Dc85450EDC7eB41B7E91Ec60caAb8c8AF6F',
        abi: FitChainRewardsABI,
        functionName: 'rewardUser',
        args: [userAddress, steps],
      });
    },
    [writeContract],
  );

  return {
    data,
    isLoading,
    handleRewardUser,
  };
}
