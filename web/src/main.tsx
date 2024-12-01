// import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { ConnectKitProvider } from "connectkit";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { theme } from "./theme.ts";
import { Header } from "./Header.tsx";
import NotFound from "./NotFound.tsx";
import HomePage from "./HomePage.tsx";
import CreateProposalPage from "./CreateProposalPage.tsx";
import Footer from "./Footer.tsx";

// globalThis.Buffer = Buffer;
const queryClient = new QueryClient();

const WithHeader = () => (
  <>
    <Container maxW="container.xl">
      <Header />
    </Container>

    <Outlet />

    <Container mt={20}>
      <Footer />
    </Container>

    <ScrollRestoration />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <WithHeader />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/new",
        element: <CreateProposalPage />,
      },
      {
        path: "/proposals/:author/:index",
        element: <App />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
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
