const { ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const testContractFactory = await ethers.getContractFactory("test")
    const testContract = await testContractFactory.deploy()
    await testContract.deployed()

    console.log(`${await testContract.hello()}`)
    console.log(`${await testContract.address}`)
}
