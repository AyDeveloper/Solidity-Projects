/* eslint-disable prettier/prettier */
import { ethers } from "hardhat";
const provider = new ethers.providers.JsonRpcProvider("https://eth-kovan.alchemyapi.io/v2/IuR26H8L_gLbsQMU870vWtA3FIzrWj2J")
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331"
const btcAddr = "0x6135b13325bfC4B00278B4abC5e20bbce2D6580e"
const priceFeed = new ethers.Contract(addr, aggregatorV3InterfaceABI, provider)
const priceFeed1 = new ethers.Contract(btcAddr, aggregatorV3InterfaceABI, provider)
priceFeed.latestRoundData()
// @ts-ignore
    .then((roundData) => {
        // Do something with roundData
        console.log("ETH/USD", (roundData.answer.toString() / Math.pow(10, 8)).toFixed(2))
    }) // 255770000000 
priceFeed1.latestRoundData()
// @ts-ignore
    .then((roundData) => {
        // Do something with roundData
        console.log("BTC/USD", (roundData.answer.toString() / Math.pow(10, 8)).toFixed(2))
    })

    // Base Address: 0x6135b13325bfC4B00278B4abC5e20bbce2D6580e
    // Quote: EUR/USD
    // Quote Address: 0x0c15Ab9A0DB086e062194c273CC79f41597Bbf13
    // Decimals: 8