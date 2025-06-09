import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Youtube, Github, Linkedin } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const enterApp = () => {
    navigate("/app", { state: { fromLanding: true } });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#0f0f0f] via-[#151515] to-[#0f0f0f] font-sans text-white">
      <header className="flex items-center justify-between border-b border-white/10 bg-black/30 px-6 py-4 backdrop-blur-md">
        <div className="text-xl font-bold text-white">
          MChiodi<span className="text-[#FF5555]">Focus</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#features"
            className="text-sm transition hover:text-[#FF5555]"
          >
            Features
          </a>
          <a
            href="#preview"
            className="text-sm transition hover:text-[#FF5555]"
          >
            Preview
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm transition hover:text-[#FF5555]"
          >
            <Github size={18} /> GitHub
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-5xl font-extrabold leading-tight sm:text-6xl"
        >
          Stay focused with <span className="text-[#FF5555]">Focus Timer</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
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
          className="rounded-full bg-[#FF5555] px-6 py-3 font-semibold shadow-xl transition hover:brightness-90"
        >
          Começar agora →
        </motion.button>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-white/10 bg-black/20 px-6 py-24 backdrop-blur-md"
      >
        <h2 className="mb-12 text-center text-3xl font-bold">
          Tudo que você precisa, em um só lugar
        </h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            [
              "📝",
              "Gerenciador de Tarefas",
              "Organize suas tarefas e aumente sua produtividade com um sistema visual simples.",
            ],
            [
              "⏱️",
              "Pomodoro Timer",
              "Foque por blocos de tempo e aumente sua disciplina usando a técnica Pomodoro.",
            ],
            [
              "📺",
              "YouTube Player",
              "Escute lo-fi ou vídeos educativos direto do app, sem distrações.",
            ],
            [
              "🎯",
              "Metas",
              "Defina metas e acompanhe seu progresso diariamente.",
            ],
            [
              "🌦️",
              "Clima",
              "Veja a previsão do tempo direto na interface para planejar seu dia.",
            ],
            [
              "💱",
              "Cotação",
              "Veja a cotação do dólar em tempo real, útil para freelancers e devs internacionais.",
            ],
          ].map(([icon, title, desc], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm"
            >
              <div className="mb-2 text-3xl">{icon}</div>
              <h3 className="mb-1 text-lg font-semibold">{title}</h3>
              <p className="text-sm text-neutral-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/30 py-10 text-center text-sm text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-7xl flex-col gap-16 md:flex-row md:justify-between"
        >
          <div className="flex flex-col gap-4 px-6">
            <h2 className="font-serif text-3xl font-bold transition hover:scale-[1.02]">
              MChiodi <span className="text-[#FF5555]">Focus</span>
            </h2>
            <p className="text-muted-foreground max-w-sm text-sm text-neutral-500">
              Uma central de produtividade para desenvolvedores. Organize suas
              tarefas, foque com Pomodoro, e maximize sua eficiência. 
            </p>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:gap-16 px-6">
            <div>
              <h3 className="mb-4 text-base font-semibold">Redes Sociais</h3>
              <div className="flex flex-wrap gap-5 justify-center">
                {[
                  {
                    icon: Youtube,
                    link: "https://www.youtube.com/@MChiodiDev",
                  },
                  { icon: Github, link: "https://github.com/MatheusChiodi" },
                  {
                    icon: Linkedin,
                    link: "https://www.linkedin.com/in/matheus-chiodi/",
                    target: "_blank",
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-muted-foreground text-center text-xs"
        >
          &copy; {new Date().getFullYear()} MChiodi News. Todos os direitos
          reservados.
        </motion.div>
      </footer>
    </div>
  );
}
