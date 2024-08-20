import { task } from "hardhat/config";

task("deploy:propcornccip", "Deploy Propcornccip Contract").setAction(async function (
  _,
  { ethers },
) {
  const [deployer] = await ethers.getSigners();
  const ccipPropcornFactory = await ethers.getContractFactory("Propcornccip");
  console.log("Deploying Propcorn");
  const propcornccip = await ccipPropcornFactory
    .connect(deployer)
    .deploy("CHANGETHIS",deployer.address); //https://docs.chain.link/ccip/supported-networks
  await propcornccip.waitForDeployment();
  console.log("Propcornccip deployed to: ", await propcornccip.getAddress());
});
