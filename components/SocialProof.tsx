"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionHeading } from "./SectionHeading";

const ease = [0.23, 1, 0.32, 1] as const;

const GOOGLE_URL =
  "https://www.google.com/search?q=Simons+Solfilm+Larvik+anmeldelser";
const FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=100054592143676";

function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals).replace(".", ","));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease });
    return controls.stop;
  }, [inView, mv, to]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
  }, [rounded, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {(0).toFixed(decimals).replace(".", ",")}
      {suffix}
    </span>
  );
}

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4 fill-accent">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

// The Google card carried "4 anmeldelser" next to Facebook's 37. The small
// number pulled the big one down, so the score stands on its own.
const ratings = [
  {
    source: "Google",
    value: 5,
    decimals: 1,
    suffix: "",
    scoreLabel: "av 5",
    count: null,
    href: GOOGLE_URL,
  },
  {
    source: "Facebook",
    value: 100,
    decimals: 0,
    suffix: "%",
    scoreLabel: "anbefaling",
    count: "37 anmeldelser",
    href: FACEBOOK_URL,
  },
];

export function SocialProof() {
  return (
    <section className="relative w-full bg-bg px-6 py-12 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* No support paragraph here: the two numbers below say it, and saying
            it in words as well was bragging twice. */}
        <SectionHeading className="mb-12 lg:mb-16">
          Dette sier kundene mine.
        </SectionHeading>

        {/* The only boxes in this section — so they read as data panels
            against the borderless quotes underneath. */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {ratings.map((r, i) => (
            <motion.a
              key={r.source}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="press lift group flex items-center justify-between gap-6 rounded-3xl border border-line bg-bg-card p-8 lg:p-10"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[clamp(3rem,7vw,5.5rem)] font-medium leading-none tracking-tight text-accent">
                    <CountUp to={r.value} decimals={r.decimals} suffix={r.suffix} />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
                    {r.scoreLabel}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Stars />
                  {r.count ? (
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                      {r.count}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  {r.source}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-sm text-text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                >
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Two quotes of very different length were two same-sized boxes, one
            of them half empty. Now the long one is a pull-quote and the short
            one is a line — the difference in scale is the hierarchy. */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="mt-20 lg:mt-28"
        >
          <blockquote className="max-w-4xl text-balance font-display-italic text-[clamp(1.35rem,3vw,2.25rem)] leading-[1.35] text-text">
            Var nesten litt skeptisk i forkant grunnet den lave prisen, men han
            brukte skikkelig metallisert film som tar mye av varmen for hunden,
            man ser ikke noe som helst inn i bilen, og kvaliteten på arbeidet er
            helt prima! Kunne ikke vært mer fornøyd!
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Stars />
            <span className="text-sm text-text">Gunnar Brenne</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              Google · Local Guide
            </span>
          </figcaption>
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="relative mt-12 pt-8 lg:mt-14"
        >
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
          />
          <blockquote className="font-display-italic text-lg leading-snug text-text-muted lg:text-xl">
            Topp service og rimelige priser. Anbefales.
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-4">
            <Stars />
            <span className="text-sm text-text">Hans Erik Høiby Jondahl</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              Google
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
