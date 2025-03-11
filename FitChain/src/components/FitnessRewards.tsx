import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { useAccount } from 'wagmi';

import { useFitChainRewards, useStepCounter } from '../hooks';
import Button from './ui/Button';

export function FitnessRewards() {
  const { address } = useAccount();
  const { totalSteps, etnClaimed, nextMilestone, cooldown, recordSteps, refetchAll } = useFitChainRewards();
  const { steps, isTracking, startTracking, stopTracking } = useStepCounter();
  const [lastRecordedSteps, setLastRecordedSteps] = useState(0);
  const [manualSteps, setManualSteps] = useState('');

  useEffect(() => {
    if (address) refetchAll();
  }, [address, refetchAll]);

  const handleClaimSteps = async () => {
    if (!address || steps <= lastRecordedSteps) return;

    const newSteps = steps - lastRecordedSteps;
    try {
      await recordSteps(newSteps);
      setLastRecordedSteps(steps);
      Alert.alert('Success', `Claimed rewards for ${newSteps} steps! Next milestone: ${nextMilestone} steps`);
    } catch (error) {
      Alert.alert('Error', 'Failed to claim rewards. Please try again.');
    }
  };

  if (!address) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fitness Rewards</Text>
        <View style={styles.connectPrompt}>
          <Text style={styles.connectText}>Please connect your wallet to start earning rewards</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fitness Rewards</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalSteps}</Text>
          <Text style={styles.statLabel}>Total Steps</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{etnClaimed} ETN</Text>
          <Text style={styles.statLabel}>Rewards Earned</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Step Tracking</Text>
        <Switch
          value={isTracking}
          onValueChange={isTracking ? stopTracking : startTracking}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isTracking ? '#4CAF50' : '#f4f3f4'}
        />
        <Text style={styles.stepCount}>{steps}</Text>
        <Button
          title={`Record ${steps - lastRecordedSteps} Steps`}
          onPress={handleClaimSteps}
          disabled={steps <= lastRecordedSteps || cooldown > 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 80,
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
