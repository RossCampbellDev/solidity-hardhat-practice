const { assert, expect } = require("chai")
const { ethers, getNamedAccounts, deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("test this contract!", async function () {
          let testContract, testContract2, deployer, aggregator
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
              aggregator2 = await deployments.get("MockV3Aggregator")
              aggregator = await ethers.getContractAt(
                  aggregator2.abi,
                  aggregator2.address
              )
          })

          describe("test the aggregator mock", async function () {
              it("retrieves the aggregator version", async function () {
                  const ver = await testContract.testAggregator()
                  console.log(`agg version: ${ver} [should be 0 on mock]`)
                  assert(ver != null)
              })
              it("gives us latest round data", async function () {
                  const data = await testContract.getRoundData()
                  console.log(`latest round data: ${data}`)
                  assert(data > 0)
              })
              it("returns a price", async function () {
                  const price = await testContract.getPriceFromConverter()
                  console.log(`price: ${price}`)
                  assert(price > 0)
              })
              it("converts ETH to USD", async function () {
                  const conversion = await testContract.convertEthToUsd(5)
                  console.log(`converted 5 ETH to ${conversion} USD`)
                  assert(conversion > 0)
              })
          })

          describe("test.sol constructor", async function () {
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
          })

          describe("test the test.sol contract", async function () {
              it("increments counter when adding a person", async function () {
                  await testContract.newPerson("Ross", 32)
                  const population = await testContract.getPopulation()
                  assert(population > 0)
              })
          })
      })
