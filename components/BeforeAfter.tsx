"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const BEFORE = "/brand/pics_work/frosted_terrase.webp";
const AFTER = "/brand/pics_work/frosted_terasse_before.webp";

const ease = [0.23, 1, 0.32, 1] as const;

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Start fully showing "Før" (pct=100). When the slider enters view we
  // dramatically sweep across to 50% to reveal the transformation, then
  // hand off to drag.
  const x = useMotionValue(100);
  const [pct, setPct] = useState(100);
  useMotionValueEvent(x, "change", (v) => setPct(v));

  const inView = useInView(containerRef, { once: true, margin: "-25%" });
  const [hasUserTouched, setHasUserTouched] = useState(false);

  useEffect(() => {
    if (!inView || hasUserTouched) return;
    const controls = animate(x, 50, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.2,
    });
    return controls.stop;
  }, [inView, hasUserTouched, x]);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const next = ((clientX - rect.left) / rect.width) * 100;
      x.set(Math.max(0, Math.min(100, next)));
    },
    [x],
  );

  const dragHandlers = {
    onPointerDown: (e: React.PointerEvent) => {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setHasUserTouched(true);
      updateFromClientX(e.clientX);
    },
    onPointerMove: (e: React.PointerEvent) => {
      if ((e.buttons & 1) === 0) return;
      setHasUserTouched(true);
      updateFromClientX(e.clientX);
    },
  };

  return (
    <section className="relative w-full bg-bg px-6 py-14 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-10 grid grid-cols-1 gap-10 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              <span>Før / etter</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02]"
            >
              Dra for å se{" "}
              <span className="font-display-italic text-text-muted">
                forskjellen.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="max-w-sm text-balance leading-relaxed text-text-muted lg:col-span-4 lg:col-start-9"
          >
            Samme terrasse — uten og med personvernsfilm. Innsyn dempes uten
            å gi avkall på lyset.
          </motion.p>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          ref={containerRef}
          {...dragHandlers}
          className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-3xl border border-line bg-bg-card md:aspect-[16/9]"
          role="slider"
          aria-label="Før og etter — dra for å sammenligne"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") x.set(Math.max(0, pct - 5));
            if (e.key === "ArrowRight") x.set(Math.min(100, pct + 5));
          }}
        >
          <Image
            src={AFTER}
            alt="Terrasse etter — privatlivsfilm montert"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="pointer-events-none object-cover"
          />

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          >
            <Image
              src={BEFORE}
              alt="Terrasse før — klart glass uten film"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="pointer-events-none object-cover"
            />
          </div>

          <div className="pointer-events-none absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur-md">
            <span className="size-1 rounded-full bg-text-muted" />
            Før
          </div>
          <div className="pointer-events-none absolute right-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur-md">
            <span className="size-1 rounded-full bg-accent" />
            Etter
          </div>

          <motion.div
            style={{ left: `${pct}%` }}
            className="pointer-events-none absolute inset-y-0 z-10 -translate-x-1/2"
          >
            <div className="h-full w-px bg-accent/80" />
            <div className="pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize">
              <div className="press flex size-12 items-center justify-center rounded-full border border-accent bg-bg shadow-[0_0_0_6px_rgba(254,120,24,0.12)]">
                <span className="font-mono text-xs text-accent">⇆</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-faint lg:text-[11px]">
          <span>Klart glass — fri innsyn</span>
          <span>Personvernsfilm — bevart lys</span>
        </div>
      </div>
    </section>
  );
}
