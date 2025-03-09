import { Platform, Alert, PermissionsAndroid } from 'react-native';
import { checkStepCounterPermissions, requestStepCounterPermissions } from '../utils/PermissionsHandler';

// Mock implementation for when react-native-sensors is not available
const mockAccelerometer = {
  subscribe: (callback, errorCallback) => {
    // Simulate steps with a timer
    const intervalId = setInterval(() => {
      // Generate random acceleration values
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      const z = Math.random() * 2 - 1;
      
      callback({ x, y, z });
    }, 1000);
    
    // Return a subscription object with unsubscribe method
    return {
      unsubscribe: () => {
        clearInterval(intervalId);
      }
    };
  }
};

// Try to import react-native-sensors, fall back to mock if not available
let accelerometer;
let setUpdateIntervalForType;
let SensorTypes;

try {
  const sensors = require('react-native-sensors');
  accelerometer = sensors.accelerometer;
  setUpdateIntervalForType = sensors.setUpdateIntervalForType;
  SensorTypes = sensors.SensorTypes;
  
  // Set the update interval for the accelerometer (in milliseconds)
  setUpdateIntervalForType(SensorTypes.accelerometer, 100);
} catch (error) {
  console.warn('react-native-sensors not available, using mock implementation');
  accelerometer = mockAccelerometer;
}

// Threshold for step detection
const STEP_THRESHOLD = 1.2;

interface StepData {
  steps: number;
  distance: number;
  calories: number;
}

type StepCounterCallback = (data: StepData) => void;

export class StepCounterService {
  private subscribers: StepCounterCallback[] = [];
  private isTracking: boolean = false;

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
          {
            title: "FitChain Activity Permission",
            message: "FitChain needs access to your activity to count steps.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS handles permissions through Info.plist
  }

  subscribe(callback: StepCounterCallback): () => void {
    this.subscribers.push(callback);
    
    if (!this.isTracking) {
      this.startTracking();
    }

    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }

      if (this.subscribers.length === 0) {
        this.stopTracking();
      }
    };
  }

  private startTracking(): void {
    this.isTracking = true;
    // Implement actual step counting logic here
    // This is a mock implementation
    setInterval(() => {
      const mockData: StepData = {
        steps: Math.floor(Math.random() * 100),
        distance: Math.random() * 0.1,
        calories: Math.random() * 5,
      };
      this.notifySubscribers(mockData);
    }, 1000);
  }

  private stopTracking(): void {
    this.isTracking = false;
    // Implement cleanup logic here
  }

  private notifySubscribers(data: StepData): void {
    this.subscribers.forEach(callback => callback(data));
  }
}

export const useStepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [subscription, setSubscription] = useState(null);

  // Check for permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const hasPermission = await checkStepCounterPermissions();
        setHasPermission(hasPermission);
      } catch (error) {
        console.error('Error in checkPermissions:', error);
        setHasPermission(false);
      }
    };

    checkPermissions();
  }, []);

  // Request permissions
  const requestPermissions = async () => {
    try {
      const granted = await requestStepCounterPermissions();
      setHasPermission(granted);
      return granted;
    } catch (error) {
      console.error('Error in requestPermissions:', error);
      return false;
    }
  };

  // Start tracking steps
  const startTracking = async () => {
    if (!hasPermission) {
      const granted = await requestPermissions();
      if (!granted) return false;
    }

    if (!isTracking) {
      try {
        let lastMagnitude = 0;
        let isStep = false;

        const sub = accelerometer.subscribe(
          ({ x, y, z }) => {
            // Calculate the magnitude of acceleration
            const magnitude = Math.sqrt(x * x + y * y + z * z);
            
            // Detect a step when the acceleration crosses the threshold
            if (!isStep && magnitude > STEP_THRESHOLD && lastMagnitude <= STEP_THRESHOLD) {
              isStep = true;
              setSteps(prevSteps => prevSteps + 1);
            } else if (isStep && magnitude <= STEP_THRESHOLD) {
              isStep = false;
            }
            
            lastMagnitude = magnitude;
          },
          (error) => {
            console.error('Accelerometer error:', error);
            Alert.alert(
              'Sensor Error',
              'There was an error accessing the accelerometer. Please make sure your device supports step counting.',
              [{ text: 'OK' }]
            );
            setIsTracking(false);
          }
        );

        setSubscription(sub);
        setIsTracking(true);
        return true;
      } catch (error) {
        console.error('Error starting step tracking:', error);
        Alert.alert(
          'Error',
          'Failed to start step tracking. Please try again.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    
    return false;
  };

  // Stop tracking steps
  const stopTracking = () => {
    if (subscription) {
      try {
        subscription.unsubscribe();
        setSubscription(null);
        setIsTracking(false);
        return true;
      } catch (error) {
        console.error('Error stopping step tracking:', error);
        return false;
      }
    }
    
    return false;
  };

  // Reset steps counter
  const resetSteps = () => {
    setSteps(0);
  };

  return {
    steps,
    isTracking,
    hasPermission,
    startTracking,
    stopTracking,
    resetSteps,
    requestPermissions,
  };
}; 