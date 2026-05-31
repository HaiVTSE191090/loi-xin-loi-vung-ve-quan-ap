"use client";

import { useEffect, useRef, useState } from "react";
import { mediaSources } from "@/lib/media";

type AudioControllerProps = {
  active: boolean;
};

export default function AudioController({ active }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<"idle" | "playing" | "paused" | "missing">("idle");

  useEffect(() => {
    if (!active || !audioRef.current) return;

    audioRef.current.volume = 0.42;
    audioRef.current
      .play()
      .then(() => setStatus("playing"))
      .catch(() => setStatus("paused"));
  }, [active]);

  function toggleAudio() {
    const audio = audioRef.current;
    if (!audio || status === "missing") return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setStatus("playing"))
        .catch(() => setStatus("paused"));
      return;
    }

    audio.pause();
    setStatus("paused");
  }

  return (
    <div className="audio-controller" aria-live="polite">
      <audio
        ref={audioRef}
        src={mediaSources.audio}
        preload="auto"
        loop
        onError={() => setStatus("missing")}
      />
      <button type="button" onClick={toggleAudio} disabled={!active || status === "missing"}>
        {status === "playing" ? "Pause music" : status === "paused" ? "Play music" : "Music"}
      </button>
      {status === "missing" && <span>Audio unavailable</span>}
    </div>
  );
}
