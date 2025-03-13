// Add BackHandler polyfill
import { AppKitButton } from '@reown/appkit-wagmi-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAccount } from 'wagmi';

import { Dashboard } from '../components/Dashboard';

export const HomeScreen: React.FC = () => {
  const { address } = useAccount();
  // console.log({ address });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>FitChain</Text>
        <AppKitButton />
        {address && <Dashboard />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 80,
    marginHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
});
