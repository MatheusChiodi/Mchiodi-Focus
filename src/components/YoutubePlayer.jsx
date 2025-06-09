import { useRef, useState } from "react";
import YouTube from "react-youtube";
import { Play, Pause, Volume2 } from "lucide-react";

export function YoutubePlayer() {
  const [videoId, setVideoId] = useState("jfKfPfyJRdk");
  const [input, setInput] = useState("");
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef(null);

  const extractVideoId = (url) => {
    try {
      const parsed = new URL(url);
      return parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    } catch {
      return url; // Se for só o ID
    }
  };

  const handleChangeVideo = () => {
    const id = extractVideoId(input.trim());
    setVideoId(id);
    setIsPlaying(true);
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
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-neutral-700 bg-neutral-950/80 p-6 shadow-2xl backdrop-blur-xl">
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-800/20 shadow-2xl backdrop-blur-md">
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

      <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row mt-10">
        <input
          type="text"
          placeholder="Cole o link ou ID do vídeo do YouTube"
          className="flex-1 rounded-md border border-white/10 bg-neutral-800/70 px-4 py-2 text-white outline-none backdrop-blur-md placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleChangeVideo}
          className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
        >
          Trocar vídeo
        </button>
      </div>
    </div>
  );
}
