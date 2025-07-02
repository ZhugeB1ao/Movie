import { createRoot } from "react-dom/client";
import { MovieProvider } from "./contexts/MovieDataContext.jsx";
import { TVProvider } from "./contexts/TVDataContext.jsx";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieProvider>
      <TVProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </TVProvider>
    </MovieProvider>
  </StrictMode>
);
