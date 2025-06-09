import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image, Palette, Youtube } from "lucide-react";

export function SettingsApp({ settings, updateSettings }) {
  const [background, setBackground] = useState(settings.background);
  const [accentColor, setAccentColor] = useState(settings.accentColor);
  const [youtubeId, setYoutubeId] = useState(settings.youtubeId);

  useEffect(() => {
    setBackground(settings.background);
    setAccentColor(settings.accentColor);
    setYoutubeId(settings.youtubeId);
  }, [settings]);

  const save = () => {
    updateSettings({ background, accentColor, youtubeId });
  };

  return (
    <motion.div
      className="mt-10 max-w-2xl space-y-6 rounded-xl border border-white/10 bg-neutral-900/80 p-3 text-white shadow-2xl backdrop-blur-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <h2 className="text-xl font-semibold text-white">
        ⚙️ Configurações do DevHub
      </h2>

      {/* Fundo */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <Image size={16} /> URL da imagem de fundo
        </label>
        <input
          type="text"
          className="rounded-md border border-white/10 bg-neutral-800/70 px-4 py-2 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder="https://example.com/imagem.jpg"
        />
      </div>

      {/* Cor Principal */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <Palette size={16} /> Cor principal do tema
        </label>
        <input
          type="color"
          className="h-10 w-24 cursor-pointer rounded-md border border-white/10 bg-neutral-800/70 shadow-inner"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
        />
      </div>

      {/* Vídeo do YouTube */}
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <Youtube size={16} /> Vídeo padrão do YouTube
        </label>
        <input
          type="text"
          className="rounded-md border border-white/10 bg-neutral-800/70 px-4 py-2 text-sm placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500"
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
          placeholder="ID ou URL do vídeo"
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={save}
        className="mt-4 w-full rounded-md px-4 py-2 font-medium text-white shadow-md transition duration-300"
        style={{ backgroundColor: accentColor }}
      >
        💾 Salvar alterações
      </motion.button>
    </motion.div>
  );
}
