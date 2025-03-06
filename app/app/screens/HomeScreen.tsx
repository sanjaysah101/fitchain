import { useState } from 'react';
import { getRewardsContract, getNFTContract } from '../../utils/blockchain';
import { Button, Text, View } from 'react-native';
import { useWallet } from '../../hooks/useWallet';

const HomeScreen = () => {
  const { walletAddress, signer } = useWallet();
  const [steps, setSteps] = useState<number>(0);

  const claimReward = async () => {
    console.log('claimReward', walletAddress, signer);
    if (!signer || !walletAddress) return;
    const rewardsContract = getRewardsContract(signer);
    await rewardsContract.rewardUser(walletAddress, steps);
  };

  return (
    <View>
      <Text>Steps: {steps}</Text>
      <Button title="Claim ETN" onPress={claimReward} />
    </View>
  );
};

export default HomeScreen;
