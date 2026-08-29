"use client";

import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const facts = [
  { label: "Erfaring", value: "20+ år" },
  { label: "Verksted", value: "Hegdalveien 65c" },
  { label: "Dekker", value: "Hele Vestfold" },
  { label: "Også", value: "Mobilt oppmøte" },
];

export function About() {
  return (
    <section
      id="om"
      className="relative w-full bg-bg px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-16 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            <span>Om Simon</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02]"
          >
            Én håndverker,{" "}
            <span className="font-display-italic text-text-muted">
              ett verksted.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-3"
          >
            {facts.map((f) => {
              const isVerksted = f.label === "Verksted";
              const className =
                "rounded-2xl border border-line bg-bg-card/60 p-5";
              const inner = (
                <>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
                    {f.label}
                  </div>
                  <div className="mt-2 text-sm text-text">{f.value}</div>
                </>
              );
              return isVerksted ? (
                <a
                  key={f.label}
                  href="https://www.google.com/maps/search/?api=1&query=Hegdalveien+65c+3261+Larvik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`press lift group ${className} hover:border-line-strong`}
                  style={{ transition: "border-color 220ms var(--ease-out)" }}
                >
                  {inner}
                </a>
              ) : (
                <div key={f.label} className={className}>
                  {inner}
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="space-y-6 text-lg leading-relaxed text-text-muted lg:text-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease }}
              className="text-text"
            >
              Jeg har drevet med solfilm i over 20 år, og gjør jobben selv fra
              start til slutt. Verkstedet mitt holder til i et nytt, moderne
              bygg på Hegdal industriområde i Larvik.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-180px" }}
              transition={{ duration: 0.8, ease }}
            >
              Jeg er nøye med detaljene — kantene skal sitte, og ingen
              jobb er for vanskelig. For meg handler det om å gi ærlige råd,
              finne riktig løsning, og levere et resultat jeg kan stå inne
              for.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-240px" }}
              transition={{ duration: 0.8, ease }}
            >
              Hos meg er det ingen lærling som tar over og ingen kundeservice
              du må gjennom først. Trenger du at jeg kommer hjem eller ut på
              en byggeplass, ordner jeg det — næringskunder kjører jeg ut til
              over hele Vestfold.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
