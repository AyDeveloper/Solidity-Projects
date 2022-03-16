
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IGreeter {

    function greet() external view returns (string memory);

    function setGreeting(string memory _greeting) external;
}

// npx hardhat node --fork  https://polygon-mainnet.g.alchemy.com/v2/DHTmwZY858vU7b_8rykPopXAq5mageJw
