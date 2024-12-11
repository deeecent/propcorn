import {
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
  HStack,
  Spacer,
  SimpleGrid,
  VStack,
  Box,
  Progress,
} from "@chakra-ui/react";
import { formatEther, formatUnits } from "viem";

import { useGitHubIssueData } from "./hooks";
import Link from "./Link";
import { convertSecondsToDaysAndHours } from "./utils";

type ProposalCardProps = {
  index: number;
  url: string;
  author: string;
  minAmountRequested: bigint;
  balance: bigint;
  feeBasisPoints: bigint;
  secondsToUnlock: bigint;
  fundCompletedAt?: bigint;
};

const ProposalCard: React.FC<ProposalCardProps> = ({
  index,
  url,
  author,
  minAmountRequested,
  balance,
  feeBasisPoints,
  secondsToUnlock,
  fundCompletedAt,
}) => {
  const { data, isLoading, error } = useGitHubIssueData(url);

  if (isLoading) {
    return <p>Loading issue metadata...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data) {
    return <p>No metadata available.</p>;
  }

  const progress = minAmountRequested
    ? Number((balance * 100n) / minAmountRequested)
    : 0;

  const { days, hours } = convertSecondsToDaysAndHours(Number(secondsToUnlock));

  return (
    <Card w="full">
      <CardHeader>
        <Text fontSize="sm" color="gray.500" mb={2}>
          Created by {author}
        </Text>
        <Heading as="h4" fontSize="large" mb={3}>
          <Text as="span" mr={1} color="gray.500">
            Proposal #{index}
          </Text>
          {data.title}
        </Heading>
        <Box>
          <Progress colorScheme="green" size="xs" value={progress} />
        </Box>
      </CardHeader>

      <CardBody>
        <HStack>
          <SimpleGrid columns={2} spacing={2} alignItems="center">
            <Text color="gray.500">⏱️ Duration:</Text>
            <Text>
              {days} day{days !== 1 && "s"} {hours} hour{hours !== 1 && "s"}
            </Text>

            <Text color="gray.500">💰 Amount:</Text>
            <Text>{formatEther(minAmountRequested)} ETH</Text>

            <Text color="gray.500">🏦 Funding:</Text>
            <Text>
              {progress}% ({formatEther(balance)} ETH)
            </Text>

            <Text color="gray.500">💞 Network fee:</Text>
            <Text>{formatUnits(feeBasisPoints, 2)}%</Text>

            <Text color="gray.500">🏠 Project:</Text>
            <Text>
              <Link
                to={`https://github.com/${data.org}/${data.repo}`}
                isExternal
              >
                {data.org}/{data.repo}
              </Link>
            </Text>
          </SimpleGrid>

          <Spacer />

          <VStack>
            <Link to={`/proposal/${index}`}>
              <Button colorScheme="yellow">Details</Button>
            </Link>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default ProposalCard;
