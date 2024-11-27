// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Propcorn is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    // Errors
    error NonexistentProposal();
    error ProposalInProgress();
    error FundsLocked();
    error NoFundsToReturn();
    error ProposalClosed();
    error InvalidOwner();
    error InvalidFee();

    // Events
    event ProposalCreated(
        address indexed from,
        uint256 index,
        string url,
        uint256 secondsToUnlock,
        uint256 minAmountRequested,
        uint256 feeBasisPoints
    );

    event ProposalFunded(
        address indexed from,
        address indexed account,
        uint256 index,
        uint256 amount,
        uint256 fundingCompletedAt
    );

    event ProposalDefunded(
        address indexed from,
        address indexed account,
        uint256 index,
        uint256 amount
    );

    event FundsWithdrawn(
        address indexed from,
        uint256 index,
        uint256 amount,
        address to
    );

    // Structs and data
    struct Proposal {
        string url;
        uint256 secondsToUnlock;
        uint256 minAmountRequested;
        uint256 balance;
        uint256 fundingCompletedAt;
        uint256 feeBasisPoints;
        bool closed;
    }

    // keccak256(address, proposal creator address, proposal index) is the key to the balance;
    mapping(uint256 => uint256) internal _addressAndProposalToBalance;
    mapping(address => Proposal[]) internal _proposals;
    address payable internal _protocolFeeReceiver;

    function initialize(
        address payable protocolFeeReceiver
    ) public initializer {
        _protocolFeeReceiver = protocolFeeReceiver;
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function _authorizeUpgrade(address) internal virtual override onlyOwner {}

    modifier proposalExists(address account, uint256 index) {
        if (_proposals[account].length <= index) {
            revert NonexistentProposal();
        }
        _;
    }

    function createProposal(
        string calldata url,
        uint256 secondsToUnlock,
        uint256 minAmountRequested,
        uint256 feeBasisPoints
    ) public {
        if (feeBasisPoints > 10000) {
            revert InvalidFee();
        }
        _proposals[msg.sender].push(
            Proposal(
                url,
                secondsToUnlock,
                minAmountRequested,
                0,
                0,
                feeBasisPoints,
                false
            )
        );

        emit ProposalCreated(
            msg.sender,
            _proposals[msg.sender].length - 1,
            url,
            secondsToUnlock,
            minAmountRequested,
            feeBasisPoints
        );
    }

    function fundProposal(
        address account,
        uint256 index
    ) public payable proposalExists(account, index) {
        Proposal storage proposal = _proposals[account][index];
        if (proposal.closed) {
            revert ProposalClosed();
        }

        _addressAndProposalToBalance[
            uint256(keccak256(abi.encodePacked(msg.sender, account, index)))
        ] += msg.value;

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

    function defundProposal(
        address account,
        uint256 index
    ) public proposalExists(account, index) {
        Proposal storage proposal = _proposals[account][index];

        if (proposal.closed) {
            revert ProposalClosed();
        }

        if (proposal.fundingCompletedAt > 0) {
            revert FundsLocked();
        }

        uint256 key = uint256(
            keccak256(abi.encodePacked(msg.sender, account, index))
        );

        uint256 toReturn = _addressAndProposalToBalance[key];

        if (toReturn == 0) {
            revert NoFundsToReturn();
        }
        _addressAndProposalToBalance[key] = 0;

        proposal.balance -= toReturn;
        payable(msg.sender).transfer(toReturn);

        emit ProposalDefunded(msg.sender, account, index, toReturn);
    }

    function withdrawFunds(
        address account,
        uint256 index,
        address receiver
    ) public proposalExists(account, index) {
        Proposal storage proposal = _proposals[account][index];

        if (account != msg.sender) {
            revert InvalidOwner();
        }

        if (proposal.closed) {
            revert ProposalClosed();
        }

        if (
            proposal.fundingCompletedAt == 0 ||
            block.timestamp - proposal.fundingCompletedAt <
            proposal.secondsToUnlock
        ) {
            revert ProposalInProgress();
        }

        proposal.closed = true;

        uint256 protocolFee = (proposal.balance * proposal.feeBasisPoints) /
            10_000;

        payable(receiver).transfer(proposal.balance - protocolFee);
        payable(_protocolFeeReceiver).transfer(protocolFee);

        emit FundsWithdrawn(
            msg.sender,
            index,
            proposal.balance - protocolFee,
            receiver
        );
    }

    function getProposalByAccount(
        address account,
        uint256 index
    ) public view proposalExists(account, index) returns (Proposal memory) {
        return _proposals[account][index];
    }
}
