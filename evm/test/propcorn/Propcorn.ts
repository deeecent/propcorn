import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import { ethers, upgrades } from "hardhat";

import {
  Propcorn,
  PropcornNoMoreUpgrades__factory,
  PropcornUpgraded__factory,
} from "../../types";
import { deployPropcornFixture } from "./Propcorn.fixture";

enum ProposalStatus {
  INVALID,
  FUNDING,
  STARTED,
  PAID,
  CANCELED,
}

describe("Propcorn", function () {
  let propcorn: Propcorn;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let carol: SignerWithAddress;
  let dan: SignerWithAddress;

  function randomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  async function createProposals(n: number) {
    const urls = [...Array(n)].map(() => randomInt(10000000).toString());
    const secondsToUnlocks = [...Array(n)].map(() => randomInt(10000000));
    const minAmountRequesteds = [...Array(n)].map(() => randomInt(10000000));
    const feeBasisPoints = [...Array(n)].map(() => randomInt(100));
    const signers = await ethers.getSigners();
    const authors = [...Array(n)].map((_, x) => {
      return signers[x % (signers.length - 1)];
    });
    //console.log(authors);
    for (let i = 0; i < n; i++) {
      await propcorn
        .connect(authors[i])
        .createProposal(
          urls[i],
          secondsToUnlocks[i],
          minAmountRequesteds[i],
          feeBasisPoints[i],
        );
    }

    return [
      urls,
      secondsToUnlocks,
      minAmountRequesteds,
      feeBasisPoints,
      authors,
    ];
  }

  before(async () => {
    [alice, bob, carol, dan] = await ethers.getSigners();
  });

  beforeEach(async () => {
    ({ propcorn } = await loadFixture(deployPropcornFixture));
  });

  describe("Upgrade", function () {
    it("should upgrade to a new implementation", async () => {
      const PropcornUpgraded = (await ethers.getContractFactory(
        "PropcornUpgraded",
      )) as PropcornUpgraded__factory;

      const newImplementation = await upgrades.upgradeProxy(
        await propcorn.getAddress(),
        PropcornUpgraded,
      );

      expect(await newImplementation.newFunction()).equal(42);
    });

    it("should prevent any further upgrade when authorization is revoked", async () => {
      const PropcornNoMoreUpgrades = (await ethers.getContractFactory(
        "PropcornNoMoreUpgrades",
      )) as PropcornNoMoreUpgrades__factory;

      await upgrades.upgradeProxy(
        await propcorn.getAddress(),
        PropcornNoMoreUpgrades,
      );

      await expect(
        upgrades.upgradeProxy(
          await propcorn.getAddress(),
          PropcornNoMoreUpgrades,
        ),
      ).revertedWith("no more upgrades");
    });
  });

  describe("createProposal", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const secondsToUnlock = 18;
    const minAmountRequested = parseEther("1");
    // 2%
    const feeBasisPoints = 2 * 100;

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
        propcorn.connect(carol).fundProposal(9999),
      ).revertedWithCustomError(propcorn, "NonexistentProposal");
    });

    it("should fail if the proposal is paid", async () => {
      // Fund the full proposal
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: minAmountRequested });

      // Let time passes
      await time.increase(secondsToUnlock);

      // Withdraw the full amount
      await propcorn.connect(bob).withdrawFunds(index, dan.address);

      await expect(
        propcorn.connect(carol).fundProposal(0),
      ).revertedWithCustomError(propcorn, "ProposalPaid");
    });

    it("should emit an event on funding", async () => {
      await expect(
        propcorn
          .connect(carol)
          .fundProposal(index, { value: parseEther("0.4") }),
      )
        .to.emit(propcorn, "ProposalFunded")
        .withArgs(carol.address, bob.address, index, parseEther("0.4"));
    });

    it("should emit an event with `fundingCompletedAt` set on funding when reaches the threshold", async () => {
      const nextTimestamp = 2000000000;
      await time.setNextBlockTimestamp(nextTimestamp);
      await expect(
        propcorn.connect(carol).fundProposal(0, { value: parseEther("1") }),
      )
        .to.emit(propcorn, "ProposalFunded")
        .withArgs(carol.address, bob.address, 0, parseEther("1"));
    });
  });

  describe("defundProposal", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const secondsToUnlock = 18;
    const minAmountRequested = parseEther("1");
    const index = 0;
    // 2%
    const feeBasisPoints = 2 * 100;

    beforeEach(async () => {
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
        propcorn.connect(carol).defundProposal(9999),
      ).revertedWithCustomError(propcorn, "NonexistentProposal");
    });

    it("should fail if the proposal's funds are locked", async () => {
      // Fund the full proposal
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: minAmountRequested });

      await expect(
        propcorn.connect(carol).defundProposal(0),
      ).revertedWithCustomError(propcorn, "FundsLocked");
    });

    it("should fail if the proposal is closed", async () => {
      // Fund the full proposal
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: minAmountRequested });

      // Let time passes
      await time.increase(secondsToUnlock);

      // Withdraw the full amount
      await propcorn.connect(bob).withdrawFunds(index, dan.address);

      await expect(
        propcorn.connect(carol).defundProposal(0),
      ).revertedWithCustomError(propcorn, "ProposalPaid");
    });

    it("should emit an event on defunding", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: parseEther("0.4") });
      await expect(propcorn.connect(carol).defundProposal(index))
        .to.emit(propcorn, "ProposalDefunded")
        .withArgs(carol.address, bob.address, index, parseEther("0.4"));
    });

    it("should transfer the funds to the user", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: parseEther("0.4") });

      await expect(
        propcorn.connect(carol).defundProposal(index),
      ).to.changeEtherBalances(
        [await propcorn.getAddress(), carol.address],
        [-parseEther("0.4"), parseEther("0.4")],
      );
    });

    it("should not transfer the funds to a user that didn't fund the proposal", async () => {
      await expect(
        propcorn.connect(carol).defundProposal(index),
      ).revertedWithCustomError(propcorn, "NoFundsToReturn");
    });

    it("should not transfer the funds twice to the user", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: parseEther("0.4") });

      await propcorn.connect(carol).defundProposal(index);
      await expect(
        propcorn.connect(carol).defundProposal(index),
      ).revertedWithCustomError(propcorn, "NoFundsToReturn");
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
        propcorn.connect(bob).withdrawFunds(9999, bob.address),
      ).revertedWithCustomError(propcorn, "NonexistentProposal");
    });

    it("should fail if the sender is not the owner of the proposal", async () => {
      await expect(
        propcorn.connect(carol).withdrawFunds(index, bob.address),
      ).revertedWithCustomError(propcorn, "InvalidOwner");
    });

    it("should fail if the proposal is not funded yet", async () => {
      await expect(
        propcorn.connect(bob).withdrawFunds(index, bob.address),
      ).revertedWithCustomError(propcorn, "ProposalFunding");
    });

    it("should fail if the proposal reaches the amount threshold but not the temporal one", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: minAmountRequested });
      await expect(
        propcorn.connect(bob).withdrawFunds(index, bob.address),
      ).revertedWithCustomError(propcorn, "FundsLocked");
    });

    it("should fail if the funds has already been withdrawn", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: minAmountRequested });

      await time.increase(secondsToUnlock);

      await propcorn.connect(bob).withdrawFunds(index, dan.address);

      await expect(
        propcorn.connect(bob).withdrawFunds(index, dan.address),
      ).revertedWithCustomError(propcorn, "ProposalPaid");
    });

    it("should transfer funds if the proposal reaches the min amount and enough time has passed", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: minAmountRequested });
      await time.increase(secondsToUnlock);

      await expect(
        propcorn.connect(bob).withdrawFunds(index, dan.address),
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
        .fundProposal(index, { value: minAmountRequested });
      await time.increase(secondsToUnlock);

      await expect(propcorn.connect(bob).withdrawFunds(index, dan.address))
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

  describe("cancelProposal", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const secondsToUnlock = 666;
    const minAmountRequested = parseEther("1");
    // 2%
    const feeBasisPoints = 2 * 100;
    const index = 0;

    beforeEach(async () => {
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
        propcorn.connect(bob).cancelProposal(9999),
      ).revertedWithCustomError(propcorn, "NonexistentProposal");
    });

    it("should fail if the sender is not the owner of the proposal", async () => {
      await expect(
        propcorn.connect(carol).cancelProposal(index),
      ).revertedWithCustomError(propcorn, "InvalidOwner");
    });

    it("should fail if the proposal is already paid", async () => {
      await propcorn
        .connect(carol)
        .fundProposal(index, { value: minAmountRequested });

      await time.increase(secondsToUnlock);

      await propcorn.connect(bob).withdrawFunds(index, dan.address);

      await expect(
        propcorn.connect(bob).cancelProposal(index),
      ).revertedWithCustomError(propcorn, "ProposalPaid");
    });

    it("should cancel the proposal during funding", async () => {
      await propcorn.connect(carol).fundProposal(index, {
        value: minAmountRequested - BigInt(1),
      });

      await propcorn.connect(bob).cancelProposal(index);

      const result = await propcorn.proposals(index);

      expect(result.status).equal(ProposalStatus.CANCELED);
    });

    it("should cancel the proposal once funded", async () => {
      await propcorn.connect(carol).fundProposal(index, {
        value: minAmountRequested,
      });

      await propcorn.connect(bob).cancelProposal(index);

      const result = await propcorn.proposals(index);

      expect(result.status).equal(ProposalStatus.CANCELED);
    });

    it("should emit an event", async () => {
      await expect(propcorn.connect(bob).cancelProposal(index))
        .to.emit(propcorn, "ProposalCanceled")
        .withArgs(bob.address, index);
    });
  });

  describe("getProposals(uint256)", function () {
    it("returns 0 proposals and index 0 if none are there", async () => {
      const result = await propcorn["getProposals(uint256)"](0);

      expect(result.proposalPage.length).equal(1000);
      expect(result.proposalPage[0].status).equal(ProposalStatus.INVALID);
      expect(result.startingId).equal(0);
    });

    it("returns 0 proposals and index 0 for page 1 if none are there", async () => {
      const result = await propcorn["getProposals(uint256)"](1);

      expect(result.proposalPage.length).equal(1000);
      expect(result.proposalPage[0].status).equal(ProposalStatus.INVALID);
      expect(result.startingId).equal(0);
    });

    it("when less than 1000, returns all proposals for page 0 sorted from latest to earliest, starting index equal first element id", async () => {
      const n = 3;
      const [
        urls,
        secondsToUnlocks,
        minAmountRequesteds,
        feeBasisPoints,
        authors,
      ] = await createProposals(n);
      const result = await propcorn["getProposals(uint256)"](0);

      expect(result.proposalPage.length).equal(1000);
      expect(result.startingId).equal(2);

      for (let i = 2; i >= n; i--) {
        expect(result.proposalPage[i].author).equal(authors[i]);
        expect(result.proposalPage[i].url).equal(urls[i]);
        expect(result.proposalPage[i].secondsToUnlock).equal(
          secondsToUnlocks[i],
        );
        expect(result.proposalPage[i].minAmountRequested).equal(
          minAmountRequesteds[i],
        );
        expect(result.proposalPage[i].feeBasisPoints).equal(feeBasisPoints[i]);
        expect(result.proposalPage[i].balance).equal(0);
        expect(result.proposalPage[i].status).equal(ProposalStatus.FUNDING);
      }
    });

    it("returns max 1000 proposals for page 0, sorted from latest to earliest", async () => {
      const n = 1001;
      const [
        urls,
        secondsToUnlocks,
        minAmountRequesteds,
        feeBasisPoints,
        authors,
      ] = await createProposals(n);
      const result = await propcorn["getProposals(uint256)"](0);

      expect(result.proposalPage.length).equal(1000);
      expect(result.startingId).equal(1000);

      for (let i = 1000; i > 0; i--) {
        expect(result.proposalPage[1000 - i].author).equal(authors[i]);
        expect(result.proposalPage[1000 - i].url).equal(urls[i]);
        expect(result.proposalPage[1000 - i].secondsToUnlock).equal(
          secondsToUnlocks[i],
        );
        expect(result.proposalPage[1000 - i].minAmountRequested).equal(
          minAmountRequesteds[i],
        );
        expect(result.proposalPage[1000 - i].feeBasisPoints).equal(
          feeBasisPoints[i],
        );
        expect(result.proposalPage[1000 - i].balance).equal(0);
        expect(result.proposalPage[1000 - i].status).equal(
          ProposalStatus.FUNDING,
        );
      }
    });

    it("returns proposals for page 1, sorted from latest to earliest", async () => {
      const n = 1003;
      const [
        urls,
        secondsToUnlocks,
        minAmountRequesteds,
        feeBasisPoints,
        authors,
      ] = await createProposals(n);
      const result = await propcorn["getProposals(uint256)"](1);

      expect(result.proposalPage.length).equal(1000);
      expect(result.startingId).equal(2);

      for (let i = 2; i >= 0; i--) {
        expect(result.proposalPage[2 - i].author).equal(authors[i]);
        expect(result.proposalPage[2 - i].url).equal(urls[i]);
        expect(result.proposalPage[2 - i].secondsToUnlock).equal(
          secondsToUnlocks[i],
        );
        expect(result.proposalPage[2 - i].minAmountRequested).equal(
          minAmountRequesteds[i],
        );
        expect(result.proposalPage[2 - i].feeBasisPoints).equal(
          feeBasisPoints[i],
        );
        expect(result.proposalPage[2 - i].balance).equal(0);
        expect(result.proposalPage[2 - i].status).equal(ProposalStatus.FUNDING);
      }
    });

    it("returns earliest proposal on last page when 1001 proposals in total", async () => {
      const n = 1001;
      const [
        urls,
        secondsToUnlocks,
        minAmountRequesteds,
        feeBasisPoints,
        authors,
      ] = await createProposals(n);
      const result = await propcorn["getProposals(uint256)"](1);

      expect(result.proposalPage.length).equal(1000);
      expect(result.startingId).equal(0);

      expect(result.proposalPage[0].author).equal(authors[0]);
      expect(result.proposalPage[0].url).equal(urls[0]);
      expect(result.proposalPage[0].secondsToUnlock).equal(secondsToUnlocks[0]);
      expect(result.proposalPage[0].minAmountRequested).equal(
        minAmountRequesteds[0],
      );
      expect(result.proposalPage[0].feeBasisPoints).equal(feeBasisPoints[0]);
      expect(result.proposalPage[0].balance).equal(0);
      expect(result.proposalPage[0].status).equal(ProposalStatus.FUNDING);
      expect(result.proposalPage[1].status).equal(ProposalStatus.INVALID);
    });
  });
});
