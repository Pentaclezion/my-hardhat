const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params){
    const Contract = await ethers.getContractFactory(name);
    return await Contract.deploy(...params).then(f => f.deployed());
}

describe("Create2", function () {
    this.beforeEach(async function(){
        this.factory = await deploy("Create2Factory");
        this.accounts = await ethers.getSigners();
    })

    it("create2 success", async function(){
        const salt = 777;
        const sender = this.accounts[1];
        const factory = this.factory.connect(sender);

        const bytecode = await factory.getBytecode(sender.address);
        //console.log("bytecode===============", bytecode);

        const addr = await factory.getAddress(bytecode, salt);
        console.log("addr1===============", addr);

        const receipt = await factory.deploy(salt).then(tx => tx.wait());
        console.log("addr2===============", receipt.events[0].args.addr);

        expect(addr).to.equal(receipt.events[0].args.addr);
    })
})