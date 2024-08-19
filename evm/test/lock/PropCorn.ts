import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { deployPropCornFixture } from "./PropCorn.fixture";

describe("PropCorn", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;
  });

  describe("Deployment", function () {
    beforeEach(async function () {
      const { propCorn } = await this.loadFixture(deployPropCornFixture);
      this.propCorn = propCorn;
    });
  });

  describe("createProposal", function () {
    beforeEach(async function () {
      const { propCorn } = await this.loadFixture(deployPropCornFixture);
      this.propCorn = propCorn;
    });

    describe("should create a proposal", function () {
      it("Should create a proopsal", async function () {
        this.propCorn;
      });
    });
  });
});
