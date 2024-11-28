import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";
import { ChakraProvider } from "@chakra-ui/react";
import { ConnectKitProvider } from "connectkit";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { theme } from "./theme.ts";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/proposals/:author/:index",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <ConnectKitProvider>
            <RouterProvider router={router} />
          </ConnectKitProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);
