import {
  createUseWatchContractEvent,
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Address
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addressAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ContextUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const contextUpgradeableAbi = [
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1967Proxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1967ProxyAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  { type: 'fallback', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1967Utils
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1967UtilsAbi = [
  {
    type: 'error',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidAdmin',
  },
  {
    type: 'error',
    inputs: [{ name: 'beacon', internalType: 'address', type: 'address' }],
    name: 'ERC1967InvalidBeacon',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const errorsAbi = [
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'FailedDeployment' },
  {
    type: 'error',
    inputs: [
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'MissingPrecompile',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBeacon
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBeaconAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1822Proxiable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1822ProxiableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1967
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1967Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initializable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const initializableAbi = [
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OwnableUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableUpgradeableAbi = [
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Propcorn
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const propcornAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'FundsLocked' },
  { type: 'error', inputs: [], name: 'InvalidFee' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'InvalidOwner' },
  { type: 'error', inputs: [], name: 'NoFundsToReturn' },
  { type: 'error', inputs: [], name: 'NonexistentProposal' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ProposalClosed' },
  { type: 'error', inputs: [], name: 'ProposalInProgress' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
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
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
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
        name: 'secondsToUnlock',
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
      {
        name: 'feeBasisPoints',
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
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
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
    ],
    name: 'ProposalDefunded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
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
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'url', internalType: 'string', type: 'string' },
      { name: 'secondsToUnlock', internalType: 'uint256', type: 'uint256' },
      { name: 'minAmountRequested', internalType: 'uint256', type: 'uint256' },
      { name: 'feeBasisPoints', internalType: 'uint256', type: 'uint256' },
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
    name: 'defundProposal',
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
          { name: 'secondsToUnlock', internalType: 'uint256', type: 'uint256' },
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
          { name: 'feeBasisPoints', internalType: 'uint256', type: 'uint256' },
          { name: 'closed', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'protocolFeeReceiver',
        internalType: 'address payable',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const propcornAddress = {
  10: '0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F',
  31337: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
} as const

/**
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const propcornConfig = {
  address: propcornAddress,
  abi: propcornAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Proxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const proxyAbi = [
  { type: 'fallback', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UUPSUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uupsUpgradeableAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1967InvalidImplementation',
  },
  { type: 'error', inputs: [], name: 'ERC1967NonPayable' },
  { type: 'error', inputs: [], name: 'FailedCall' },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  { type: 'error', inputs: [], name: 'UUPSUnauthorizedCallContext' },
  {
    type: 'error',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'UUPSUnsupportedProxiableUUID',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPGRADE_INTERFACE_VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newImplementation', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link contextUpgradeableAbi}__
 */
export const useWatchContextUpgradeableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: contextUpgradeableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link contextUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchContextUpgradeableInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: contextUpgradeableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1967ProxyAbi}__
 */
export const useWatchErc1967ProxyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: erc1967ProxyAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc1967ProxyAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchErc1967ProxyUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc1967ProxyAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBeaconAbi}__
 */
export const useReadIBeacon = /*#__PURE__*/ createUseReadContract({
  abi: iBeaconAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link iBeaconAbi}__ and `functionName` set to `"implementation"`
 */
export const useReadIBeaconImplementation = /*#__PURE__*/ createUseReadContract(
  { abi: iBeaconAbi, functionName: 'implementation' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1822ProxiableAbi}__
 */
export const useReadIerc1822Proxiable = /*#__PURE__*/ createUseReadContract({
  abi: ierc1822ProxiableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ierc1822ProxiableAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadIerc1822ProxiableProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: ierc1822ProxiableAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1967Abi}__
 */
export const useWatchIerc1967Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: ierc1967Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1967Abi}__ and `eventName` set to `"AdminChanged"`
 */
export const useWatchIerc1967AdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1967Abi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1967Abi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const useWatchIerc1967BeaconUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1967Abi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ierc1967Abi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchIerc1967UpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ierc1967Abi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initializableAbi}__
 */
export const useWatchInitializableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: initializableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link initializableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchInitializableInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: initializableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__
 */
export const useReadOwnableUpgradeable = /*#__PURE__*/ createUseReadContract({
  abi: ownableUpgradeableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"owner"`
 */
export const useReadOwnableUpgradeableOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: ownableUpgradeableAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__
 */
export const useWriteOwnableUpgradeable = /*#__PURE__*/ createUseWriteContract({
  abi: ownableUpgradeableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteOwnableUpgradeableRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableUpgradeableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteOwnableUpgradeableTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: ownableUpgradeableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__
 */
export const useSimulateOwnableUpgradeable =
  /*#__PURE__*/ createUseSimulateContract({ abi: ownableUpgradeableAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateOwnableUpgradeableRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableUpgradeableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateOwnableUpgradeableTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: ownableUpgradeableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableUpgradeableAbi}__
 */
export const useWatchOwnableUpgradeableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: ownableUpgradeableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchOwnableUpgradeableInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableUpgradeableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchOwnableUpgradeableOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: ownableUpgradeableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link propcornAbi}__
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useReadPropcorn = /*#__PURE__*/ createUseReadContract({
  abi: propcornAbi,
  address: propcornAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useReadPropcornUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"getProposalByAccount"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useReadPropcornGetProposalByAccount =
  /*#__PURE__*/ createUseReadContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'getProposalByAccount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useReadPropcornOwner = /*#__PURE__*/ createUseReadContract({
  abi: propcornAbi,
  address: propcornAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useReadPropcornProxiableUuid = /*#__PURE__*/ createUseReadContract(
  { abi: propcornAbi, address: propcornAddress, functionName: 'proxiableUUID' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWritePropcorn = /*#__PURE__*/ createUseWriteContract({
  abi: propcornAbi,
  address: propcornAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"createProposal"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWritePropcornCreateProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'createProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"defundProposal"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWritePropcornDefundProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'defundProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"fundProposal"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWritePropcornFundProposal =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'fundProposal',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWritePropcornInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: propcornAbi,
  address: propcornAddress,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWritePropcornRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWritePropcornTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWritePropcornUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"withdrawFunds"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
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
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useSimulatePropcorn = /*#__PURE__*/ createUseSimulateContract({
  abi: propcornAbi,
  address: propcornAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"createProposal"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useSimulatePropcornCreateProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'createProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"defundProposal"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useSimulatePropcornDefundProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'defundProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"fundProposal"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useSimulatePropcornFundProposal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'fundProposal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"initialize"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useSimulatePropcornInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useSimulatePropcornRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useSimulatePropcornTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useSimulatePropcornUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: propcornAbi,
    address: propcornAddress,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link propcornAbi}__ and `functionName` set to `"withdrawFunds"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
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
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWatchPropcornEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: propcornAbi,
  address: propcornAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"FundsWithdrawn"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWatchPropcornFundsWithdrawnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'FundsWithdrawn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"Initialized"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWatchPropcornInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWatchPropcornOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"ProposalCreated"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWatchPropcornProposalCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'ProposalCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"ProposalDefunded"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWatchPropcornProposalDefundedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'ProposalDefunded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"ProposalFunded"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWatchPropcornProposalFundedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'ProposalFunded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link propcornAbi}__ and `eventName` set to `"Upgraded"`
 *
 * [__View Contract on Op Mainnet Optimism Explorer__](https://optimistic.etherscan.io/address/0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F)
 */
export const useWatchPropcornUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: propcornAbi,
    address: propcornAddress,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__
 */
export const useReadUupsUpgradeable = /*#__PURE__*/ createUseReadContract({
  abi: uupsUpgradeableAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 */
export const useReadUupsUpgradeableUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: uupsUpgradeableAbi,
    functionName: 'UPGRADE_INTERFACE_VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const useReadUupsUpgradeableProxiableUuid =
  /*#__PURE__*/ createUseReadContract({
    abi: uupsUpgradeableAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__
 */
export const useWriteUupsUpgradeable = /*#__PURE__*/ createUseWriteContract({
  abi: uupsUpgradeableAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useWriteUupsUpgradeableUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: uupsUpgradeableAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__
 */
export const useSimulateUupsUpgradeable =
  /*#__PURE__*/ createUseSimulateContract({ abi: uupsUpgradeableAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const useSimulateUupsUpgradeableUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: uupsUpgradeableAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uupsUpgradeableAbi}__
 */
export const useWatchUupsUpgradeableEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: uupsUpgradeableAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchUupsUpgradeableInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uupsUpgradeableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link uupsUpgradeableAbi}__ and `eventName` set to `"Upgraded"`
 */
export const useWatchUupsUpgradeableUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: uupsUpgradeableAbi,
    eventName: 'Upgraded',
  })
