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
  let dan: SignerWithAddress;

  before(async () => {
    [alice, bob, carol, dan] = await ethers.getSigners();
  });

  describe("Deployment", function () {
    beforeEach(async () => {
      ({ propcorn } = await loadFixture(deployPropcornFixture));
    });
  });

  describe("createProposal", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const secondsToUnlock = 18;
    const minAmountRequested = parseEther("1");
    // 2%
    const feeBasisPoints = 2 * 100;

    beforeEach(async () => {
      ({ propcorn } = await loadFixture(deployPropcornFixture));
    });

    it("shouldn't allow to create a proposal with a fee greater than 10000", async () => {
      await expect(
        propcorn
          .connect(bob)
          .createProposal(url, secondsToUnlock, minAmountRequested, 10001),
      ).revertedWithCustomError(propcorn, "InvalidFee");
    });

    it("should create a proposal and emit an event", async () => {
      await expect(
        propcorn
          .connect(bob)
          .createProposal(
            url,
            secondsToUnlock,
            minAmountRequested,
            feeBasisPoints,
          ),
      )
        .to.emit(propcorn, "ProposalCreated")
        .withArgs(
          bob.address,
          0,
          url,
          secondsToUnlock,
          minAmountRequested,
          feeBasisPoints,
        );
    });

    it("should increment the index on every new submission by the same user", async () => {
      const url = "https://github.com/deeecent/propcorn/issues/1";
      const secondsToUnlock = 666;
      const minAmountRequested = parseEther("1");

      await propcorn
        .connect(bob)
        .createProposal(
          url,
          secondsToUnlock,
          minAmountRequested,
          feeBasisPoints,
        );
      await expect(
        propcorn
          .connect(bob)
          .createProposal(
            url,
            secondsToUnlock,
            minAmountRequested,
            feeBasisPoints,
          ),
      )
        .to.emit(propcorn, "ProposalCreated")
        .withArgs(
          bob.address,
          1,
          url,
          secondsToUnlock,
          minAmountRequested,
          feeBasisPoints,
        );
    });
  });

  describe("fundProposal", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const secondsToUnlock = 18;
    const minAmountRequested = parseEther("1");
    const index = 0;
    // 2%
    const feeBasisPoints = 2 * 100;

    beforeEach(async () => {
      ({ propcorn } = await loadFixture(deployPropcornFixture));
      await propcorn
        .connect(bob)
        .createProposal(
          url,
          secondsToUnlock,
          minAmountRequested,
          feeBasisPoints,
        );
    });

    it("should fail if the proposal doesn't exist", async () => {
      await expect(
        propcorn.connect(carol).fundProposal(bob.address, 9999),
      ).revertedWithCustomError(propcorn, "NonexistentProposal");
    });

    it("should fail if the proposal is closed", async () => {
      // Fund the full proposal
      await propcorn
        .connect(carol)
        .fundProposal(bob.address, index, { value: minAmountRequested });

      // Let time passes
      await time.increase(secondsToUnlock);

      // Withdraw the full amount
      await propcorn
        .connect(bob)
        .withdrawFunds(bob.address, index, dan.address);

      await expect(
        propcorn.connect(carol).fundProposal(bob.address, 0),
      ).revertedWithCustomError(propcorn, "ProposalClosed");
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

  describe("withdrawFunds", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const secondsToUnlock = 666;
    const minAmountRequested = parseEther("1");
    // 2%
    const feeBasisPoints = 2 * 100;
    const index = 0;

    beforeEach(async () => {
      ({ propcorn } = await loadFixture(deployPropcornFixture));
      await propcorn
        .connect(bob)
        .createProposal(
          url,
          secondsToUnlock,
          minAmountRequested,
          feeBasisPoints,
        );
    });

    it("should fail if the proposal doesn't exist", async () => {
      await expect(
        propcorn.connect(bob).withdrawFunds(bob.address, 9999, bob.address),
      ).revertedWithCustomError(propcorn, "NonexistentProposal");
    });

    it("should fail if the sender is not the owner of the proposal", async () => {
      await expect(
        propcorn.connect(carol).withdrawFunds(bob.address, index, bob.address),
      ).revertedWithCustomError(propcorn, "InvalidOwner");
    });

    it("should fail if the proposal is not funded yet", async () => {
      await expect(
        propcorn.connect(bob).withdrawFunds(bob.address, index, bob.address),
      ).revertedWithCustomError(propcorn, "ProposalInProgress");
    });

    it("should fail if the proposal reaches the amount threshold but not the temporal one", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(bob.address, index, { value: minAmountRequested });
      await expect(
        propcorn.connect(bob).withdrawFunds(bob.address, index, bob.address),
      ).revertedWithCustomError(propcorn, "ProposalInProgress");
    });

    it("should fail if the funds has already been withdrawn", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(bob.address, index, { value: minAmountRequested });

      await time.increase(secondsToUnlock);

      await propcorn
        .connect(bob)
        .withdrawFunds(bob.address, index, dan.address);

      await expect(
        propcorn.connect(bob).withdrawFunds(bob.address, index, dan.address),
      ).revertedWithCustomError(propcorn, "ProposalClosed");
    });

    it("should transfer funds if the proposal reaches the min amount and enough time has passed", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(bob.address, index, { value: minAmountRequested });
      await time.increase(secondsToUnlock);

      await expect(
        propcorn.connect(bob).withdrawFunds(bob.address, index, dan.address),
      ).to.changeEtherBalances(
        [await propcorn.getAddress(), dan.address, alice.address],
        [
          -minAmountRequested,
          minAmountRequested -
            (minAmountRequested * BigInt(feeBasisPoints)) / 10000n,
          (minAmountRequested * BigInt(feeBasisPoints)) / 10000n,
        ],
      );
    });

    it("should emit an event if the proposal reaches the min amount and enough time has passed", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(bob.address, index, { value: minAmountRequested });
      await time.increase(secondsToUnlock);

      await expect(
        propcorn.connect(bob).withdrawFunds(bob.address, index, dan.address),
      )
        .to.emit(propcorn, "FundsWithdrawn")
        .withArgs(
          bob.address,
          index,
          minAmountRequested -
            (minAmountRequested * BigInt(feeBasisPoints)) / 10000n,
          dan.address,
        );
    });
  });
});
