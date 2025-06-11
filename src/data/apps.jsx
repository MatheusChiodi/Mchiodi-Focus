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
import { SnippetNotes } from "../components/SnippetNotes";
import { GoalsApp } from "../components/GoalsApp";
import { SettingsApp } from "../components/SettingsApp";

export function createApps() {
  return [
    {
      id: "tasks",
      icon: <CheckSquare size={22} />,
      name: "Tarefas",
      component: TaskManager,
    },
    {
      id: "snippets",
      icon: <StickyNote size={22} />,
      name: "Notas",
      component: SnippetNotes,
    },
    {
      id: "pomodoro",
      icon: <Timer size={22} />,
      name: "Pomodoro",
      component: PomodoroTimer,
    },
    
    {
      id: "youtube",
      icon: <Youtube size={22} />,
      name: "YouTube",
      component: YoutubePlayer,
    },
    {
      id: "calendar",
      icon: <CalendarDays size={22} />,
      name: "Calendário",
      component: CalendarApp,
    },
    {
      id: "goals",
      icon: <Target size={22} />,
      name: "Metas",
      component: GoalsApp,
    },
    {
      id: "settings",
      icon: <Settings size={22} />,
      name: "Configurações",
      component: SettingsApp,
    },
  ];
}
