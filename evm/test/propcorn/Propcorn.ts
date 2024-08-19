import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { deployPropcornFixture } from "./Propcorn.fixture";

describe("Propcorn", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;
  });

  describe("Deployment", function () {
    beforeEach(async function () {
      const { propcorn } = await this.loadFixture(deployPropcornFixture);
      this.propCorn = propcorn;
    });
  });

  describe("createProposal", function () {
    beforeEach(async function () {
      const { propcorn } = await this.loadFixture(deployPropcornFixture);
      this.propCorn = propcorn;
    });

    describe("should create a proposal", function () {
      it("Should create a proopsal", async function () {
        this.propCorn;
      });
    });
  });
});
