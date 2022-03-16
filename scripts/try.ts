/* eslint-disable prettier/prettier */
import { Signer } from "ethers";
import { ethers } from "hardhat";
const hre = require('hardhat');

async function getBalanceOf() {
  const address = "0x205ab90806513017463f3d3869efdc29cb78a6b7";
  const randAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
  const RBN = await ethers.getContractAt(
    "IERC20",
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  );

// @ts-ignore
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [address],
      });

      const signer: Signer = await ethers.getSigner(address);
     await RBN.connect(signer).transfer(randAddress, 2000000);
     const bal = await (await RBN).balanceOf(address);
     console.log(bal);

    }

getBalanceOf().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});