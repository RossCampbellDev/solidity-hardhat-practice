const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { GOERLI_CONTRACT_ADDRESS } = require("../hardhat.config")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    
    console.log(`network: ${network.name} chainId: ${chainId}`)
    console.log(`deployer is: ${deployer}`)

    const args = [25] // initial supply
    const testContract = await deploy("test", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
}

module.exports.tags = ["all"]
