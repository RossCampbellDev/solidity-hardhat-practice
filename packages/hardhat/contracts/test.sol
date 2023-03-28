// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";

contract test {
    using Counters for Counters.Counter;

    address public owner;
    uint256 public i_initialSupply;
    uint256 public balance;
    Counters.Counter public population;
    mapping(uint256 => Person) people;

    struct Person {
        uint256 _id;
        string _name;
        uint8 _age;
        address payable _wallet;
    }

    constructor(uint256 _inititialSupply) {
        owner = msg.sender;
        i_initialSupply = _inititialSupply;
        balance = 0;
        people[0] = Person(
            population.current(),
            "Ross",
            32,
            payable(msg.sender)
        );
    }

    function mint() public payable {
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
}
