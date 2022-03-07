require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

const ALCHEMY_API_KEY = "xxxxxx";
const ROPSTEN_PRIVATE_KEY = "xxxxxxxx";

//npx hardhat accounts
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});
//npx hardhat balance --account 0xxxxxxxxx
task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);
    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      //npx hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/<key> --fork-block-number 11095000
      /* forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/<key>",
        blockNumber: 11095000
      } */
      /* mining: {
        auto: false,
        //interval: 5000
        interval: [3000, 6000],
        mempool: {
          //priority: gas优先；fifo：到达顺序优先
          order: "fifo" 
        }
      } */
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      chainId : 80001,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`]
    }
  }, 
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
