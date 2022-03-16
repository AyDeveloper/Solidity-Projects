// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through node <script>.
//
// When running the script with npx hardhat run <script> you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { IGreeter } from "../typechain";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  const add: string = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const deployedContract = (await ethers.getContractAt(
    "IGreeter",
    add
  )) as IGreeter;
  await deployedContract.setGreeting("HELLO HELLO");

  console.log(await deployedContract.greet());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});