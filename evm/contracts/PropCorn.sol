// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

contract Propcorn {
    struct Proposal {
        string url;
        uint256 daysToUnlock;
        uint256 minAmountRequested;
        uint256 balance;
        bool finished;
        uint256 minAmountTimestamp;
    }

    mapping(address => Proposal[]) internal _proposals;

    constructor() {}
    /*
    To do:
    -Timestamp from the Date the user wants in days(daysToUnlock)
    -daysToUnlock 
    */
    function createProposal(string calldata url, uint256 daysToUnlock, uint256 minAmountRequested) public {
        _proposals[msg.sender].push(Proposal(url, daysToUnlock, minAmountRequested, 0, false, 0));
    }

    function fundProposal(address account, uint256 index) public payable {
        _proposals[account][index].balance += msg.value;
        if (_proposals[account][index].balance >= _proposals[account][index].minAmountRequested) {

          _proposals[account][index].minAmountTimestamp = block.timestamp;
        }
    }

    /* TODO:
    -require time passed
    - replace require with error
    */
    //WIP
    function withdrawFunds(address account, uint256 index) public {
        require(account != address(0));
        require(_proposals[account][index].balance > 0);
        require(_proposals[account][index].minAmountTimestamp - block.timestamp >= _proposals[account][index].daysToUnlock);
        uint256 _amount = address(this).balance;
        payable(account).transfer(_amount);
        _proposals[account][index].finished = true;
    }

    function getProposalByAccount(address account, uint256 index) public view returns (Proposal memory) {
        return _proposals[account][index];
    }

    //WIP
    function getTimeLeftToUnlock(address account, uint256 index) public view returns (uint256) {
        return _proposals[account][index].minAmountTimestamp - block.timestamp;
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
