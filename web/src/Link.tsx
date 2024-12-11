import { Link as ReactRouterLink } from "react-router-dom";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

export default function Link({
  to,
  children,
  ...props
}: ChakraLinkProps & { to: string }) {
  return (
    <ChakraLink as={ReactRouterLink} to={to} {...props}>
      {children}
    </ChakraLink>
  );
}
