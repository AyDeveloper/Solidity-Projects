/* eslint-disable prettier/prettier */
import { expect } from "chai";
import { ethers } from "hardhat";
import { IGreeter } from "../typechain";
let Greeteer:IGreeter;

let addString: string  = "We already did this";

const deployedContract :string = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

describe("Check that greeting is stored on chain", function () {
  before(async function () {
     Greeteer = await ethers.getContractAt("IGreeter", deployedContract) as IGreeter
      await Greeteer.setGreeting(addString);
  })

  it("Should return the new greeting once it's changed", async function () {
    const currentGreting: string = await Greeteer.greet();
    expect(currentGreting).to.equal(addString) 
  });
});
