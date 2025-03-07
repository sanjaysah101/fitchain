import {View, Text} from 'react-native';
import {NetworkButton, useWalletInfo} from '@reown/appkit-wagmi-react-native';
export const Account = () => {
  const {walletInfo} = useWalletInfo();

  console.log(walletInfo);

  return (
    <View>
      <NetworkButton />

      <Text>{JSON.stringify(walletInfo)}</Text>
    </View>
  );
};
