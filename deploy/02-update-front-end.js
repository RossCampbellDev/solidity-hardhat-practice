const { ethers } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDRESSES_FILE =
    "../../nextjs-test/constants/contractAddresses.json"
const FRONT_END_ABI_FILE = "../../nextjs-test/constants/abi.json"

module.exports = async function () {
    if (!process.env.UPDATE_FRONT_END) {
        console.log("updating front end info")
        updateContractAddresses()
        updateABI()
    } else {
        console.log("yeah nah")
    }
}

async function updateContractAddresses() {
    const test = await ethers.getContract("testContract")
    const currentAddresses = JSON.parse(
        fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8")
    )

    const chainId = network.config.chainId.toString()
    if (chainId in contractAddresses) {
        if (!currentAddresses[chainId].includes(test.address)) {
            currentAddresses[chainId].push(test.address)
        } else {
            currentAddresses[chainId] = [test.address]
        }
    }
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
}

async function updateABI() {
    const test = await ethers.getContract("testContract")
    fs.writeFileSync(
        FRONT_END_ABI_FILE,
        test.interface.format(ethers.utils.FormatTypes.json)
    )
}

module.exports.tags = ["all", "none"]
