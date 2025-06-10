import { useState, useEffect } from "react";
import { CheckCircle2, Trash2 } from "lucide-react";

export function GoalsApp() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    const text = input.trim();
    if (!text) return;
    setGoals([...goals, { id: Date.now(), text, progress: 0 }]);
    setInput("");
  };

  const updateProgress = (id, progress) => {
    setGoals(goals.map((g) => (g.id === id ? { ...g, progress } : g)));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="mx-auto w-full h-full max-w-3xl rounded-2xl border border-neutral-700 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 p-6 shadow-2xl backdrop-blur-xl">
      <h2 className="mb-4 text-xl font-semibold text-white">🎯 Metas</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Nova meta..."
          className="flex-1 rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
        />
        <button
          onClick={addGoal}
          className="w-full md:w-[100px] md:flex-0 rounded-lg px-4 py-2 text-white transition hover:brightness-90"
          style={{ backgroundColor: "var(--accent-color)" }}
        >
          Adicionar
        </button>
      </div>

      <ul className="max-h-[200px] space-y-3 overflow-auto">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <li
              key={goal.id}
              className="flex flex-col gap-2 rounded-lg bg-neutral-800 p-4 text-white shadow"
            >
              <div className="flex items-center justify-between">
                <span>{goal.text}</span>
                <button onClick={() => deleteGoal(goal.id)}>
                  <Trash2 size={16} className="hover:text-red-500" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) =>
                    updateProgress(goal.id, Number(e.target.value))
                  }
                  className="flex-1"
                />
                <span className="w-12 text-right">{goal.progress}%</span>
                {goal.progress === 100 && (
                  <CheckCircle2 className="text-green-500" size={18} />
                )}
              </div>
              <div className="h-2 w-full rounded-full bg-neutral-700">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${goal.progress}%`, backgroundColor: "var(--accent-color)" }}
                  
                />
              </div>
            </li>
          ))
        ) : (
          <li className="py-6 text-center text-neutral-500">
            Nenhuma meta adicionada.
          </li>
        )}
      </ul>
    </div>
  );
}
