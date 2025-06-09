import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Calendar, Paperclip, Link } from "lucide-react";

export function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("normal");
  const [editing, setEditing] = useState(null);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);

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
          subtasks: [],
          date: "",
          attachment: "",
          link: "",
        },
      ]);
    }

    setInput("");
    setPriority("normal");
  };

  const addSubtask = (taskId) => {
    if (!subtaskInput.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: Date.now(), text: subtaskInput, done: false },
              ],
            }
          : task,
      ),
    );
    setSubtaskInput("");
    setSelectedTaskId(taskId);
  };

  const toggleTask = (id, subtaskId = null) => {
    if (subtaskId !== null) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                subtasks: task.subtasks.map((st) =>
                  st.id === subtaskId ? { ...st, done: !st.done } : st,
                ),
              }
            : task,
        ),
      );
    } else {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
      );
    }
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const startEdit = (task) => {
    setInput(task.text);
    setPriority(task.priority);
    setEditing(task);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "todo") return !task.done;
    return true;
  });

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-neutral-700 bg-neutral-950/80 p-6 shadow-2xl backdrop-blur-xl">
      <h2 className="mb-4 text-xl font-semibold text-white">
        🧾 Lista de Tarefas
      </h2>

      <div className="mb-4 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder={
            editing ? "Editando tarefa..." : "Digite uma nova tarefa..."
          }
          className="flex-1 rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="md:w-[200px] flex items-center gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-white"
          >
            <option value="low">Baixa</option>
            <option value="normal">Normal</option>
            <option value="high">Alta</option>
          </select>
          <button
            onClick={addTask}
            className={`rounded-lg px-4 py-2 text-white transition ${editing ? "bg-yellow-500 hover:bg-yellow-400" : "bg-blue-500 hover:bg-blue-400"}`}
          >
            {editing ? (
              <Edit3 size={16} className="inline-block" />
            ) : (
              <Plus size={16} className="inline-block" />
            )}
          </button>
        </div>
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

      <ul className="h-[150px] space-y-3 overflow-auto">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col gap-2 rounded-lg bg-neutral-800 p-4 text-white shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="mr-2"
                  />
                  <span
                    className={task.done ? "text-neutral-500 line-through" : ""}
                  >
                    {task.text}
                  </span>
                  <span
                    className={`ml-2 rounded-full px-2 py-1 text-xs ${task.priority === "high" ? "bg-red-500" : task.priority === "normal" ? "bg-yellow-500" : "bg-green-500"}`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => startEdit(task)}>
                    <Edit3 size={16} className="hover:text-yellow-500" />
                  </button>
                  <button onClick={() => deleteTask(task.id)}>
                    <Trash2 size={16} className="hover:text-red-500" />
                  </button>
                </div>
              </div>

              {/* Subtarefas */}
              {task.subtasks && task.subtasks.length > 0 && (
                <ul className="ml-4 space-y-1">
                  {task.subtasks.map((st) => (
                    <li key={st.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={st.done}
                        onChange={() => toggleTask(task.id, st.id)}
                      />
                      <span
                        className={
                          st.done ? "text-neutral-500 line-through" : ""
                        }
                      >
                        {st.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Adicionar subtask */}
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Adicionar subtarefa"
                  className="flex-1 rounded bg-neutral-700 px-3 py-1 text-sm text-white"
                  value={selectedTaskId === task.id ? subtaskInput : ""}
                  onChange={(e) => {
                    setSubtaskInput(e.target.value);
                    setSelectedTaskId(task.id);
                  }}
                />
                <button
                  onClick={() => addSubtask(task.id)}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-500"
                >
                  Add
                </button>
              </div>
            </li>
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
