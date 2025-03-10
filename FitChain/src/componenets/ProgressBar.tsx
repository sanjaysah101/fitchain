import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProgressBarProps {
  current: number;
  next: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ current, next }) => {
  const progress = next > 0 ? (current / next) * 100 : 0;

  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      <Text style={styles.progressBarText}>
        {current}/{next} steps
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  progressBarText: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
