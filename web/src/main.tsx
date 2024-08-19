import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";
import {
  ChakraProvider,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react";
import "./index.css";
import { ConnectKitProvider } from "connectkit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "0", // <-- border radius is same for all variants and sizes
    borderColor: "#ffffff",
    borderWidth: "0.5px",
  },
  variants: {
    primary: () => ({
      color: "white",
      backgroundColor: "black",
    }),
    disabled: () => ({
      fontSize: "md",
      backgroundColor: "black",
      color: "grey",
      _hover: {
        color: "white",
        backgroundColor: "black",
      },
    }),
  },
});

const theme = extendTheme({
  fonts: {
    heading: `"FiraCodeHeading", "Arial", "serif"`,
    body: `"FiraCode", "Arial", "serif"`,
  },
  styles: {
    global: {
      html: {
        background: "rgb(0, 0, 0)",
      },
      body: {
        background: "transparent",
        color: "rgb(255, 255, 255)",
        textAlign: "center",
        height: "100vh",
      },
    },
  },
  components: {
    Button,
  },
});

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

const router = createBrowserRouter([
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
  </React.StrictMode>
);
