import { http, createConfig } from "wagmi";
import { localhost /* , mainnet, */, optimism } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [localhost, optimism],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [optimism.id]: http(import.meta.env.VITE_RPC_URL),
    [localhost.id]: http(import.meta.env.VITE_RPC_URL),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
