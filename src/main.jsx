import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./components/LandingPage.jsx";

// Detecta se o app está rodando como PWA
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

// Service Worker Registration (somente produção)
if ("serviceWorker" in navigator && import.meta.env.MODE === "production") {
  window.addEventListener("load", async () => {
    try {
      const registration =
        await navigator.serviceWorker.register("/service-worker.js");
      console.log(
        "✅ ServiceWorker registrado com escopo:",
        registration.scope,
      );
    } catch (error) {
      console.error("❌ Falha ao registrar o ServiceWorker:", error);
    }
  });
}

function AnimatedRoutes() {
  const location = useLocation();

  // Se for standalone e estiver na raiz, redireciona para /#/app
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
