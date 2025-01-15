import { Heading, VStack, Container, Button } from "@chakra-ui/react";
import ProposalCard from "./ProposalCard";
import { useReadPropcornGetProposals } from "./generated";
import { useEffect, useState } from "react";
import { PropcornProposal } from "./types";

const BATCH_SIZE = 5;

const Proposals = () => {
  const [lastLoadedPage, setLastLoadedPage] = useState(0n);
  const { data, isLoading } = useReadPropcornGetProposals({
    args: [lastLoadedPage],
  });
  const [proposals, setProposals] = useState<PropcornProposal[]>([]);
  const [startingId, setStartingId] = useState<number>();
  const [visibleProposals, setVisibleProposals] = useState<number>(BATCH_SIZE);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [noMoreProposals, setNoMoreProposals] = useState<boolean>(false);

  useEffect(() => {
    if (visibleProposals === BATCH_SIZE) return;
    if (!noMoreProposals && visibleProposals >= proposals.length) {
      setLastLoadedPage(lastLoadedPage + 1n);
    }

    if (noMoreProposals && visibleProposals >= proposals.length) {
      setEndReached(true);
    }
  }, [visibleProposals]);

  useEffect(() => {
    if (data !== undefined) {
      let newProposals = [];
      const fetchedProposals = data[0] as readonly PropcornProposal[];

      // we only need the highest id to infer the other ones
      if (proposals.length === 0) setStartingId(Number(data[1]));

      for (let i = 0; i < fetchedProposals.length; i++) {
        if (fetchedProposals[i].status !== 0) {
          newProposals.push(fetchedProposals[i]);
        } else {
          if (
            i == fetchedProposals.length - 1 &&
            visibleProposals > proposals.length + fetchedProposals.length
          )
            setLastLoadedPage(lastLoadedPage + 1n);
          else if (i < fetchedProposals.length - 1) {
            setNoMoreProposals(true);
            if (visibleProposals > proposals.length) {
              setEndReached(true);
            }
          }
          break;
        }
      }

      setProposals((prevProposals) => {
        // this is necessary to deal with the edge case when wagmi (for no reason)
        // triggers 2 consecutive read requests, making it impossible to know
        // at this stage whether we are dealing with the response of a duplicate
        // request or a new one (let aside by using this hack)
        let different = false;
        for (let j = 0; j < prevProposals.length && !different; j++) {
          if (
            prevProposals[j].url !== newProposals[j].url ||
            prevProposals[j].minAmountRequested !==
              newProposals[j].minAmountRequested
          ) {
            different = true;
            break;
          }
        }
        if (different || prevProposals.length === 0) {
          return [...prevProposals, ...newProposals];
        }

        return prevProposals;
      });
    }
  }, [data]);

  return (
    <>
      <Heading as="h2" marginBottom="50px">
        Explore Proposals
      </Heading>
      <VStack w="full" gap={8}>
        {startingId !== undefined &&
          proposals
            .slice(0, Math.min(visibleProposals, proposals.length))
            .map((p, i) => (
              <ProposalCard
                key={startingId - i}
                index={startingId - i}
                url={p.url}
                author={p.author}
                minAmountRequested={p.minAmountRequested}
                balance={p.balance}
                feeBasisPoints={p.feeBasisPoints}
                secondsToUnlock={p.secondsToUnlock}
              />
            ))}
        {!endReached && (
          <Button
            size="lg"
            bg="green.300"
            p={7}
            isLoading={isLoading}
            onClick={() => setVisibleProposals(visibleProposals + BATCH_SIZE)}
          >
            Load More
          </Button>
        )}
      </VStack>
    </>
  );
};

const ListPage = () => {
  return (
    <Container maxW="container.md">
      <Proposals />
    </Container>
  );
};

export default ListPage;
