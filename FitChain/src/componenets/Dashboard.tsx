// components/Dashboard.js
import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { useFitChain } from '../hooks';
import ClaimButton from './ClaimButton';
import { NFTGallery } from './NFTGallery';
import { ProgressBar } from './ProgressBar';

export const Dashboard: FC = () => {
  const { data, isLoading, error, isError } = useFitChain();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  const { totalSteps, etnClaimed, nextMilestone, cooldown } = data;

  console.log('totalSteps', totalSteps);
  console.log('etnClaimed', etnClaimed);
  console.log('nextMilestone', nextMilestone);
  console.log('cooldown', cooldown);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m remaining`;
  };

  console.log('etnClaimed', etnClaimed);
  console.log('nextMilestone', nextMilestone);

  return (
    <View>
      <Text>Total Steps: {totalSteps}</Text>
      <Text>ETN Earned: {etnClaimed}</Text>
      <Text>Next Milestone: {nextMilestone} steps</Text>
      <ProgressBar current={Number(etnClaimed)} next={Number(nextMilestone)} />
      <NFTGallery />
      <Text>Next Claim Available: {cooldown ? formatTime(Number(cooldown)) : 'Ready to claim!'}</Text>

      {/* <Button title="Claim Rewards" onPress={handleClaim} disabled={cooldown > 0} /> */}
      <ClaimButton />
    </View>
  );
};
