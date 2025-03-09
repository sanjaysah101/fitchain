import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { checkStepCounterPermissions, requestStepCounterPermissions } from '../utils/PermissionsHandler';

const Settings: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [backgroundTrackingEnabled, setBackgroundTrackingEnabled] = useState(true);
  const [metricUnits, setMetricUnits] = useState(true);

  const handlePermissionsCheck = async () => {
    const hasPermission = await checkStepCounterPermissions();
    
    if (hasPermission) {
      Alert.alert('Permissions', 'Step counter permissions are granted.');
    } else {
      Alert.alert(
        'Permissions Required',
        'Step counter permissions are not granted. Would you like to grant them now?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Grant Permissions', 
            onPress: async () => {
              const granted = await requestStepCounterPermissions();
              if (granted) {
                Alert.alert('Success', 'Permissions granted successfully.');
              } else {
                Alert.alert('Error', 'Failed to grant permissions.');
              }
            } 
          }
        ]
      );
    }
  };

  const handleResetData = () => {
    Alert.alert(
      'Reset Data',
      'Are you sure you want to reset all your step data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: () => {
            // Reset data logic would go here
            Alert.alert('Success', 'All data has been reset.');
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.settingsContainer}>
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkModeEnabled ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Use Metric Units</Text>
            <Switch
              value={metricUnits}
              onValueChange={setMetricUnits}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={metricUnits ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Tracking</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Background Tracking</Text>
            <Switch
              value={backgroundTrackingEnabled}
              onValueChange={setBackgroundTrackingEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={backgroundTrackingEnabled ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notificationsEnabled ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Permissions</Text>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handlePermissionsCheck}
          >
            <Text style={styles.buttonText}>Check Permissions</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <TouchableOpacity 
            style={[styles.button, styles.dangerButton]} 
            onPress={handleResetData}
          >
            <Text style={styles.buttonText}>Reset All Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>FitChain v1.0.0</Text>
          <Text style={styles.footerText}>© 2023 FitChain</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsContainer: {
    flex: 1,
    padding: 16,
  },
  settingSection: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  dangerButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    marginVertical: 4,
  },
});

export default Settings; 