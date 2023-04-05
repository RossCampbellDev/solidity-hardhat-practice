require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const LOCALHOST_PRIVATE_KEY = process.env.LOCALHOST_PRIVATE_KEY
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.18" }, { version: "0.8.4" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
        Goerli: {
            url: GOERLI_RPC_URL,
            chainId: 5,
            accounts: [GOERLI_PRIVATE_KEY],
            blockConfirmations: 6,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // 0th account in the list?  eg the 10 sample accounts on a node
            Goerli: GOERLI_PRIVATE_KEY,
        },
    },
}
