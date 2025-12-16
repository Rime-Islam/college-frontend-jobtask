import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import router from "./route/router.jsx";
import { store, persistor } from "./redux/store.js";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="bottom-right" />
        <Provider store={store}>
          <RouterProvider router={router} />
          <App />
        </Provider>
      </QueryClientProvider>
    </PersistGate>
  </StrictMode>
);
