//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IERC20 {
    function balanceOf(address _owner) external view returns(uint);
    function approve(address spender, uint value) external;
    function transfer(address to, uint256 amount) external returns (bool);
}

