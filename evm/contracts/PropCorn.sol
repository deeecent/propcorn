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

    constructor() {
    }

    function createProposal(string calldata url, uint256 daysToUnlock, uint256 minAmountRequested) public {
        _proposals[msg.sender].push(Proposal(url, daysToUnlock, minAmountRequested, address(this).balance, false));
    }

    function fundProposal(address account, uint256 index) public payable {
        _proposals[account][index].balance += msg.value;
    }


    /* TODO:
    -require time passed
    */
    function withdrawFunds(address account, uint256 index) public {
      require(account != address(0));
      require(address(this).balance > 0);
      uint256 _amount = address(this).balance;
      payable(account).transfer(_amount);
      _proposals[account][index].finished = true;
    }

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
