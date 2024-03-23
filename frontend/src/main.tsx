import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import UserProvider from "./providers/UserProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ToastContainer />
          </QueryClientProvider>
        </NextUIProvider>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);
