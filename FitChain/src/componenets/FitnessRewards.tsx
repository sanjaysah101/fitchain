import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAccount } from 'wagmi';

import { useFitChainRewards, useStepCounter } from '../hooks';

export function FitnessRewards() {
  const { address } = useAccount();
  const {
    unclaimedSteps,
    potentialReward,
    totalSteps: contractTotalSteps,
    claimedSteps,
    isLoading,
    claimRewards,
    refetchAll,
    recordSteps,
    contractBalance,
  } = useFitChainRewards();

  const { steps, isTracking, startTracking, stopTracking } = useStepCounter();
  const [lastRecordedSteps, setLastRecordedSteps] = useState(0);
  const [manualSteps, setManualSteps] = useState('');

  // Refresh data when component mounts or address changes
  useEffect(() => {
    if (address) {
      refetchAll();
    }
  }, [address, refetchAll]);

  // Handle step tracking toggle
  const toggleTracking = () => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  };

  // Record steps to the contract
  const handleRecordSteps = async () => {
    if (!address || steps <= lastRecordedSteps) return;

    const newSteps = steps - lastRecordedSteps;
    try {
      await recordSteps(newSteps);
      setLastRecordedSteps(steps);
      Alert.alert('Success', `Recorded ${newSteps} steps to the blockchain!`);
    } catch (error) {
      console.error('Failed to record steps:', error);
      Alert.alert('Error', 'Failed to record steps. Please try again.');
    }
  };

  // Record manual steps
  const handleManualSteps = async () => {
    if (!address || !manualSteps) return;

    const stepsToRecord = parseInt(manualSteps, 10);
    if (isNaN(stepsToRecord) || stepsToRecord <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of steps.');
      return;
    }

    try {
      await recordSteps(stepsToRecord);
      setManualSteps('');
      Alert.alert('Success', `Recorded ${stepsToRecord} steps to the blockchain!`);
    } catch (error) {
      console.error('Failed to record manual steps:', error);
      Alert.alert('Error', 'Failed to record steps. Please try again.');
    }
  };

  if (!address) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fitness Rewards</Text>
        <View style={styles.connectPrompt}>
          <Text style={styles.connectText}>Please connect your wallet to view and claim rewards</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Rewards</Text>

      {/* Step Counter Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Step Counter</Text>
          <View style={styles.trackingControl}>
            <Text style={styles.trackingLabel}>{isTracking ? 'Tracking' : 'Not Tracking'}</Text>
            <Switch
              value={isTracking}
              onValueChange={toggleTracking}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isTracking ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>

        <Text style={styles.stepCount}>{steps}</Text>

        <TouchableOpacity
          style={[styles.button, styles.primaryButton, steps <= lastRecordedSteps && styles.disabledButton]}
          onPress={handleRecordSteps}
          disabled={steps <= lastRecordedSteps}
        >
          <Text style={styles.buttonText}>Record {steps - lastRecordedSteps} Steps</Text>
        </TouchableOpacity>
      </View>

      {/* Manual Step Entry Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Manual Step Entry</Text>
        <Text style={styles.cardSubtitle}>If step tracking isn't working, you can manually enter your steps</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter steps"
            value={manualSteps}
            onChangeText={setManualSteps}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, !manualSteps && styles.disabledButton]}
            onPress={handleManualSteps}
            disabled={!manualSteps}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Stats</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{contractTotalSteps}</Text>
            <Text style={styles.statLabel}>Total Steps</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{claimedSteps}</Text>
            <Text style={styles.statLabel}>Claimed Steps</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{unclaimedSteps}</Text>
            <Text style={styles.statLabel}>Unclaimed Steps</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statValue}>{potentialReward}</Text>
            <Text style={styles.statLabel}>ETN Reward</Text>
          </View>
        </View>
      </View>

      {/* Rewards Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Claim Rewards</Text>

        {parseFloat(contractBalance) < parseFloat(potentialReward) && (
          <Text style={styles.warningText}>Contract has insufficient funds. Please contact the administrator.</Text>
        )}

        <TouchableOpacity
          style={[styles.button, styles.accentButton, (isLoading || unclaimedSteps === 0) && styles.disabledButton]}
          onPress={claimRewards}
          disabled={isLoading || unclaimedSteps === 0}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>{unclaimedSteps === 0 ? 'No Rewards to Claim' : 'Claim Rewards'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  stepCount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 16,
  },
  trackingControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingLabel: {
    marginRight: 8,
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  accentButton: {
    backgroundColor: '#FF9800',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  warningText: {
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  connectPrompt: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  connectText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
