import { useParams } from "react-router-dom";
import Proposal from "./Proposal";
import { useReadPropcornProposals } from "./generated";
import NotFound from "./NotFound";
import { useGitHubIssueData } from "./hooks";
import { Container } from "@chakra-ui/react";
import { PropcornProposal } from "./types";

type ProposalParams = {
  index: string;
};

const ProposalLoader = ({ index }: { index: bigint }) => {
  const {
    data: pcData,
    isLoading: pcIsLoading,
    error: pcError,
    refetch,
  } = useReadPropcornProposals({
    args: [index],
  });

  const {
    data: ghData,
    isLoading: ghIsLoading,
    error: ghError,
  } = useGitHubIssueData(pcData ? pcData[0] : undefined);

  if (pcIsLoading) {
    return "loading";
  }

  if (!pcData) {
    return "whatever";
  }

  // There MUST be a better way!
  const proposal = {
    url: pcData[0],
    index,
    secondsToUnlock: pcData[1],
    startedAt: pcData[2],
    minAmountRequested: pcData[3],
    balance: pcData[4],
    feeBasisPoints: pcData[5],
    author: pcData[6],
    status: pcData[7],
  } as PropcornProposal;

  return <Proposal proposal={proposal} issue={ghData} refetch={refetch} />;
};

const ProposalPage = () => {
  const { index } = useParams<ProposalParams>();
  const bigIndex =
    index === undefined || isNaN(Number(index)) ? null : BigInt(index);

  if (bigIndex === null) {
    return <NotFound />;
  }

  return (
    <Container maxW="container.md">
      <ProposalLoader index={bigIndex} />
    </Container>
  );
};

export default ProposalPage;
