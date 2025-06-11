import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("installPromptDismissed");
    const oneDay = 1000 * 60 * 60 * 24;

    // Se o usuário recusou nos últimos 24h, não mostrar novamente
    if (dismissed && Date.now() - Number(dismissed) < oneDay) {
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      console.log("beforeinstallprompt capturado");
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) {
      console.warn("Prompt não disponível no momento");
      return;
    }

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null);
      setShowInstall(false);
    });
  };

  const handleDismiss = () => {
    setShowInstall(false);
    localStorage.setItem("installPromptDismissed", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {showInstall && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed right-4 top-4 z-50 w-[90%] max-w-sm -translate-x-1/2 rounded-xl border border-white/10 bg-gradient-to-br from-[#151515] to-[#0a0a0a] p-4 shadow-lg backdrop-blur-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5555]">
                <Download size={20} />
              </div>
              <h2 className="text-lg font-bold">MChiodi Focus</h2>
            </div>
            <button
              onClick={handleDismiss}
              className="rounded-full p-1 hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <p className="my-3 text-sm text-neutral-300">
            Instale esse app para uma experiência completa de produtividade,
            mesmo offline.
          </p>

          <div className="flex gap-3">
            <button
              className="flex-1 rounded-lg border border-white/20 bg-transparent py-2 text-sm font-medium hover:bg-white/5"
              onClick={handleDismiss}
            >
              Depois
            </button>
            <button
              className="flex-1 rounded-lg bg-[#FF5555] py-2 text-sm font-medium hover:brightness-90"
              onClick={handleInstallClick}
            >
              Instalar Agora
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
