import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Header() {
  const [timeString, setTimeString] = useState("");
  const [dolar, setDolar] = useState(null);
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTimeString(
        `${now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })} ${now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("https://api.frankfurter.app/latest?from=USD&to=BRL")
      .then((res) => res.json())
      .then((data) => setDolar(data.rates.BRL.toFixed(2)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const resp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${
            import.meta.env.VITE_OPENWEATHER_KEY
          }`,
        );
        const json = await resp.json();
        setTemp(Math.round(json.main.temp));
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  return (
    <div className="absolute left-0 top-0 z-20 flex w-full items-center justify-between bg-black/20 px-4 py-2 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
        <span className="hidden text-sm font-semibold text-white sm:inline">
          Focus
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-white sm:text-sm">
        {dolar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            💵 USD: R$ {dolar}
          </motion.div>
        )}
        {temp !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            🌡 {temp} °C
          </motion.div>
        ) : 
        (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            🌡 Loading...
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          🕒 {timeString}
        </motion.div>
      </div>
    </div>
  );
}
