import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import "./Create.css";
import { useAccount } from "wagmi";

import { ConnectKitButton } from "connectkit";

function Create() {
  const account = useAccount();

  return (
    <VStack
      className="form"
      borderTopWidth="1px"
      borderTopColor="white"
      paddingTop="30px"
      height="50vh"
      width="60%"
    >
      <Heading as="h3" size="l">
        Create a Proposal
      </Heading>
      <HStack width="100%">
        <Text width="20%">Github Issue:</Text>
        <Input width="80%" placeholder="Github Issue link"></Input>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Requested Amount:</Text>
        <NumberInput>
          <NumberInputField placeholder="ETH" />
        </NumberInput>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Days of work:</Text>
        <NumberInput>
          <NumberInputField placeholder="Number of days" />
        </NumberInput>
      </HStack>
      <HStack width="100%">
        <Text width="20%">Creator:</Text>
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName, chain }) => {
            return (
              <Box>
                {isConnected && (ensName ?? truncatedAddress)}
                {!isConnected && (
                  <Button onClick={show} variant="primary">
                    connect
                  </Button>
                )}
              </Box>
            );
          }}
        </ConnectKitButton.Custom>
      </HStack>
      <Spacer />
      <Button width="100%" variant="primary">
        Submit
      </Button>
      <Spacer />
    </VStack>
  );
}

export default Create;
