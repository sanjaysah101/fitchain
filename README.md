# FitChain - Fitness Rewards on Electroneum

FitChain is a React Native mobile application that rewards users with ETN (Electroneum) tokens for their physical activity. The app tracks steps and allows users to claim rewards on the Electroneum blockchain.

## Features

- 👟 Step tracking and recording
- 💰 ETN token rewards for physical activity
- ⛓️ Blockchain-based reward system
- 🕒 24-hour cooldown between claims
- 📊 Real-time statistics dashboard
- 🌓 Light/Dark theme support
- 🔐 Secure wallet integration

## Tech Stack

- React Native
- TypeScript
- WalletConnect v2
- Wagmi
- Viem
- React Navigation
- React Query
- Reown AppKit

## Prerequisites

- Node.js >= 18
- Yarn
- React Native development environment
- iOS: XCode (Mac only)
- Android: Android Studio

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/fitchain.git
cd fitchain
```

2. Install dependencies:

```bash
yarn install
```

3. iOS specific setup:

```bash
cd ios && pod install && cd ..
```

## Environment Setup

Create a `.env` file in the root directory:

```env
REOWN_PROJECT_ID=your_project_id
ELECTRONEUM_RPC_URL=your_rpc_url
```

## Running the App

### Development

```bash
# iOS
yarn ios

# Android
yarn android
```

### Production Build

```bash
# iOS
yarn ios --configuration Release

# Android
cd android && ./gradlew assembleRelease
```

## Smart Contracts

The app interacts with the following smart contract on Electroneum Testnet:

- FitChainRewards: `0x0b1A3Ef0B37977267A182390C85430dc10C6CD54`

## Architecture

The app follows a hook-based architecture with the following key components:

- `src/hooks/`: Custom hooks for blockchain interactions
- `src/components/`: Reusable UI components
- `src/screens/`: Main app screens
- `src/providers/`: Context providers
- `src/config/`: Configuration files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Electroneum Team
- Reown AppKit
- WalletConnect
