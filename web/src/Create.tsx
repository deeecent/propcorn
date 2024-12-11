import {
  Alert,
  AlertIcon,
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  useWatchPropcornProposalCreatedEvent,
  useWritePropcornCreateProposal,
} from "./generated";
import { type ChangeEvent, useState } from "react";
import { parseEther } from "viem";
import ConnectButton from "./ConnectButton";

type CreateProps = {
  onSuccess: (proposalIndex: number) => void;
};

function Create({ onSuccess }: CreateProps) {
  const toast = useToast();
  const account = useAccount();
  const { data: hash, writeContract } = useWritePropcornCreateProposal();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const [link, setLink] = useState<string>();
  const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) =>
    setLink(event.target.value);

  const [amount, setAmount] = useState<string>();
  const handleAmountChange = (valueAsString: string) =>
    setAmount(valueAsString);

  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();

  const [fee, setFee] = useState<number>(5);
  const handleFeeChange = (_: unknown, valueAsNumber: number | undefined) =>
    setFee(valueAsNumber ?? 0);

  useWatchPropcornProposalCreatedEvent({
    args: { from: account.address },
    onLogs: (logs) => onSuccess(Number(logs[0].args.index)),
  });

  function isInputInvalid() {
    return !link?.startsWith("https://github.com");
  }

  function isDeliveryTimeInvalid() {
    return (
      (days === undefined && hours === undefined) ||
      (days === undefined && Number(hours) === 0) ||
      (hours === undefined && Number(days) === 0) ||
      (Number(days) === 0 && hours === 0)
    );
  }

  async function submit() {
    if (!link || isInputInvalid() || !amount || isDeliveryTimeInvalid()) {
      toast({
        title: "Check your input",
        status: "error",
        description: "Some input fields are invalid. Check the errors",
        duration: 5000,
        isClosable: true,
      });
      throw new Error("Invalid inputs");
    }

    const totalTime = Number(hours ?? 0) * 3600 + Number(days ?? 0) * 86400;
    writeContract({
      args: [link, BigInt(totalTime), parseEther(amount), BigInt(fee * 100)],
    });
  }

  return (
    <VStack gap={5}>
      <FormControl isRequired isInvalid={isInputInvalid()}>
        <FormLabel>GitHub Issue Link</FormLabel>
        <Input
          onChange={handleLinkChange}
          placeholder="https://github.com/user/repo/issues/123"
        />
        <FormErrorMessage>
          You need to input a valid Github issue link
        </FormErrorMessage>
        <FormHelperText>
          Provide the link to the GitHub issue this proposal will address.
        </FormHelperText>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={
          amount === undefined || parseFloat(amount) === 0 || amount === ""
        }
      >
        <FormLabel>Requested Amount (in Ether)</FormLabel>
        <NumberInput value={amount} onChange={handleAmountChange}>
          <NumberInputField placeholder="Enter the amount in ETH" />
        </NumberInput>
        <FormErrorMessage>This cannot be 0</FormErrorMessage>
        <FormHelperText>
          Specify the amount of Ether required to complete this task.
        </FormHelperText>
      </FormControl>

      <FormControl isRequired isInvalid={isDeliveryTimeInvalid()}>
        <FormLabel>Delivery Time</FormLabel>
        <HStack width="100%">
          <NumberInput
            width="100px"
            step={1}
            min={0}
            onChange={(event: string) => setHours(Number(event))}
          >
            <NumberInputField placeholder="Hours" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput
            width="100px"
            step={1}
            min={0}
            onChange={(event: string) => setDays(Number(event))}
          >
            <NumberInputField placeholder="Days" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <FormErrorMessage>At least 1 hour</FormErrorMessage>
        <FormHelperText>
          Enter the estimated time needed to deliver the solution.
        </FormHelperText>
      </FormControl>

      <FormControl>
        <FormLabel>Protocol Fee</FormLabel>
        <HStack>
          <NumberInput
            isInvalid={fee === undefined}
            value={fee}
            onChange={handleFeeChange}
          >
            <NumberInputField placeholder="Enter fee percentage" />
          </NumberInput>
          <Button onClick={() => setFee(10)}>10%</Button>
          <Button onClick={() => setFee(5)}>5%</Button>
          <Button onClick={() => setFee(15)}>15%</Button>
        </HStack>
        <FormHelperText>
          The fee is optional, but it helps Propcorn running!
        </FormHelperText>
      </FormControl>

      {account.isConnected ? (
        <Button
          width="100%"
          bg="green.200"
          disabled={!account.isConnected || isConfirming}
          onClick={submit}
        >
          {isConfirming ? "Confirming..." : "Submit Proposal"}
        </Button>
      ) : (
        <Card p={5}>
          <Alert status="info" mb={5}>
            <AlertIcon />
            To submit your proposal, please connect your wallet.
          </Alert>

          <ConnectButton />
        </Card>
      )}
    </VStack>
  );
}

export default Create;
