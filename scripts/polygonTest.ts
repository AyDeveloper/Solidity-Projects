/* eslint-disable prettier/prettier */
import { BigNumber, BigNumberish, BytesLike, providers, Signer } from "ethers";
// import { ethers } from "hardhat";

// import { network } from "hardhat";
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function checkBalance() {

    const addr = "0x6045cb15e5c592da919ebf357b3cdd1c642c0bf4"
    const rand = "0x2d27e808a5be5484642ac1f090c5622355d3382a"
    const tetherAddr = await ethers.getContractAt('IERC20', '0x16B1eb8b8E9058800bF0bA3684F805A6711a1D2c');
    const result = await tetherAddr.balanceOf(addr);
    const result1 = await  tetherAddr.balanceOf(rand);
    console.log(result, result1);

    // setting the balance of the signer manually;
    
    // @ts-ignore
    await network.provider.send("hardhat_setBalance", [
      rand,
      "0x1000000000000000000000000000000000000",
    ])

   // @ts-ignore
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [rand],
    });

    const signer:Signer = await ethers.getSigner(rand);
    await tetherAddr.connect(signer).transfer(addr, "200000");

    const resultAfter = await tetherAddr.balanceOf(addr);
    const resultAfter1 = await  tetherAddr.balanceOf(rand);

    console.log(`this is the result after ${resultAfter}, and ${resultAfter1}`);
    
    // check out storage layout, evm structure, how mappings are stored in the evm by jean cvllr; 
    const together:BytesLike = new ethers.utils.AbiCoder().encode(['address', 'uint256'], ['0x7d843005c7433c16b27ff939cb37471541561ebd', 0]);
    const position: BytesLike = ethers.utils.solidityKeccak256(['bytes'], [together])

    const dec: BigNumberish = BigNumber.from(position);
    console.log(dec);
    const balance = await ethers.provider.getStorageAt(tetherAddr.address, dec);
    console.log(`balance is ${balance}`);
    
    //@ts-ignore
    await network.provider.send("hardhat_setStorageAt", [
      tetherAddr.address,
      position,
      "0x00000000000000000000000000000000000000000000D3C21BCECCEDA1000000",
    ]);

    const balAfter = await tetherAddr.balanceOf("0x7d843005c7433c16b27ff939cb37471541561ebd");
    console.log(`balance after rigging is ${balAfter}`);
    

    // console.log(await result);
}

checkBalance().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });


