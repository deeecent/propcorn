import { parseEther } from "ethers";
import { task } from "hardhat/config";

import { Propcorn } from "../types";
import { loadContract } from "./utils";

task("proposal:create", "Create a proposal", async (_, hre) => {
  const propcorn = (await loadContract(
    hre,
    "Propcorn",
    "PropcornModule#Proxy",
  )) as unknown as Propcorn;

  const tx = await propcorn.createProposal(
    "https://github.com/deeecent/propcorn/issues/46",
    60,
    parseEther("0.01"),
    100,
  );
  await tx.wait(1);
});

task("proposal:get", "Get a proposal", async (_, hre) => {
  const propcorn = (await loadContract(
    hre,
    "Propcorn",
    "PropcornModule#Proxy",
  )) as unknown as Propcorn;

  const result = await propcorn.proposals(0);

  console.log(result.startedAt);
});
