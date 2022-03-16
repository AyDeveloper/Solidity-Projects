/* eslint-disable prettier/prettier */
import { Signer } from "ethers";
import { ethers } from "hardhat";

const EtherHolder = "0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5";

// this function performs the swap.
async function swap() {
  // swap usdt to uni token;
  // this signer serves as the person initiating the transaction (msg.sender)
  const etherSigner: Signer = await ethers.getSigner(EtherHolder);
  // getting the instance of router contract

  // impersonating the account on the mainnet after forking the mainnet;
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [EtherHolder],
  });

//   console.log(await etherSigner.getBalance());

  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.alchemyapi.io/v2/DHTmwZY858vU7b_8rykPopXAq5mageJw"
  );
  const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
  const btcAddr = "0xeE636E1f7A0A846EEc2385E729CeA7D1b339D40D";
  const priceFeed = new ethers.Contract(
    addr,
    aggregatorV3InterfaceABI,
    provider
  );
  const priceFeed1 = new ethers.Contract(
    btcAddr,
    aggregatorV3InterfaceABI,
    provider
  );
   const ethToUsd = await  priceFeed.latestRoundData();
   const daiToUsd = await  priceFeed1.latestRoundData();
   const tx1 = Math.floor(Number((ethToUsd.answer.toString() / Math.pow(10, 8)).toFixed(2)));
   const tx2 = Math.floor(Number((daiToUsd.answer.toString() / Math.pow(10, 8)).toFixed(2)));
    console.log(tx1, tx2);

    const swapContract = await ethers.getContractFactory("Swap");
    const swap = await swapContract.deploy();
    await swap.deployed();

    const price = await swap.setPrice(tx1, tx2);
    const price1 =  await swap.ethUsdPrice();
    const price2 = await swap.daiUsdPrice();
    const daiQty = await swap.getDaiQty();
    
    // swap dai 
    const option = {value: ethers.utils.parseEther("1.0")}

    const swapToDai = await swap.connect(etherSigner).swapEtherforDai(option);

    // check daiBalance 
    const daiBalance = await swap.connect(etherSigner).getDaiBalance();
    console.log(price1, price2);
    console.log(daiQty);
    console.log(daiBalance);
    

}
swap().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
