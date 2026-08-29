"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";

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
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="size-4 fill-accent"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

const ratings = [
  {
    source: "Google",
    value: 5,
    decimals: 1,
    suffix: "",
    scoreLabel: "av 5",
    count: "4 anmeldelser",
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

const quotes = [
  {
    text: "Var nesten litt skeptisk i forkant grunnet den lave prisen, men han brukte skikkelig metallisert film som tar mye av varmen for hunden, man ser ikke noe som helst inn i bilen, og kvaliteten på arbeidet er helt prima! Kunne ikke vært mer fornøyd!",
    name: "Gunnar Brenne",
    meta: "Google · Local Guide",
    featured: true,
  },
  {
    text: "Topp service og rimelige priser. Anbefales.",
    name: "Hans Erik Høiby Jondahl",
    meta: "Google",
    featured: false,
  },
];

export function SocialProof() {
  return (
    <section className="relative w-full bg-bg px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-10 grid grid-cols-1 gap-10 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-7"
          >
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
              <span className="size-1.5 rounded-full bg-accent" />
              <span>Anbefalinger</span>
            </div>
            <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02]">
              Dette sier{" "}
              <span className="font-display-italic text-text-muted">
                kundene mine.
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="max-w-sm text-balance leading-relaxed text-text-muted lg:col-span-4 lg:col-start-9"
          >
            Topp rating på både Google og Facebook — og kunder som kommer
            tilbake.
          </motion.p>
        </div>

        {/* Rating cards */}
        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2">
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
                    <CountUp
                      to={r.value}
                      decimals={r.decimals}
                      suffix={r.suffix}
                    />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
                    {r.scoreLabel}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Stars />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                    {r.count}
                  </span>
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

        {/* Quotes */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease, delay: i * 0.12 }}
              className={`relative flex flex-col justify-between gap-8 rounded-3xl border border-line bg-bg-card p-8 lg:p-10 ${
                q.featured ? "lg:col-span-7" : "lg:col-span-5"
              }`}
            >
              <div>
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-accent/25"
                >
                  &ldquo;
                </span>
                <blockquote
                  className={`-mt-3 text-balance font-display-italic leading-snug text-text/90 ${
                    q.featured ? "text-lg lg:text-xl" : "text-base lg:text-lg"
                  }`}
                >
                  {q.text}
                </blockquote>
              </div>
              <figcaption className="flex items-center justify-between gap-4 border-t border-line pt-6">
                <div>
                  <div className="text-sm font-medium text-text">{q.name}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
                    {q.meta}
                  </div>
                </div>
                <Stars />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
