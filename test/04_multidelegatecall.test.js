const { expect } = require("chai");
const { ethers } = require("hardhat");

async function deploy(name, ...params){
    const Contract = await ethers.getContractFactory(name);
    return await Contract.deploy(...params).then(f => f.deployed());
}

describe("MultiDelegateCall", function () {
    this.beforeEach(async function(){
        this.helper = await deploy("Helper");
        this.testMuliDelegatecall = await deploy("TestMuliDelegatecall");
        this.accounts = await ethers.getSigners();
    })

    it("create2 success", async function(){
        const sender = this.accounts[1];
        const testMuliDelegatecall = this.testMuliDelegatecall.connect(sender);
        const helper = this.helper;

        const x = 3;
        const y = 5;

        const data1 = await helper.getFunc1Data(x, y);
        console.log("data1===============", data1);
        const data2 = await helper.getFunc2Data();
        console.log("data2===============", data2);

        const receipt = await testMuliDelegatecall.muliDelegatecall([data1, data2]).then(tx => tx.wait());
        console.log("event0===============", receipt.events[0]);
        console.log("event1===============", receipt.events[1]);
    })
})