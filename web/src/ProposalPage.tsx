import { useParams } from "react-router-dom";
import Proposal from "./Proposal";

type ProposalParams = {
  author: `0x${string}`;
  index: string;
};

function ProposalPage() {
  const { author, index } = useParams<ProposalParams>();

  return <Proposal author={author!} index={index!} />;
}

export default ProposalPage;
