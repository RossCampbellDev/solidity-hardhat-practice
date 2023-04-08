const { ethers, getNamedAccounts, network } = require("hardhat")
require("dotenv").config()

const GOERLI_CONTRACT_ADDRESS = process.env.GOERLI_CONTRACT_ADDRESS
const GOERLI_WALLET = process.env.GOERLI_WALLET

async function main() {
    if (GOERLI_CONTRACT_ADDRESS) {
        const deployedContract = await ethers.getContractAt(
            "test",
            GOERLI_CONTRACT_ADDRESS,
            GOERLI_WALLET
        )
        if (deployedContract) {
            console.log(`got the contract at ${deployedContract.address}`)
            console.log(`owner: ${await deployedContract.owner()}`)
            console.log(`first person: ${await deployedContract.getPerson(0)}`)
        }
    } else {
        console.log("missing a contract address")
    }
}

main()
