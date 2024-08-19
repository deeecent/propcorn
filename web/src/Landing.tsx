import { Heading, HStack, Spacer, VStack } from "@chakra-ui/react";
import Example from "./Example";
import Create from "./Create";

function Landing() {
  return (
    <VStack height="100vh" width="100%">
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

export default Landing;
