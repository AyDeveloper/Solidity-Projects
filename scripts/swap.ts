/* eslint-disable prettier/prettier */
import { Signer } from "ethers";
import { ethers } from "hardhat";

// const UNIROUTERADDR = "0xf164fC0Ec4E93095b804a4795bBe1e041497b92a";
// The uniswap v2 router contract address that helps us swaptokenfortokens
const UNIROUTERADDR = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
// the 
const USDTCONTRACTADDR = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
// address of the usdtholder that we want to impersonate & 
// swap an amount of usdt for uni tokens.
const USDTHOLDER = "0xe3011271416f3a827e25d5251d34a56d83446159";
// address of the uni token contract.
const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
// amount to deposit for swap...the usdt uses 6 decimals
const AmountIn = 10000e6;
// this function performs the swap.
async function swap() {
    // swap usdt to uni token;
    // this signer serves as the person initiating the transaction (msg.sender)
    const usdtSigner: Signer = await ethers.getSigner(USDTHOLDER);
    // getting the instance of router contract
    const router = await ethers.getContractAt('IRouter', UNIROUTERADDR, usdtSigner);
    // getting the instance of the usdtContract
    const usdtContract = await ethers.getContractAt("IERC20", USDTCONTRACTADDR, usdtSigner);
    // getting the instance of the uni token contract
    const uniContract = await ethers.getContractAt('IERC20', UNI);
    console.log(`balance before is ${await uniContract.balanceOf(USDTHOLDER)}`);
      
    // impersonating the account on the mainnet after forking the mainnet;
    // @ts-ignore
      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [USDTHOLDER],
      });
    
    // setting the balance of the signer manually;
    // @ts-ignore
    await network.provider.send("hardhat_setBalance", [
        USDTHOLDER,
        "0x2000000000000000000000000000000000000",
      ])
    

    // approve
    console.log(`We are approving Unirouter to spend ${AmountIn}`);
      // set approval for routercontract to spend on behalf of the usdtHolder;
      // approval is done in the usdt contract
    await usdtContract.approve(UNIROUTERADDR, AmountIn);
    console.log(`swapping ${AmountIn}USDT`);
    // the router now swap tokens after being approved;
    await router.swapExactTokensForTokens(AmountIn, 0,[USDTCONTRACTADDR, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", UNI],USDTHOLDER,1648739821)
       console.log(`balance now is ${await uniContract.balanceOf(USDTHOLDER)}`);
    }
swap().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

  