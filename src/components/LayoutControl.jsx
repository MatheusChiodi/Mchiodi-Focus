import { useState } from "react";

export function LayoutControl({ setLayoutMode, showToast }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleSelect = (mode, message) => {
    setLayoutMode(mode);
    showToast(message);
    setOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-30">
      <div className="relative">
        <button
          onClick={handleClick}
          className="rounded-md border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-md transition-all hover:bg-white/20"
        >
          📐
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-44 space-y-2 rounded-md border border-neutral-700 bg-neutral-800 p-2 shadow-xl z-50">
            <div
              onClick={() => handleSelect("side-by-side", "Layout: Lado a lado ativado")}
              className="cursor-pointer rounded px-3 py-2 text-sm text-white transition hover:bg-neutral-700 flex items-center gap-2"
            >
              🟥 🟥 <span>Lado a lado</span>
            </div>
            <div
              onClick={() => handleSelect("three-stack", "Layout: 2 cima, 1 baixo")}
              className="cursor-pointer rounded px-3 py-2 text-sm text-white transition hover:bg-neutral-700 flex items-center gap-2"
            >
              🟥<br />🟥 🟥 <span>2 cima, 1 baixo</span>
            </div>
            <div
              onClick={() => handleSelect("grid-2x2", "Layout: Grade 2x2 ativado")}
              className="cursor-pointer rounded px-3 py-2 text-sm text-white transition hover:bg-neutral-700 flex items-center gap-2"
            >
              🟥 🟥<br />🟥 🟥 <span>Grade 2x2</span>
            </div>
            <div
              onClick={() => handleSelect("auto", "Layout: Automático ativado")}
              className="cursor-pointer rounded px-3 py-2 text-sm text-white transition hover:bg-neutral-700 flex items-center gap-2"
            >
              ♻️ <span>Automático</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
