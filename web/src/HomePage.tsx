import {
  Text,
  Heading,
  VStack,
  Center,
  HStack,
  Highlight,
  Container,
  Button,
} from "@chakra-ui/react";
import ProposalCard from "./ProposalCard";
import Link from "./Link";
import { useReadPropcornGetProposals } from "./generated";

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
  description: string;
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
  const { data: proposals, isLoading, isError } = useReadPropcornGetProposals();

  return (
    <>
      <Heading as="h2">Last Proposals</Heading>
      <VStack w="full" gap={8}>
        {proposals?.map((p, i) => (
          <ProposalCard
            key={i}
            index={i}
            url={p.url}
            author={p.author}
            minAmountRequested={p.minAmountRequested}
            balance={p.balance}
            feeBasisPoints={p.feeBasisPoints}
            secondsToUnlock={p.secondsToUnlock}
            fundCompletedAt={p.fundingCompletedAt}
          />
        ))}
      </VStack>
    </>
  );
};

const CreateProposal = () => (
  <Link to="/new">
    <Button size="lg" bg="green.300">
      <Text fontSize="xl" mr={2}>
        🌽
      </Text>{" "}
      Create your proposal
    </Button>
  </Link>
);

const HomePage = () => (
  <Container maxW="container.sm">
    <VStack gap={40}>
      <Hero />
      <OneTwoThree />
      <LastProposals />
      <CreateProposal />
    </VStack>
  </Container>
);

export default HomePage;
