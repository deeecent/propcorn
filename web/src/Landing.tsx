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
        <Example
          link="/proposals/0x3de6f6C5ecf418483826B95E6230A9981D74C14A/1"
          title="Make Logo"
          content="Create website logo"
          author="@sirnicolaz"
        />
        <Example
          link="/proposals/0x3de6f6C5ecf418483826B95E6230A9981D74C14A/2"
          title="Improve UI"
          content="Make UI feel more integrated"
          author="@sirnicolaz"
        />
        <Example
          link="/proposals/0x3de6f6C5ecf418483826B95E6230A9981D74C14A/3"
          title="Withdraw"
          content="Add early withdraw functionality"
          author="@sirnicolaz"
        />
      </HStack>
      <Spacer />
      <Create />
    </VStack>
  );
}

export default Landing;
