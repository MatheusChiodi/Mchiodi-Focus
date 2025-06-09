export function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <li className="flex items-center justify-between rounded bg-neutral-800 p-3 shadow">
      <span
        className={`flex-1 cursor-pointer ${task.done ? "text-neutral-500 line-through" : ""}`}
        onClick={() => onToggle(task.id)}
      >
        {task.text}
      </span>
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            task.priority === "high"
              ? "bg-red-500"
              : task.priority === "normal"
                ? "bg-yellow-500"
                : "bg-green-500"
          }`}
        >
          {task.priority}
        </span>
        <button
          onClick={() => onEdit(task)}
          className="text-blue-400 hover:text-blue-200"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 hover:text-red-200"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
