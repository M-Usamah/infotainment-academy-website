"use client";

import { useEffect, useRef } from "react";
import { SHOGUN_CROP_SCALE } from "@/lib/media";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = () => {
      void video.play().catch(() => {
        // Autoplay can still be blocked; muted + playsInline usually succeeds.
      });
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    return () => video.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ transform: `scale(${SHOGUN_CROP_SCALE})` }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src="/videos/shogen_game_demo.webm?v=20260920b" type="video/webm" />
      <source src="/videos/shogen_game_demo.mp4?v=20260920b" type="video/mp4" />
    </video>
  );
}
