import {
  Button,
  Heading,
  HStack,
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
  useEnsName,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { propcornAbi as abi, propcornAddress } from "./generated";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import useCountdown from "./Countdown";

interface ShowProps {
  index: bigint;
  author: `0x${string}`;
}

interface Proposal {
  url: string;
  daysToUnlock: bigint;
  minAmountRequested: bigint;
  balance: bigint;
  fundCompletedAt: bigint;
  finished: boolean;
}

function Show(props: ShowProps) {
  const toast = useToast();

  const account = useAccount();
  const chainId = useChainId();
  const ensName = useEnsName({ address: props.author });

  const result = useReadContract({
    abi,
    address: propcornAddress[chainId],
    functionName: "getProposalByAccount",
    args: [props.author, props.index],
  });

  const { data: hash, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const [url, setUrl] = useState<string>("");
  const [daysToUnlock, setDaysToUnlock] = useState<bigint>();
  const [fundCompletedAt, setFundCompletedAt] = useState<bigint>();
  const [minAmountRequested, setMinAmountRequested] = useState<bigint>();
  const [balance, setBalance] = useState<bigint>();
  const { days, hours, minutes, seconds } = useCountdown(
    fundCompletedAt && daysToUnlock
      ? Number(fundCompletedAt) + Number(daysToUnlock)
      : 0
  );

  const [fundAmount, setFundAmount] = useState<string>();
  const handleFundAmountChange = (event: any) =>
    setFundAmount(event.target.value);

  async function submit() {
    if (fundAmount === undefined) {
      toast({
        title: "Missing fields",
        description: `Fund amount is missing`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    writeContract({
      abi,
      address: propcornAddress[chainId],
      functionName: "fundProposal",
      args: [props.author, props.index],
      value: parseEther(fundAmount),
    });
  }

  useEffect(() => {
    if (isConfirmed) {
      console.log("succes");
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (result && result.data) {
      const data = result.data as Proposal;
      setUrl(data.url);
      setDaysToUnlock(data.daysToUnlock);
      setMinAmountRequested(data.minAmountRequested);
      setBalance(data.balance);
      setFundCompletedAt(data.fundCompletedAt);
    }
  }, [result]);

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
        <Text width="80%">{url}</Text>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Requested Amount:</Text>
        <Text>
          {minAmountRequested
            ? `${formatEther(minAmountRequested)} ETH`
            : "..."}
        </Text>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Current Funding:</Text>
        <Text>{balance ? `${formatEther(balance)} ETH` : "..."}</Text>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Days of work:</Text>
        <Text>{daysToUnlock ? Number(daysToUnlock) : "..."}</Text>
      </HStack>
      {fundCompletedAt !== undefined && fundCompletedAt > 0 && (
        <HStack width="100%">
          <Text width="20%">Completes in:</Text>
          <Text width="20%">
            {days}:{hours}:{minutes}:{seconds}
          </Text>
        </HStack>
      )}
      <HStack width="100%">
        <Text width="20%">Author:</Text>
        <Text>{ensName && ensName.data ? ensName.data : props.author}</Text>
      </HStack>
      <Spacer />
      <HStack width="100%">
        <Text width="20%">Fund:</Text>
        <NumberInput
          isInvalid={fundAmount === undefined}
          value={fundAmount}
          onChange={handleFundAmountChange}
        >
          <NumberInputField placeholder="e.g. 0.5 (ETH)" />
        </NumberInput>
        <Button
          width="100%"
          variant="primary"
          disabled={!account.isConnected || isConfirming}
          onClick={submit}
        >
          {isConfirming ? "Confirming..." : "Fund"}
        </Button>
      </HStack>
      <Spacer />
    </VStack>
  );
}

export default Show;
