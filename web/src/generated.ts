import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lockAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_unlockTime', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'error',
    inputs: [{ name: 'unlockTime', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidUnlockTime',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'NotOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'unlockTime', internalType: 'uint256', type: 'uint256' }],
    name: 'UnlockTimeNotReached',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'when',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unlockTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Propcorn
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const propcornAbi = [
  { type: 'error', inputs: [], name: 'NonexistentProposal' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'FundsWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'url', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'daysToUnlock',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'minAmountRequested',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProposalCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'fundingCompletedAt',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProposalFunded',
  },
  {
    type: 'function',
    inputs: [
      { name: 'url', internalType: 'string', type: 'string' },
      { name: 'daysToUnlock', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountRequested', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'fundProposal',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getProposalByAccount',
    outputs: [
      {
        name: '',
        internalType: 'struct Propcorn.Proposal',
        type: 'tuple',
        components: [
          { name: 'url', internalType: 'string', type: 'string' },
          { name: 'daysToUnlock', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minAmountRequested',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'balance', internalType: 'uint256', type: 'uint256' },
          {
            name: 'fundingCompletedAt',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'finished', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTimeLeftToUnlock',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

/**
 *
 */
export const propcornAddress = {
  1337: '0xA1bBDd84b304EDcfc6dEFE7ABaD8e803F8A408ae',
} as const

/**
 *
 */
export const propcornConfig = {
  address: propcornAddress,
  abi: propcornAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useReadLock = /*#__PURE__*/ createUseReadContract({ abi: lockAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLockOwner = /*#__PURE__*/ createUseReadContract({
  abi: lockAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"unlockTime"`
 */
export const useReadLockUnlockTime = /*#__PURE__*/ createUseReadContract({
  abi: lockAbi,
  functionName: 'unlockTime',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useWriteLock = /*#__PURE__*/ createUseWriteContract({
  abi: lockAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteLockWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: lockAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lockAbi}__
 */
export const useSimulateLock = /*#__PURE__*/ createUseSimulateContract({
  abi: lockAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lockAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateLockWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: lockAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lockAbi}__
 */
export const useWatchLockEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: lockAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lockAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchLockWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lockAbi,
    eventName: 'Withdrawal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link propcornAbi}__
 *
 *
 */
export const useReadPropcorn = /*#__PURE__*/ createUseReadContract({
  abi: propcornAbi,
  address: propcornAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"getProposalByAccount"`
 *
 *
 */
export const useReadPropcornGetProposalByAccount =
  /*#__PURE__*/ createUseReadContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'getProposalByAccount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"getTimeLeftToUnlock"`
 *
 *
 */
export const useReadPropcornGetTimeLeftToUnlock =
  /*#__PURE__*/ createUseReadContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'getTimeLeftToUnlock',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__
 *
 *
 */
export const useWritePropcorn = /*#__PURE__*/ createUseWriteContract({
  abi: propcornAbi,
  address: propcornAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"createProposal"`
 *
 *
 */
export const useWritePropcornCreateProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'createProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"fundProposal"`
 *
 *
 */
export const useWritePropcornFundProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'fundProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"withdrawFunds"`
 *
 *
 */
export const useWritePropcornWithdrawFunds =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'withdrawFunds',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__
 *
 *
 */
export const useSimulatePropcorn = /*#__PURE__*/ createUseSimulateContract({
  abi: propcornAbi,
  address: propcornAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"createProposal"`
 *
 *
 */
export const useSimulatePropcornCreateProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'createProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"fundProposal"`
 *
 *
 */
export const useSimulatePropcornFundProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'fundProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"withdrawFunds"`
 *
 *
 */
export const useSimulatePropcornWithdrawFunds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'withdrawFunds',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__
 *
 *
 */
export const useWatchPropcornEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: propcornAbi,
  address: propcornAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"FundsWithdrawn"`
 *
 *
 */
export const useWatchPropcornFundsWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'FundsWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"ProposalCreated"`
 *
 *
 */
export const useWatchPropcornProposalCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'ProposalCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"ProposalFunded"`
 *
 *
 */
export const useWatchPropcornProposalFundedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'ProposalFunded',
  })
