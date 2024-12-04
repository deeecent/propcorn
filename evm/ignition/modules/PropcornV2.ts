import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import PropcornModule from "./Propcorn";

const PropcornModuleV2 = buildModule("PropcornModuleV2", (m) => {
  const deployer = m.getAccount(0);

  const { proxy: proxyFuture } = m.useModule(PropcornModule);

  // Fetch the callable proxy contract
  const proxy = m.contractAt("ERC1967Proxy", proxyFuture, { id: "Proxy" });

  // Deploy the new implementation contract
  const newImplementation = m.contract("PropcornV2"); // Replace with the upgraded contract name

  // Call the upgradeTo function on the proxy to point to the new implementation
  m.call(proxy, "upgradeToAndCall", [newImplementation, "0x"], {
    from: deployer,
  });

  return { newImplementation };
}) as ReturnType<typeof buildModule>;

export default PropcornModuleV2;
