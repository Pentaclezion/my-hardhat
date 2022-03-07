// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";
import "hardhat/console.sol";

contract SimpleRegistry is ERC2771Context {
    event Registryed(address indexed who, string name);

    mapping(address => string) public names;
    mapping(string => address) public owners;

    constructor(MinimalForwarder forwarder)
        ERC2771Context(address(forwarder))
    {}

    function registry(string memory name) external {
        require(owners[name] == address(0), "Name take");
        address owner = _msgSender();

        console.log("owner:", owner);
        console.log("name:", name);

        owners[name] = owner;
        names[owner] = name;
        emit Registryed(owner, name);
    }
}
