import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const lock = await deploy("Propcorn", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log(`Propcorn contract: `, lock.address);
};

export default func;

func.id = "deploy_propcorn"; // id required to prevent reexecution
