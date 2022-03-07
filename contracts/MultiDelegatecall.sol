// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MuliDelegatecall {
    error DelegatecallFailed();

    function muliDelegatecall(bytes[] memory data) external returns (bytes[] memory results) {
        results = new bytes[](data.length);
        for (uint i; i< data.length; i++) {
            (bool success, bytes memory res) = address(this).delegatecall(data[i]);
            if (!success) {
                revert DelegatecallFailed();
            }
            results[i] = res;
        }
        return results;
    }
}

contract TestMuliDelegatecall is MuliDelegatecall {
    event Log(address caller, string func, uint i);

    function func1(uint x, uint y) external {
        emit Log(msg.sender, "func1", x + y);
    }

    function func2() external returns (uint) {
        uint i = 2;
        emit Log(msg.sender, "func2", i);
        return i;
    }
}

contract Helper {
    function getFunc1Data(uint x, uint y) external pure returns (bytes memory) {
        return abi.encodeWithSelector(TestMuliDelegatecall.func1.selector, x, y);
    }
    function getFunc2Data() external pure returns (bytes memory) {
        return abi.encodeWithSelector(TestMuliDelegatecall.func2.selector);
    }
}