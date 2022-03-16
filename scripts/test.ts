/* eslint-disable prettier/prettier */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
    // understanding creating a new contract with payload;
    // get the bytecode of the contract to create.
    const owners = await ethers.getSigners();
    const signer1 = owners[0].address;
    const signer = await ethers.getSigner(signer1);
    const contract = await ethers.getContractFactory('PamPamNft');
    const byteCode = contract.bytecode;
    const tx = {
        to: "0x000000000000000000000000000000000000dEaD",
        data: byteCode
    }
    // console.log(byteCode);
    const sendTx = await signer.sendTransaction(tx);
    const txW = await sendTx.wait();
    console.log(txW);

    
    
    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
