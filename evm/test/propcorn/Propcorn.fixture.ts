import { ethers, upgrades } from "hardhat";

import {
  Propcorn,
  PropcornV2,
  PropcornV2__factory,
  Propcorn__factory,
} from "../../types";

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

export async function deployPropcornAndUpgradeV2() {
  // Contracts are deployed using the first signer/account by default
  const [owner] = await ethers.getSigners();
  const Propcorn = (await ethers.getContractFactory(
    "Propcorn",
  )) as Propcorn__factory;

  const propcorn = (await upgrades.deployProxy(Propcorn, [owner.address], {
    kind: "uups",
  })) as unknown as Propcorn;

  const PropcornV2Factory = (await ethers.getContractFactory(
    "PropcornV2",
  )) as PropcornV2__factory;

  const propcornV2 = (await upgrades.upgradeProxy(
    await propcorn.getAddress(),
    PropcornV2Factory,
  )) as unknown as PropcornV2;

  return { propcornV2, owner };
}
