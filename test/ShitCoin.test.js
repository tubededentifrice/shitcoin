const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ShitCoin", function () {
  let shitCoin;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const ShitCoin = await ethers.getContractFactory("ShitCoin");
    shitCoin = await ShitCoin.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await shitCoin.name()).to.equal("ShitCoin");
      expect(await shitCoin.symbol()).to.equal("SHIT");
    });

    it("Should assign the admin, minter, burner, and pauser roles to the deployer", async function () {
      const DEFAULT_ADMIN_ROLE = ethers.ZeroHash;
      const MINTER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MINTER_ROLE"));
      const BURNER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("BURNER_ROLE"));
      const PAUSER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("PAUSER_ROLE"));

      expect(await shitCoin.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.equal(true);
      expect(await shitCoin.hasRole(MINTER_ROLE, owner.address)).to.equal(true);
      expect(await shitCoin.hasRole(BURNER_ROLE, owner.address)).to.equal(true);
      expect(await shitCoin.hasRole(PAUSER_ROLE, owner.address)).to.equal(true);
    });
  });

  describe("Minting", function () {
    it("Should allow minter to mint tokens", async function () {
      await shitCoin.mint(addr1.address, 100);
      expect(await shitCoin.balanceOf(addr1.address)).to.equal(100);
    });

    it("Should prevent non-minters from minting tokens", async function () {
      await expect(
        shitCoin.connect(addr1).mint(addr2.address, 100)
      ).to.be.reverted;
    });
  });

  describe("Burning", function () {
    beforeEach(async function () {
      await shitCoin.mint(addr1.address, 1000);
    });

    it("Should allow burner to burn tokens from any address", async function () {
      await shitCoin.burnFrom(addr1.address, 100);
      expect(await shitCoin.balanceOf(addr1.address)).to.equal(900);
    });

    it("Should prevent non-burners from burning tokens", async function () {
      await expect(
        shitCoin.connect(addr1).burnFrom(addr1.address, 100)
      ).to.be.reverted;
    });
  });

  describe("Pausing", function () {
    beforeEach(async function () {
      await shitCoin.mint(addr1.address, 1000);
    });

    it("Should allow pauser to pause and unpause transfers", async function () {
      await shitCoin.pause();
      expect(await shitCoin.paused()).to.equal(true);

      await expect(
        shitCoin.connect(addr1).transfer(addr2.address, 100)
      ).to.be.reverted;

      await shitCoin.unpause();
      expect(await shitCoin.paused()).to.equal(false);

      await shitCoin.connect(addr1).transfer(addr2.address, 100);
      expect(await shitCoin.balanceOf(addr2.address)).to.equal(100);
    });

    it("Should prevent non-pausers from pausing", async function () {
      await expect(
        shitCoin.connect(addr1).pause()
      ).to.be.reverted;
    });
  });
});