import {
  Text,
  Heading,
  VStack,
  HStack,
  Highlight,
  Container,
  Button,
  Box,
} from "@chakra-ui/react";
import ProposalCard from "./ProposalCard";
import Link from "./Link";
import { useReadPropcornGetProposals } from "./generated";
import { ReactNode, useEffect, useState } from "react";
import { PropcornProposal } from "./types";

const Hero = () => (
  <>
    <Heading as="h1" size="2xl" mb={6}>
      Micro-funding made easy
    </Heading>
    <Text fontSize="2xl">
      <Highlight
        query="public good"
        styles={{ px: "2", py: "1", rounded: "full", bg: "yellow.200" }}
      >
        Propcorn is a public good that enables developers gather funding for
        small open-source features.
      </Highlight>
    </Text>
  </>
);

interface StepProps {
  emoji: string;
  title: string;
  description: string | ReactNode;
}

const Step = ({ emoji, title, description }: StepProps) => (
  <HStack gap={5}>
    <Text
      fontSize="4xl"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="yellow.200"
      p={5}
      w={20}
      h={20}
      borderRadius="full"
    >
      {emoji}
    </Text>
    <VStack alignItems="start">
      <Heading as="h2" fontSize="larger">
        {title}
      </Heading>
      <Text>{description}</Text>
    </VStack>
  </HStack>
);

const OneTwoThree = () => (
  <VStack spacing={10} align="start">
    <Step
      emoji="🌽"
      title="1. Create a proposal"
      description="Link a GitHub issue, set your price, and get a shareable link."
    />
    <Step
      emoji="💰"
      title="2. Secure funds"
      description="Share the link in a GitHub issue or with the community to get funded."
    />
    <Step
      emoji="🍿"
      title="3. Deliver and get paid"
      description="Fix the issue, deliver the work, and receive your funds."
    />
  </VStack>
);

const LastProposals = () => {
  const { data } = useReadPropcornGetProposals({
    args: [0n],
  });
  const [proposals, setProposals] = useState<PropcornProposal[]>([]);
  const [startingId, setStartingId] = useState<number>(0);

  useEffect(() => {
    if (data !== undefined) {
      let newProposals = [];
      const fetchedProposals = data[0] as readonly PropcornProposal[];
      for (let i = 0; i < 5; i++) {
        if (fetchedProposals[i].status !== 0) {
          newProposals.push(fetchedProposals[i]);
        } else {
          break;
        }
      }

      setProposals(newProposals);
      setStartingId(Number(data[1]));
    }
  }, [data]);

  return (
    <>
      <Heading as="h2">Last Proposals</Heading>
      <VStack w="full" gap={8}>
        {proposals.map((p, i) => (
          <ProposalCard
            key={startingId - i}
            index={startingId - i}
            url={p.url}
            author={p.author}
            minAmountRequested={p.minAmountRequested}
            balance={p.balance}
            feeBasisPoints={p.feeBasisPoints}
            secondsToUnlock={p.secondsToUnlock}
          />
        ))}
        <Link to="/proposals">
          <Button size="lg" bg="green.300" p={7}>
            <Text
              fontSize="2xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="yellow.200"
              p={5}
              w={10}
              h={10}
              borderRadius="full"
              mr={3}
            >
              🍿
            </Text>
            Browse More...
          </Button>
        </Link>
      </VStack>
    </>
  );
};

const CreateProposal = () => (
  <VStack>
    <Link to="/new">
      <Button size="lg" bg="green.300" p={7}>
        <Text
          fontSize="2xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="yellow.200"
          p={5}
          w={10}
          h={10}
          borderRadius="full"
          mr={3}
        >
          🌽
        </Text>
        Create a Proposal
      </Button>
    </Link>
  </VStack>
);

const JoinTelegram = () => (
  <Box>
    <Step
      emoji="🤔"
      title="Questions?"
      description={
        <Text>
          Join our{" "}
          <Link to="https://t.me/propcornprotocol" isExternal>
            <Button variant="link">Telegram Group</Button>
          </Link>
        </Text>
      }
    />
  </Box>
);

const HomePage = () => (
  <Container maxW="container.sm">
    <VStack gap={20}>
      <Hero />
      <OneTwoThree />
      <CreateProposal />
      <LastProposals />
      <JoinTelegram />
    </VStack>
  </Container>
);

export default HomePage;
