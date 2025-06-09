import { useRef, useState } from "react";
import YouTube from "react-youtube";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function YoutubePlayer({ defaultVideoId = "jfKfPfyJRdk", settings }) {
  const startId = settings?.youtubeId || defaultVideoId;
  const [videoId, setVideoId] = useState(startId);
  const [input, setInput] = useState("");
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const playerRef = useRef(null);

  const extractVideoId = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    } catch {
      return url;
    }
  };

  const handleChangeVideo = () => {
    const id = extractVideoId(input.trim());
    setVideoId(id);
    setIsPlaying(true);
    setInput("");
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
    if (isPlaying) event.target.playVideo();
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    playerRef.current?.setVolume(newVolume);
    if (newVolume > 0) setMuted(false);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    if (muted) {
      player.unMute();
    } else {
      player.mute();
    }
    setMuted(!muted);
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 p-2 shadow-2xl backdrop-blur-xl">
      <div className="aspect-video max-h-[200px] w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-inner">
        <YouTube
          videoId={videoId}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: { autoplay: 1 },
          }}
          onReady={onReady}
          className="h-full w-full"
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Cole o link ou ID do vídeo do YouTube"
          className="flex-1 rounded-md border border-white/10 bg-neutral-800/70 px-4 py-2 text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleChangeVideo}
          className="rounded-md px-4 py-2 text-white shadow-md transition hover:brightness-90"
          style={{ backgroundColor: "var(--accent-color)" }}
        >
          Trocar vídeo
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <button
          onClick={togglePlay}
          className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </button>

        <div className="flex w-full items-center gap-3">
          <button
            onClick={toggleMute}
            className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            {muted || volume === 0 ? (
              <VolumeX size={22} />
            ) : (
              <Volume2 size={22} />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/30 transition"
            style={{ accentColor: "var(--accent-color)" }}
          />
        </div>
      </div>
    </div>
  );
}
