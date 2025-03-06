import React from 'react';
import { View, Button, Text } from 'react-native';
import { useWallet } from '../../hooks/useWallet';

const OnboardingScreen = () => {
  const { walletAddress, connectWallet } = useWallet();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {walletAddress ? (
        <Text>Connected: {walletAddress.slice(0, 12)}...</Text>
      ) : (
        <Button title="Connect MetaMask" onPress={connectWallet} />
      )}
    </View>
  );
};

export default OnboardingScreen;
