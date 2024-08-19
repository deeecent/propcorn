import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import ConnectButton from "./ConnectButton";

function App() {
  return (
    <VStack>
      <Flex flexDir="row" width="100%" padding="10px">
        <Button variant="primary">ABOUT</Button>
        <Spacer />
        <ConnectButton />
      </Flex>
      <Heading as="h1">Propcorn</Heading>
    </VStack>
  );
}

export default App;
