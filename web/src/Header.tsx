import { Flex, Button, Spacer, Heading, Center } from "@chakra-ui/react";
import ConnectButton from "./ConnectButton";
import Link from "./Link";

export function Header() {
  return (
    <Center>
      <Flex w="full" gap={5} mt={2} mb={10}>
        <Link to="/">
          <Button bg="transparent" p={5} _hover={{}}>
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
