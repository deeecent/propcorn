import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PropcornModule = buildModule("PropcornModule", (m) => {
  const deployer = m.getAccount(0);

  // Deploy the implementation contract
  const implementation = m.contract("Propcorn");

  // Encode the initialize function call
  const initializeData = m.encodeFunctionCall(
    implementation,
    "initialize",
    [deployer], // Example argument for the initialize function
  );

  // Deploy the ERC1967 Proxy, pointing to the implementation
  const proxy = m.contract("ERC1967Proxy", [implementation, initializeData], {
    id: "Proxy",
  });

  return { proxy };
}) as ReturnType<typeof buildModule>; // Explicitly cast the return type here

export default PropcornModule;
