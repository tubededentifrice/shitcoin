# Modern Customizable ERC20 Token

A professional-grade customizable ERC20 token that can be deployed on Ethereum, Avalanche, or any EVM-compatible network.

## Features

- Fully customizable token name and symbol (defaults to ShitCoin/SHIT)
- Modern security features from OpenZeppelin 5.3.0
- Role-based access control for flexible permission management
- ERC20Permit support for gasless approvals
- Reentrancy protection on sensitive operations
- Comprehensive pausing functionality for emergencies
- Minting and burning capabilities with proper access control
- Energy efficient on Proof-of-Stake networks

## Security Features

- **Role-Based Access Control**: Fine-grained permissions system
- **ERC20Permit**: Enables gasless token approvals using off-chain signatures
- **ReentrancyGuard**: Protection against reentrancy attacks
- **Pausable**: Emergency pause mechanism for all transfers
- **Modern OpenZeppelin**: Built on the latest security standards

## Deployment

### Default Deployment (ShitCoin/SHIT)

```solidity
// Deploy with default name and symbol
ShitCoin token = new ShitCoin();
```

### Custom Token Deployment

```solidity
// Deploy with custom name and symbol
ShitCoin shit = new ShitCoin("ShitCoin", "SHIT");
```

## Development

This project uses Hardhat for development, testing, and deployment.

### Setup

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile
```

### Testing

```bash
# Run tests
npm test

# Run test coverage
npm run coverage
```

## Deploying to Ethereum Network

This simplified guide will walk you through deploying ShitCoin to Ethereum using Remix - a browser-based IDE that works with MetaMask and hardware wallets.

### Prerequisites

1. Install MetaMask browser extension (https://metamask.io/)
2. Fund your MetaMask wallet with ETH (use a faucet for testnets)

### Simple Deployment with Remix

1. **Open Remix IDE**
   - Go to https://remix.ethereum.org/

2. **Create ShitCoin Contract**
   - Click the "File explorers" icon (folder) in the left sidebar
   - Click "Create New File" and name it `ShitCoin.sol`
   - Copy the entire content of your `/contracts/ShitCoin.sol` file and paste it into Remix

3. **Compile the Contract**
   - Click the "Solidity compiler" icon in the left sidebar
   - Select compiler version "0.8.20" (must match your contract)
   - Click "Compile ShitCoin.sol"

4. **Deploy to Ethereum**
   - Click the "Deploy & run transactions" icon in the left sidebar
   - In the "ENVIRONMENT" dropdown, select "Injected Provider - MetaMask"
   - MetaMask will pop up asking to connect to Remix - click "Connect"
   - In the "CONTRACT" dropdown, select "ShitCoin"
   - Click "Deploy" (leave constructor parameters empty for default values)
   - MetaMask will pop up to confirm the transaction - review gas fees and click "Confirm"
   - Wait for the transaction to be mined

5. **Get Your Contract Address**
   - Once deployed, your contract will appear under "Deployed Contracts"
   - Copy the contract address shown next to the contract name
   - **Save this address!** You'll need it to interact with your token

### Verifying on Etherscan (Optional)

1. Go to Etherscan.io (or the appropriate testnet explorer)
2. Search for your contract address
3. Click the "Contract" tab
4. Click "Verify and Publish"
5. Select the compiler type and version (Solidity 0.8.20)
6. Copy and paste your entire contract code
7. Click "Verify and Publish"

### Switching Networks

- To deploy on a testnet first (recommended):
  1. In MetaMask, click the network dropdown at the top
  2. Select "Sepolia Test Network" (or another testnet)
  3. Follow the same deployment steps above
  4. Once tested, switch to "Ethereum Mainnet" and redeploy

**Note**: Mainnet deployment will cost real ETH for gas fees!

## Interacting with ShitCoin

### Adding ShitCoin to MetaMask

1. Open MetaMask
2. Click "Import tokens" at the bottom
3. Select "Custom token"
4. Paste your deployed contract address
5. The token symbol "SHIT" and decimals "18" should auto-populate
6. Click "Import tokens"

Your ShitCoin balance will now appear in your wallet!

### Using Remix to Interact with Your Token

After deploying, you can use the same Remix interface to manage your token:

1. **Basic Token Operations**
   - In Remix under "Deployed Contracts" section, expand your contract
   - For transfers: Find the "transfer" function, enter recipient address and amount, click "transact"
   - For checking balances: Use "balanceOf" function with an address and click "call"

2. **Admin Functions** (As deployer, you have all admin roles)
   - **Mint new tokens**: Find "mint" function, enter recipient address and amount (in wei), click "transact"
   - **Burn tokens**: Find "burnFrom" function, enter address and amount, click "transact"
   - **Pause all transfers** (emergency): Use "pause" function, click "transact" (use "unpause" to resume)

3. **Grant Roles to Others**
   - Find "grantRole" function
   - Enter role hash and address to grant the role to
   - Common roles:
     - Minter: `0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6`
     - Burner: `0x3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848`
     - Pauser: `0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a`

**Tip**: For all functions that need amounts, remember that 1 SHIT = 10^18 wei.
Example: To mint 100 SHIT, enter: `100000000000000000000` (100 followed by 18 zeros)

### Using Etherscan Instead

If you verified your contract on Etherscan:

1. Go to your contract page on Etherscan
2. Click "Contract" tab, then "Write Contract" 
3. Click "Connect to Web3" to connect your MetaMask
4. Use the functions just like in Remix

## License

MIT