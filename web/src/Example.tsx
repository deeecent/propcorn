import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ExampleProps {
  title: string;
  content: string;
  author: string;
  link: string;
}

function Example(props: ExampleProps) {
  return (
    <Link to={props.link}>
      <Box
        padding="5px"
        borderRadius="5px"
        borderColor="white"
        borderWidth="1px"
      >
        <Text fontSize="15px" fontWeight="bold">
          {props.title}
        </Text>
        <Text fontSize="10px">{props.content}</Text>
        <Text fontSize="10px" color="lightgrey">
          {props.author}
        </Text>
      </Box>
    </Link>
  );
}

export default Example;
