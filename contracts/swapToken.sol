//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import  "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Swap {

    uint public ethUsdPrice;
    uint public daiUsdPrice;
    // address dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address dai = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    IERC20 daiContract = IERC20(dai);

    function setPrice(uint _ethUsdPrice, uint _daiUsdPrice) public {
        ethUsdPrice = _ethUsdPrice;
        daiUsdPrice = _daiUsdPrice;
    }

    function swapEtherforDai() public payable {
        // get use internal function to get amount in dai;
        uint  daiAmount = ((getDaiQty()) / 100000);
        // a function that approves this contract the price in dai;
        daiContract.approve(address(this), daiAmount);
        // a function that transfer the dai to msg.sender;
        daiContract.transfer(msg.sender, daiAmount);(msg.sender, daiAmount);
    }

    function getDaiQty() public view returns(uint) {
        return (ethUsdPrice / daiUsdPrice) * 100000; 
    } 

    function getDaiBalance() public view returns(uint) {
        return daiContract.balanceOf(msg.sender);
    }


}