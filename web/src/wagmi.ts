import { http, createConfig } from "wagmi";
import { localhost, optimism, sepolia } from "wagmi/chains";

import.meta.env.VITE_RPC_URL;

import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, walletConnectWallet, injectedWallet],
    },
  ],
  {
    appName: "Propcorn",
    appUrl: "https://propcorn.xyz",
    projectId: import.meta.env.VITE_WC_PROJECT_ID,
  },
);

export let config: ReturnType<typeof createConfig>;
if (import.meta.env.DEV === true) {
  config = createConfig({
    chains: [optimism, sepolia, localhost],
    connectors,
    transports: {
      [optimism.id]: http(import.meta.env.VITE_RPC_URL_OPTIMISM),
      [sepolia.id]: http(import.meta.env.VITE_RPC_URL_SEPOLIA),
      [localhost.id]: http(import.meta.env.VITE_RPC_URL_LOCALHOST),
    },
  });
} else {
  config = createConfig({
    chains: [optimism],
    syncConnectedChain: false,
    connectors,
    transports: {
      [optimism.id]: http(import.meta.env.VITE_RPC_URL_OPTIMISM),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
