## Inspiration

The rise of "move-to-earn" applications inspired us to create FitChain, but we wanted to solve their key problems: high entry barriers and complex tokenomics. We chose Electroneum for its fast, low-cost transactions and existing mobile-first approach, making it perfect for fitness rewards.

## What it does

FitChain is a mobile app that rewards users with ETN (Electroneum) tokens for their physical activity. The app:

- Tracks user steps using native device sensors
- Records steps on the blockchain (referenced in FitnessRewards.tsx, lines 33-48)
- Calculates rewards based on activity milestones
- Allows users to claim ETN tokens after a 24-hour cooldown
- Features a real-time dashboard showing:
  - Next milestone
  - Unclaimed steps
  - Potential rewards
  - Cooldown timer

## How we built it

We built FitChain using:

- React Native for cross-platform mobile development
- TypeScript for type safety
- WalletConnect v2 for wallet integration
- Wagmi for blockchain interactions
- Reown AppKit for UI components
- React Native Sensors for step tracking

## Challenges we ran into

- Electroneum Chain Integration: Implementing a custom chain configuration required careful consideration of RPC endpoints and chain parameters
- Step Tracking Accuracy: Ensuring accurate step counting while managing battery life
- Transaction Timing: Managing the cooldown period and blockchain confirmation times
- State Management: Coordinating between device sensors and blockchain state

## Accomplishments that we're proud of

- Seamless Mobile Wallet Integration using WalletConnect v2
- Real-time step tracking with blockchain synchronization
- Clean architecture separating concerns between UI and blockchain logic
- Efficient reward calculation system

## What we Learned

- Blockchain Mobile Integration: Learned to integrate native device features with blockchain
- React Native Performance: Optimized sensor data handling and UI updates
- Smart Contract Interaction: Developed efficient patterns for mobile-to-contract communication
- State Management: Built robust state handling between device and blockchain

## What's next for FitChain - Fitness Rewards on Electroneum

- Social Features
- Friend challenges
- Group achievements
- Social sharing
- Enhanced Rewards
- NFT achievements
- Tiered reward system
- Partner integrations
- Technical Improvements
- Background step tracking
- Offline mode support
- Enhanced security features
- Community Features
- Governance system
- Community challenges
- User-created milestones
