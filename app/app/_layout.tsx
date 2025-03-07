import '@walletconnect/react-native-compat';
import { WagmiProvider } from 'wagmi';
import { electroneumTestnet, mainnet } from '@wagmi/core/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createAppKit,
  defaultWagmiConfig,
} from '@reown/appkit-wagmi-react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Setup queryClient
const queryClient = new QueryClient();

// Get projectId from Reown Cloud
const projectId = '750274cb9985fe53c51f72d81e698b6f'; // Replace with your actual project ID

// Create Reown config
const metadata = {
  name: 'Fitchian',
  description: 'Fitchian ETN App',
  url: 'https://your-app-url.com',
  icons: ['https://your-app-icon.png'],
  redirect: {
    native: 'fitchian://',
    universal: 'https://your-app-universal-link.com',
  },
};

// const electroneum = {
//   id: 12345, // Replace with Electroneum’s chain ID
//   name: 'Electroneum',
//   network: 'electroneum',
//   nativeCurrency: { name: 'ETN', symbol: 'ETN', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://rpc.electroneum.ankr.com'] },
//   },
// };

const wagmiConfig = defaultWagmiConfig({
  chains: [electroneumTestnet],
  projectId,
  metadata,
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
