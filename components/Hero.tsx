"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticLink } from "./MagneticLink";

const ease = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-bg pt-28 lg:min-h-[100svh] lg:pt-32"
    >
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex max-w-[1280px] flex-col justify-between gap-12 px-6 pb-14 lg:min-h-[calc(100svh-7rem)] lg:gap-0 lg:px-10"
      >
        {/* Headline */}
        <div className="mt-12 max-w-4xl lg:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="mb-10 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted lg:mb-14"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            <span>Solfilm · PPF · Drone</span>
          </motion.div>

          <h1 className="font-display text-balance text-[clamp(2.75rem,7.5vw,6.5rem)] font-medium leading-[1] text-text">
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                className="block"
              >
                Solfilm til bil,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="block"
              >
                <span className="font-display-italic">bolig</span> og{" "}
                <span className="font-display-italic text-accent">
                  næringsbygg
                </span>
                .
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Bottom row */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-0 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="max-w-md text-balance text-base leading-relaxed text-text-muted lg:col-span-6 lg:text-lg"
          >
            Jeg legger solfilm fra verkstedet på Hegdal industriområde —
            eller hjem til deg. Send meg et bilde, så fikser jeg et tilbud
            kjapt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.95 }}
            className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end"
          >
            <MagneticLink
              href="tel:+4797474347"
              strength={0.4}
              radius={160}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-medium tracking-tight text-bg hover:bg-accent-warm"
              style={{
                transition:
                  "background-color 220ms var(--ease-out)",
              }}
            >
              <span>Ring meg</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ transitionTimingFunction: "var(--ease-out)" }}
              >
                →
              </span>
            </MagneticLink>
            <a
              href="#tjenester"
              className="press group inline-flex items-center justify-center gap-3 rounded-full border border-line-strong px-7 py-4 text-sm font-medium tracking-tight text-text hover:border-text"
              style={{
                transition:
                  "border-color 220ms var(--ease-out), transform 160ms var(--ease-out)",
              }}
            >
              <span>Se tjenester</span>
              <span aria-hidden className="text-text-muted">
                ↓
              </span>
            </a>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
