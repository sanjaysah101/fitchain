import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { StepCounterService } from '../services/StepCounterService';

interface StepCounterState {
  steps: number;
  distance: number;
  calories: number;
  isTracking: boolean;
  error: string | null;
}

export const useStepCounter = () => {
  const [state, setState] = useState<StepCounterState>({
    steps: 0,
    distance: 0,
    calories: 0,
    isTracking: false,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    const startTracking = async () => {
      try {
        const service = new StepCounterService();
        await service.requestPermissions();
        
        setState(prev => ({ ...prev, isTracking: true }));
        
        service.subscribe((data) => {
          if (mounted) {
            setState(prev => ({
              ...prev,
              steps: data.steps,
              distance: data.distance,
              calories: data.calories,
            }));
          }
        });
      } catch (error) {
        if (mounted) {
          setState(prev => ({
            ...prev,
            error: error instanceof Error ? error.message : 'Failed to start step counter',
          }));
        }
      }
    };

    startTracking();

    return () => {
      mounted = false;
      // Cleanup subscription
    };
  }, []);

  return state;
}; 