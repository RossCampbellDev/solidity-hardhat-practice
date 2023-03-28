const { assert, expect } = require("chai")
const { ethers, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("test this contract!", async function () {
          let testContract, testContract2, deployer
          const chainId = network.config.chainId

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              //testContract = await ethers.getContract("test", deployer)
              testContract2 = await deployments.get("test")
              testContract = await ethers.getContractAt(
                  testContract2.abi,
                  testContract2.address
              )
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
              it("sets up a counter from the openzeppelin counters library", async function () {
                  const population = await testContract.getPopulation()
                  assert(population == 0)
              })
              it("increments counter when adding a person", async function () {
                  await testContract.newPerson("Ross", 32)
                  const population = await testContract.getPopulation()
                  assert(population > 0)
              })
          })
      })
