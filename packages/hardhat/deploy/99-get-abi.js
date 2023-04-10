const { ethers, network } = require("hardhat")
const fs = require("fs")
require("dotenv").config()

const FRONT_END_ADDR_FILE = "../next/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../next/constants/abi.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END === true || 1) {
        console.log("updating front end...")
        await updateContractAddresses()
        await updateABI()
    }

    async function updateContractAddresses() {
        const testContract = await deployments.get("test")

        const currentAddresses = JSON.parse(
            fs.readFileSync(FRONT_END_ADDR_FILE, "utf-8")
        )
        const chainId = network.config.chainId.toString()

        if (chainId in currentAddresses) {
            if (!currentAddresses[chainId].includes(testContract.address)) {
                currentAddresses[chainId].push(testContract.address)
            }
        }
        {
            currentAddresses[chainId] = [testContract.address]
        }
        fs.writeFileSync(FRONT_END_ADDR_FILE, JSON.stringify(currentAddresses))
    }

    async function updateABI() {
        // const testContract = await ethers.getContractAt(
        //     "test",
        //     "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
        // )
        const testContract = await deployments.get("test")
        fs.writeFileSync(
            FRONT_END_ABI_FILE,
            JSON.stringify(testContract.abi)
            //testContract.interface.format(ethers.utils.FormatTypes.json)
        )
    }
}

module.exports.tags = ["all", "frontend"]
