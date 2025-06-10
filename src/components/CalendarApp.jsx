import { useState, useEffect, useRef } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { Share2, Plus, Trash2 } from "lucide-react";

export function CalendarApp() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState("");
  const didLoad = useRef(false);

  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents);
        if (Array.isArray(parsed)) {
          setEvents(parsed.map((e) => ({ ...e, date: new Date(e.date) })));
        }
      } catch (err) {
        console.error("Erro ao carregar eventos do localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    if (didLoad.current) {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    } else {
      didLoad.current = true;
    }
  }, [events]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleAddEvent = () => {
    if (newEvent && selectedDate) {
      setEvents([
        ...events,
        { id: Date.now(), date: selectedDate, title: newEvent },
      ]);
      setNewEvent("");
    }
  };

  const handleRemoveEvent = (eventIdToRemove) => {
    const filtered = events.filter((e) => e.id !== eventIdToRemove);
    setEvents(filtered);
  };

  const handleShare = () => {
    const text = events
      .map((e) => `${format(e.date, "dd/MM/yyyy")}: ${e.title}`)
      .join("\n");
    navigator.share
      ? navigator.share({ title: "Meus Eventos", text })
      : alert(text);
  };

  const renderCalendar = () => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="mt-4 grid grid-cols-7 gap-2 text-center">
        {days.map((day) => {
          const dayEvents = events.filter((e) => isSameDay(e.date, day));
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={day.toString()}
              className={`relative flex h-12 md:h-16 flex-col items-center justify-start overflow-hidden rounded-md border px-2 py-1 text-sm transition-all hover:border-[var(--accent-color)] ${
                isSameMonth(day, currentMonth)
                  ? "bg-white/10"
                  : "bg-black/10 text-gray-400"
              } ${isToday ? "border-[--accent-color]" : "border-neutral-800"}`}
              onClick={() => setSelectedDate(day)}
            >
              <span className="mb-1 text-sm font-semibold">
                {format(day, "d")}
              </span>
              {dayEvents.length > 0 && (
                <span className="text-xs text-yellow-300">
                  📌 {dayEvents.length}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const eventsOfDay = events.filter((e) => isSameDay(e.date, selectedDate));

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-auto md:p-4 text-white">
      <div className="flex items-center justify-between">
        <button
          onClick={prevMonth}
          title="Mês anterior"
          className="text-lg text-white transition-colors hover:text-[var(--accent-color)]"
        >
          ←
        </button>
        <h2 className="text-lg font-bold tracking-wide md:text-xl">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={nextMonth}
          title="Próximo mês"
          className="text-lg text-white transition-colors hover:text-[var(--accent-color)]"
        >
          →
        </button>
      </div>

      {renderCalendar()}

      {selectedDate && (
        <div className="mt-4 rounded-lg bg-white/5 p-4">
          <h3 className="mb-2 text-base font-semibold">
            Adicionar evento em {format(selectedDate, "dd/MM/yyyy")}
          </h3>
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              type="text"
              placeholder="Nome do evento"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="flex-1 rounded border border-neutral-600 bg-black/20 px-3 py-2 text-white"
            />
            <button
              onClick={handleAddEvent}
              className="flex items-center justify-center gap-1 rounded bg-[--accent-color] px-4 py-2 text-sm hover:bg-green-700"
            >
              <Plus size={16} /> Adicionar
            </button>
          </div>

          {eventsOfDay.length > 0 && (
            <>
              <div className="mt-4">
                <h4 className="mb-1 font-medium">Eventos do dia:</h4>
                <ul className="space-y-1 text-sm">
                  {eventsOfDay.map((e) => (
                    <li
                      key={e.id}
                      className="flex items-center justify-between gap-2 rounded-md bg-black/10 px-3 py-1"
                    >
                      <span>{e.title}</span>
                      <button
                        onClick={() => handleRemoveEvent(e.id)}
                        className="text-red-400 hover:text-red-500"
                        title="Remover evento"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleShare}
                className="mt-4 flex items-center gap-1 text-sm text-[--accent-color] hover:underline"
              >
                <Share2 size={14} /> Compartilhar eventos do mês
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
