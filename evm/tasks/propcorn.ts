import { task } from "hardhat/config";

task("deploy:propcorn", "Deploy Propcorn Contract").setAction(async function (
  _,
  { ethers },
) {
  const [deployer] = await ethers.getSigners();
  const propcornFactory = await ethers.getContractFactory("Propcorn");
  console.log("Deploying Propcorn");
  const propcorn = await propcornFactory
    .connect(deployer)
    .deploy(deployer.address);
  await propcorn.waitForDeployment();
  console.log("Propcorn deployed to: ", await propcorn.getAddress());
});
