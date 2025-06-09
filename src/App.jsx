import { useEffect, useState } from "react";
import { Dock } from "./components/Dock";
import { Toast } from "./components/Toast";
import { LayoutControl } from "./components/LayoutControl";
import { WindowManager } from "./components/WindowManager";
import { apps } from "./data/apps";

export default function DevHub() {
  const [openApps, setOpenApps] = useState(() => {
    try {
      const saved = localStorage.getItem("openApps");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("openApps", JSON.stringify(openApps));
  }, [openApps]);

  const handleAppClick = (id) => {
    const isOpen = openApps[id]?.open;
    const isVisible = openApps[id]?.visible;

    if (isOpen && isVisible) {
      setOpenApps((prev) => ({
        ...prev,
        [id]: { ...prev[id], visible: false },
      }));
    } else if (isOpen && !isVisible) {
      setOpenApps((prev) => ({
        ...prev,
        [id]: { ...prev[id], visible: true },
      }));
    } else {
      setOpenApps((prev) => ({
        ...prev,
        [id]: { open: true, visible: true, maximized: false },
      }));
    }
  };

  const closeApp = (id) => {
    setOpenApps((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const minimizeApp = (id) => {
    setOpenApps((prev) => ({
      ...prev,
      [id]: { ...prev[id], visible: false },
    }));
  };

  const toggleMaximize = (id) => {
    setOpenApps((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        maximized: !prev[id]?.maximized,
        visible: true,
      },
    }));
  };

  const [toastMessage, setToastMessage] = useState("");
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2500);
  };

  return (
    <div
      className="relative min-h-screen w-full max-w-´[1920px] mx-auto bg-cover bg-center bg-no-repeat text-white overflow-hidden"
      style={{ backgroundImage: "url('/studio-ghibli-style.jpg')" }}
    >
      {/* Fundo escuro com blur */}
      <div className="absolute inset-0 z-0 bg-black/40 backdrop-blur-md" />

      {/* Gerenciador de Janelas */}
      <WindowManager
        apps={apps}
        openApps={openApps}
        closeApp={closeApp}
        minimizeApp={minimizeApp}
        toggleMaximize={toggleMaximize}
      />

      {/* Dock */}
      <Dock apps={apps} openApps={openApps} handleAppClick={handleAppClick} />

      <Toast message={toastMessage} />

      <div className="h-[100px] md:h-0"></div>
    </div>
  );
}
