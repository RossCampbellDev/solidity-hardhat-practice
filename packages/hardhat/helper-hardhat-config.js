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
    },
    11155111: {
        name: "Sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    }
}

module.exports = {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
    networkConfig,
}
