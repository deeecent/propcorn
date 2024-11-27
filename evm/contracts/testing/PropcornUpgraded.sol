// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "../Propcorn.sol";

contract PropcornUpgraded is Propcorn {
    function newFunction() public pure returns (uint256) {
        return 42;
    }
}
