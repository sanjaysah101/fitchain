import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAccount, useConnect } from 'wagmi';
import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';

const OnboardingScreen = () => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();

  return (
    <View style={styles.container}>
      {address ? (
        <ThemedText>Connected: {address.slice(0, 12)}...</ThemedText>
      ) : (
        connectors.map((connector) => (
          <Button
            key={connector.id}
            onPress={() => connect({ connector })}
            title={`Connect with ${connector.name}`}
          />
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default OnboardingScreen;
