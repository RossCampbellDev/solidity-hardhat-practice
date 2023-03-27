const { assert, expect } = require("chai")
const { ethers, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("test this contract!", async function () {
          let testContract, deployer
          const chainId = network.config.chainId

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])

              testContract = await ethers.getContract("test", deployer)
          })

          describe("constructor", async function () {
              it("initialises with an initial supply > 0", async function () {
                  const init_supply = await testContract.i_initialSupply()
                  expect(init_supply).to.be.above(0)
              })
              it("establishes an owner", async function () {
                  const owner = await testContract.owner()
                  assert(owner != null)
              })
              it("contains a person", async function () {
                  const person = await testContract.getPerson(0)
                  assert(person._name != null)
              })
          })
      })
