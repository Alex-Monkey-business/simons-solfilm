"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

const ease = [0.23, 1, 0.32, 1] as const;

// Three facts, not four. "Også / Mobilt oppmøte" was padding invented to fill
// a 2×2 grid, and it said the same thing as "Dekker / Hele Vestfold".
const facts = [
  { label: "Erfaring", value: "20+ år" },
  { label: "Verksted", value: `${site.address.street}, ${site.address.city}` },
  { label: "Dekker", value: "Hele Vestfold" },
];

export function About() {
  return (
    <section
      id="om"
      className="relative w-full bg-bg px-6 py-20 lg:px-10 lg:py-40"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="mb-7 block h-px w-16 origin-left bg-accent lg:mb-9"
          />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.08 }}
            className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal leading-[1.02]"
          >
            Én håndverker,{" "}
            <span className="font-display-italic text-text-muted">
              ett verksted.
            </span>
          </motion.h2>

          {/* Hairline rows rather than four little boxes — same facts, no
              chrome, and the rules draw in one after the other. */}
          <dl className="mt-12 lg:mt-14">
            {facts.map((f, i) => {
              const body = (
                <>
                  <dt className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-base text-text">{f.value}</dd>
                </>
              );
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.09 }}
                  className="relative py-5"
                >
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.8,
                      ease,
                      delay: 0.2 + i * 0.09,
                    }}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
                  />
                  {f.label === "Verksted" ? (
                    <a
                      href={site.address.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline block hover:text-accent"
                      style={{ transition: "color 220ms var(--ease-out)" }}
                    >
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </motion.div>
              );
            })}
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="space-y-7 text-lg leading-relaxed text-text-muted lg:text-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease }}
              className="text-text"
            >
              Jeg har drevet med solfilm i over 20 år, og gjør jobben selv fra
              start til slutt. Verkstedet mitt holder til i et nytt bygg på
              Hegdal industriområde i Larvik.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-180px" }}
              transition={{ duration: 0.8, ease }}
            >
              Jeg er nøye med detaljene — kantene skal sitte, og ingen jobb er
              for vanskelig. For meg handler det om å gi ærlige råd, finne
              riktig løsning, og levere noe jeg kan stå inne for.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-240px" }}
              transition={{ duration: 0.8, ease }}
            >
              Hos meg er det ingen lærling som tar over og ingen kundeservice du
              må gjennom først. Trenger du at jeg kommer hjem eller ut på en
              byggeplass, ordner jeg det — næringskunder kjører jeg ut til over
              hele Vestfold.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
