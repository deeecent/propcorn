// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Propcorn.sol";

contract Propcornccip is CCIPReceiver, Ownable, Propcorn {
    IRouterClient private s_router;

    uint256 public bridgeFee = 0;
    /*uint64 public expectedSourceChainSelector = 0;
    address public expectedSenderAddress = 0x0000000000000000000000000000000000000000;*/

    event MessageSent(bytes32 indexed messageId, uint64 indexed destinationChainSelector, address receiver, uint256 ethAmount, uint256 fees);
    event DataReceived(bytes32 indexed messageId, uint64 indexed sourceChainSelector, address sender, address userAddress, uint256 ethAmount);

    constructor(address router, address payable protocolFeeReceiver) 
        CCIPReceiver(router) 
        Propcorn(protocolFeeReceiver)
    {
        s_router = IRouterClient(router);
    }

    function sendMessage(
        uint64 destinationChainSelector,
        address receiver,
        uint256 index,
        address userAddress
    ) external payable returns (bytes32 messageId) {
        //require(msg.value >= 0.0001 ether, "Minimum 0.001 ETH required");
        uint256 ethAmount = msg.value - bridgeFee;

        Client.EVM2AnyMessage memory evm2AnyMessage = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(userAddress, ethAmount, index),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: address(0) // Use native gas for fees
        });

        uint256 fees = s_router.getFee(destinationChainSelector, evm2AnyMessage);
        require(address(this).balance >= fees, "Not enough ETH to cover fees");

        messageId = s_router.ccipSend{value: fees}(
            destinationChainSelector,
            evm2AnyMessage
        );
        emit MessageSent(messageId, destinationChainSelector, receiver, ethAmount, fees);
        return messageId;
    }

    function _ccipReceive(Client.Any2EVMMessage memory any2EvmMessage) internal override {
        address senderAddress = abi.decode(any2EvmMessage.sender, (address));

        (address userAddress, uint256 ethAmount, uint256 index) = abi.decode(any2EvmMessage.data, (address, uint256, uint256));
        ethAmount = ethAmount - bridgeFee; 
        require(address(this).balance >= ethAmount, "Insufficient ETH balance in contract");

        fundProposal(userAddress, index);

        emit DataReceived(any2EvmMessage.messageId, any2EvmMessage.sourceChainSelector, senderAddress, userAddress, ethAmount);
    }

    /*function setExpectedSourceChainSelector(uint64 _expectedSourceChainSelector) external onlyOwner {
        expectedSourceChainSelector = _expectedSourceChainSelector;
    }

    function setExpectedSenderAddress(address _expectedSenderAddress) external onlyOwner {
        expectedSenderAddress = _expectedSenderAddress;
    }*/

   function setRouter(address router) external onlyOwner {
        s_router = IRouterClient(router);
   }

    receive() external payable {}

    function withdrawETH(address to, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient ETH balance");
        payable(to).transfer(amount);
    }
}
