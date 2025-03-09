import '@walletconnect/react-native-compat';

// Add BackHandler polyfill
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppKit, AppKitButton} from '@reown/appkit-wagmi-react-native';
import { wagmiConfig } from '../config/wagmi';
import { Account } from '../componenets/Account';
import { FitnessRewards } from '../componenets/FitnessRewards';
const queryClient = new QueryClient();

export const HomeScreen: React.FC = () => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.header}>FitChain</Text>
            <AppKitButton />
            <Account />
            <FitnessRewards />
          </ScrollView>
        </View>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  }
});
