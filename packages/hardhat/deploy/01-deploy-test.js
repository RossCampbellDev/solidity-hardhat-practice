const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { GOERLI_CONTRACT_ADDRESS } = require("../hardhat-config")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`deployer is: ${deployer}`)
    const chainId = network.config.chainId
    console.log(`network: ${network.name} chainId: ${chainId}`)

    if (!GOERLI_CONTRACT_ADDRESS) {
        const args = [25] // initial supply
        const testContract = await deploy("test", {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
        })
    }

    //console.log(`deployed contract addr: ${await testContract.address}`)

    /*const deployedContract = await ethers.getContractAt(
        "test",
        await testContract.address,
        deployer
    )*/

    //console.log(`first person is: ${await deployedContract.getPerson(0)}`)
}

module.exports.tags = ["all"]
