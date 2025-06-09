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

  const [layoutMode, setLayoutMode] = useState("auto");

  const visibleWindows = apps.filter(
    (app) => openApps[app.id]?.open && openApps[app.id]?.visible,
  );

  let layoutClass = "grid-cols-1";

  if (layoutMode === "side-by-side") {
    layoutClass = "grid grid-cols-2";
  } else if (layoutMode === "three-stack") {
    layoutClass = "grid grid-cols-2 auto-rows-[minmax(250px,_1fr)]";
  } else if (layoutMode === "grid-2x2") {
    layoutClass = "grid grid-cols-2 grid-rows-2";
  } else {
    layoutClass =
      {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-2 auto-rows-[minmax(250px,_1fr)]",
        4: "grid-cols-2 grid-rows-2",
      }[visibleWindows.length] || "grid-cols-1";
  }

  useEffect(() => {
    const handleShortcut = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      if (!ctrlOrCmd) return;

      switch (e.key) {
        case "1":
          setLayoutMode("side-by-side");
          showToast("Layout: Lado a lado ativado");
          break;
        case "2":
          setLayoutMode("three-stack");
          showToast("Layout: 2 cima, 1 baixo");
          break;
        case "3":
          setLayoutMode("grid-2x2");
          showToast("Layout: Grade 2x2 ativado");
          break;
        case "0":
          setLayoutMode("auto");
          showToast("Layout: Automático ativado");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

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

      {/* Controle de layout */}
      <LayoutControl setLayoutMode={setLayoutMode} showToast={showToast} />

      {/* Gerenciador de Janelas */}
      <WindowManager
        apps={apps}
        openApps={openApps}
        closeApp={closeApp}
        minimizeApp={minimizeApp}
        toggleMaximize={toggleMaximize}
        layoutClass={layoutClass}
        layoutMode={layoutMode}
      />

      {/* Dock */}
      <Dock apps={apps} openApps={openApps} handleAppClick={handleAppClick} />

      <Toast message={toastMessage} />
    </div>
  );
}
