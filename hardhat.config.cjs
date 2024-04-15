require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
 
module.exports = {
  solidity: "0.8.20",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    fuji: {
      url: 'https://multi-radial-forest.avalanche-testnet.quiknode.pro/de572854dc71799b9a6dfc8aab85af2672225cf0/ext/bc/C/rpc',
      accounts: [`0x` + process.env.METAMASK_PRIVATE_KEY],
      chainId: 43113,
    },
  },
}