import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
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
import {
  useAccount,
  useChainId,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from "wagmi";
import { propcornAbi as abi, propcornAddress } from "./generated";
import { type ChangeEvent, useEffect, useState } from "react";
import { parseEther } from "viem";
import { useNavigate, useSearchParams } from "react-router-dom";

function Create() {
  const [searchParams] = useSearchParams();

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

  useEffect(() => {
    if (searchParams) {
      const link = searchParams.get("link");
      const fund = searchParams.get("fund");
      if (link !== null && fund !== null && Number(fund) > 0) {
        setLink(link);
        setAmount(fund);

        toast({
          title: "ATTENTION",
          description:
            "Once you create the proposal, remember to post the link as comment to the original issue, so that the bounty creator can know about it.",
          status: "info",
          duration: 100000,
          isClosable: true,
        });
      }
    }
  }, [searchParams, toast]);

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
    <VStack>
      <Heading as="h3" size="xl" mb={15}>
        Create a Proposal
      </Heading>

      <VStack gap={5}>
        <FormControl isRequired>
          <FormLabel>GitHub Issue Link</FormLabel>
          <Input
            onChange={handleLinkChange}
            placeholder="https://github.com/user/repo/issues/123"
          />
          <FormHelperText>
            Provide the link to the GitHub issue this proposal will address.
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Requested Amount (in Ether)</FormLabel>
          <NumberInput value={amount} onChange={handleAmountChange}>
            <NumberInputField placeholder="Enter the amount in ETH" />
          </NumberInput>
          <FormHelperText>
            Specify the amount of Ether required to complete this task.
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
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

        <Button
          width="100%"
          bg="yellow.200"
          disabled={!account.isConnected || isConfirming}
          onClick={submit}
        >
          {isConfirming ? "Confirming..." : "Submit Proposal"}
        </Button>
      </VStack>
    </VStack>
  );
}

export default Create;
