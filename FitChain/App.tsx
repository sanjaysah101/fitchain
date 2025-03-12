import { NavigationContainer } from '@react-navigation/native';
import { AppKit } from '@reown/appkit-wagmi-react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@walletconnect/react-native-compat';
import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { WagmiProvider } from 'wagmi';

import TabNavigator from './src/components/navigation/TabNavigator';
import { wagmiConfig } from './src/config/wagmi';
import { COLORS } from './src/constants/theme';
import { ThemeProvider } from './src/providers/ThemeProvider';
import { SplashScreen } from './src/screens';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'light';
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
        <ThemeProvider>
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
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
