import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import { Dock } from "./components/Dock";
import { Toast } from "./components/Toast";
import { LayoutControl } from "./components/LayoutControl";
import { WindowManager } from "./components/WindowManager";
import { createApps } from "./data/apps";
import { Header } from "./components/Header";

export default function DevHub() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);
  const [settings, setSettings] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("settings"));
      return (
        saved || {
          background: "https://mchiodi-focus.vercel.app/background.png",
          accentColor: "#2563eb",
          youtubeId: "jfKfPfyJRdk",
        }
      );
    } catch {
      return {
        background: "https://mchiodi-focus.vercel.app/background.png",
        accentColor: "#2563eb",
        youtubeId: "jfKfPfyJRdk",
      };
    }
  });

  const apps = createApps();

  useEffect(() => {
    if (location.state?.fromLanding) {
      setShowLoader(true);
      const timer = setTimeout(() => setShowLoader(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
    document.documentElement.style.setProperty(
      "--accent-color",
      settings.accentColor,
    );
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };
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

  const visibleAppsCount = Object.values(openApps).filter(
    (app) => app.open && app.visible,
  ).length;

  const [toastMessage, setToastMessage] = useState("");

  if (showLoader) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div
        className="backgroundImage max-w-´[1920px] relative mx-auto h-screen w-full overflow-auto bg-cover bg-center bg-no-repeat text-white"
        style={{
          backgroundImage: `url('${settings.background}')`,
        }}
      >
        <div className="absolute inset-0 z-0 bg-[#00000027] backdrop-blur-sm" />

        <WindowManager
          apps={apps}
          openApps={openApps}
          closeApp={closeApp}
          minimizeApp={minimizeApp}
          toggleMaximize={toggleMaximize}
          settings={settings}
          updateSettings={updateSettings}
        />
        <Dock apps={apps} openApps={openApps} handleAppClick={handleAppClick} />

        <Toast message={toastMessage} />

        <div className="h-[100px] w-full" aria-hidden="true" />
      </div>
    </>
  );
}
