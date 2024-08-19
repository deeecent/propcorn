import {
  Button,
  Heading,
  HStack,
  Link,
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
import useCountdown, { decompose } from "./Countdown";

interface ProposalParams {
  author: `0x${string}`;
  index: string;
}

interface ProposalData {
  url: string;
  secondsToUnlock: bigint;
  minAmountRequested: bigint;
  feeBasisPoints: bigint;
  balance: bigint;
  fundingCompletedAt: bigint;
  closed: boolean;
}

function Proposal(props: ProposalParams) {
  const { author, index } = props;
  const toast = useToast();

  const account = useAccount();
  const chainId = useChainId();
  const ensName = useEnsName({ address: author });

  const result = useReadContract({
    abi,
    address: propcornAddress[chainId],
    functionName: "getProposalByAccount",
    args: [author!, BigInt(index!)],
  });

  const { data: hash, writeContract, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const [url, setUrl] = useState<string>("");
  const [secondsToUnlock, setSecondsToUnlock] = useState<bigint>();
  const [fundCompletedAt, setFundCompletedAt] = useState<bigint>();
  const [minAmountRequested, setMinAmountRequested] = useState<bigint>();
  const [feeBasisPoints, setFeeBasisPoints] = useState<bigint>();
  const [balance, setBalance] = useState<bigint>();
  const { days, hours, minutes, seconds } = useCountdown(
    fundCompletedAt && secondsToUnlock
      ? Number(fundCompletedAt) + Number(secondsToUnlock)
      : 0
  );

  const {
    days: sDays,
    hours: sHours,
    minutes: sMinutes,
    seconds: sSeconds,
  } = decompose(Number(secondsToUnlock));

  const [fundAmount, setFundAmount] = useState<string>();
  const handleFundAmountChange = (event: any) => {
    console.log(event);
    setFundAmount(event);
  };

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

    console.log("funding...");

    writeContract({
      abi,
      address: propcornAddress[chainId],
      functionName: "fundProposal",
      args: [author, BigInt(index)],
      value: parseEther(fundAmount),
    });
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (isConfirmed) {
      result.refetch();
    }
  }, [isConfirmed]);

  useEffect(() => {
    if (result && result.data) {
      const data = result.data as ProposalData;
      setUrl(data.url);
      setSecondsToUnlock(data.secondsToUnlock);
      setMinAmountRequested(data.minAmountRequested);
      setFeeBasisPoints(data.feeBasisPoints);
      setBalance(data.balance);
      setFundCompletedAt(data.fundingCompletedAt);
    }
  }, [result]);

  return (
    <VStack
      className="form"
      height="70vh"
      width="75%"
      alignContent="center"
      alignItems="center"
    >
      <Heading as="h3" size="xl">
        Proposal
      </Heading>
      <HStack width="100%">
        <Text width="20%">Github Issue:</Text>
        <Link href={url} target="blank" width="80%" textAlign="left">
          {url}
        </Link>
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
        <Text>
          {balance !== undefined ? `${formatEther(balance)} ETH` : "..."}
        </Text>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Estimated work time:</Text>
        <Text>
          {secondsToUnlock !== undefined
            ? `${sDays}d ${sHours}h ${sMinutes}m ${sSeconds}s`
            : "..."}
        </Text>
      </HStack>
      {fundCompletedAt !== undefined && fundCompletedAt > 0 && (
        <HStack width="100%">
          <Text width="20%">Completes in:</Text>
          <Text width="20%" textAlign="left">
            {days}d {hours}h {minutes}m {seconds}s
          </Text>
        </HStack>
      )}
      <HStack width="100%">
        <Text width="20%">Protocol fee:</Text>
        <Text>
          {feeBasisPoints !== undefined
            ? `${Number(feeBasisPoints) / 100}%`
            : "..."}
        </Text>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Author:</Text>
        <Text>{ensName && ensName.data ? ensName.data : author}</Text>
      </HStack>
      <HStack width="40%">
        <NumberInput
          isInvalid={fundAmount === undefined}
          value={fundAmount}
          onChange={handleFundAmountChange}
        >
          <NumberInputField fontSize="13px" placeholder="e.g. 0.5" />
        </NumberInput>
        <Button
          width="80%"
          variant="primary"
          disabled={!account.isConnected || isConfirming}
          onClick={submit}
        >
          {isConfirming ? "Confirming..." : "Fund (ETH)"}
        </Button>
      </HStack>
      <Spacer />
    </VStack>
  );
}

export default Proposal;
