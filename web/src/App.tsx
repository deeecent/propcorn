import {
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import Example from "./Example";
import Create from "./Create";

function App() {
  return (
    <VStack height="100vh">
      <Flex flexDir="row" width="100%" padding="10px">
        <Button variant="primary">ABOUT</Button>
        <Spacer />
        <ConnectButton />
      </Flex>
      <Heading as="h1" size="4xl">
        Propcorn
      </Heading>
      <Spacer />
      <Heading as="h2" size="l">
        Get funds for your opensource work.
      </Heading>
      <Spacer />
      <VStack>
        <Heading as="h2">Examples</Heading>
      </VStack>
      <HStack>
        <Example />
        <Example />
        <Example />
      </HStack>
      <Spacer />
      <Create />
    </VStack>
  );
}

export default App;
