const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDR_FILE = "../next/constants/contractaddresses.json"
const FRONT_END_ABI_FILE = "../next/constants/abi.json"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("updating front end...")
        console.log(process.cwd())
        await updateContractAddresses()
        await updateABI()
    }

    async function updateContractAddresses() {
        const testContract = await ethers.getContractAt(
            "test",
            "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
        )
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
        const testContract = await ethers.getContractAt(
            "test",
            "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
        )
        fs.writeFileSync(
            FRONT_END_ABI_FILE,
            testContract.interface.format(ethers.utils.FormatTypes.json)
        )
    }
}

module.exports.tags = ["all", "frontend"]
