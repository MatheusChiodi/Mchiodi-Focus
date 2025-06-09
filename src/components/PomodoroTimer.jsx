import { useEffect, useState, useRef } from "react";
import { Play, Pause, RotateCw } from "lucide-react";
import { motion } from "framer-motion";

const MODES = {
  FOCUS: { label: "Foco", duration: 25 * 60, color: "bg-blue-500" },
  SHORT_BREAK: {
    label: "Pausa Curta",
    duration: 5 * 60,
    color: "bg-green-500",
  },
  LONG_BREAK: {
    label: "Pausa Longa",
    duration: 15 * 60,
    color: "bg-purple-500",
  },
};

export function PomodoroTimer() {
  const [mode, setMode] = useState("FOCUS");
  const [time, setTime] = useState(MODES[mode].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) audioRef.current.play();
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            playSound();
            handleEndOfSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleEndOfSession = () => {
    setHistory((prev) => [
      ...prev,
      { mode, completedAt: new Date().toLocaleTimeString() },
    ]);

    if (mode === "FOCUS") {
      const nextMode = (cycle + 1) % 4 === 0 ? "LONG_BREAK" : "SHORT_BREAK";
      setMode(nextMode);
      setTime(MODES[nextMode].duration);
      setCycle((prev) => prev + 1);
    } else {
      setMode("FOCUS");
      setTime(MODES["FOCUS"].duration);
    }
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(MODES[mode].duration);
  };

  const percent = (time / MODES[mode].duration) * 100;

  return (
    <div className="flex flex-col items-center justify-center px-4 text-white">

      <motion.div
        className={`relative w-full max-w-md rounded-xl p-8 text-center shadow-2xl transition-all ${MODES[mode].color}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <h2 className="mb-4 text-lg font-bold uppercase tracking-wider">
          {MODES[mode].label}
        </h2>

        <div className="mb-6 font-mono text-6xl">{formatTime(time)}</div>

        <div className="mb-6 flex justify-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="rounded-full bg-white p-3 text-black transition hover:scale-110"
            title={isRunning ? "Pausar" : "Iniciar"}
          >
            {isRunning ? <Pause /> : <Play />}
          </button>
          <button
            onClick={handleReset}
            className="rounded-full bg-white p-3 text-black transition hover:scale-110"
            title="Resetar"
          >
            <RotateCw />
          </button>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${percent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
