// React Native Example (Owner only)
import React from 'react';
import { Text } from 'react-native-svg';
import { parseUnits } from 'viem';
import { useAccount, useBalance, useSendTransaction } from 'wagmi';

import { REWARDS_CONTRACT } from '../constants';
import Button from './ui/Button';
import Card from './ui/Card';

export function FundContractButton() {
  const { sendTransactionAsync } = useSendTransaction();

  const fundContract = async () => {
    await sendTransactionAsync({
      to: REWARDS_CONTRACT,
      value: parseUnits('1', 18), // Send 1 ETN
    });
  };

  return <Button title="Fund Contract" onPress={fundContract} />;
}

export function ContractStatus() {
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });

  return (
    <Card title="Status" subtitle={'' + data?.decimals}>
      <Text>Contract Balance: {'' + data?.value} ETN</Text>
      <Text>Contract Decimal: {'' + data?.decimals} ETN</Text>
      <Text>Contract Symbol: {data?.symbol} ETN</Text>
    </Card>
  );
}
