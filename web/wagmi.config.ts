import { defineConfig } from "@wagmi/cli";
import { hardhat } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  plugins: [
    hardhat({
      project: "../evm",
      exclude: [
        // the following patterns are excluded by default
        "testing/**",
      ],
      deployments: {
        Propcorn: {
          10: "0xa1430c9c87D3c534EEfC429F4F29577282b8dE0F",
        },
      },
    }),
    react(),
  ],
});
