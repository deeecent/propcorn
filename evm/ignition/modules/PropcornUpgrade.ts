/*import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UpgradeMyContractModule = buildModule(
  "UpgradeMyContractModule",
  (m) => {
    // The address of the existing proxy contract
    const proxyAddress = "0xExistingProxyAddress"; // Replace with your proxy address

    // Deploy the new implementation contract
    const newImplementation = m.contract("MyContract", {
      id: "MyContract-NewImplementation",
    });

    // Attach the proxy to interact with the contract
    const proxyInstance = m.contractAt("MyContract", proxyAddress, {
      id: "MyContract-ProxyInstance",
    });

    // Call the `upgradeTo` function to upgrade the implementation
    await m.call(proxyInstance, "upgradeTo", [newImplementation], {
      id: "UpgradeToCall",
    });

    return { proxy: proxyInstance, newImplementation };
  },
);

export default UpgradeMyContractModule;
*/
