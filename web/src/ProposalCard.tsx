import {
  Box,
  VStack,
  Heading,
  Text,
  Link,
  Progress,
  HStack,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import Markdown from "react-markdown";
import { formatEther } from "viem";
import { fetchIssueData, GitHubIssueData } from "./github";
import { useGitHubIssueData } from "./hooks";

interface ProposalCardProps {
  url: string;
  author: string;
  minAmountRequested: bigint;
  balance: bigint;
  feeBasisPoints: bigint;
  secondsToUnlock: bigint;
  fundCompletedAt?: bigint;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
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
    ? (Number(balance) / Number(minAmountRequested)) * 100
    : 0;

  return (
    <Card>
      <CardHeader>
        <Text fontSize="sm" color="gray.500">
          {data.org}/{data.repo}
        </Text>
        <Heading as="h4" fontSize="large">
          {data.title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>
          <Markdown>{data.body}</Markdown>
        </Text>
      </CardBody>
      <CardFooter>ciao</CardFooter>
    </Card>
  );
};

export default ProposalCard;
