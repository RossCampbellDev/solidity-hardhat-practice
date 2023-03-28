// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

error test__SomeError();
error test__NotOwner();

contract test {
    using Counters for Counters.Counter;

    address public owner;
    uint256 public i_initialSupply;
    uint256 public balance;
    Counters.Counter public population;
    mapping(uint256 => Person) people;
    AggregatorV3Interface private s_priceFeed;

    struct Person {
        uint256 _id;
        string _name;
        uint8 _age;
        address payable _wallet;
    }

    event SomeEvent(address indexed whoever);

    modifier isOwner(address who) {
        if (who != owner) {
            revert test__NotOwner();
        }
        _;
    }

    constructor(uint256 _inititialSupply, address _priceFeed) {
        owner = msg.sender;
        i_initialSupply = _inititialSupply;
        balance = 0;
        people[0] = Person(
            population.current(),
            "Ross",
            32,
            payable(msg.sender)
        );
        s_priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function mint() public payable isOwner(msg.sender) {
        balance += 1;
    }

    function newPerson(string memory _name, uint8 _age) public {
        population.increment();
        people[population.current()] = Person(
            population.current(),
            _name,
            _age,
            payable(msg.sender)
        );
    }

    function getPerson(uint256 n) public view returns (Person memory) {
        return people[n];
    }

    function getPopulation() public view returns (uint256) {
        return population.current();
    }

    function testAggregator() public view returns (uint256) {
        return s_priceFeed.version();
    }

    /*function getConversionRate(
        uint256 ethAmount
    ) public view returns (uint256) {
        uint256 ethPrice = getPrice(s_priceFeed);
        uint256 ethAmountInUsd = (ethPrice * ethAmount) /
            s_priceFeed.decimals();
        return ethAmountInUsd;
    }*/
}
