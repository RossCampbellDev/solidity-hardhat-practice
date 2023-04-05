const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    const testFactory = await ethers.getContractFactory("test")
    const testContract = await testFactory.deploy(25)
    await testContract.deployed()
    console.log(`first person: ${await testContract.getPerson(0)}`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
