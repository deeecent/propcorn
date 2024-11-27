// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "../Propcorn.sol";

contract PropcornNoMoreUpgrades is Propcorn {
    function _authorizeUpgrade(address) internal view override onlyOwner {
        revert("no more upgrades");
    }
}
