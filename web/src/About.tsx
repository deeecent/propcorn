import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "./Link";

const About = () => {
  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8} align="stretch">
        {/* Hero Section */}
        <Heading textAlign="center" size="2xl" mb={4}>
          About
        </Heading>
        <Box>
          <Heading size="lg" mb={3}>
            What is it
          </Heading>
          <Text>
            Propcorn is a public good designed to incentivize open-source
            developers by enabling micro-funding for small features or fixes on
            GitHub.
            <br />
            <br /> It allows developers to create proposals for issues they find
            interesting, set a price, and share the link to gather funding from
            the community. Once the funding goal is met, the funds are released
            to the developer after a waiting period, ensuring community
            approval. <br />
            <br />
            Propcorn is simple on purpose, focusing only on micro-funding for
            small development tasks.
          </Text>
        </Box>
        <Box>
          <Heading size="lg" mb={3}>
            Genesis
          </Heading>
          <Text>
            Propcorn was born as a hackaton project during the Web Zero Hackaton
            in Berlin, part of Web3 Summit.
            <br />
            <br />
            The project won and we are now developing and expanding it with the
            help of the Web Zero team.
          </Text>
        </Box>

        {/* How it Works Section */}
        <Heading size="lg">How To</Heading>
        <Box>
          <VStack spacing={6}>
            <Box>
              <Heading size="md">Step 1: Find a Project</Heading>
              <Text>
                Look for a project on Github for which you'd like to work on.
                Anything: a bug fix, a new small feature etc.
              </Text>
            </Box>
            <Box>
              <Heading size="md">Step 2: Github Issue</Heading>
              <Text>
                If there is an issue that requires development, skip to{" "}
                <strong>Step 4</strong>. Else, create an issue with your
                suggested feature/bug fix, scope and timeline and wait for the
                community reaction.
              </Text>
            </Box>
            <Box>
              <Heading size="md">Step 3: Discuss</Heading>
              <Text>
                Make sure to discuss the issue with the community until everyone
                is satisfied with the proposal.
              </Text>
            </Box>
            <Box>
              <Heading size="md">Step 4: Create a Proposal</Heading>
              <Text>
                Head to the{" "}
                <Link textDecoration="underline" to="/new">
                  Propcorn Proposal Page
                </Link>{" "}
                and fill in the Github Issue and the relevant details (including
                how much you want to get paid). After that, submit the
                transaction and once the proposal is created, post it back in
                the Github issue page
              </Text>
            </Box>
            <Box>
              <Heading size="md">Step 5: Funding</Heading>
              <Text>
                Make sure to advertise your proposal so that enough people can
                know about it and fund it. Once the funding is done, you can
                start working on it.
              </Text>
            </Box>
            <Box>
              <Heading size="md">Step 6: Work Completed</Heading>
              <Text>
                Once the time you estimated for the issue expires, you can
                withdraw your money. Make sure you have actually delivered your
                work, else people will stop trusting you.
              </Text>
            </Box>
          </VStack>
        </Box>

        <Box>
          <Heading size="lg" mb={3}>
            Deeecent
          </Heading>
          <Text>
            We are a small team of seasoned developers, specializing since a few
            years in blockchain related products. <br />
            <br />
            Core members are{" "}
            <Link
              isExternal
              textDecoration="underline"
              to="https://www.linkedin.com/in/agranzot/"
            >
              Alberto Granzotto
            </Link>
            , who, on top of a long experience in development, contributed to
            the first blockchain based digital content rights technology
            (ascribe) and{" "}
            <Link
              isExternal
              textDecoration="underline"
              to="https://www.linkedin.com/in/nicolamiotto/"
            >
              Nicola Miotto
            </Link>
            , ex developer at Toucan, with an eclectic software development
            experience.
            <br />
            <br /> Feel free to reach out to us on the{" "}
            <Link to="https://t.me/propcornprotocol" isExternal>
              Telegram Group
            </Link>{" "}
            if you have questions.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default About;
