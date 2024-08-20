import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import "./Create.css";
import {
  useAccount,
  useChainId,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { ConnectKitButton } from "connectkit";
import { propcornAbi as abi, propcornAddress } from "./generated";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useNavigate } from "react-router-dom";

function Create() {
  const toast = useToast();

  const account = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const navigate = useNavigate();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const chainId = useChainId();

  const [link, setLink] = useState<string>();
  const handleLinkChange = (event: any) => setLink(event.target.value);

  const [amount, setAmount] = useState<string>();
  const handleAmountChange = (event: any) => setAmount(event);

  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();

  const [fee, setFee] = useState<number>(5);
  const handleFeeChange = (event: any) => setFee(event);

  const unwatch = useWatchContractEvent({
    address: propcornAddress[chainId],
    abi: abi,
    eventName: "ProposalCreated",
    args: { from: account.address },
    onLogs: (logs) => {
      navigate(`/proposals/${account.address}/${logs[0].args.index}`);
    },
  });
  console.log(unwatch);

  async function submit() {
    const totalTime =
      (hours !== undefined ? Number(hours) * 3600 : 0) +
      (days !== undefined ? Number(days) * 86400 : 0);
    if (link === undefined || amount === undefined || totalTime === 0) {
      const missing = [
        { value: link, title: "github link" },
        { value: amount, title: "fund amount" },
        { value: totalTime, title: "working time" },
      ]
        .filter((x) => x.value === undefined || x.value === 0)
        .map((x) => x.title)
        .join(", ");
      toast({
        title: "Missing fields",
        description: `${missing} are missing`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    console.log(totalTime);

    writeContract({
      abi,
      address: propcornAddress[chainId],
      functionName: "createProposal",
      args: [link, BigInt(totalTime), parseEther(amount), BigInt(fee * 100)],
    });
  }

  useEffect(() => {
    if (isConfirmed) {
      console.log("succes");
    }
  }, [isConfirmed]);

  return (
    <VStack
      className="form"
      borderTopWidth="1px"
      borderTopColor="white"
      paddingTop="30px"
      height="50vh"
      width="60%"
    >
      <Heading as="h3" size="l">
        Create a Proposal
      </Heading>
      <HStack width="100%">
        <Text width="20%">Github Issue:</Text>
        <Input
          value={link}
          isInvalid={link === undefined}
          onChange={handleLinkChange}
          width="80%"
          placeholder="Github Issue link"
        ></Input>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Requested Amount:</Text>
        <NumberInput
          isInvalid={amount === undefined}
          value={amount}
          onChange={handleAmountChange}
        >
          <NumberInputField placeholder="ETH" />
        </NumberInput>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Required time:</Text>
        <NumberInput
          width="100px"
          step={1}
          min={0}
          onChange={(event: string) => setHours(Number(event))}
        >
          <NumberInputField placeholder="hours" />
          <NumberInputStepper>
            <NumberIncrementStepper bg="white" />
            <NumberDecrementStepper bg="white" />
          </NumberInputStepper>
        </NumberInput>
        <NumberInput
          width="100px"
          color="white"
          step={1}
          min={0}
          onChange={(event: string) => setDays(Number(event))}
        >
          <NumberInputField placeholder="days" />
          <NumberInputStepper>
            <NumberIncrementStepper bg="white" />
            <NumberDecrementStepper bg="white" />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Protocol fee:</Text>
        <NumberInput
          isInvalid={fee === undefined}
          value={fee}
          onChange={handleFeeChange}
        >
          <NumberInputField placeholder="Protocol fee" />
        </NumberInput>
        <Button variant="primary" onClick={() => setFee(10)}>
          10%
        </Button>
        <Button variant="primary" onClick={() => setFee(5)}>
          5%
        </Button>
        <Button variant="primary" onClick={() => setFee(15)}>
          15%
        </Button>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Creator:</Text>
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName }) => {
            return (
              <Box>
                {isConnected && (ensName ?? truncatedAddress)}
                {!isConnected && (
                  <Button onClick={show} variant="primary">
                    connect
                  </Button>
                )}
              </Box>
            );
          }}
        </ConnectKitButton.Custom>
      </HStack>
      <Spacer />
      <Button
        width="100%"
        variant="primary"
        disabled={!account.isConnected || isConfirming}
        onClick={submit}
      >
        {isConfirming ? "Confirming..." : "Submit"}
      </Button>
      <Spacer />
    </VStack>
  );
}

export default Create;
