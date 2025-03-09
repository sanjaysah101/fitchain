import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Vibration,
} from 'react-native';
import { useStepCounter } from '../services/StepCounterService';

const StepCounter: React.FC = () => {
  const {
    steps,
    isTracking,
    hasPermission,
    startTracking,
    stopTracking,
    resetSteps,
    requestPermissions,
  } = useStepCounter();

  useEffect(() => {
    // Vibrate when reaching milestones (every 100 steps)
    if (steps > 0 && steps % 100 === 0) {
      Vibration.vibrate(500);
    }
  }, [steps]);

  const handleStartTracking = async () => {
    if (!hasPermission) {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert(
          'Permission Required',
          'This app needs activity recognition permission to count steps.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    startTracking();
  };

  const handleStopTracking = () => {
    stopTracking();
  };

  const handleResetSteps = () => {
    resetSteps();
  };

  // Calculate calories burned (rough estimate)
  const caloriesBurned = Math.round(steps * 0.04);
  
  // Calculate distance in kilometers (rough estimate based on average step length)
  const distanceKm = (steps * 0.76 / 1000).toFixed(2);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Step Counter</Text>
      </View>
      
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.stepsContainer}>
            <Text style={styles.stepsCount}>{steps}</Text>
            <Text style={styles.stepsLabel}>Steps</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{distanceKm}</Text>
              <Text style={styles.statLabel}>Kilometers</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{caloriesBurned}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            {!isTracking ? (
              <TouchableOpacity
                style={[styles.button, styles.startButton]}
                onPress={handleStartTracking}
              >
                <Text style={styles.buttonText}>Start Tracking</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.stopButton]}
                onPress={handleStopTracking}
              >
                <Text style={styles.buttonText}>Stop Tracking</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleResetSteps}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          
          {!hasPermission && (
            <Text style={styles.permissionText}>
              Permission required to track steps
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  stepsContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  stepsCount: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  stepsLabel: {
    fontSize: 18,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  resetButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  permissionText: {
    marginTop: 20,
    color: '#F44336',
    textAlign: 'center',
  },
});

export default StepCounter; 