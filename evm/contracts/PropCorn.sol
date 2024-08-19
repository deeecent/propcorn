// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

error InvalidUnlockTime(uint256 unlockTime);
error NotOwner(address owner);
error UnlockTimeNotReached(uint256 unlockTime);

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
