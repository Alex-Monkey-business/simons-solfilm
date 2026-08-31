"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const ease = [0.23, 1, 0.32, 1] as const;

import { site } from "@/lib/site";

/**
 * These are two different measurements from two different platforms, and the
 * old card pair rendered them as twins: "5,0" and "100%" in identical display
 * type, both under five gold stars.
 *
 * Facebook has not had star ratings since 2018 — it asks whether you would
 * recommend a business, yes or no. "100% anbefaling" is that recommendation
 * rate, and the five stars underneath it were a rating that does not exist.
 * Google does use stars, so it keeps them.
 */
type Proof = {
  source: string;
  value: string;
  unit: string;
  meta: string;
  stars: boolean;
  href: string;
};

const proofs: Proof[] = [
  {
    source: "Google",
    value: "5,0",
    unit: "av 5",
    meta: "4 anmeldelser",
    stars: true,
    href: site.social.googleMaps,
  },
  {
    source: "Facebook",
    value: "100 %",
    unit: "vil anbefale",
    meta: "37 anbefalinger",
    stars: false,
    href: site.social.facebook,
  },
];

const quotes = [
  {
    text: "Var nesten litt skeptisk i forkant grunnet den lave prisen, men han brukte skikkelig metallisert film som tar mye av varmen for hunden, man ser ikke noe som helst inn i bilen, og kvaliteten på arbeidet er helt prima! Kunne ikke vært mer fornøyd!",
    name: "Gunnar Brenne",
    source: "Google · Local Guide",
  },
  {
    text: "Topp service og rimelige priser. Anbefales.",
    name: "Hans Erik Høiby Jondahl",
    source: "Google",
  },
];

/**
 * The container animates, not the stars. Giving each star its own whileInView
 * meant some never fired on a phone and sat at opacity 0 — the rating rendered
 * as two stars out of five. Same failure the phone number had: a star count is
 * content, and content must never animate in per-glyph.
 */
function Stars() {
  return (
    <motion.span
      className="inline-flex gap-0.5"
      aria-hidden
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease, delay: 0.2 }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="size-4 fill-accent">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </motion.span>
  );
}

export function SocialProof() {
  return (
    <section className="relative w-full bg-bg px-6 py-12 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* No support paragraph here: the two numbers below say it, and saying
            it in words as well was bragging twice. */}
        <SectionHeading number={5} className="mb-12 lg:mb-16">
          Dette sier kundene mine.
        </SectionHeading>

        {/* Platform name leads and the arrow sits with it, so the card has a
            header instead of two labels floating in a right-hand column. */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {proofs.map((r, i) => (
            <motion.a
              key={r.source}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="press lift group flex flex-col justify-between gap-8 rounded-[var(--r-card)] border border-line bg-bg-card p-8 lg:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-muted">
                  {r.source}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-sm text-text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                >
                  ↗
                </span>
              </div>

              <div>
                {/* The number rises into place rather than counting up from
                    zero: this is the proof, and its first frame should never
                    read "0,0 av 5". The stars carry the motion instead. */}
                <div className="flex items-baseline gap-3">
                  <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease, delay: 0.15 }}
                    className="font-display text-[clamp(3rem,7vw,5.5rem)] font-normal leading-none tracking-tight text-accent"
                  >
                    {r.value}
                  </motion.span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-muted">
                    {r.unit}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  {r.stars ? <Stars /> : null}
                  <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                    {r.meta}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Same size, same colour, same rule above each. They were 36px in
            full white and 20px in grey, which was left over from when they
            sat in boxes: a short quote in a box the size of a long one leaves
            the box half empty, so one was scaled down. The boxes are gone and
            the problem went with them — an unboxed short quote is simply a
            short line. What the old scale said instead was that one customer
            counted and the other was small print, and both are real five-star
            reviews. 28px rather than 36 also stops the quote competing with
            the two numbers above, which are the thing to look at. */}
        {quotes.map((q, i) => (
          <motion.figure
            key={q.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: i * 0.1 }}
            className={`relative pt-8 ${i === 0 ? "mt-20 lg:mt-28" : "mt-12 lg:mt-14"}`}
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.1 }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
            />
            <blockquote className="max-w-4xl text-balance font-display-italic text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.4] text-text">
              {q.text}
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Stars />
              <span className="text-sm text-text">{q.name}</span>
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                {q.source}
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
