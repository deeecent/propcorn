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
  useWritePropcornWithdrawFunds,
} from "./generated";
import { useEffect, useState } from "react";
import { formatEther, formatUnits, Hex, parseEther } from "viem";
import { convertSecondsToDaysAndHours } from "./utils";
import { GitHubIssueData } from "./github";
import Link from "./Link";
import Markdown from "react-markdown";
import AddressInput from "./AddressInput";

type Proposal = {
  index: bigint;
  url: string;
  secondsToUnlock: bigint;
  fundingCompletedAt: bigint;
  minAmountRequested: bigint;
  balance: bigint;
  feeBasisPoints: bigint;
  author: `0x${string}`;
  status: number;
};

type ProposalProps = {
  proposal: Proposal;
  issue: GitHubIssueData;
};

const FundProposal = ({ proposal, issue }: ProposalProps) => {
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
              {issue.title}
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
            {isSuccess ? (
              <Button colorScheme="yellow" mr={3} onClick={onClose}>
                Close
              </Button>
            ) : (
              <Button
                colorScheme="green"
                mr={3}
                onClick={onFundProposal}
                disabled={isLoading}
              >
                Fund Proposal
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

type DefundProposalProps = {
  index: bigint;
  address: Hex;
};

const DefundProposal = ({ index, address }: DefundProposalProps) => {
  const { data: funding } = useReadPropcornFunderToProposalBalance({
    args: [address, index],
  });
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
    <Box w="full">
      <Text color="gray.500" fontSize="sm" mb={2}>
        You have funded {formatEther(funding)} Ether
      </Text>
      <Button w="full" onClick={onDefundProposal} disabled={isLoading}>
        Defund Proposal
      </Button>
    </Box>
  );
};

const WithdrawFunds = ({
  index,
  issue,
  defaultReceiver,
}: {
  index: bigint;
  issue: GitHubIssueData;
  defaultReceiver?: Hex | undefined;
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
      <Button onClick={onOpen} colorScheme="yellow">
        Withdraw funds
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading as="h4" fontSize="large">
              Withdraw funds for Proposal #{index.toString()}
            </Heading>
            <Text as="span" fontSize="md" mr={1} color="gray.500">
              {issue.title}
            </Text>
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
            {isSuccess ? (
              <Button colorScheme="yellow" mr={3} onClick={onClose}>
                Close
              </Button>
            ) : (
              <Button
                colorScheme="green"
                mr={3}
                onClick={onWithdrawFunds}
                disabled={isLoading}
              >
                Withdraw funds
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Proposal = ({ proposal, issue }: ProposalProps) => {
  const { address } = useAccount();
  const { days, hours } = convertSecondsToDaysAndHours(
    Number(proposal.secondsToUnlock),
  );

  const progress = proposal.minAmountRequested
    ? Number((proposal.balance * 100n) / proposal.minAmountRequested)
    : 0;

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
          {issue.title}
        </Heading>
      </Box>

      <Box>
        <Text color="gray.500" fontWeight="bold">
          Funding progress: {progress}% ({formatEther(proposal.balance)} /{" "}
          {formatEther(proposal.minAmountRequested)}ETH )
        </Text>
        <Progress colorScheme="green" size="lg" value={progress} />
      </Box>

      <HStack>
        <SimpleGrid columns={2} spacing={2} alignItems="center">
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
              to={`https://github.com/${issue.org}/${issue.repo}`}
              isExternal
            >
              {issue.org}/{issue.repo}
            </Link>
          </Text>
        </SimpleGrid>

        <Spacer />

        <Stack gap={5}>
          <FundProposal proposal={proposal} issue={issue} />
          {address && (
            <DefundProposal index={proposal.index} address={address} />
          )}
          <WithdrawFunds
            index={proposal.index}
            issue={issue}
            defaultReceiver={address}
          />
        </Stack>
      </HStack>

      <Card>
        <CardHeader>
          <Text fontSize="sm" color="gray.500" mb={2}>
            Repository{" "}
            <Text as="span" color="black">
              {issue.org}/{issue.repo}
            </Text>
          </Text>
          <Heading as="h4" fontSize="large">
            <Text as="span" mr={1} color="gray.500">
              GitHub Issue #{issue.id}
            </Text>
            Original content
          </Heading>
        </CardHeader>
        <CardBody>
          <Markdown>{issue.body}</Markdown>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default Proposal;
