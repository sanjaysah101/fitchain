import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSharedValue } from 'react-native-reanimated';

export default function StepCounterScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<boolean | string>('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [manualStepsModalVisible, setManualStepsModalVisible] = useState(false);
  const [goalInput, setGoalInput] = useState('10000');
  const [manualStepsInput, setManualStepsInput] = useState('');
  const [stepGoal, setStepGoal] = useState(10000);
  const progress = useSharedValue(0);

  useEffect(() => {
    const subscription = Pedometer.watchStepCount((result) => {
      console.log('New steps detected:', result.steps);
      setCurrentStepCount(prevCount => {
        const newCount = result.steps;
        progress.value = withSpring((pastStepCount + newCount) / stepGoal);
        return newCount;
      });
    });

    return () => {
      subscription.remove();
    };
  }, [pastStepCount, stepGoal, progress]);

  const totalSteps = pastStepCount + currentStepCount;
  const goalProgress = (totalSteps / stepGoal) * 100;

  const saveGoal = () => {
    const newGoal = parseInt(goalInput, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setStepGoal(newGoal);
      progress.value = withSpring(totalSteps / newGoal);
      setGoalModalVisible(false);
    } else {
      Alert.alert('Invalid Goal', 'Please enter a valid number greater than 0');
    }
  };

  const addManualSteps = () => {
    const steps = parseInt(manualStepsInput, 10);
    if (!isNaN(steps) && steps > 0) {
      setPastStepCount(prevCount => prevCount + steps);
      progress.value = withSpring((totalSteps + steps) / stepGoal);
      setManualStepsModalVisible(false);
      setManualStepsInput('');
    } else {
      Alert.alert('Invalid Steps', 'Please enter a valid number greater than 0');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        {/* Counter content */}
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity 
          style={styles.statBox} 
          onPress={() => setGoalModalVisible(true)}
        >
          <MaterialCommunityIcons name="target" size={24} color="#4CAF50" />
          <Text style={styles.statTitle}>Goal</Text>
          <Text style={styles.statValue}>{stepGoal.toLocaleString()}</Text>
        </TouchableOpacity>

        <View style={styles.statBox}>
          <MaterialCommunityIcons name="percent" size={24} color="#2196F3" />
          <Text style={styles.statTitle}>Progress</Text>
          <Text style={styles.statValue}>{goalProgress.toFixed(1)}%</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.manualEntryCard}
        onPress={() => setManualStepsModalVisible(true)}
      >
        <MaterialCommunityIcons name="shoe-print" size={24} color="#FF9800" />
        <Text style={styles.manualEntryText}>Add Steps Manually</Text>
      </TouchableOpacity>

      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>Past Steps: {pastStepCount}</Text>
        <Text style={styles.debugText}>Current Steps: {currentStepCount}</Text>
      </View>

      {/* Goal Setting Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={goalModalVisible}
        onRequestClose={() => setGoalModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Your Daily Step Goal</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={goalInput}
              onChangeText={setGoalInput}
              placeholder="Enter step goal"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setGoalModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveGoal}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Manual Steps Entry Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={manualStepsModalVisible}
        onRequestClose={() => setManualStepsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Steps Manually</Text>
            <TextInput
              style={styles.modalInput}
              keyboardType="numeric"
              value={manualStepsInput}
              onChangeText={setManualStepsInput}
              placeholder="Enter steps"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setManualStepsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={addManualSteps}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  counterContainer: {
    // Counter content styles
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  statValue: {
    fontSize: 14,
  },
  manualEntryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  manualEntryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 10,
  },
  debugInfo: {
    padding: 20,
  },
  debugText: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 