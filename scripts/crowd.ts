/* eslint-disable prettier/prettier */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  // const Decentra = await ethers.getContractFactory("Decentra");
  // const decentra = await Decentra.deploy();
  // await decentra.deployed();

  // console.log("decentra deployed", decentra.address);
  

// get signers 
const signer = await ethers.getSigners();
const maker = await ethers.getSigner(signer[0].address);
// get contributors
const contributor1 = await ethers.getSigner(signer[2].address);
const contributor2 = await ethers.getSigner(signer[3].address);
// address of the beneficiary
const _ben = signer[1].address;
// instance of the already deployed contract
const decentra = await ethers.getContractAt('Decentra', "0x51C65cd0Cdb1A8A8b79dfc2eE965B1bA0bb8fc89");
// value to be passed when contributing to a fund
const option = {value: ethers.utils.parseEther('0.5')};

// add a crowdfund
// const tx = await decentra.connect(maker).addCampaign(_ben, ethers.utils.parseEther("1.0"));
// const txx = await tx.wait();
// console.log(txx);
// @ts-ignore
// console.log(txx.events[0].args);

// contribute to crowdfund
// const tx1 = await decentra.connect(contributor1).contribute(0, option);
// console.log(await tx1.wait());
// const dx = await decentra.connect(contributor2).contribute(0, option);

// check amount contributed
// const bal = await decentra.checkAmountContributed(0);
// console.log(bal);


// gets all campaign 
// const tx3 = await decentra.getAllCampaign(0);
// console.log(tx3);

// get all funders
// const tx4 = await decentra.getAllFunders(0, 1);
// console.log(tx4);

// check if goals have been completed 
// const tx2 = await decentra.connect(maker).checkGoal(1);
// console.log(await tx2.wait());

// check the balance of the beneficiary
// console.log(await signer[1].getBalance());

  // 0x5302E909d1e93e30F05B5D6Eea766363D14F9892
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
