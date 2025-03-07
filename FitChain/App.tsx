import '@walletconnect/react-native-compat';
import {WagmiProvider} from 'wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppKit, AppKitButton} from '@reown/appkit-wagmi-react-native';
import {Text, View} from 'react-native';
import {wagmiConfig} from './src/config/wagmi';

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <View>
          <Text>Hello</Text>
          <AppKitButton />
        </View>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
