import { useState, useEffect } from "react";

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
    <div className="space-y-4 text-white p-6">
      <div className="flex flex-col gap-1">
        <label className="text-sm">Imagem de fundo</label>
        <input
          type="text"
          className="rounded bg-neutral-800 p-2"
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder="URL da imagem"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Cor principal</label>
        <input
          type="color"
          className="h-10 w-20 rounded"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Vídeo padrão do YouTube</label>
        <input
          type="text"
          className="rounded bg-neutral-800 p-2"
          value={youtubeId}
          onChange={(e) => setYoutubeId(e.target.value)}
          placeholder="ID ou URL"
        />
      </div>
      <button
        onClick={save}
        className="rounded px-4 py-2 text-black"
        style={{ backgroundColor: accentColor }}
      >
        Salvar
      </button>
    </div>
  );
}
