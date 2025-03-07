import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useAccount} from 'wagmi';
import {useFitChainRewards} from '../hooks/useFitChianRewards';

export function FitnessRewards() {
  const {address} = useAccount();
  const {data, isLoading, handleRewardUser} = useFitChainRewards();
  const [steps, setSteps] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaimRewards = async () => {
    if (!address || steps === 0) {
      return;
    }

    try {
      setIsClaiming(true);
      handleRewardUser(address, steps);
      // Reset steps or show success message
      setSteps(0);
      setIsClaiming(false);
    } catch (error) {
      console.error('Failed to claim rewards:', error);
      setIsClaiming(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Rewards</Text>
      <Text style={styles.stepsText}>Steps: {steps}</Text>

      {/* This is just for testing - you'd normally get steps from a fitness tracker */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setSteps(prev => prev + 100)}>
        <Text style={styles.buttonText}>Add 100 Steps</Text>
      </TouchableOpacity>

      <Text>Data: {JSON.stringify(data)}</Text>
      <Text>Is Loading: {JSON.stringify(isLoading)}</Text>
      <Text>Address: {address}</Text>
      <Text>Is Claiming: {JSON.stringify(isClaiming)}</Text>

      <TouchableOpacity
        style={[styles.button, isClaiming && styles.buttonDisabled]}
        onPress={handleClaimRewards}
        disabled={isClaiming || !address || steps === 0}>
        <Text style={styles.buttonText}>
          {isClaiming ? 'Claiming...' : 'Claim Rewards'}
        </Text>
      </TouchableOpacity>

      {/* {rewardError && (
        <Text style={styles.errorText}>{rewardError.message}</Text>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stepsText: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});
