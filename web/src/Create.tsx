import {
  Box,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import "./Create.css";

function Create() {
  return (
    <VStack
      className="form"
      borderTopWidth="1px"
      borderTopColor="white"
      paddingTop="30px"
      height="50vh"
      width="60%"
    >
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
    </VStack>
  );
}

export default Create;
