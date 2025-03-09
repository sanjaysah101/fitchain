import { NetworkButton, useWalletInfo } from '@reown/appkit-wagmi-react-native';
import { View } from 'react-native';

import ClaimButton from './ClaimButton';

export const Account = () => {
  const { walletInfo } = useWalletInfo();

  console.log(walletInfo);

  return (
    <View>
      <ClaimButton />
      <NetworkButton />
    </View>
  );
};
