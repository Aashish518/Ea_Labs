import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationProvider } from "./Context/LocationContext";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <App />
      </LocationProvider>
    </QueryClientProvider>
  </StrictMode>
);
