import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { TaskItem } from "./TaskItem";

export function TaskManager({
  activeApp,
  setActiveApp,
  visible,
  setVisible,
  maximized,
  setMaximized,
}) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("normal");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    if (editing) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editing.id ? { ...t, text: trimmedInput, priority } : t,
        ),
      );
      setEditing(null);
    } else {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: trimmedInput,
          done: false,
          priority,
        },
      ]);
    }

    setInput("");
    setPriority("normal");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "todo") return !task.done;
    return true;
  });

  const startEdit = (task) => {
    setInput(task.text);
    setPriority(task.priority);
    setEditing(task);
  };

  const isEditing = Boolean(editing);

  const handleWindowButton = (type) => {
    if (type === "red") {
      setActiveApp(null);
      setVisible(false);
    } else if (type === "yellow") {
      setVisible(false);
    } else if (type === "green") {
      setMaximized((prev) => !prev);
      setVisible(true);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`w-full ${maximized ? "h-screen px-12" : "max-w-2xl"} mx-auto mt-12 rounded-2xl border border-neutral-700 bg-neutral-950/80 p-6 shadow-2xl backdrop-blur-xl`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          🧾 Lista de Tarefas
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleWindowButton("red")}
            className="h-3 w-3 rounded-full bg-red-500 transition hover:scale-110"
          ></button>
          <button
            onClick={() => handleWindowButton("yellow")}
            className="h-3 w-3 rounded-full bg-yellow-500 transition hover:scale-110"
          ></button>
          <button
            onClick={() => handleWindowButton("green")}
            className="h-3 w-3 rounded-full bg-green-500 transition hover:scale-110"
          ></button>
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder={
            isEditing ? "Editando tarefa..." : "Digite uma nova tarefa..."
          }
          className="flex-1 rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-white"
        >
          <option value="low">Baixa</option>
          <option value="normal">Normal</option>
          <option value="high">Alta</option>
        </select>
        <button
          onClick={addTask}
          className={`rounded-lg px-4 py-2 text-white transition ${isEditing ? "bg-yellow-500 hover:bg-yellow-400" : "bg-blue-500 hover:bg-blue-400"}`}
        >
          <Plus />
        </button>
      </div>

      <div className="mb-6 flex justify-center gap-2">
        {[
          { key: "all", label: "Todas" },
          { key: "todo", label: "Pendentes" },
          { key: "done", label: "Concluídas" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-2 text-sm transition ${filter === key ? "bg-blue-500 text-white" : "bg-neutral-700 text-white hover:bg-neutral-600"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={startEdit}
            />
          ))
        ) : (
          <li className="py-6 text-center text-neutral-500">
            Nenhuma tarefa encontrada.
          </li>
        )}
      </ul>
    </div>
  );
}
