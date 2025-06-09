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
import { PomodoroTimer } from "../components/PomodoroTimer";
import { YoutubePlayer } from "../components/YoutubePlayer";
import { CalendarApp } from "../components/CalendarApp";
import { NotesApp } from "../components/NotesApp";
import { GoalsApp } from "../components/GoalsApp";

export const apps = [
  {
    id: "tasks",
    icon: <CheckSquare size={22} />,
    name: "Tarefas",
    component: () => TaskManager(),
  },
  {
    id: "pomodoro",
    icon: <Timer size={22} />,
    name: "Pomodoro",
    component: () => PomodoroTimer(),
  },
  {
    id: "notes",
    icon: <StickyNote size={22} />,
    name: "Notas",
    component: () => NotesApp(),
  },
  {
    id: "youtube",
    icon: <Youtube size={22} />,
    name: "YouTube",
    component: () => YoutubePlayer(),
  },
  {
    id: "calendar",
    icon: <CalendarDays size={22} />,
    name: "Calendário",
    component: () => CalendarApp(),
  },
  {
    id: "goals",
    icon: <Target size={22} />,
    name: "Metas",
    component: () => GoalsApp(),
  },
  {
    id: "settings",
    icon: <Settings size={22} />,
    name: "Configurações",
    component: () => (
      <div className="p-6 text-white">⚙️ Configurações em breve!</div>
    ),
  },
];
