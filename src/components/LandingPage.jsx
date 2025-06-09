import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { Youtube, Github, Linkedin } from "lucide-react";
import { BackToTop } from "./BackToTop";
import { DonationButton } from "./DonationButton";
import PersistentBackground from "./PersistentBackground.jsx";

export default function LandingPage() {
  const navigate = useNavigate();

  const enterApp = () => {
    navigate("/app", { state: { fromLanding: true } });
  };

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#0f0f0f] via-[#151515] to-[#0f0f0f] font-sans text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <PersistentBackground />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center px-6 py-32 text-center md:h-screen"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 w-[80%] text-5xl font-extrabold sm:text-6xl"
        >
          Mantenha o foco com o{" "}
          <span className="text-[#FF5555]">MChiodi Focus</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 max-w-2xl text-neutral-400"
        >
          Uma central de produtividade para desenvolvedores. Organize suas
          tarefas, foque com Pomodoro, e maximize sua eficiência.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={enterApp}
          className="rounded-xl bg-[#FF5555] px-8 py-4 text-lg font-semibold transition hover:brightness-90"
        >
          Começar agora →
        </motion.button>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        id="features"
        className="border-t border-white/10 bg-black/20 px-6 py-24 backdrop-blur-xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-4xl font-extrabold tracking-tight text-white"
        >
          Tudo que você precisa, em um só lugar
        </motion.h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            [
              "📝",
              "Gerenciador de Tarefas",
              "Organize suas tarefas com um sistema visual simples.",
            ],
            [
              "⏱️",
              "Pomodoro Timer",
              "Foque com a técnica Pomodoro para aumentar sua disciplina.",
            ],
            [
              "📺",
              "YouTube Player",
              "Escute lo-fi ou vídeos educativos direto do app.",
            ],
            ["🎯", "Metas", "Defina metas e acompanhe seu progresso."],
            ["🌦️", "Clima", "Veja a previsão do tempo direto na interface."],
            ["💱", "Cotação", "Veja a cotação do dólar em tempo real."],
          ].map(([icon, title, desc], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 shadow-xl backdrop-blur-lg transition-transform hover:scale-[1.02]"
            >
              <div className="mb-2 text-3xl">{icon}</div>
              <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-neutral-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="border-t border-white/10 bg-black/30 py-10 text-center text-sm text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:flex-row md:justify-between"
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-3xl font-bold transition hover:scale-[1.02]">
              MChiodi <span className="text-[#FF5555]">Focus</span>
            </h2>
            <p className="max-w-sm text-sm text-neutral-500">
              Uma central de produtividade para desenvolvedores.
            </p>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            <div>
              <h3 className="mb-4 text-base font-semibold">Redes Sociais</h3>
              <div className="flex justify-center gap-4 md:justify-start">
                {[
                  {
                    icon: Youtube,
                    link: "https://www.youtube.com/@MChiodiDev",
                  },
                  { icon: Github, link: "https://github.com/MatheusChiodi" },
                  {
                    icon: Linkedin,
                    link: "https://www.linkedin.com/in/matheus-chiodi/",
                  },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border p-2 shadow-md transition hover:scale-110 hover:bg-[#FF5555] hover:text-white dark:border-neutral-700"
                  >
                    <item.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="my-10 border-t border-neutral-200 dark:border-neutral-700" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-center text-xs"
        >
          &copy; {new Date().getFullYear()} MChiodi Focus. Todos os direitos
          reservados.
        </motion.div>
      </motion.footer>
      <DonationButton />
      <BackToTop />
    </motion.div>
  );
}
