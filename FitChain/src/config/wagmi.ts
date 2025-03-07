import {
  createAppKit,
  defaultWagmiConfig,
} from '@reown/appkit-wagmi-react-native';
// import {Chain} from 'viem';
import {electroneumTestnet} from 'viem/chains';

// 1. Get projectId at https://cloud.reown.com
const projectId = '750274cb9985fe53c51f72d81e698b6f';

// 2. Create config
const metadata = {
  name: 'FitChain',
  description: 'FitChain',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'fitchain://',
    universal: 'fitchain.com',
  },
};

// TODO: Add electroneumChain
// const electroneumChain: Chain = {
//   id: 5201420, // Replace with Electroneum's actual chain ID
//   name: 'Electroneum',
//   nativeCurrency: {
//     name: 'ETN',
//     symbol: 'ETN',
//     decimals: 18,
//   },
//   rpcUrls: {
//     default: {
//       http: [
//         'https://rpc.ankr.com/electroneum_testnet/1c6169c4ee8bdb5aff458250248024f1a5852e00b6211210aa745864b6e94498',
//       ],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'ElectroneumScan',
//       url: 'https://blockexplorer.electroneum.com',
//     },
//   },
// };

const chains = [electroneumTestnet] as const; // Remove other chains

export const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: electroneumTestnet, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: 'dark',
});
