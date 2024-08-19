import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
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
  useWriteContract,
} from "wagmi";
import { ConnectKitButton } from "connectkit";
import { propcornAbi as abi, propcornAddress } from "./generated";
import { useEffect, useState } from "react";
import { parseEther } from "viem";

function Create() {
  const toast = useToast();

  const account = useAccount();
  const { data: hash, writeContract } = useWriteContract();

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
  const handleDaysChange = (event: any) => setDays(event);

  async function submit() {
    if (link === undefined || amount === undefined || days === undefined) {
      const missing = [
        { value: link, title: "github link" },
        { value: amount, title: "fund amount" },
        { value: days, title: "work days" },
      ]
        .filter((x) => x.value === undefined)
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

    writeContract({
      abi,
      address: propcornAddress[chainId],
      functionName: "createProposal",
      args: [link, parseEther(amount), BigInt(days)],
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
        <Text width="20%">Days of work:</Text>
        <NumberInput
          isInvalid={days === undefined}
          value={days}
          onChange={handleDaysChange}
        >
          <NumberInputField placeholder="Number of days" />
        </NumberInput>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Creator:</Text>
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName, chain }) => {
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
