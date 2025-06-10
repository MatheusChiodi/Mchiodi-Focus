import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./components/LandingPage.jsx";

// Improved service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration =
        await navigator.serviceWorker.register("/service-worker.js");
      console.log(
        "ServiceWorker registration successful with scope:",
        registration.scope,
      );
    } catch (error) {
      console.error("ServiceWorker registration failed:", error);
    }
  });
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  </StrictMode>,
);
