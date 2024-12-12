import { Box, Text, Stack } from "@chakra-ui/react";
import Link from "./Link";

const Footer = () => {
  return (
    <Box as="footer" py={4} px={8} fontSize="xs">
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={4}
        justify="center"
        align="center"
      >
        <Link to="/about">About</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-use">Terms of Use</Link>
        <Link to="https://t.me/propcornprotocol" isExternal>
          Telegram Group
        </Link>
        <Link to="https://github.com/deeecent/propcorn" isExternal>
          Source Code
        </Link>
      </Stack>
      <Text mt={4} textAlign="center">
        &copy; {new Date().getFullYear()} deeecent. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
