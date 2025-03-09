import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useWriteContract } from 'wagmi';

import { REWARDS_CONTRACT } from '../constants';
import { FitChainRewardsABI } from '../contracts/contracts';

export default function ClaimButton() {
  const { writeContract, isPending, isSuccess, isError, error: contractError } = useWriteContract();

  useEffect(() => {
    console.log({ isPending, isSuccess, isError, contractError });
    if (isError && contractError) {
      const errorMessage = contractError.message || 'Transaction failed';

      Alert.alert('Transaction Failed', errorMessage);
    }

    if (isSuccess) {
      Alert.alert('Success', 'Rewards claimed successfully!');
    }
  }, [isError, isSuccess, contractError, isPending]);

  const handleClaim = async () => {
    // Get steps from device sensors (mock for demo)
    // TODO: get steps from device sensors
    const mockSteps = 100;

    console.log('Claiming rewards...');

    try {
      writeContract({
        address: REWARDS_CONTRACT,
        abi: FitChainRewardsABI,
        functionName: 'claimRewards',
        args: [BigInt(mockSteps)],
      });
    } catch (err) {
      console.error('Failed to send transaction:', err);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={handleClaim}
        style={[styles.button, isPending && styles.buttonDisabled]}
        disabled={isPending}
      >
        <Text style={styles.buttonText}>{isPending ? 'Claiming...' : 'Claim Rewards'}</Text>
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
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
