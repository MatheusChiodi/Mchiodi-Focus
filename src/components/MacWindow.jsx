import { motion } from "framer-motion";

export function MacWindow({
  title,
  children,
  visible,
  onClose,
  onMinimize,
  onMaximize,
  maximized,
  layoutMode,
}) {
  if (!visible) return null;

  const isAuto = layoutMode === "auto";

  return (
    <motion.div
      drag={isAuto}
      dragConstraints={isAuto ? { top: -200, bottom: 500, left: -500, right: 500 } : false}
      dragElastic={0.15}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${
        maximized ? "h-[85vh] w-[95vw]" : isAuto ? "h-[85vh] w-[80%]" : "h-full w-full"
      } ${isAuto ? "absolute cursor-move" : ""} overflow-hidden rounded-xl border border-neutral-700 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 p-0 shadow-2xl backdrop-blur-xl`}
    >
      {/* Barra superior */}
      <div className="flex items-center justify-between border-b border-neutral-700 bg-neutral-800/60 px-4 py-3">
        {/* Botões estilo macOS */}
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

      {/* Conteúdo da Janela */}
      <div className={`custom-scroll overflow-auto p-6 ${maximized ? "w-full" : "max-h-[75vh]"}`}>
        {children}
      </div>
    </motion.div>
  );
}
