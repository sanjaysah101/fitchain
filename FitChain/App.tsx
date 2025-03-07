import '@walletconnect/react-native-compat';
import {WagmiProvider} from 'wagmi';
import {mainnet, polygon, arbitrum} from '@wagmi/core/chains';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
  AppKitButton,
} from '@reown/appkit-wagmi-react-native';
import {Text, View} from 'react-native';

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://cloud.reown.com
const projectId = '750274cb9985fe53c51f72d81e698b6f';

// 2. Create config
const metadata = {
  name: 'FitChain',
  description: 'FitChain',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, arbitrum] as const;

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

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
