// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "hardhat/console.sol";

// struct Funders {
//     address addr;
//     uint amount;
// }


contract Decentra {
    // create a struct for Campaign;
    // update campaign: restricted to the person that created it;
    // return all campaign;
    // access control: someone who made a campaign can only checkCampaign;
    struct Funders {
        address addr;
        uint amount;
    }

    struct Campaign {
        address maker;
        address payable beneficiary;
        address[] contributors;
        uint fundGoals;
        uint amount;
        uint numFunders;
        mapping(uint => Funders) funders;
    }

    struct CampaignDemo {
        address payable beneficiary;
        uint fundGoals;
        uint amount;
        uint numFunders;
        address maker;
    }
    
    event AddCamp(address _maker, address _ben, uint _fundgoals);

    mapping(uint => CampaignDemo) campaignDemo;
    mapping(uint => Campaign)  campaigns;
    uint campaignId = 0;

    function addCampaign(address payable _ben, uint _fundGoals) public {
        campaignId++;
        Campaign storage campaign = campaigns[campaignId];
        campaign.maker = msg.sender;
        campaign.beneficiary = _ben;
        campaign.fundGoals = _fundGoals;

        emit AddCamp(msg.sender, _ben, _fundGoals);
    }

    function updateCampaign(uint _fundGoals, address payable _ben, uint _id) public onlyMaker(_id) {
        Campaign storage campaign = campaigns[campaignId];
        campaign.beneficiary = _ben;
        campaign.fundGoals = _fundGoals;
    }

    function contribute(uint _id) public payable {
       Campaign storage campaign = campaigns[_id];
        campaign.amount += msg.value;
        campaign.contributors.push(msg.sender);
        campaign.funders[campaign.numFunders++] = Funders({addr: msg.sender, amount: msg.value});
    }

    modifier onlyMaker(uint _id) {
       Campaign storage campaign = campaigns[_id];
       require(msg.sender == campaign.maker, "Not the maker");
       _;
    }

    function checkGoal(uint _id) public onlyMaker(_id) returns (bool) {
        Campaign storage campaign = campaigns[_id];
        if(campaign.amount < campaign.fundGoals) {
            console.log("false");   
            return false;
        }
         
        uint _amount = campaign.amount;
        campaign.amount = 0;
        campaign.beneficiary.transfer(_amount);
        // (bool success,) = campaign.beneficiary.call{value: _amount}("");
        // require(success, "Unsuccessful");
        console.log("true");
        return true;
    }

    // check amount contributed;
    function checkAmountContributed(uint _id) public view returns (uint) {
        Campaign storage campaign = campaigns[_id];
        return campaign.amount;
    }

    function getAllCampaign(uint _id) public  view returns(CampaignDemo memory c) {
        Campaign storage  campaign = campaigns[_id];
        c = campaignDemo[_id]; 
        c.beneficiary = campaign.beneficiary;
        c.fundGoals = campaign.fundGoals;
        c.amount = campaign.amount;
        c.numFunders = campaign.numFunders;
        c.maker = campaign.maker;
    }


    function getAllFunders(uint _id, uint _numFunders) public view returns(Funders[] memory f){
        f = new Funders[](_numFunders);
        for(uint i = 0; i < _numFunders; i++) {
            f[i] = campaigns[_id].funders[i];
        }
    }
}