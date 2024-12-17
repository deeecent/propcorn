// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Propcorn is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    // Errors
    error NonexistingProposal();
    error ProposalWasCanceled();
    error ProposalFunding();
    error ProposalPaid();
    error FundsLocked();
    error NoFundsToReturn();
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
        uint256 amount
    );

    event ProposalDefunded(
        address indexed from,
        address indexed account,
        uint256 index,
        uint256 amount
    );

    event ProposalCanceled(address indexed from, uint256 index);

    event WorkStarted(address indexed from, uint256 index);

    event FundsWithdrawn(
        address indexed from,
        uint256 index,
        uint256 amount,
        address to
    );

    enum ProposalStatus {
        INVALID,
        FUNDING,
        STARTED,
        PAID,
        CANCELED
    }

    // Structs and data
    struct Proposal {
        string url;
        uint256 secondsToUnlock;
        uint256 startedAt;
        uint256 minAmountRequested;
        uint256 balance;
        uint256 feeBasisPoints;
        address author;
        ProposalStatus status;
    }

    mapping(address => mapping(uint256 => uint256))
        public funderToProposalBalance;
    address payable public protocolFeeReceiver;

    Proposal[] public proposals;

    uint256 constant PAGE_SIZE = 1000;

    function initialize(
        address payable protocolFeeReceiver_
    ) public initializer {
        protocolFeeReceiver = protocolFeeReceiver_;
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function _authorizeUpgrade(address) internal virtual override onlyOwner {}

    modifier proposalExists(uint256 index) {
        if (index >= proposals.length) {
            revert NonexistingProposal();
        }
        _;
    }

    // Permissioned

    function setProtocolFeeReceiver(
        address protocolFeeReceiver_
    ) public onlyOwner {
        protocolFeeReceiver = payable(protocolFeeReceiver_);
    }

    // Read

    function fundsUnlockedAt(
        Proposal memory proposal
    ) public pure returns (uint256) {
        return
            proposal.startedAt > 0
                ? proposal.startedAt + proposal.secondsToUnlock
                : type(uint256).max;
    }

    /**
     * Returns proposals sorted in descending chronological order
     * (last one created is first).
     * Page 0 will contains the latest 1000 proposals.
     * Last page will contain the earliest proposals.
     * Check for proposal.status == ProposalStatus.INVALID to know
     * when the end of the list is reached.
     * Calculate the proposal id by doing startingId - index.
     */
    function getProposals(
        uint256 page
    )
        public
        view
        returns (Proposal[PAGE_SIZE] memory proposalPage, uint256 startingId)
    {
        if (proposals.length > 0) {
            startingId =
                (
                    proposals.length > (page * PAGE_SIZE)
                        ? proposals.length - (page * PAGE_SIZE)
                        : proposals.length
                ) -
                1;

            uint256 minIndex = (
                startingId < PAGE_SIZE ? 0 : startingId - PAGE_SIZE + 1
            );

            for (uint256 i = startingId + 1; i > minIndex; i--) {
                proposalPage[startingId - (i - 1)] = proposals[i - 1];
            }
        }
    }

    // Write

    function createProposal(
        string calldata url,
        uint256 secondsToUnlock,
        uint256 minAmountRequested,
        uint256 feeBasisPoints
    ) public {
        if (feeBasisPoints > 10000) {
            revert InvalidFee();
        }

        proposals.push(
            Proposal(
                url,
                secondsToUnlock,
                0,
                minAmountRequested,
                0,
                feeBasisPoints,
                msg.sender,
                ProposalStatus.FUNDING
            )
        );

        emit ProposalCreated(
            msg.sender,
            proposals.length - 1,
            url,
            secondsToUnlock,
            minAmountRequested,
            feeBasisPoints
        );
    }

    function fundProposal(uint256 index) public payable proposalExists(index) {
        Proposal storage proposal = proposals[index];

        if (proposal.status == ProposalStatus.PAID) {
            revert ProposalPaid();
        }

        if (proposal.status == ProposalStatus.CANCELED) {
            revert ProposalWasCanceled();
        }

        funderToProposalBalance[msg.sender][index] += msg.value;
        proposal.balance += msg.value;

        emit ProposalFunded(msg.sender, proposal.author, index, msg.value);
    }

    function startProposal(uint256 index) public proposalExists(index) {
        Proposal storage proposal = proposals[index];

        if (proposal.author != msg.sender) {
            revert InvalidOwner();
        }

        if (proposal.status == ProposalStatus.PAID) {
            revert ProposalPaid();
        }

        if (proposal.status == ProposalStatus.CANCELED) {
            revert ProposalWasCanceled();
        }

        proposal.status = ProposalStatus.STARTED;
        proposal.startedAt = block.timestamp;

        emit WorkStarted(msg.sender, index);
    }

    function defundProposal(uint256 index) public proposalExists(index) {
        Proposal storage proposal = proposals[index];

        if (proposal.status == ProposalStatus.PAID) {
            revert ProposalPaid();
        }

        if (proposal.status == ProposalStatus.STARTED) {
            revert FundsLocked();
        }

        uint256 toReturn = funderToProposalBalance[msg.sender][index];

        if (toReturn == 0) {
            revert NoFundsToReturn();
        }
        funderToProposalBalance[msg.sender][index] = 0;

        proposal.balance -= toReturn;
        payable(msg.sender).transfer(toReturn);

        emit ProposalDefunded(msg.sender, proposal.author, index, toReturn);
    }

    function cancelProposal(uint256 index) public proposalExists(index) {
        Proposal storage proposal = proposals[index];

        if (proposal.author != msg.sender) {
            revert InvalidOwner();
        }

        if (proposal.status == ProposalStatus.PAID) {
            revert ProposalPaid();
        }

        proposal.status = ProposalStatus.CANCELED;

        emit ProposalCanceled(msg.sender, index);
    }

    function withdrawFunds(
        uint256 index,
        address receiver
    ) public proposalExists(index) {
        Proposal storage proposal = proposals[index];

        if (proposal.author != msg.sender) {
            revert InvalidOwner();
        }

        if (proposal.status == ProposalStatus.FUNDING) {
            revert ProposalFunding();
        }

        if (proposal.status == ProposalStatus.PAID) {
            revert ProposalPaid();
        }

        if (proposal.status == ProposalStatus.CANCELED) {
            revert ProposalWasCanceled();
        }

        if (block.timestamp < fundsUnlockedAt(proposal)) {
            revert FundsLocked();
        }

        proposal.status = ProposalStatus.PAID;

        uint256 protocolFee = (proposal.balance * proposal.feeBasisPoints) /
            10_000;

        payable(receiver).transfer(proposal.balance - protocolFee);
        payable(protocolFeeReceiver).transfer(protocolFee);

        emit FundsWithdrawn(
            msg.sender,
            index,
            proposal.balance - protocolFee,
            receiver
        );
    }
}
