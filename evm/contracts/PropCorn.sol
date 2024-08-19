// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

contract PropCorn {
    struct Proposal {
        string url;
        uint256 daysToUnlock;
        uint256 minAmountRequested;
        uint256 balance;
        bool finished;
    }

    mapping(address => Proposal[]) internal _proposals;

    constructor() {}

    function createProposal(string calldata url, uint256 daysToUnlock, uint256 minAmountRequested) public {}

    function fundProposal(address account, uint256 index) public payable {}

    function withdrawFunds(address account, uint256 index) public {}

    function getProposalByAccount(address account, uint256 index) public view returns (Proposal memory) {
        return _proposals[account][index];
    }

    receive() external payable {}

    /* 
      - Write:
        - create a proposal
        - fund a proposal with eth
        - redeem funds
      - Read:
        - get a proposal by address + proposal id
    // function listProposalsByAccount(address account, uint256 page) public view returns (Proposal[50] memory) {}
    */
}
