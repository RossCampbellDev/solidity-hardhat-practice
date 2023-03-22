const { ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const testContractFactory = await ethers.getContractFactory("testContract")
    const testContract = await testContractFactory.deploy()
    await testContract.deployed()

    // console.log(`${await testContract.hello()}`)
    console.log(`contract deployed to ${await testContract.address}`)
}

module.exports.tags = ["all","node"]
