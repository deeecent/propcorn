import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import { ethers } from "hardhat";

import { PropcornV2 } from "../../types";
import { deployPropcornAndUpgradeV2 } from "./Propcorn.fixture";

describe("PropcornV2", function () {
  let propcornV2: PropcornV2;
  let alice: SignerWithAddress;
  let bob: SignerWithAddress;
  let carol: SignerWithAddress;

  before(async () => {
    [alice, bob, carol] = await ethers.getSigners();
  });

  describe("setProtocolFeeReceiver", function () {
    const url = "https://github.com/deeecent/propcorn/issues/1";
    const secondsToUnlock = 666;
    const minAmountRequested = parseEther("1");
    // 2%
    const feeBasisPoints = 2 * 100;
    const index = 0;

    beforeEach(async () => {
      ({ propcornV2 } = await loadFixture(deployPropcornAndUpgradeV2));
      await propcornV2
        .connect(bob)
        .createProposal(
          url,
          secondsToUnlock,
          minAmountRequested,
          feeBasisPoints,
        );
    });

    it("should fail when called by non owner", async () => {
      await expect(
        propcornV2.connect(carol).setProtocolFeeReceiver(carol.address),
      ).revertedWithCustomError(propcornV2, "OwnableUnauthorizedAccount");
    });

    it("should change the protocol fee receiver", async () => {
      await propcornV2
        .connect(carol)
        .fundProposal(bob.address, index, { value: minAmountRequested });

      await time.increase(secondsToUnlock);

      await propcornV2.setProtocolFeeReceiver(carol.address);

      await expect(
        propcornV2
          .connect(bob)
          .withdrawFunds(bob.address, index, alice.address),
      ).to.changeEtherBalances(
        [carol.address],
        [(minAmountRequested * BigInt(feeBasisPoints)) / 10000n],
      );
    });
  });
});
