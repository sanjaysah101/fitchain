import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useFitChain } from '../hooks';

const StepsStatus = () => {
  const { data, isLoading, error, isError } = useFitChain();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  const { totalSteps, etnClaimed } = data;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your Stats</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalSteps}</Text>
          <Text style={styles.statLabel}>Total Steps</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{etnClaimed}</Text>
          <Text style={styles.statLabel}>Claimed Steps</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{Number(totalSteps) - Number(etnClaimed)}</Text>
          <Text style={styles.statLabel}>Unclaimed Steps</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{etnClaimed}</Text>
          <Text style={styles.statLabel}>ETN Reward</Text>
        </View>
      </View>
    </View>
    // <View>
    // <Card title="Your Stats" subtitle="Your stats">
    //   <View style={styles.statsGrid}>
    //     <Card title="Total Steps" subtitle="Total steps taken">
    //       <Text>Total Steps</Text>
    //     </Card>
    //     <Card title="Claimed Steps" subtitle="Claimed steps">
    //       <Text>Claimed Steps</Text>
    //     </Card>
    //     <Card title="Claimed Steps" subtitle="Claimed steps">
    //       <Text>Claimed Steps</Text>
    //     </Card>
    //     <Card title="Claimed Steps" subtitle="Claimed steps">
    //       <Text>Claimed Steps</Text>
    //     </Card>
    //   </View>
    // </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  card: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 80,
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
});

export default StepsStatus;
