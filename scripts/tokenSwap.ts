/* eslint-disable prettier/prettier */
import { Signer } from "ethers";
import { ethers } from "hardhat";

const EtherHolder = "0x095e64b9333e4f46b606fca1dfab676cf266e7cd";
const daiHolder = "0x748de14197922c4ae258c7939c7739f3ff1db573";

// this function performs the swap.
async function swap() {
  // swap usdt to uni token;
  // this signer serves as the person initiating the transaction (msg.sender)
  const etherSigner: Signer = await ethers.getSigner(EtherHolder);
  const daiSigner: Signer = await ethers.getSigner(daiHolder);
  // getting the instance of router contract

  // impersonating the account on the mainnet after forking the mainnet;
  // @ts-ignore
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [EtherHolder],
  });

    // @ts-ignore
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [daiHolder],
    });

  // @ts-ignore
  await network.provider.send("hardhat_setBalance", [
    EtherHolder,
    "0x2000000000000000000000000000000000000",
  ])

   // @ts-ignore
//    await network.provider.send("hardhat_setBalance", [
//     daiHolder,
//     "0x2000000000000000000000000000000000000",
//   ])

  console.log(await etherSigner.getBalance());

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
  const daiAddr = "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9";
  const priceFeed = new ethers.Contract(
    addr,
    aggregatorV3InterfaceABI,
    provider
  );
  const priceFeed1 = new ethers.Contract(
    daiAddr,
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

    const option = {
                     value: ethers.utils.parseEther('3.0')
                   };

    await swap.setPrice(tx1, tx2);
    // console.log(await swap.ethUsdPrice());
    // console.log(await swap.daiUsdPrice());
    // console.log(await swap.getDaiQty("3000000000000000000"));
    console.log("balance before is", await swap.getDaiBalance(EtherHolder));
    const daiContract = await ethers.getContractAt("IERC20", "0x6B175474E89094C44Da98b954EedeAC495271d0F");
    const vx = await swap.connect(etherSigner).swapEtherforDai(option)
    .then(async result => {
      //@ts-ignore
      const daiAmount = (await result.wait()).events[0].args[0];
      // @ts-ignore
        const tx =  await daiContract.connect(daiSigner).transfer(EtherHolder, daiAmount); 
        const daiBalance2 = await swap.getDaiBalance(EtherHolder);
        console.log(`balance after is ${daiBalance2}`);
    })



    
    
}
swap().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
