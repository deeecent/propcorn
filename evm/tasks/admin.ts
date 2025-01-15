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

task("proposal:seed", "Seed proposals")
  .addPositionalParam("amount", "Number of proposals")
  .setAction(async ({ amount }: { amount: number }, hre) => {
    const { chainId } = await hre.ethers.provider.getNetwork();
    if (chainId === 10n) {
      console.error("Not on mainnet!");
      return;
    }

    const propcorn = (await loadContract(
      hre,
      "Propcorn",
      "PropcornModule#Proxy",
    )) as unknown as Propcorn;

    for (let i = 0; i < amount; i++) {
      const tx = await propcorn.createProposal(
        "https://github.com/deeecent/propcorn/issues/46",
        60,
        parseEther(`0.0${i}`),
        100,
      );

      await tx.wait(1);
    }
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
