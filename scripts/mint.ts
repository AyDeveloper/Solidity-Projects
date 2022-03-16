/* eslint-disable prettier/prettier */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
// https://ipfs.io/ipfs/QmPrrj4vjJsFTjHSnTr2UHmPqYxXaf9xS8FVbujrTvmWB5
// https://ipfs.io/ipfs/QmXVX6Ru78M5qkzRycWiuLFT8bZcKRJcRhxQ9PXyymgmE2
  const _toAddr = "0x9ae1e982Fc9A9D799e611843CB9154410f11Fe35";
  const cAddr = "0x8aebfCa1709989efd896d76A8302F03097E220cF"

  // We get the contract to deploy
  const uri = "https://ipfs.io/ipfs/QmVoNQRGemJ3TsB99Mk3EF9PnQciaaZC3JtTNLm3wVqELo";
  const PamNft = await ethers.getContractAt("PamPamNft", cAddr);

  PamNft.mint(_toAddr, uri);
  console.log("done");
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
