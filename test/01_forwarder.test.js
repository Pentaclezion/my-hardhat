const { expect } = require("chai");
const { ethers } = require("hardhat");
const { signMetaTxRequest } = require("../src/signer")

async function deploy(name, ...params){
    const Contract = await ethers.getContractFactory(name);
    return await Contract.deploy(...params).then(f => f.deployed());
}

describe("contracts/SimpleRegistry", function () {
    beforeEach(async function(){
        this.forwarder = await deploy("MyForwarder");
        this.registry = await deploy("SimpleRegistry", this.forwarder.address);
        this.accounts = await ethers.getSigners();
    })
    it("registers a name directly", async function(){
        const name = "defender";
        const sender = this.accounts[1];
        const registry = this.registry.connect(sender);

        const receipt = await registry.registry(name).then(tx => tx.wait());
        expect(receipt.events[0].event).to.equal("Registryed");

        expect(await registry.owners(name)).to.equal(sender.address);
        expect(await registry.names(sender.address)).to.equal(name);
    })

    it("registers a name via a meta-tx", async function(){
        const name = "meta-tx";
        const signer = this.accounts[2];
        const relayer = this.accounts[3];
        const forwarder = this.forwarder.connect(relayer);
        const registry = this.registry;

        const { request, signature } = await signMetaTxRequest(signer.provider, forwarder, {
            from: signer.address,
            to: registry.address,
            data: registry.interface.encodeFunctionData("registry", [name]),
        });

        await forwarder.execute(request, signature).then(tx => tx.wait());

        expect(await registry.owners(name)).to.equal(signer.address);
        expect(await registry.names(signer.address)).to.equal(name);
    })


});