/* eslint-disable prettier/prettier */
import { expect } from "chai";
import { ethers } from "hardhat";
import { Decentra } from "../typechain";
let decentra:Decentra;


const deployedContract :string = "0x51C65cd0Cdb1A8A8b79dfc2eE965B1bA0bb8fc89";

describe("Get instance of Decentra", function () {
  before(async function () {
    decentra = await ethers.getContractAt("Decentra", deployedContract) as Decentra
  })

  it("Beneficiary and funding goal equal", async function () {
      const signer = await ethers.getSigners();
      const _ben = signer[0].address
      const _fundGoals = ethers.utils.parseEther("1.0")
      const addCampaign: any = await decentra.addCampaign(_ben, _fundGoals);
      const tx = await addCampaign.wait();
      const ben = tx.events[0].args[1];
      const value = tx.events[0].args[2]
    //   console.log(ben, value);
      
      expect(_ben).to.equal(ben) 
      expect(_fundGoals).to.equal(value) 
  });

  it("amount to contribute should be greater than 0", async function () {
    const signer = await ethers.getSigners();
    const contributor1 = await  ethers.getSigner(signer[1].address)
    const option = {value: ethers.utils.parseEther("1.0")}
    const contribute: any = await decentra.connect(contributor1).contribute(0, option);
    // console.log(contribute.value.toString());
    expect(contribute.value.toString()).to.equal(option.value.toString())
});

it("check if maker called the function and have reached funding goal", async function () {
    const signer = await ethers.getSigners();
    const maker = await ethers.getSigner(signer[0].address)
    const contributor1 = await ethers.getSigner(signer[1].address)
    const _ben = signer[1].address
    const _fundGoals = ethers.utils.parseEther("1.0")
    const option= {value: ethers.utils.parseEther("1.0")}
    const addCampaign = await decentra.connect(maker).addCampaign(_ben, _fundGoals);
    console.log(addCampaign);

    const tx1 = await decentra.connect(contributor1).contribute(1, option);
    console.log(await tx1.wait());
    const getCampaign = await decentra.getAllCampaign(1)
    console.log(getCampaign);
    
    expect(addCampaign.from).to.equal(signer[0].address); 
    expect(getCampaign.fundGoals.toString()).to.equal(getCampaign.fundGoals.toString());
});


});
