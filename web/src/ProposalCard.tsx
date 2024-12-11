import {
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
  Spacer,
  SimpleGrid,
  Box,
  Progress,
  Stack,
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
          {data ? data.title : "loading"}
        </Heading>
        <Box>
          <Progress colorScheme="green" size="xs" value={progress} />
        </Box>
      </CardHeader>

      <CardBody>
        <Stack
          direction={{ base: "column", md: "row" }} // Vertical on mobile, horizontal on larger screens
          align="stretch" // Optional: Ensures items align properly when vertical
        >
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
                to={data ? `https://github.com/${data.org}/${data.repo}` : ""}
                isExternal
              >
                {data ? data.org : "loading"}/{data ? data.repo : "loading"}
              </Link>
            </Text>
          </SimpleGrid>

          <Spacer />

          <Link to={`/proposal/${index}`}>
            <Button colorScheme="yellow">Details</Button>
          </Link>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProposalCard;
