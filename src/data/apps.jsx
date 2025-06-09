import {
  CheckSquare,
  Timer,
  StickyNote,
  Youtube,
  CalendarDays,
  Target,
  Settings,
} from "lucide-react";

import { TaskManager } from "../components/TaskManager";

export const apps = [
  {
    id: "tasks",
    icon: <CheckSquare />,
    name: "Tarefas",
    component: TaskManager,
  },
  {
    id: "pomodoro",
    icon: <Timer />,
    name: "Pomodoro",
    component: () => <div className="p-6 text-white">🕒 Pomodoro em breve!</div>,
  },
  {
    id: "notes",
    icon: <StickyNote />,
    name: "Notas",
    component: () => <div className="p-6 text-white">📝 Notas em breve!</div>,
  },
  {
    id: "youtube",
    icon: <Youtube />,
    name: "YouTube",
    component: () => <div className="p-6 text-white">📺 YouTube em breve!</div>,
  },
  {
    id: "calendar",
    icon: <CalendarDays />,
    name: "Calendário",
    component: () => <div className="p-6 text-white">📅 Calendário em breve!</div>,
  },
  {
    id: "goals",
    icon: <Target />,
    name: "Metas",
    component: () => <div className="p-6 text-white">🎯 Metas em breve!</div>,
  },
  {
    id: "settings",
    icon: <Settings />,
    name: "Configurações",
    component: () => <div className="p-6 text-white">⚙️ Configurações em breve!</div>,
  },
];
