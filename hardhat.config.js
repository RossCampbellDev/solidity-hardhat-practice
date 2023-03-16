require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")

const GOERLI_RPC = "https://eth-goerli.public.blastapi.io"
const GOERLI_PRIVATE_KEY =
    "6cf23613f510c13afc5aafa40c6ae6065226345b14088b6c167a1a9f9eba07d6"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_RPC,
            accounts: [GOERLI_PRIVATE_KEY],
            chainId: 5,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
}
