/* eslint-disable prettier/prettier */
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
    const KOVAN_FEED_REGISTRY_ADDRESS = "0xAa7F6f7f507457a1EE157fE97F6c7DB2BEec5cD0"

    const PriceConsumer = await ethers.getContractFactory("PriceConsumer");
    const consumer = await PriceConsumer.deploy(KOVAN_FEED_REGISTRY_ADDRESS);
    await consumer.deployed();

    const data = await consumer.getEthUsdPrice()
    console.log(data);

    // npx hardhat node --fork https://eth-kovan.alchemyapi.io/v2/IuR26H8L_gLbsQMU870vWtA3FIzrWj2J
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});






