"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MagneticLink } from "./MagneticLink";
import { buttonClass } from "./Button";
import { QuickActions } from "./QuickActions";
import { site } from "@/lib/site";

const ease = [0.23, 1, 0.32, 1] as const;

// A composed full-bleed backdrop. Measured against the headline area, a solid
// 50% knock-back puts even the brightest 2% of pixels at 6.6:1 against the
// cream — past the 4.5 body text requires — so no horizontal mask is needed
// and the composition survives intact. The vertical fade only dissolves the
// image into the section below instead of ending it on a hard edge.
// 1 = as encoded. The slow motion is baked into the file now (real
// interpolated in-between frames), so slowing playback here would only bring
// back the frame-holding judder it was built to avoid.
const HERO_LOOP_SPEED = 1;

const PHOTO_MASK =
  "linear-gradient(to bottom, #000 0%, #000 62%, transparent 100%)";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  // The loop is 1.5 MB against the portrait still's 177 kB, so a phone never
  // fetches it: the <video> is only mounted once we know we are on a wide
  // viewport, and never for someone who asked for less motion. The still
  // underneath is the poster either way, so there is no empty frame to cover.
  // Two encodes, not one crop. A phone shows roughly the middle 35% of a 16:9
  // frame, so the mobile file is cropped to 448x720 in the encode itself and
  // spends none of its bits on pixels the viewport throws away — 1.2 MB
  // instead of the 2.6 MB desktop file.
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      setVideoSrc(
        still.matches
          ? null
          : wide.matches
            ? "/brand/videoes/hero-loop.mp4"
            : "/brand/videoes/hero-loop-mobil.mp4",
      );
    update();
    wide.addEventListener("change", update);
    still.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      still.removeEventListener("change", update);
    };
  }, []);

  // Kept as a single knob, but it should stay at 1: see HERO_LOOP_SPEED.
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = HERO_LOOP_SPEED;
  }, [videoSrc]);
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
          {videoSrc ? (
            <video
              key={videoSrc}
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              tabIndex={-1}
              onCanPlay={() => setVideoReady(true)}
              className="absolute inset-0 size-full object-cover object-center"
              style={{
                opacity: videoReady ? 1 : 0,
                transition: "opacity 900ms var(--ease-out)",
              }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : null}

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
            className="mb-8 hidden items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.22em] text-text-muted lg:mb-10 lg:inline-flex"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            <span>Solfilm · PPF · Drone</span>
          </motion.div>

          <h1 className="font-display text-balance text-[clamp(2.75rem,7.5vw,6.5rem)] font-normal leading-[1] text-text">
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

        {/* One left edge, shared with the headline. This was a 12-column
            split — text in 1-5, buttons in 7-11 — which collapses to a single
            column on a phone and therefore looked right there, but on a wide
            screen it left the call button floating mid-frame, aligned to
            nothing. */}
        <div className="flex flex-col gap-10 lg:max-w-2xl lg:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="max-w-md text-balance text-base leading-relaxed text-text-muted lg:text-lg"
          >
            Send meg et bilde, så får du pris raskt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.95 }}
            className="flex flex-col items-start gap-4"
          >
            <MagneticLink
              href={site.phone.href}
              strength={0.4}
              radius={160}
              className={buttonClass({ variant: "primary", className: "group" })}
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

            <QuickActions />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
