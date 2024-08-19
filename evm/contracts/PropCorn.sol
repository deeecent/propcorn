// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

contract PropCorn {
    struct Proposal {
        string url;
        uint256 daysToUnlock;
        uint256 amountRequested;
        uint256 balance;
    }

    constructor() {}

    function createProposal(uint256 daysToUnlock) public {}
}
