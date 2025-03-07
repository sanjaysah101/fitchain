import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  typechain: {
    outDir: 'types',
    target: 'ethers-v6',
  },
  networks: {
    electroneum: {
      url: 'https://rpc.ankr.com/electroneum_testnet/1c6169c4ee8bdb5aff458250248024f1a5852e00b6211210aa745864b6e94498', // Use ANKR RPC later
      accounts: [
        'd4c8038b9d954770b5c1f24cc04885b06a59abbf50b47f44f08781b868e190c0',
      ],
    },
  },
  etherscan: {
    apiKey: {
      electroneum:
        '1c6169c4ee8bdb5aff458250248024f1a5852e00b6211210aa745864b6e94498',
    },
  },
};

export default config;
