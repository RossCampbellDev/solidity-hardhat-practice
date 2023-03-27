// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract test {
    address public owner;
    uint256 public i_initialSupply;
    uint256 public balance;
    uint256 population;
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
        population = 0;
        people[0] = Person(population, "Ross", 32, payable(msg.sender));
    }

    function mint() public payable {
        balance += 1;
    }

    function newPerson(string memory _name, uint8 _age) public {
        population++;
        people[population] = Person(
            population,
            _name,
            _age,
            payable(msg.sender)
        );
    }

    function getPerson(uint256 n) public view returns (Person memory) {
        return people[n];
    }
}
