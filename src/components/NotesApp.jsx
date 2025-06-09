import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Save,
  Folder,
  Tag,
  Search,
  Trash2,
  Upload,
  Download,
  Plus,
} from "lucide-react";

export function NotesApp() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeNote, setActiveNote] = useState(null);
  const [search, setSearch] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [folder, setFolder] = useState("");
  const [tag, setTag] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("Todas");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      content: "# Nova Nota",
      folder: "Geral",
      tag: "",
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote.id);
    setMarkdown("# Nova Nota");
    setFolder("Geral");
    setTag("");
  };

  const saveNote = () => {
    const updatedNotes = notes.map((note) =>
      note.id === activeNote
        ? { ...note, content: markdown, folder, tag }
        : note,
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    if (!window.confirm("Deseja excluir esta nota?")) return;
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setActiveNote(null);
    setMarkdown("");
  };

  const filteredNotes = notes.filter(
    (note) =>
      (selectedFolder === "Todas" || note.folder === selectedFolder) &&
      (note.content.toLowerCase().includes(search.toLowerCase()) ||
        note.tag.toLowerCase().includes(search.toLowerCase()) ||
        note.folder.toLowerCase().includes(search.toLowerCase())),
  );

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(notes)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "notas-backup.json";
    link.click();
  };

  const importBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedNotes = JSON.parse(event.target.result);
        setNotes(importedNotes);
        alert("Backup importado com sucesso!");
      } catch {
        alert("Erro ao importar o backup.");
      }
    };
    reader.readAsText(file);
  };

  const exportNote = () => {
    const note = notes.find((n) => n.id === activeNote);
    const blob = new Blob([note?.content || ""], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "nota.md";
    link.click();
  };

  const allFolders = ["Todas", ...new Set(notes.map((n) => n.folder))];

  return (
    <div className="flex w-full flex-col gap-4 overflow-auto text-white sm:flex-row">
      {/* Lateral */}
      <div className="w-full rounded-lg border border-white/10 bg-neutral-900/70 p-2 sm:w-1/3">
        <div className="mb-3 flex gap-2">
          <button
            onClick={exportBackup}
            className="flex flex-1 items-center justify-center gap-1 rounded bg-blue-700 px-2 py-1 text-xs hover:brightness-90"
          >
            <Download size={14} />
          </button>
          <label className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded bg-green-700 px-2 py-1 text-xs hover:bg-green-800">
            <Upload size={14} />
            <input type="file" hidden onChange={importBackup} />
          </label>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full rounded bg-neutral-800 px-3 py-1 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={createNote}
            className="rounded bg-blue-600 px-2 py-1 text-sm transition hover:brightness-90"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="mb-2 flex flex-wrap gap-2">
          {allFolders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`rounded px-2 py-1 text-xs ${
                selectedFolder === f
                  ? "bg-blue-600"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="max-h-[185px] space-y-2 overflow-auto md:max-h-[235px]">
          {filteredNotes.map((note) => (
            <li
              key={note.id}
              onClick={() => {
                setActiveNote(note.id);
                setMarkdown(note.content);
                setFolder(note.folder);
                setTag(note.tag);
              }}
              className={`cursor-pointer rounded px-3 py-2 ${
                note.id === activeNote
                  ? "bg-blue-600 text-white"
                  : "bg-neutral-800"
              }`}
            >
              <div className="truncate text-sm font-semibold">
                {note.content.split("\n")[0]}
              </div>
              <div className="text-xs text-neutral-400">
                📁 {note.folder} &nbsp;🏷 {note.tag}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Editor */}
      <div className="md:h-[60vh] overflow-auto flex w-full flex-col gap-4 rounded-lg border border-white/10 bg-neutral-900/70 p-4 sm:w-2/3">
        {activeNote ? (
          <>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="relative h-40 w-full resize-none rounded bg-neutral-800 p-2 font-mono text-sm"
            />
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-1 items-center">
                <div className="flex h-[30px] items-center rounded-s bg-neutral-700 px-3">
                  <Folder size={16} className="text-white" />
                </div>
                <input
                  type="text"
                  placeholder="Pasta"
                  className="h-[30px] flex-1 rounded-e bg-neutral-800 px-2 text-sm"
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                />
              </div>
              <div className="flex flex-1 items-center">
                <div className="flex h-[30px] items-center rounded-s bg-neutral-700 px-3">
                  <Tag size={16} className="text-white" />
                </div>
                <input
                  type="text"
                  placeholder="Tag"
                  className="flex-1 rounded-e bg-neutral-800 px-2 py-1 text-sm"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
            </div>
            <div className="h-[250px] overflow-auto rounded bg-neutral-800 p-3">
              <ReactMarkdown
                children={markdown}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="mb-3 text-2xl font-bold text-white"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="mb-2 text-xl font-semibold text-white"
                      {...props}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="mb-2 text-lg font-medium text-white"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p
                      className="mb-2 text-sm leading-relaxed text-neutral-300"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="mb-2 list-inside list-disc text-neutral-300"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="mb-2 list-inside list-decimal text-neutral-300"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-1 ml-4" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="mb-2 border-l-4 border-blue-600 pl-4 italic text-neutral-400"
                      {...props}
                    />
                  ),
                  code: ({ node, inline, className, children, ...props }) => {
                    return inline ? (
                      <code
                        className="rounded bg-neutral-700 px-1 py-0.5 text-sm text-pink-400"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <pre className="mb-3 overflow-auto rounded bg-neutral-900 p-3 text-green-400">
                        <code {...props}>{children}</code>
                      </pre>
                    );
                  },
                  table: ({ node, ...props }) => (
                    <table
                      className="my-4 w-full border-collapse border border-neutral-700 text-left"
                      {...props}
                    />
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-neutral-800 text-white" {...props} />
                  ),
                  tbody: ({ node, ...props }) => <tbody {...props} />,
                  tr: ({ node, ...props }) => (
                    <tr className="border-t border-neutral-700" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="border border-neutral-700 px-3 py-2 text-sm font-semibold"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="border border-neutral-700 px-3 py-2 text-sm text-neutral-300"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={saveNote}
                className="flex flex-1 items-center justify-center gap-1 rounded bg-green-600 px-3 py-1 text-sm hover:bg-green-700"
              >
                Salvar
              </button>
              <button
                onClick={exportNote}
                className="flex flex-1 items-center justify-center gap-1 rounded bg-yellow-600 px-3 py-1 text-sm hover:bg-yellow-700"
              >
                Exportar
              </button>
              <button
                onClick={() => deleteNote(activeNote)}
                className="flex flex-1 items-center justify-center gap-1 rounded bg-red-600 px-3 py-1 text-sm hover:bg-red-700"
              >
                Excluir
              </button>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-center text-center text-neutral-400 md:h-[50vh]">
            Selecione ou crie uma nota
          </div>
        )}
      </div>
    </div>
  );
}
