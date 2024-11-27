import { defineConfig } from "@wagmi/cli";
import { HardhatConfig, hardhat } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../evm",
      deployments: {
        Propcorn: {
          1337: "0xf6018dffAc9B1C63e8f1097148664551CEaEc5A2",
          10: "0x8055684657B6024A317Ca22593ad759384A62a28",
        },
      },
    }),
    react(),
  ],
});
