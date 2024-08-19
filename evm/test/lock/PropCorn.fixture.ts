import { ethers } from "hardhat";

import { PropCorn, PropCorn__factory } from "../../types";

export async function deployPropCornFixture() {
  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await ethers.getSigners();

  const PropCorn = (await ethers.getContractFactory("PropCorn")) as PropCorn__factory;
  const propCorn = (await PropCorn.deploy()) as PropCorn;

  return { propCorn, owner, otherAccount };
}
