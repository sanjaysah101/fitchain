import dotenv from 'dotenv';
dotenv.config();

import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  typechain: {
    outDir: 'types',
    target: 'ethers-v6',
  },
  networks: {
    electroneum_testnet: {
      url: 'https://rpc.ankr.com/electroneum_testnet/1c6169c4ee8bdb5aff458250248024f1a5852e00b6211210aa745864b6e94498', // Use ANKR RPC later
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
