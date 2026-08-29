"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticLink } from "./MagneticLink";

const ease = [0.23, 1, 0.32, 1] as const;

// A composed full-bleed backdrop. Measured against the headline area, a solid
// 50% knock-back puts even the brightest 2% of pixels at 6.6:1 against the
// cream — past the 4.5 body text requires — so no horizontal mask is needed
// and the composition survives intact. The vertical fade only dissolves the
// image into the section below instead of ending it on a hard edge.
const PHOTO_MASK =
  "linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%)";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  // The photo travels slower than the text, so the two separate as you scroll.
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-bg pt-40 lg:min-h-[min(92svh,880px)] lg:pt-32"
    >
      <motion.div
        style={{ y: photoY }}
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease, delay: 0.2 }}
          style={{
            maskImage: PHOTO_MASK,
            WebkitMaskImage: PHOTO_MASK,
          }}
        >
          {/* Two compositions, not one crop. A phone sees a 35% wide slice of
              the wide shot, which puts the signage straight behind the
              headline; the portrait frame is built for the overlay instead —
              sign up top, quiet wall through the middle, car along the bottom.
              <picture> rather than Next's Image so the browser fetches only
              the one that matches: images are unoptimized here anyway, so
              there is nothing to give up. */}
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="/brand/hero-neon.webp"
              width={2880}
              height={1621}
            />
            <img
              src="/brand/hero-neon-portrait.webp"
              alt="Mørk sportsbil med solfilm i verkstedet, under neonskiltet til Simons Solfilm"
              width={1440}
              height={2560}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-center"
            />
          </picture>
          {/* Solid knock-back so the headline always wins. No gradient fill. */}
          {/* Measured against the brightest 2% of each text band: 48% puts the
              headline at 5.1:1 and the body at 7.2:1 once the source shadows are
              lifted (gamma 1.45), past the 4.5 required,
              because the portrait frame is already dark where the type sits.
              The wide shot is busier behind the headline and needs 50%. */}
          <div className="absolute inset-0 bg-bg/48 lg:bg-bg/50" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex max-w-[1280px] flex-col gap-12 px-6 pb-20 lg:min-h-[calc(min(92svh,880px)-8rem)] lg:justify-center lg:gap-14 lg:px-10 lg:pb-28"
      >
        <div className="mt-8 max-w-4xl lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="mb-8 hidden items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted lg:mb-10 lg:inline-flex"
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

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="max-w-md text-balance text-base leading-relaxed text-text-muted lg:col-span-5 lg:text-lg"
          >
            Jeg legger solfilm fra verkstedet på Hegdal industriområde —
            eller hjem til deg. Send meg et bilde, så får du pris raskt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.95 }}
            className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-7"
          >
            <MagneticLink
              href="tel:+4797474347"
              strength={0.4}
              radius={160}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-medium tracking-tight text-bg hover:bg-accent-warm"
              style={{
                transition: "background-color 220ms var(--ease-out)",
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
              className="press group hidden items-center justify-center gap-3 rounded-full border border-line-strong bg-bg/60 px-7 py-4 text-sm font-medium tracking-tight text-text backdrop-blur-sm hover:border-text lg:inline-flex"
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
