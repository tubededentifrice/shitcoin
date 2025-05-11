const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying ShitCoin token...");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const ShitCoin = await ethers.getContractFactory("ShitCoin");
  const shitCoin = await ShitCoin.deploy();

  console.log("ShitCoin deployed to:", await shitCoin.getAddress());
  console.log("Token name:", await shitCoin.name());
  console.log("Token symbol:", await shitCoin.symbol());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });