import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { SearchProvider } from "./contexts/SearchContext.tsx";
import { EventProvider } from "./contexts/EventContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <SearchProvider>
            <App />
            <ToastContainer />
          </SearchProvider>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
