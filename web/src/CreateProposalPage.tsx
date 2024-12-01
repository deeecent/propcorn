import { Container, Heading } from "@chakra-ui/react";
import Create from "./Create";

const CreateProposalPage = () => (
  <>
    <Heading as="h3" size="xl" my={10} textAlign="center">
      Create a Proposal
    </Heading>
    <Container>
      <Create />
    </Container>
  </>
);

export default CreateProposalPage;
