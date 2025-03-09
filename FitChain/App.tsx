import { NavigationContainer } from '@react-navigation/native';
import { AppKit } from '@reown/appkit-wagmi-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@walletconnect/react-native-compat';
import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { WagmiProvider } from 'wagmi';

import TabNavigator from './src/componenets/navigation/TabNavigator';
import { wagmiConfig } from './src/config/wagmi';
import { COLORS } from './src/constants/theme';
import SplashScreen from './src/screens/SplashScreen';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND_LIGHT,
      flex: 1,
    }),
    [isDarkMode]
  );

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={[backgroundStyle, styles.container]}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
          <AppKit />
        </SafeAreaView>
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
  },
});

export default App;
