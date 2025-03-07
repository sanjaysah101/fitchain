import {View} from 'react-native';
import {NetworkButton, useWalletInfo} from '@reown/appkit-wagmi-react-native';
export const Account = () => {
  const {walletInfo} = useWalletInfo();

  console.log(walletInfo);

  return (
    <View>
      <NetworkButton />
    </View>
  );
};
