import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWriteContract } from 'wagmi';

import { REWARDS_CONTRACT } from '../constants';
import { FitChainRewardsABI } from '../contracts/contracts';

export default function ClaimButton() {
  const { writeContract, isPending, isSuccess, isError, error: contractError } = useWriteContract();

  console.log({ isPending, isSuccess, isError, contractError });

  const handleClaim = async () => {
    // Get steps from device sensors (mock for demo)
    const mockSteps = 100;

    console.log('Claiming rewards...');

    try {
      writeContract({
        address: REWARDS_CONTRACT,
        abi: FitChainRewardsABI,
        functionName: 'claimRewards',
        args: [mockSteps],
      });
      Alert.alert('Rewards claimed!');
    } catch (err) {
      Alert.alert('Error: ' + (err as Error).message);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleClaim} style={styles.button}>
        <Text style={styles.buttonText}>Claim Rewards</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
