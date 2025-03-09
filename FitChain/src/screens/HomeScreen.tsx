// Add BackHandler polyfill
import { AppKit, AppKitButton } from '@reown/appkit-wagmi-react-native';
import { QueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Account } from '../componenets/Account';

const queryClient = new QueryClient();
export const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>FitChain</Text>
        <AppKitButton />
        <Account />
        {/* <FitnessRewards /> */}
      </ScrollView>
    </View>
  );
};

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
