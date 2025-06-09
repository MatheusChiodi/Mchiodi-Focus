import { motion } from "framer-motion";

export function Dock({ apps, openApps, handleAppClick }) {
  return (
    <nav className="fixed bottom-4 left-1/2 z-20 flex h-[50px] -translate-x-1/2 items-center gap-4 rounded-xl border border-white/10 bg-white/10 px-6 shadow-xl backdrop-blur-lg">
      {apps.map((app) => {
        const isOpen = openApps[app.id]?.open;
        const isVisible = openApps[app.id]?.visible;

        return (
          <motion.button
            key={app.id}
            onClick={() => handleAppClick(app.id)}
            className={`group relative flex flex-col items-center rounded-full p-1 transition-all duration-500 hover:scale-110 ${
              isVisible ? "bg-white text-black/80 shadow-xl" : ""
            }`}
          >
            <div>{app.icon}</div>
            <span className="absolute -top-7 scale-0 rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
              {app.name}
            </span>

            {isOpen && (
              <div className="absolute bottom-0 mb-[-8px] mt-1 h-[6px] w-[6px] rounded-full bg-white" />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}
