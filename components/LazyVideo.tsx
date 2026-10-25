"use client";

import { useEffect, useRef, useState } from "react";

// Autoplay laster hele filen med en gang, uansett preload. Dronevideoen ligger
// langt nede på forsiden, så den får ikke kilde før den nærmer seg skjermen.
// Til da står posteren, akkurat som før.
export function LazyVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // autoPlay slår ikke alltid inn når kilden settes etter første render.
  useEffect(() => {
    if (near) ref.current?.play().catch(() => {});
  }, [near]);

  return (
    <video ref={ref} autoPlay muted loop playsInline preload="none"
      poster={poster} src={near ? src : undefined} aria-hidden="true" tabIndex={-1} />
  );
}
