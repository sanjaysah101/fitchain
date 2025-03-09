import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { accelerometer } from 'react-native-sensors';

const STEP_THRESHOLD = 20; // Adjust based on testing
const STEP_DELAY = 500; // Minimum time between steps in ms
const STORAGE_KEY = '@FitChain:dailySteps';

export function useStepCounter() {
  const [steps, setSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  // Request permissions
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        // For Android 10+ (API level 29+)
        if (Platform.Version >= 29) {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION, {
            title: 'Activity Recognition Permission',
            message: 'FitChain needs access to your physical activity to count steps.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          });

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Activity Recognition permission granted');
            setHasPermission(true);
            return true;
          } else {
            console.log('Activity Recognition permission denied');
            Alert.alert(
              'Permission Required',
              'Step counting requires activity recognition permission. Please enable it in app settings.',
              [{ text: 'OK' }]
            );
            return false;
          }
        } else {
          // For Android 9 and below, no runtime permission needed
          setHasPermission(true);
          return true;
        }
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      // iOS doesn't need explicit permission for accelerometer
      setHasPermission(true);
      return true;
    }
  };

  // Load saved steps on component mount
  useEffect(() => {
    loadSavedSteps();
    requestPermissions();
  }, []);

  // Save steps when they change
  useEffect(() => {
    if (steps > 0) {
      saveSteps(steps);
    }
  }, [steps]);

  const loadSavedSteps = async () => {
    try {
      const savedSteps = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedSteps) {
        // Check if it's a new day
        const lastUpdate = await AsyncStorage.getItem('@FitChain:lastUpdate');
        const today = new Date().toDateString();

        if (lastUpdate !== today) {
          // It's a new day, reset steps
          setSteps(0);
          await AsyncStorage.setItem('@FitChain:lastUpdate', today);
        } else {
          setSteps(parseInt(savedSteps, 10));
        }
      } else {
        // First time using the app
        await AsyncStorage.setItem('@FitChain:lastUpdate', new Date().toDateString());
      }
    } catch (error) {
      console.error('Failed to load steps:', error);
    }
  };

  const saveSteps = async (newSteps: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newSteps.toString());
    } catch (error) {
      console.error('Failed to save steps:', error);
    }
  };

  const startTracking = async () => {
    if (isTracking) {
      return;
    }

    // Request permissions before starting
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) {
      return;
    }

    let lastStepTime = 0;
    let lastMagnitude = 0;

    const subscription = accelerometer.subscribe(({ x, y, z }: { x: number; y: number; z: number }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(magnitude - lastMagnitude);

      const now = Date.now();

      // Detect a step when there's a significant change in acceleration
      // and enough time has passed since the last step
      if (delta > STEP_THRESHOLD && now - lastStepTime > STEP_DELAY) {
        setSteps((prevSteps) => prevSteps + 1);
        lastStepTime = now;
      }

      lastMagnitude = magnitude;
    });

    setIsTracking(true);

    return () => {
      subscription.unsubscribe();
      setIsTracking(false);
    };
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const resetSteps = async () => {
    setSteps(0);
    await AsyncStorage.setItem(STORAGE_KEY, '0');
  };

  return {
    steps,
    isTracking,
    hasPermission,
    startTracking,
    stopTracking,
    resetSteps,
  };
}
