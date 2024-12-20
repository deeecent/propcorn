import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  useReadPropcornFunderToProposalBalance,
  useWritePropcornDefundProposal,
  useWritePropcornFundProposal,
  useWritePropcornStartProposal,
  useWritePropcornWithdrawFunds,
} from "./generated";
import { useEffect, useState } from "react";
import { formatEther, formatUnits, Hex, parseEther } from "viem";
import { convertSecondsToDaysAndHours } from "./utils";
import { GitHubIssueData } from "./github";
import Link from "./Link";
import Markdown from "react-markdown";
import AddressInput from "./AddressInput";
import { STATUS_TO_LABEL, type PropcornProposal } from "./types";

type ProposalProps = {
  proposal: PropcornProposal;
  issue: GitHubIssueData | null;
  refetch: () => void;
};

const FundProposal = ({ proposal, issue, refetch }: ProposalProps) => {
  const { data: hash, writeContract } = useWritePropcornFundProposal();
  const { isLoading, isError, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Transaction successful",
        description: "Thank you for funding this proposal 🥰",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      refetch();
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Something went wrong",
        description: "Please check your wallet and try again 🫣",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isError]);

  const onFundProposal = () => {
    toast({
      title: "Check your wallet",
      description: "Review the transaction details and confirm to proceed 🤓",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
    writeContract({ args: [proposal.index], value: parseEther(amount) });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="yellow">
        Fund Proposal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h4" fontSize="large">
              Fund Proposal #{proposal.index.toString()}
            </Heading>
            <Text as="span" fontSize="md" mr={1} color="gray.500">
              {issue ? issue.title : "loading"}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Amount (Ether)</FormLabel>
              <Input
                onChange={(e) => setAmount(e.target.value)}
                placeholder="amount"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={onFundProposal}
              disabled={isLoading}
            >
              Fund Proposal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

type DefundProposalProps = {
  index: bigint;
  funding: bigint | undefined;
  refetch: () => void;
};

const DefundProposal = ({ index, funding, refetch }: DefundProposalProps) => {
  const { data: hash, writeContract } = useWritePropcornDefundProposal();
  const { isLoading, isError, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Transaction successful",
        description:
          "Your Ether has been successfully returned to your wallet 🫡",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Something went wrong",
        description: "Please check your wallet and try again 🫣",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isError]);

  const onDefundProposal = () => {
    toast({
      title: "Check your wallet",
      description: "Review the transaction details and confirm to proceed 🤓",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
    writeContract({ args: [index] });
  };

  if (!funding || funding === 0n) {
    return null;
  }

  return (
    <Box>
      <Button onClick={onDefundProposal} disabled={isLoading}>
        Defund Proposal
      </Button>
      <Text color="gray.500" fontSize="sm" mb={2}>
        You have funded {formatEther(funding)} Ether
      </Text>
    </Box>
  );
};

const StartProposal = ({
  index,
  refetch,
}: {
  index: bigint;
  defaultReceiver?: Hex | undefined;
  refetch: () => void;
}) => {
  const { data: hash, writeContract } = useWritePropcornStartProposal();
  const { isLoading, isError, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Transaction successful",
        description: "Proposal started 🚀",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Something went wrong",
        description: "Please check your wallet and try again 🫣",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isError]);

  const onStartProposal = () => {
    toast({
      title: "Check your wallet",
      description: "Review the transaction details and confirm to proceed 🤓",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
    writeContract({ args: [index] });
  };

  return (
    <Button onClick={onStartProposal} colorScheme="green" disabled={isLoading}>
      Start Work
    </Button>
  );
};
const WithdrawFunds = ({
  index,
  defaultReceiver,
  refetch,
}: {
  index: bigint;
  defaultReceiver?: Hex | undefined;
  refetch: () => void;
}) => {
  const { data: hash, writeContract } = useWritePropcornWithdrawFunds();
  const { isLoading, isError, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [address, setAddress] = useState(defaultReceiver);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Transaction successful",
        description: "Ether transferred successfully 🫡",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      refetch();
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Something went wrong",
        description: "Please check your wallet and try again 🫣",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isError]);

  const onWithdrawFunds = () => {
    toast({
      title: "Check your wallet",
      description: "Review the transaction details and confirm to proceed 🤓",
      status: "info",
      duration: 4000,
      isClosable: true,
    });
    writeContract({ args: [index, address as Hex] });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        Withdraw funds
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h4" fontSize="large">
              Withdraw funds for Proposal #{index.toString()}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={4}>
              <FormLabel>Withdraw to</FormLabel>
              <AddressInput
                onAddressChange={setAddress}
                value={defaultReceiver}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={onWithdrawFunds}
              disabled={isLoading}
            >
              Withdraw funds
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

type CountdownProps = {
  deadline: Date;
  children: (props: { isExpired: boolean }) => React.ReactNode;
};

const Countdown = ({ deadline, children }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(deadline));
  const [isExpired, setIsExpired] = useState(timeLeft.total <= 0);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft(deadline);
      setTimeLeft(updatedTimeLeft);

      if (updatedTimeLeft.total <= 0) {
        setTimeLeft({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        {formatTime(timeLeft)}
      </Text>
      {children({ isExpired })}
    </Box>
  );
};

function calculateTimeLeft(deadline: Date) {
  const now = new Date();
  const difference = deadline.getTime() - now.getTime();

  const timeLeft = {
    total: difference,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };

  return timeLeft;
}

function formatTime({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) {
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const Proposal = ({ proposal, issue, refetch }: ProposalProps) => {
  const { address } = useAccount();
  const { data: funding, refetch: refetchProposalBalance } =
    useReadPropcornFunderToProposalBalance({
      args: [
        address ?? "0x0000000000000000000000000000000000000000",
        proposal.index,
      ],
    });

  const refetchAll = () => {
    refetch();
    refetchProposalBalance();
  };

  const { days, hours } = convertSecondsToDaysAndHours(
    Number(proposal.secondsToUnlock),
  );

  const progress = proposal.minAmountRequested
    ? Number((proposal.balance * 100n) / proposal.minAmountRequested)
    : 0;

  const deadline = new Date(
    (Number(proposal.startedAt) + Number(proposal.secondsToUnlock)) * 1000,
  );

  return (
    <Stack gap={10}>
      <Box>
        <Text fontSize="sm" color="gray.500" mb={2}>
          Created by{" "}
          <Text as="span" color="black">
            {proposal.author}
          </Text>
        </Text>
        <Heading as="h4" fontSize="large">
          <Text as="span" mr={1} color="gray.500">
            Proposal #{proposal.index.toString()}
          </Text>
          {issue ? issue.title : "loading"}
        </Heading>
      </Box>

      <Card>
        <CardBody>
          <Text color="gray.500" fontWeight="bold">
            Funding progress: {progress}% ({formatEther(proposal.balance)} /{" "}
            {formatEther(proposal.minAmountRequested)}ETH)
          </Text>
          <Progress colorScheme="green" size="lg" value={progress} my={5} />
          <HStack justifyContent="flex-end" alignItems="flex-start" spacing={4}>
            {(proposal.status === 1 || proposal.status === 2) && (
              <FundProposal
                proposal={proposal}
                issue={issue}
                refetch={refetchAll}
              />
            )}
            {proposal.status === 1 && address && (
              <DefundProposal
                index={proposal.index}
                funding={funding}
                refetch={refetchAll}
              />
            )}
          </HStack>
        </CardBody>
      </Card>

      <HStack>
        <SimpleGrid columns={2} spacing={2} alignItems="center">
          <Text color="gray.500">✨ Status:</Text>
          <Text>{STATUS_TO_LABEL[proposal.status]}</Text>

          <Text color="gray.500">⏱️ Duration:</Text>
          <Text>
            {days} day{days !== 1 && "s"} {hours} hour{hours !== 1 && "s"}
          </Text>

          <Text color="gray.500">💰 Amount:</Text>
          <Text>{formatEther(proposal.minAmountRequested)} ETH</Text>

          <Text color="gray.500">🏦 Funding:</Text>
          <Text>
            {progress}% ({formatEther(proposal.balance)} ETH)
          </Text>

          <Text color="gray.500">💞 Network fee:</Text>
          <Text>{formatUnits(proposal.feeBasisPoints, 2)}%</Text>

          <Text color="gray.500">🏠 Project:</Text>
          <Text>
            <Link
              to={issue ? `https://github.com/${issue.org}/${issue.repo}` : ""}
              isExternal
            >
              {issue ? issue.org : "loading"}/{issue ? issue.repo : "loading"}
            </Link>
          </Text>
        </SimpleGrid>
        <Spacer />

        {proposal.status === 1 && (
          <Card>
            <CardBody>
              <Text>Not started yet</Text>
              {address === proposal.author && (
                <Box mt={2}>
                  <StartProposal index={proposal.index} refetch={refetchAll} />
                </Box>
              )}
            </CardBody>
          </Card>
        )}

        {proposal.status === 2 && (
          <Card flexGrow={1}>
            <CardBody>
              <Text color="green.500" fontWeight="bold">
                Work in progress
              </Text>
              <Text color="gray.500" fontWeight="bold">
                Funds release countdown
              </Text>
              <Countdown deadline={deadline}>
                {({ isExpired }) =>
                  isExpired &&
                  proposal.status === 2 &&
                  address === proposal.author && (
                    <Box mt={5}>
                      <WithdrawFunds
                        index={proposal.index}
                        defaultReceiver={address}
                        refetch={refetchAll}
                      />
                    </Box>
                  )
                }
              </Countdown>
            </CardBody>
          </Card>
        )}
      </HStack>

      <Card>
        <CardHeader>
          <Text fontSize="sm" color="gray.500" mb={2}>
            Repository{" "}
            <Text as="span" color="black">
              {issue ? issue.org : ""}/{issue ? issue.repo : ""}
            </Text>
          </Text>
          <HStack>
            <Heading as="h4" fontSize="large">
              <Text as="span" mr={1} color="gray.500">
                GitHub Issue #{issue ? issue.id : "?"}
              </Text>
            </Heading>
            <Spacer />
            <Link to={issue ? issue.url : ""} isExternal>
              <Button size="xs">Open in GitHub</Button>
            </Link>
          </HStack>
        </CardHeader>
        <CardBody>
          <Markdown>{issue ? issue.body : "Loading"}</Markdown>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default Proposal;
