import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import { ethers } from "hardhat";

import { Propcorn } from "../../types";
import { deployPropcornFixture } from "./Propcorn.fixture";

describe("Propcorn", function () {
  let propcorn: Propcorn;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let carol: SignerWithAddress;

  before(async () => {
    [alice, bob, carol] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    beforeEach(async () => {
      ({ propcorn } = await loadFixture(deployPropcornFixture));
    });
  });

  describe("createProposal", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const daysToUnlock = 18;
    const minAmountRequested = parseEther("1");

    beforeEach(async () => {
      ({ propcorn } = await loadFixture(deployPropcornFixture));
    });

    it("should create a proposal and emit an event", async () => {
      await expect(
        propcorn
          .connect(bob)
          .createProposal(url, daysToUnlock, minAmountRequested),
      )
        .to.emit(propcorn, "ProposalCreated")
        .withArgs(bob.address, 0, url, daysToUnlock, minAmountRequested);
    });

    it("should increment the index on every new submission by the same user", async () => {
      const url = "https://github.com/deeecent/propcorn/issues/1";
      const daysToUnlock = 18;
      const minAmountRequested = parseEther("1");

      await propcorn
        .connect(bob)
        .createProposal(url, daysToUnlock, minAmountRequested);
      await expect(
        propcorn
          .connect(bob)
          .createProposal(url, daysToUnlock, minAmountRequested),
      )
        .to.emit(propcorn, "ProposalCreated")
        .withArgs(bob.address, 1, url, daysToUnlock, minAmountRequested);
    });
  });

  describe("fundProposal", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const daysToUnlock = 18;
    const minAmountRequested = parseEther("1");
    const index = 0;

    beforeEach(async () => {
      ({ propcorn } = await loadFixture(deployPropcornFixture));
      await propcorn
        .connect(bob)
        .createProposal(url, daysToUnlock, minAmountRequested);
    });

    it("should fail if the proposal doesn't exist", async () => {
      await expect(
        propcorn.connect(carol).fundProposal(bob.address, 9999),
      ).revertedWithCustomError(propcorn, "NonexistentProposal");
    });

    it("should emit an event on funding", async () => {
      await expect(
        propcorn
          .connect(carol)
          .fundProposal(bob.address, index, { value: parseEther("0.4") }),
      )
        .to.emit(propcorn, "ProposalFunded")
        .withArgs(carol.address, bob.address, index, parseEther("0.4"), 0);
    });

    it("should emit an event with `fundingCompletedAt` set on funding when reaches the threshold", async () => {
      const nextTimestamp = 2000000000;
      await time.setNextBlockTimestamp(nextTimestamp);
      await expect(
        propcorn
          .connect(carol)
          .fundProposal(bob.address, 0, { value: parseEther("1") }),
      )
        .to.emit(propcorn, "ProposalFunded")
        .withArgs(
          carol.address,
          bob.address,
          0,
          parseEther("1"),
          nextTimestamp,
        );
    });
  });
});
