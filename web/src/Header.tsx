import { Flex, Button, Spacer, Heading, Center } from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import Link from "./Link";

export function Header() {
  return (
    <Center>
      <Flex w="full" p={5} gap={5} mb={10}>
        <Link to="/">
          <Button bg="transparent" p={5}>
            <Heading as="h1" size="lg">
              🍿 Propcorn
            </Heading>
          </Button>
        </Link>
        <Spacer />
        <ConnectButton />
      </Flex>
    </Center>
  );
}
