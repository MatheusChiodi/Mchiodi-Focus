import { motion } from "framer-motion";

export function MacWindow({
  title,
  children,
  visible,
  onClose,
  onMinimize,
}) {
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.95 }}
      style={{
        pointerEvents: visible ? "auto" : "none",
        visibility: visible ? "visible" : "hidden",
        position: visible ? "" : "absolute",
      }}
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`max-w-[1020px] w-[100%]  overflow-hidden rounded-xl border border-neutral-700 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 p-0 shadow-2xl backdrop-blur-xl`}
    >
      <div className="flex items-center justify-between border-b border-neutral-700 bg-neutral-800/60 px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-red-500 shadow-md transition-transform hover:scale-110"
            title="Fechar"
          />
          <button
            onClick={onMinimize}
            className="h-3 w-3 rounded-full bg-yellow-400 shadow-md transition-transform hover:scale-110"
            title="Minimizar"
          />
        </div>

        <h3 className="text-sm font-medium tracking-wide text-neutral-300">
          {title}
        </h3>

        <div className="w-16" />
      </div>

      <div
        className={`flex flex-col justify-center overflow-auto p-3 md:h-[75vh] md:p-6`}
      >
        {children}
      </div>
    </motion.div>
  );
}
