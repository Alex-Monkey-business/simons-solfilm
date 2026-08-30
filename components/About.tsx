"use client";

import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

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

          {/* One number, not a list. It began as four rows, then three. Each
              of the others said something the paragraphs beside it already
              said with more in them — the workshop's address, which is also
              in the contact list and the footer, and the area covered, which
              the last paragraph states as a promise rather than a fact. What
              is left is the one thing the prose never says. */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="relative mt-12 py-6 lg:mt-14"
          >
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
            />
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
              Erfaring
            </div>
            <div className="mt-2 font-display text-4xl font-normal leading-none text-text lg:text-5xl">
              20+ år
            </div>
          </motion.div>
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
              Jeg gjør jobben selv, fra start til slutt. Jeg holder også kurs
              for XPEL, så det er faget jeg lærer bort til andre montører.
              Verkstedet mitt holder til i et nytt bygg på Hegdal industriområde
              i Larvik.
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
