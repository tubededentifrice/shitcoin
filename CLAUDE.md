# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project contains a modern, customizable ERC20 token contract that can be deployed on Ethereum, Avalanche, or any EVM-compatible network. The contract is built on the latest OpenZeppelin libraries (v5.3.0) and implements enhanced security features.

## Repository Structure

- `contracts/CustomToken.sol`: The main Solidity smart contract for the customizable token
- `bin/contracts/`: Compiled contract artifacts (ABI, bytecode, etc.)

## Smart Contract Architecture

The token contract implements:
- ERC20 standard token functionality
- ERC20Permit for gasless approvals
- ReentrancyGuard for protection against reentrancy attacks
- Configurable token name and symbol (defaults to "ShitCoin" and "SHIT")
- Role-based access control with the following roles:
  - `DEFAULT_ADMIN_ROLE`: Can grant all roles to other addresses
  - `MINTER_ROLE`: Can create new tokens
  - `BURNER_ROLE`: Can burn tokens from any address
  - `PAUSER_ROLE`: Can pause/unpause all token transfers

## Security Features

The contract includes several security enhancements:
1. **ERC20Permit**: Enables gasless approvals through off-chain signatures
2. **ReentrancyGuard**: Protects critical functions from reentrancy attacks
3. **Modern Access Control**: Using OpenZeppelin's latest access control mechanisms
4. **Updated Solidity**: Using Solidity 0.8.20 with compiler protections

## Deployment Options

The contract provides two deployment options:

1. Default deployment:
```solidity
// Deploy with default name "ShitCoin" and symbol "SHIT"
CustomToken token = new CustomToken();
```

2. Custom deployment:
```solidity
// Deploy with custom name and symbol
CustomToken token = new CustomToken("MyToken", "MTK");
```

## Development Commands

### Solidity Compilation

To compile the Solidity contract using Hardhat:

```bash
# Install dependencies
npm install

# Compile contracts
npx hardhat compile
```

### Testing

```bash
# Run tests
npx hardhat test

# Run test coverage
npx hardhat coverage
```

### Interacting with the Contract

To interact with the contract after deployment:

1. The deployer address automatically receives all roles
2. The deployer can grant roles to other addresses using AccessControl functions
3. Addresses with the MINTER_ROLE can mint new tokens
4. Addresses with the BURNER_ROLE can burn tokens from any address
5. Addresses with the PAUSER_ROLE can pause/unpause all token transfers

### Dependencies

- OpenZeppelin Contracts v5.3.0
- Hardhat v2.22.1
- Ethers v6.10.0