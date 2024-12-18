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
          10: "0xe31A21eC01CcA7b95FCcd6eDd4Ac56CB743a4112",
          11155111: "0x08645B733f950b4e8a759E1e2f8c9084AEAfFe48",
        },
      },
    }),
    react(),
  ],
});
