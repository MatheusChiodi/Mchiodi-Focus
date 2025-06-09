import { useState } from "react";
import { LayoutDashboard } from "lucide-react";

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
    <div className="fixed right-4 top-4 z-30">
      <div className="relative">
        <button
          onClick={handleClick}
          className="rounded-md border border-white/20 bg-white/10 p-2 shadow-xl backdrop-blur-md transition-all hover:bg-white/20"
        >
          <LayoutDashboard />
        </button>
        {open && (
          <div className="absolute right-0 z-50 mt-2 w-44 space-y-2 rounded-md border border-neutral-700 bg-neutral-800 p-2 shadow-xl">
            <div
              onClick={() =>
                handleSelect("side-by-side", "Layout: Lado a lado ativado")
              }
              className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-white transition hover:bg-neutral-700"
            >
              🟥 🟥 <span>Lado a lado</span>
            </div>
            <div
              onClick={() =>
                handleSelect("three-stack", "Layout: 2 cima, 1 baixo")
              }
              className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-white transition hover:bg-neutral-700"
            >
              🟥
              <br />
              🟥 🟥 <span>2 cima, 1 baixo</span>
            </div>
            <div
              onClick={() =>
                handleSelect("grid-2x2", "Layout: Grade 2x2 ativado")
              }
              className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-white transition hover:bg-neutral-700"
            >
              🟥 🟥
              <br />
              🟥 🟥 <span>Grade 2x2</span>
            </div>
            <div
              onClick={() => handleSelect("auto", "Layout: Automático ativado")}
              className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-white transition hover:bg-neutral-700"
            >
              ♻️ <span>Automático</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
