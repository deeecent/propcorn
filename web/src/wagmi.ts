import { http, createConfig } from "wagmi";
import { optimism } from "wagmi/chains";

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

export const config = createConfig({
  chains: [optimism],
  connectors,
  transports: {
    [optimism.id]: http(import.meta.env.VITE_RPC_URL_OPTIMISM),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
