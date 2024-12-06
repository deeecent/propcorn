import { Container, Heading } from "@chakra-ui/react";
import Create from "./Create";
import { useNavigate } from "react-router-dom";

const CreateProposalPage = () => {
  const navigate = useNavigate();
  const onSuccess = (index: number) => navigate(`/proposal/${index}`);

  return (
    <>
      <Heading as="h3" size="xl" my={10} textAlign="center">
        Create a Proposal
      </Heading>
      <Container>
        <Create onSuccess={onSuccess} />
      </Container>
    </>
  );
};

export default CreateProposalPage;
