import { Heading, Text, VStack } from "@chakra-ui/react";
import Link from "./Link";

export default function NotFound() {
  return (
    <VStack mt={10} gap={10}>
      <Heading as="h1">404 - Page Not Found</Heading>
      <Text>Sorry, there's no 🍿 for you here.</Text>
      <Link to="/">Back to the homepage</Link>
    </VStack>
  );
}
