// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

error NonexistentProposal();

contract Propcorn {
    struct Proposal {
        string url;
        uint256 daysToUnlock;
        uint256 minAmountRequested;
        uint256 balance;
        uint256 fundingCompletedAt;
        bool finished;
    }

    mapping(address => Proposal[]) internal _proposals;

    event ProposalCreated(
        address from,
        uint256 index,
        string url,
        uint256 daysToUnlock,
        uint256 minAmountRequested
    );

    event ProposalFunded(
        address from,
        address account,
        uint256 index,
        uint256 amount,
        uint256 fundingCompletedAt
    );

    event FundsWithdrawn(
        address from,
        uint256 index,
        uint256 amount,
        address to
    );

    modifier proposalExists(address account, uint256 index) {
        if (_proposals[account].length <= index) {
            revert NonexistentProposal();
        }
        _;
    }

    /*
    To do:
    -Timestamp from the Date the user wants in days(daysToUnlock)
    -daysToUnlock 
    */
    function createProposal(
        string calldata url,
        uint256 daysToUnlock,
        uint256 minAmountRequested
    ) public {
        _proposals[msg.sender].push(
            Proposal(url, daysToUnlock, minAmountRequested, 0, 0, false)
        );

        emit ProposalCreated(
            msg.sender,
            _proposals[msg.sender].length - 1,
            url,
            daysToUnlock,
            minAmountRequested
        );
    }

    function fundProposal(
        address account,
        uint256 index
    ) public payable proposalExists(account, index) {
        Proposal storage proposal = _proposals[account][index];
        proposal.balance += msg.value;
        if (
            proposal.fundingCompletedAt == 0 &&
            proposal.balance >= proposal.minAmountRequested
        ) {
            proposal.fundingCompletedAt = block.timestamp;
        }

        emit ProposalFunded(
            msg.sender,
            account,
            index,
            msg.value,
            proposal.fundingCompletedAt
        );
    }

    /* TODO:
    -require time passed
    - replace require with error
    */
    //WIP
    function withdrawFunds(address account, uint256 index) public {
        require(account != address(0));
        require(_proposals[account][index].balance > 0);
        require(
            _proposals[account][index].fundingCompletedAt - block.timestamp >=
                _proposals[account][index].daysToUnlock
        );
        uint256 _amount = address(this).balance;
        payable(account).transfer(_amount);
        _proposals[account][index].finished = true;
    }

    function getProposalByAccount(
        address account,
        uint256 index
    ) public view returns (Proposal memory) {
        return _proposals[account][index];
    }

    //WIP
    function getTimeLeftToUnlock(
        address account,
        uint256 index
    ) public view returns (uint256) {
        return _proposals[account][index].fundingCompletedAt - block.timestamp;
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
