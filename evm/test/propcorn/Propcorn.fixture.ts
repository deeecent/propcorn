import { ethers, upgrades } from "hardhat";

import { Propcorn, Propcorn__factory } from "../../types";

export async function deployPropcornFixture() {
  // Contracts are deployed using the first signer/account by default
  const [owner] = await ethers.getSigners();

  const Propcorn = (await ethers.getContractFactory(
    "Propcorn",
  )) as Propcorn__factory;

  const propcorn = (await upgrades.deployProxy(Propcorn, [owner.address], {
    kind: "uups",
  })) as unknown as Propcorn;

  return { propcorn, owner };
}
