//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

// https://ipfs.io/ipfs/QmdpAiDcSqYPdw7hJQnXwhk3TeqKhoz9Q8eiayuztqx7wQ

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IGreeter {

    function greet() external view returns (string memory);

    function setGreeting(string memory _greeting) external;
}

import { ethers } from "hardhat";
import { Greeter } from "../typechain";

async function main() {
  const add: string = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const deployGreeter = await ethers.getContractAt("IGreeter", add);
  await deployGreeter.setGreeting("Free Me");
  console.log(deployGreeter.greet());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


