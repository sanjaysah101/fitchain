import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue
} from 'react-native-reanimated';

export default function StepCounterScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<boolean | string>('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const progress = useSharedValue(0);

  const requestPermissions = async () => {
    try {
      // Request location permission (needed for motion/fitness data)
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      console.log('Location permission status:', locationStatus);
      
      if (locationStatus !== 'granted') {
        setError('Location permission is required for step counting');
        Alert.alert(
          'Permission Required',
          'Please grant location permission to count steps.',
          [{ text: 'OK' }]
        );
        return false;
      }

      setHasPermission(true);
      return true;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      setError('Failed to request necessary permissions');
      return false;
    }
  };

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    const initializePedometer = async () => {
      // First request permissions
      const permissionsGranted = await requestPermissions();
      if (!permissionsGranted) {
        return;
      }

      try {
        const isAvailable = await Pedometer.isAvailableAsync();
        console.log('Pedometer availability:', isAvailable);
        setIsPedometerAvailable(isAvailable);

        if (!isAvailable) {
          setError('Pedometer is not available on this device');
          Alert.alert(
            'Pedometer Not Available',
            'This device does not support step counting. Please ensure you have granted the necessary permissions.',
            [{ text: 'OK' }]
          );
          return;
        }

        // Get past steps
        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        console.log('Fetching steps from:', start, 'to:', end);
        
        const pastSteps = await Pedometer.getStepCountAsync(start, end);
        console.log('Past steps:', pastSteps?.steps);
        
        if (pastSteps) {
          setPastStepCount(pastSteps.steps);
        }

        // Watch new steps
        subscription = Pedometer.watchStepCount(result => {
          console.log('New steps detected:', result.steps);
          setCurrentStepCount(prevCount => {
            const newCount = result.steps;
            progress.value = withSpring((pastStepCount + newCount) / 10000);
            return newCount;
          });
        });

        console.log('Step counter subscription set up successfully');

      } catch (error) {
        console.error('Error setting up pedometer:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
        setIsPedometerAvailable(false);
        Alert.alert(
          'Error',
          'Failed to set up step counting. Please ensure you have granted the necessary permissions.',
          [{ text: 'OK' }]
        );
      }
    };

    initializePedometer();

    return () => {
      if (subscription) {
        console.log('Cleaning up step counter subscription');
        subscription.remove();
      }
    };
  }, []);

  const animatedCircle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 360}deg` }],
  }));

  const totalSteps = pastStepCount + currentStepCount;
  const goalProgress = (totalSteps / 10000) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Step Counter</Text>
        <Text style={styles.subtitle}>
          {typeof isPedometerAvailable === 'boolean' 
            ? (isPedometerAvailable ? 'Pedometer is working' : 'Pedometer not available') 
            : 'Checking pedometer...'}
        </Text>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>

      <View style={styles.counterContainer}>
        <Animated.View style={[styles.progressCircle, animatedCircle]}>
          <View style={styles.innerCircle}>
            <Text style={styles.stepCount}>{totalSteps}</Text>
            <Text style={styles.stepsText}>steps</Text>
          </View>
        </Animated.View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <MaterialCommunityIcons name="target" size={24} color="#4CAF50" />
          <Text style={styles.statTitle}>Goal</Text>
          <Text style={styles.statValue}>10,000</Text>
        </View>

        <View style={styles.statBox}>
          <MaterialCommunityIcons name="percent" size={24} color="#2196F3" />
          <Text style={styles.statTitle}>Progress</Text>
          <Text style={styles.statValue}>{goalProgress.toFixed(1)}%</Text>
        </View>
      </View>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>Past Steps: {pastStepCount}</Text>
        <Text style={styles.debugText}>Current Steps: {currentStepCount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  progressCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 15,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    backgroundColor: 'white',
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  stepCount: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  stepsText: {
    fontSize: 18,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '40%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  statTitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  debugInfo: {
    padding: 20,
    alignItems: 'center',
  },
  debugText: {
    color: '#666',
    fontSize: 14,
  },
}); 