// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

error Test__OwnerOnly();

contract test {
    // state variables
    address payable owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can use this");
        _;
    }

    // constrcutor
    constructor() {
        owner = payable(msg.sender);
    }

    function hello() public view onlyOwner returns (string memory) {
        return "YES!";
    }
}
