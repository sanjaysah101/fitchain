import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Address } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { NFT_CONTRACT } from '../constants';
import { FitChainNFTABI } from '../contracts/contracts';

export const NFTGallery: FC = () => {
  const { address } = useAccount();

  const { data: balance } = useReadContract({
    address: NFT_CONTRACT,
    abi: FitChainNFTABI,
    functionName: 'balanceOf',
    args: [address as Address],
  });

  return (
    <View>
      <Text>Total Fitness NFTs: {balance?.toString() || 0}</Text>
    </View>
  );
};
