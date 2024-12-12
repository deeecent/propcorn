import { readFile } from "fs/promises";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export async function loadContract(
  hre: HardhatRuntimeEnvironment,
  contractName: string,
  deploymentName = "",
) {
  console.log(`Loading ${deploymentName}`);
  if (deploymentName == "") {
    deploymentName = contractName;
  }
  const { chainId } = await hre.ethers.provider.getNetwork();
  const networkFile = `./ignition/deployments/chain-${chainId}/deployed_addresses.json`;
  const networks = JSON.parse(await readFile(networkFile, "utf8"));
  const address = networks[deploymentName];
  const contract = await hre.ethers.getContractAt(contractName, address);

  return contract;
}
