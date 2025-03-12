# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

## Deployed Contracts

```bash
npx hardhat compile
npx hardhat run scripts/deploy.ts --network electroneum_testnet
```

## Verify Contracts

```bash
npx hardhat verify --network electroneum_testnet <DEPLOYED_CONTRACT_ADDRESS>
```

## Output

Deploying contracts with: 0xeB0e3d50123408D41658Ed3a20F0728cB1AF8498
NFT contract deployed to: 0xceF0Ad388392B7457089be66351EEf7Dee2F8612
Rewards contract deployed to: 0xedFA8D3e426F926Ecdd2Ff171C1219F39281d264

Deploying contracts with: 0x0a3b64d7D1F789655384AaF90D1f701A28d9333E
NFT contract deployed to: 0x48D070e9F2e9704994629475EdA976E3468cC539
Rewards contract deployed to: 0x6cb5Ed7D0b79e8e83174413b4c21DE25DCFf4dB7
