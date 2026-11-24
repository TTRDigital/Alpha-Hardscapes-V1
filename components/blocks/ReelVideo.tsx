"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Alpha's own crew reel. Plays muted and looped while it is on screen (it only starts
 * downloading when it comes near the screen), pauses when scrolled away, and has pause
 * and sound buttons. With "reduce motion" it waits for a tap on play.
 */
export function ReelVideo({ src, poster, className = "", title = "Alpha Hardscapes crew at work" }: { src: string; poster?: string; className?: string; title?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) { v.src = src; v.load(); }
          if (!reduce && !userPaused) v.play().catch(() => {});
        } else if (!v.paused) v.pause();
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src, userPaused]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (!v.src) { v.src = src; v.load(); }
    if (v.paused) { setUserPaused(false); v.play().catch(() => {}); } else { setUserPaused(true); v.pause(); }
  };
  const sound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) { setUserPaused(false); v.play().catch(() => {}); }
  };

  const ctl = "flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-[var(--shadow-pill)] backdrop-blur transition-colors hover:bg-white";
  return (
    <figure className={`media relative ${className}`}>
      <video ref={ref} className="h-full w-full object-cover" muted loop playsInline preload="none" poster={poster} aria-label={title} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button type="button" className={ctl} onClick={toggle} aria-label={playing ? "Pause video" : "Play video"}>
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>
          )}
        </button>
        <button type="button" className={ctl} onClick={sound} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
            {muted ? <path d="M17 9l5 5M22 9l-5 5" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
          </svg>
        </button>
      </div>
    </figure>
  );
}
