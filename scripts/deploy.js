async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    //const MyForwarder = await ethers.getContractFactory("MyForwarder");
    //const forwarder = await MyForwarder.deploy();
    //console.log("MyForwarder address:", forwarder.address);

    const SimpleRegistry = await ethers.getContractFactory("SimpleRegistry");
    const registry = await SimpleRegistry.deploy("0x38e645727d94e6d8A681778d0566905259Db0D15");
    console.log("SimpleRegistry address:", registry.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

 //npx hardhat run scripts/deploy.js --network <network-name>

/*  参考：
 https://github.com/NomicFoundation/hardhat-hackathon-boilerplate/blob/master/scripts/deploy.js
 https://hardhat.org/tutorial/hackathon-boilerplate-project.html */