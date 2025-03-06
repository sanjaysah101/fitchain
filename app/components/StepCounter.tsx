import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';

const StepCounter = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [stepCount, setStepCount] = useState(0);
  const [manualSteps, setManualSteps] = useState('');

  useEffect(() => {
    const subscribe = () => {
      Pedometer.isAvailableAsync().then(
        (result) => {
          setIsPedometerAvailable(String(result));
        },
        (error) => {
          setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error);
        }
      );

      const subscription = Pedometer.watchStepCount((result) => {
        setStepCount(result.steps);
      });

      return () => {
        subscription && subscription.remove();
      };
    };

    subscribe();
  }, []);

  const handleManualLog = () => {
    const steps = parseInt(manualSteps, 10);
    if (!isNaN(steps)) {
      setStepCount(stepCount + steps);
      setManualSteps('');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Pedometer is {isPedometerAvailable}</Text>
      <Text>Steps taken: {stepCount}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter steps manually"
        value={manualSteps}
        onChangeText={setManualSteps}
        keyboardType="numeric"
      />
      <Button title="Log Steps" onPress={handleManualLog} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default StepCounter; 