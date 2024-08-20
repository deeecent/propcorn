import { Button, Flex, Heading, Spacer, VStack } from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import Landing from "./Landing";
import { Link, useParams } from "react-router-dom";
import Proposal from "./Proposal";

type ProposalParams = {
  author: `0x${string}`;
  index: string;
};

function App() {
  const { author, index } = useParams<ProposalParams>();
  console.log(author);

  return (
    <VStack height="100vh">
      <Flex flexDir="row" width="100%" padding="10px">
        <Button variant="primary">ABOUT</Button>
        <Spacer />
        <ConnectButton />
      </Flex>
      <Heading as="h1" size="4xl">
        <Link to="/">Propcorn</Link>
      </Heading>
      <Spacer />
      {author !== undefined && index !== undefined && (
        <Proposal author={author} index={index} />
      )}
      {(author === undefined || index === undefined) && <Landing />}
    </VStack>
  );
}

export default App;
