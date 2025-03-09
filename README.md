# FitChain

## Overview

FitChain is a blockchain-based platform that allows users to track their fitness activities and earn rewards.

## Features

- Track your fitness activities
- Earn rewards
- Build your fitness community


# Remove node_modules and clean cache
rm -rf node_modules && yarn cache clean

# Reinstall dependencies
yarn install

# Clean Android build
cd android && ./gradlew clean && cd ..

# Clean iOS build (if using macOS)
cd ios && rm -rf Pods && pod install --verbose && cd ..

# Start Metro Bundler fresh
yarn start --reset-cache

# Run in Android 
yarn android