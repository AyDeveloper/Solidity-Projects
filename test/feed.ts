/* eslint-disable prettier/prettier */
import { expect } from "chai";
import { ethers } from "hardhat";

const KOVAN_FEED_REGISTRY_ADDRESS = "0xAa7F6f7f507457a1EE157fE97F6c7DB2BEec5cD0"

describe("PriceConsumer", function() {
  it("Should return latest ETH / USD price", async function() {
    const PriceConsumer = await ethers.getContractFactory("PriceConsumer");
    const consumer = await PriceConsumer.deploy(KOVAN_FEED_REGISTRY_ADDRESS);
    await consumer.deployed();

    const data = await consumer.getEthUsdPrice()
    console.log(data);
    // const data1 = await consumer.getPrice("0x6135b13325bfC4B00278B4abC5e20bbce2D6580e", "0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13");
    // console.log(data1);
    
    
    expect(data.gte(0));
  });
});