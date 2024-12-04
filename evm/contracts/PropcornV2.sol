// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "./Propcorn.sol";

contract PropcornV2 is Propcorn {
    function setProtocolFeeReceiver(
        address protocolFeeReceiver
    ) public onlyOwner {
        _protocolFeeReceiver = payable(protocolFeeReceiver);
    }
}
