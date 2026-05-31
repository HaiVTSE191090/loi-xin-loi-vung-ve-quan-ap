"use client";

import { useEffect, useRef, useState } from "react";
import { mediaSources } from "@/lib/media";

type VideoBackgroundProps = {
  active: boolean;
};

export default function VideoBackground({ active }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!active || failed || !videoRef.current) return;

    videoRef.current
      .play()
      .catch(() => {
        setFailed(true);
      });
  }, [active, failed]);

  return (
    <div className={`video-background ${failed ? "video-fallback" : ""}`} aria-hidden="true">
      {!failed && (
        <video
          ref={videoRef}
          src={mediaSources.video}
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setFailed(true)}
        />
      )}
      <div className="video-tint" />
    </div>
  );
}
