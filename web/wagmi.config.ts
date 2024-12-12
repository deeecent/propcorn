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
          11155111: "0xC4b3736A804837715C41Abe7438A4033DAa58D80",
        },
      },
    }),
    react(),
  ],
});
