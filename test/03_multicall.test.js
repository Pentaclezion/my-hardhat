const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params){
    const Contract = await ethers.getContractFactory(name);
    return await Contract.deploy(...params).then(f => f.deployed());
}

describe("MultiCall", function () {
    this.beforeEach(async function(){
        this.multiCall = await deploy("MultiCall");
        this.testMultiCall = await deploy("TestMultiCall");
        this.accounts = await ethers.getSigners();
    })

    it("create2 success", async function(){
        const sender = this.accounts[1];
        const multiCall = this.multiCall.connect(sender);
        const testMultiCall = this.testMultiCall.connect(sender);

        const data1 = await testMultiCall.getData1();
        console.log("data1===============", data1);
        const data2 = await testMultiCall.getData2();
        console.log("data2===============", data2);

        const addr = testMultiCall.address;

        const res = await multiCall.multiCall([addr, addr], [data1, data2]);
        console.log("res===============", res);

    })
})