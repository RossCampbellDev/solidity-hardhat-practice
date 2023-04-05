const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000

const networkConfig = {
    31337: {
        name: "localhost",
        ethUsdPriceFeed: "0x12345678123456781010",
    },
    5: {
        name: "Goerli",
        ethUsdPriceFeed: "0x12345678123456781010",
    }
}

module.exports = {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
    networkConfig,
}
