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
          1337: "0xA1bBDd84b304EDcfc6dEFE7ABaD8e803F8A408ae",
          11155111: "0xf614E8Cc3e5b8b17d370E21011a82641B2a953f6",
        },
      },
    }),
    react(),
  ],
});
