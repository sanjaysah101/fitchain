import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAccount, useWriteContract, useWalletClient } from 'wagmi';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { getRewardsContract } from '../../utils/blockchain';

const HomeScreen = () => {
  const { address } = useAccount();
  const [steps, setSteps] = useState<number>(0);

  const { writeContract, isPending } = useWriteContract();
  const { data: walletClient } = useWalletClient();

  const handleClaimReward = async () => {
    if (!address) return;

    try {
      await writeContract({
        address: '0x30c6132F1062650aB11a466Bd19B94f4950B42F1',
        abi: ['function rewardUser(address user, uint256 steps)'],
        functionName: 'rewardUser',
        args: [address, steps],
      });
    } catch (error) {
      console.error('Error claiming reward:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText>Steps: {steps}</ThemedText>
      <Button
        title={isPending ? 'Claiming...' : 'Claim ETN'}
        onPress={handleClaimReward}
        disabled={isPending || !address}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
});

export default HomeScreen;
