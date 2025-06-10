import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./components/LandingPage.jsx";

// Verifica se o app está sendo executado em modo standalone
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

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

  // Se estiver no modo standalone e tentando acessar a raiz, redireciona para /app
  if (isStandalone && location.pathname === "/") {
    return <Navigate to="/app" replace />;
  }

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
