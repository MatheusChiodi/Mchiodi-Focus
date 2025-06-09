export function LayoutControl({ setLayoutMode, showToast }) {
  return (
    <div className="fixed top-4 right-4 z-30">
      <div className="group relative">
        <button className="rounded-md border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all">
          📐
        </button>
        <div className="absolute right-0 mt-2 w-44 rounded-md border border-neutral-700 bg-neutral-800 p-2 shadow-xl space-y-2 z-50">
          <div
            onClick={() => {
              setLayoutMode("side-by-side");
              showToast("Layout: Lado a lado ativado");
            }}
            className="cursor-pointer hover:bg-neutral-700 px-3 py-2 rounded flex items-center gap-2 text-sm text-white transition"
          >
            🟥 🟥 <span>Lado a lado</span>
          </div>
          <div
            onClick={() => {
              setLayoutMode("three-stack");
              showToast("Layout: 2 cima, 1 baixo");
            }}
            className="cursor-pointer hover:bg-neutral-700 px-3 py-2 rounded flex items-center gap-2 text-sm text-white transition"
          >
            🟥<br />🟥 🟥 <span>2 cima, 1 baixo</span>
          </div>
          <div
            onClick={() => {
              setLayoutMode("grid-2x2");
              showToast("Layout: Grade 2x2 ativado");
            }}
            className="cursor-pointer hover:bg-neutral-700 px-3 py-2 rounded flex items-center gap-2 text-sm text-white transition"
          >
            🟥 🟥<br />🟥 🟥 <span>Grade 2x2</span>
          </div>
          <div
            onClick={() => {
              setLayoutMode("auto");
              showToast("Layout: Automático ativado");
            }}
            className="cursor-pointer hover:bg-neutral-700 px-3 py-2 rounded flex items-center gap-2 text-sm text-white transition"
          >
            ♻️ <span>Automático</span>
          </div>
        </div>
      </div>
    </div>
  );
}
