import { useEffect, useState } from "react";
import { Plus, Trash2, X, Save, Edit2, Search, AlertTriangle } from "lucide-react";

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
  const [isViewMode, setIsViewMode] = useState(false);
  // Estados para o modal de confirmação
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem("snippetNotes", JSON.stringify(notes));
  }, [notes]);

  const resetForm = () => {
    setActiveId(null);
    setName("");
    setText("");
    setCategory("");
    setIsViewMode(false);
  };

  const save = () => {
    if (!name.trim() || !text.trim()) return;
    if (activeId) {
      setNotes(
        notes.map((n) =>
          n.id === activeId ? { id: activeId, name, text, category } : n,
        ),
      );
    } else {
      setNotes([...notes, { id: Date.now(), name, text, category }]);
    }
    resetForm();
  };

  const edit = (id) => {
    const n = notes.find((n) => n.id === id);
    if (!n) return;
    setActiveId(id);
    setName(n.name);
    setText(n.text);
    setCategory(n.category);
    setIsViewMode(true);
  };

  // Iniciar processo de exclusão
  const confirmDelete = (id, e) => {
    if (e) e.stopPropagation();
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  // Concluir exclusão após confirmação
  const handleDelete = () => {
    if (noteToDelete === null) return;
    
    setNotes(notes.filter((n) => n.id !== noteToDelete));
    if (activeId === noteToDelete) resetForm();
    
    // Fechar o modal
    setShowDeleteModal(false);
    setNoteToDelete(null);
  };

  const filtered = notes.filter(
    (n) =>
      !filter ||
      n.category.toLowerCase().includes(filter.toLowerCase()) ||
      n.name.toLowerCase().includes(filter.toLowerCase()) ||
      n.text.toLowerCase().includes(filter.toLowerCase()),
  );

  const categories = Array.from(
    new Set(notes.map((n) => n.category).filter(Boolean)),
  );

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden rounded-lg text-white lg:flex-row">
      {/* Modal de confirmação de exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-neutral-700 bg-neutral-900 p-6 shadow-lg">
            <div className="mb-4 flex items-center gap-3 text-red-400">
              <AlertTriangle className="h-6 w-6" />
              <h3 className="text-lg font-medium">Confirmar exclusão</h3>
            </div>
            
            <p className="mb-6 text-neutral-300">
              Tem certeza que deseja excluir esta nota? Esta ação não pode ser desfeita.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-neutral-300 transition-all hover:bg-neutral-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-500/80 px-4 py-2 text-sm text-white transition-all hover:bg-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full flex-col gap-3 rounded-lg bg-neutral-900/50 p-4 backdrop-blur-sm md:w-1/2 lg:w-1/3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Buscar..."
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800/80 py-2.5 pl-10 pr-3 text-sm transition-all focus:border-[--accent-color] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("")}
            className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${
              filter === ""
                ? "shadow-[--accent-color]/20 bg-[--accent-color] shadow-md"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          >
            Todas
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${
                filter === c
                  ? "shadow-[--accent-color]/20 bg-[--accent-color] shadow-md"
                  : "bg-neutral-700 hover:bg-neutral-600"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-neutral-400">
            <p>Nenhuma nota encontrada</p>
          </div>
        ) : (
          <ul className="custom-scrollbar flex-grow space-y-2 overflow-auto pr-1">
            {filtered.map((n) => (
              <li
                key={n.id}
                onClick={() => edit(n.id)}
                className={`cursor-pointer rounded-lg border border-transparent p-3 text-sm transition-all duration-300 ${
                  activeId === n.id
                    ? "bg-[--accent-color]/20 border-[--accent-color]/40"
                    : "bg-neutral-800/80 hover:bg-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate font-medium">{n.name}</span>
                  <button
                    onClick={(e) => confirmDelete(n.id, e)}
                    className="rounded-full p-1 opacity-60 transition-opacity hover:bg-red-500/20 hover:opacity-100"
                  >
                    <Trash2
                      size={16}
                      className="transition-colors hover:text-red-400"
                    />
                  </button>
                </div>
                {n.category && (
                  <div className="mt-1 inline-block rounded-full bg-neutral-700/50 px-2 py-0.5 text-xs text-neutral-300">
                    {n.category}
                  </div>
                )}
                <div className="mt-1 line-clamp-2 text-xs text-neutral-400">
                  {n.text}
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={resetForm}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-700 px-4 py-2.5 text-sm transition-all hover:bg-neutral-600"
        >
          <Plus size={18} /> Nova nota
        </button>
      </div>

      {/* Área de edição */}
      <div className="flex w-full flex-col gap-3 rounded-lg bg-neutral-900/50 p-4 backdrop-blur-sm md:w-1/2 lg:w-2/3">
        {isViewMode ? (
          <div className="flex h-full flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[--accent-color]">
                {name}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsViewMode(false)}
                  className="rounded-lg bg-neutral-700 p-2 transition-all hover:bg-neutral-600"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={resetForm}
                  className="rounded-lg bg-neutral-700 p-2 transition-all hover:bg-neutral-600"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {category && (
              <div className="mb-4 inline-block rounded-full bg-neutral-700/50 px-3 py-1 text-sm text-neutral-300">
                {category}
              </div>
            )}

            <div className="custom-scrollbar flex-grow overflow-auto whitespace-pre-wrap rounded-lg border border-neutral-700 bg-neutral-800/50 p-4 font-mono">
              {text}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-grow rounded-lg border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-sm transition-all focus:border-[--accent-color] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-sm transition-all focus:border-[--accent-color] focus:outline-none md:w-1/3"
              />
            </div>

            <textarea
              placeholder="Texto"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="custom-scrollbar h-[calc(100%-140px)] min-h-[200px] resize-none rounded-lg border border-neutral-700 bg-neutral-800/80 p-4 font-mono text-sm transition-all focus:border-[--accent-color] focus:outline-none"
            />

            <div className="flex gap-3">
              <button
                onClick={save}
                className="shadow-[--accent-color]/10 flex flex-1 items-center justify-center gap-2 rounded-lg bg-[--accent-color] px-4 py-2.5 text-sm shadow-md transition-all hover:bg-opacity-85"
              >
                {activeId ? <Save size={18} /> : <Plus size={18} />}{" "}
                {activeId ? "Salvar alterações" : "Adicionar nota"}
              </button>

              {activeId && (
                <button
                  onClick={resetForm}
                  className="rounded-lg bg-neutral-700 px-4 py-2.5 text-sm transition-all hover:bg-neutral-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
