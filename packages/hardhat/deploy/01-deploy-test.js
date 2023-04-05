const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { GOERLI_CONTRACT_ADDRESS } = require("../hardhat.config")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress

    console.log(`network: ${network.name} chainId: ${chainId}`)
    console.log(`deployer is: ${deployer}`)

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    console.log(`price feed: ${ethUsdPriceFeedAddress}`)

    const args = [25, ethUsdPriceFeedAddress] // initial supply
    const testContract = await deploy("test", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Contract is: ${await testContract.name}`)
    log("-------------------------------------------------")
}

module.exports.tags = ["all"]
