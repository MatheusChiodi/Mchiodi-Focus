import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export function SnippetNotes() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("snippetNotes");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeId, setActiveId] = useState(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("snippetNotes", JSON.stringify(notes));
  }, [notes]);

  const resetForm = () => {
    setActiveId(null);
    setName("");
    setText("");
    setCategory("");
  };

  const save = () => {
    if (!name.trim() || !text.trim()) return;
    if (activeId) {
      setNotes(notes.map(n => n.id === activeId ? { id: activeId, name, text, category } : n));
    } else {
      setNotes([...notes, { id: Date.now(), name, text, category }]);
    }
    resetForm();
  };

  const edit = (id) => {
    const n = notes.find(n => n.id === id);
    if (!n) return;
    setActiveId(id);
    setName(n.name);
    setText(n.text);
    setCategory(n.category);
  };

  const del = (id) => {
    if (!confirm("Excluir nota?")) return;
    setNotes(notes.filter(n => n.id !== id));
    if (activeId === id) resetForm();
  };

  const filtered = notes.filter(n =>
    (!filter || n.category.toLowerCase().includes(filter.toLowerCase()) ||
      n.name.toLowerCase().includes(filter.toLowerCase()) ||
      n.text.toLowerCase().includes(filter.toLowerCase()))
  );

  const categories = Array.from(new Set(notes.map(n => n.category).filter(Boolean)));

  return (
    <div className="flex flex-col sm:flex-row gap-4 h-full w-full text-white">
      <div className="sm:w-1/3 w-full flex flex-col gap-2">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Buscar..."
          className="rounded bg-neutral-800 px-3 py-2 text-sm w-full"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("")}
            className={`px-2 py-1 text-xs rounded ${filter === "" ? "bg-[--accent-color]" : "bg-neutral-700"}`}
          >
            Todas
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-2 py-1 text-xs rounded ${filter === c ? "bg-[--accent-color]" : "bg-neutral-700"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <ul className="overflow-auto max-h-[260px] space-y-2">
          {filtered.map((n) => (
            <li
              key={n.id}
              className="cursor-pointer rounded bg-neutral-800 p-2 text-sm hover:bg-neutral-700"
            >
              <div className="flex justify-between items-center" onClick={() => edit(n.id)}>
                <span className="font-semibold truncate">{n.name}</span>
                <button onClick={(e) => { e.stopPropagation(); del(n.id); }}>
                  <Trash2 size={16} className="hover:text-red-500" />
                </button>
              </div>
              <div className="text-xs text-neutral-400">{n.category}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="sm:w-2/3 w-full flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded bg-neutral-800 px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded bg-neutral-800 px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Texto"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-[150px] resize-none rounded bg-neutral-800 p-3 text-sm font-mono"
        />
        <div className="flex gap-2">
          <button
            onClick={save}
            className="flex-1 rounded bg-green-600 px-3 py-2 text-sm hover:bg-green-700 flex items-center justify-center gap-1"
          >
            <Plus size={14} /> {activeId ? "Salvar" : "Adicionar"}
          </button>
          {activeId && (
            <button
              onClick={resetForm}
              className="flex-1 rounded bg-neutral-700 px-3 py-2 text-sm hover:bg-neutral-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
