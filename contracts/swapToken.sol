//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import  "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Swap {

    uint public ethUsdPrice;
    uint public daiUsdPrice;

    event SwapEvent(uint _daiAmount);
    address dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;

    IERC20 daiContract = IERC20(dai);

    function setPrice(uint _ethUsdPrice, uint _daiUsdPrice) public {
        ethUsdPrice = _ethUsdPrice;
        daiUsdPrice = _daiUsdPrice;
    }

    function swapEtherforDai() public payable {
        require(msg.value > 0, "Input amount must be positive");
        uint amountOfEther = msg.value;
        uint daiAmount = getDaiQty(amountOfEther);
        emit SwapEvent(daiAmount);
    }

    function getDaiQty(uint _amount) public view returns(uint) {
        // get the eQuivalent of ether 
        uint usdValue = _amount * ethUsdPrice;
        return (usdValue / (daiUsdPrice * 10e17)); 
    } 

    function getDaiBalance(address _addr) public view returns(uint) {
        return daiContract.balanceOf(_addr);
    }


}