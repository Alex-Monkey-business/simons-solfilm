"use client";

import { useEffect, useRef, useState } from "react";
import type { JobVideo } from "./serviceDetails";

/**
 * En stående video av en jobb, med tekstplate og pauseknapp. Brukes i toppen
 * av bygg-siden og i «Om meg» på forsiden.
 *
 * Videoen er 3,4 MB mot en poster på under 40 kB, så den får ikke kilde før
 * siden er ferdig lastet og ruta faktisk er i nærheten av skjermen. Den
 * starter aldri av seg selv for den som har bedt om mindre bevegelse eller
 * sparer data — da står posteren, og knappen starter den.
 *
 * Knappen er ikke pynt: noe som beveger seg av seg selv i mer enn fem
 * sekunder skal kunne stoppes (WCAG 2.2.2).
 */
export function VideoTile({ video }: { video: JobVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  // Har brukeren selv satt på pause, skal den ikke starte igjen bare fordi
  // ruta kom tilbake i bildet.
  const stoppedByUser = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (still || saveData) return;

    let io: IntersectionObserver | undefined;
    let timer = 0;
    const watch = () => {
      timer = window.setTimeout(() => {
        io = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setSrc(video.src);
              if (!stoppedByUser.current) el.play().catch(() => {});
            } else {
              el.pause();
            }
          },
          { rootMargin: "200px 0px" },
        );
        io.observe(el);
      }, 300);
    };
    if (document.readyState === "complete") watch();
    else window.addEventListener("load", watch, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", watch);
      io?.disconnect();
    };
  }, [video.src]);

  // play() rett etter at kilden er satt treffer en video uten kilde. Denne
  // kjører etter at React har skrevet src til elementet.
  useEffect(() => {
    if (src && !stoppedByUser.current) ref.current?.play().catch(() => {});
  }, [src]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (!src) {
      stoppedByUser.current = false;
      setSrc(video.src);
      return;
    }
    if (el.paused) {
      stoppedByUser.current = false;
      el.play().catch(() => {});
    } else {
      stoppedByUser.current = true;
      el.pause();
    }
  };

  return (
    <figure className="relative aspect-[9/16] w-full overflow-hidden rounded-[var(--r-card)] border border-line-strong bg-bg-card">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
        src={src}
        aria-label={video.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full object-cover"
      />

      <div className="pointer-events-none absolute left-3.5 top-3.5 rounded-full border border-white/15 bg-bg/80 px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-text backdrop-blur-md">
        Video · {video.length}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Sett videoen på pause" : "Spill av videoen"}
        className="press absolute right-3 top-2 inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-bg/80 text-text backdrop-blur-md hover:border-text"
        style={{ transition: "border-color 220ms var(--ease-out)" }}
      >
        <svg viewBox="0 0 24 24" aria-hidden className="size-[18px] fill-current">
          {playing ? (
            <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
          ) : (
            <path d="M8 4.5v15l12-7.5z" />
          )}
        </svg>
      </button>

      <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-col gap-2 rounded-[var(--r-lg)] border border-white/10 bg-bg/80 px-5 py-4 backdrop-blur-md">
        <p className="text-base leading-snug text-text">{video.caption}</p>
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-muted">
          {video.meta}
        </p>
      </figcaption>
    </figure>
  );
}
