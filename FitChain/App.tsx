import '@walletconnect/react-native-compat';
import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppKit, AppKitButton} from '@reown/appkit-wagmi-react-native';
import {StyleSheet, Text, View} from 'react-native';
import {wagmiConfig} from './src/config/wagmi';
import {Account} from './src/componenets/Account';
import {FitnessRewards} from './src/componenets/FitnessRewards';
const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <Text>Hello World</Text>
          <AppKitButton />
          <Account />
          <FitnessRewards />
        </View>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
