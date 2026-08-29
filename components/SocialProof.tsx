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

function Stars() {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          className="size-4 fill-accent"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.07 }}
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </motion.svg>
      ))}
    </span>
  );
}

export function SocialProof() {
  return (
    <section className="relative w-full bg-bg px-6 py-12 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        {/* No support paragraph here: the two numbers below say it, and saying
            it in words as well was bragging twice. */}
        <SectionHeading className="mb-12 lg:mb-16">
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
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
                    {r.unit}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  {r.stars ? <Stars /> : null}
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-faint">
                    {r.meta}
                  </span>
                </div>
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
