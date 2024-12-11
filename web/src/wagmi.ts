import { http, createConfig } from "wagmi";
import { /* localhost, mainnet, optimism, */ sepolia } from "wagmi/chains";

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
    appUrl: "https://propcorn.deeecent.website",
    projectId: import.meta.env.VITE_WC_PROJECT_ID,
  },
);

export const config = createConfig({
  chains: [sepolia],
  connectors,
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
