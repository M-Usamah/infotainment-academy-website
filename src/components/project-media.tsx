"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/data";

export function ProjectMedia({
  project,
  sizes,
  priority,
  className = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const loopStart = project.video?.loop?.start;
  const loopEnd = project.video?.loop?.end;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Keep playback inside the gameplay segment, skipping the trailer's title cards.
    const keepInSegment = () => {
      if (loopStart === undefined || loopEnd === undefined) return;
      if (video.currentTime < loopStart || video.currentTime >= loopEnd) {
        video.currentTime = loopStart;
      }
    };
    video.addEventListener("loadedmetadata", keepInSegment);
    video.addEventListener("timeupdate", keepInSegment);
    keepInSegment();

    // React does not render the muted attribute on the server, so autoplay needs it set here.
    video.muted = true;
    video.defaultMuted = true;
    void video.play().catch(() => {
      // Autoplay can be blocked; the first frame still shows.
    });

    return () => {
      video.removeEventListener("loadedmetadata", keepInSegment);
      video.removeEventListener("timeupdate", keepInSegment);
    };
  }, [loopStart, loopEnd]);

  if (project.video) {
    const cropStyle = project.video.cropScale
      ? { transform: `scale(${project.video.cropScale})` }
      : undefined;
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={cropStyle}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${project.title} gameplay demo`}
        >
          <source src={project.video.webm} type="video/webm" />
          <source src={project.video.mp4} type="video/mp4" />
        </video>
      </div>
    );
  }

  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={project.imageAlt ?? ""}
        fill
        priority={priority}
        className={`object-cover ${className}`}
        sizes={sizes}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 flex items-end bg-[linear-gradient(135deg,#1a0a08,#0c1d3a_45%,#1a1208)] p-6 ${className}`}
      aria-hidden
    >
      <span className="figure text-7xl text-white/10">UE5</span>
    </div>
  );
}
