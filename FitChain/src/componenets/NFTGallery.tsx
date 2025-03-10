import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Address } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { NFT_CONTRACT } from '../constants';

export const NFTGallery: FC = () => {
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    address: NFT_CONTRACT,
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [{ name: 'owner', type: 'address' }],
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view',
      },
    ],
    functionName: 'balanceOf',
    args: [address as Address],
  });

  return (
    <View>
      <Text>Total Fitness NFTs: {balance?.toString() || 0}</Text>
    </View>
  );
};
