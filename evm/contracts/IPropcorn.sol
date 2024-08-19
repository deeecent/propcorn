// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

interface IPropcorn {
    // Custom Errors
    error NonexistentProposal();
    error ProposalInProgress();
    error ProposalClosed();
    error InvalidOwner();

    // Structs
    struct Proposal {
        string url;
        uint256 secondsToUnlock;
        uint256 minAmountRequested;
        uint256 balance;
        uint256 fundingCompletedAt;
        bool closed;
    }

    // Events
    event ProposalCreated(
        address indexed from,
        uint256 index,
        string url,
        uint256 secondsToUnlock,
        uint256 minAmountRequested
    );

    event ProposalFunded(
        address indexed from,
        address indexed account,
        uint256 index,
        uint256 amount,
        uint256 fundingCompletedAt
    );

    event FundsWithdrawn(
        address indexed from,
        uint256 index,
        uint256 amount,
        address indexed to
    );

    // Functions
    function createProposal(
        string calldata url,
        uint256 secondsToUnlock,
        uint256 minAmountRequested
    ) external;

    function fundProposal(address account, uint256 index) external payable;

    function withdrawFunds(
        address account,
        uint256 index,
        address receiver
    ) external;

    function getProposalByAccount(
        address account,
        uint256 index
    ) external view returns (Proposal memory);
}
