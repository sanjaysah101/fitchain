import { useState, useEffect } from 'react';
import { MetaMaskSDK } from '@metamask/sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Eip1193Provider, ethers } from 'ethers';

type WalletContext = {
  walletAddress: string | null;
  signer: ethers.Signer | null;
  connectWallet: () => Promise<void>;
};

const metaMaskSDK = new MetaMaskSDK({
  dappMetadata: { name: 'FitChain' },
  storage: {
    ...AsyncStorage,
    enabled: true,
  },
});

export const useWallet = (): WalletContext => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const provider = new ethers.BrowserProvider(
    metaMaskSDK.getProvider() as Eip1193Provider
  );

  const connectWallet = async () => {
    try {
      const accounts = await metaMaskSDK.connect();
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        const newSigner = await provider.getSigner();
        setSigner(newSigner);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return { walletAddress, signer, connectWallet };
};
