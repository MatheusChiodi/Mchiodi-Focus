import { motion } from "framer-motion";

export function Dock({ apps, openApps, handleAppClick }) {
  return (
    <nav className="fixed bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-4 rounded-full border border-white/10 bg-white/10 px-6 py-3 shadow-xl backdrop-blur-lg">
      {apps.map((app) => {
        const isOpen = openApps[app.id]?.open;
        const isVisible = openApps[app.id]?.visible;

        return (
          <motion.button
            key={app.id}
            onClick={() => handleAppClick(app.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative flex flex-col items-center rounded-full p-2 transition-all ${
              isVisible
                ? "bg-white text-black shadow-md"
                : isOpen
                ? "bg-neutral-700 text-white"
                : "text-white"
            }`}
          >
            <div>{app.icon}</div>
            <span className="absolute -top-7 scale-0 rounded bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
              {app.name}
            </span>
            {isOpen && <div className="mt-1 h-1 w-1 rounded-full bg-white" />}
          </motion.button>
        );
      })}
    </nav>
  );
}
