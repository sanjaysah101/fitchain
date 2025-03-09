/**
 * FitChain - Step Counter App
 * A React Native app to count steps with proper permissions
 *
 * @format
 */

import React, { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './src/constants/theme';
import TabNavigator from './src/componenets/navigation/TabNavigator';
import SplashScreen from './src/screens/SplashScreen';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from './src/config/wagmi';
import { AppKit } from '@reown/appkit-wagmi-react-native';

const queryClient = new QueryClient();


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [showSplash, setShowSplash] = useState(true);

  const backgroundStyle = useMemo(() => ({
    backgroundColor: isDarkMode ? COLORS.BACKGROUND_DARK : COLORS.BACKGROUND_LIGHT,
    flex: 1,
  }), [isDarkMode]);

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
    position: 'relative',
  },
});

export default App;
