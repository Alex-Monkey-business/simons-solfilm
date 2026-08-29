"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { AnimatedBorder } from "./AnimatedBorder";

type Primary = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  image: string;
  alt: string;
  href: string;
};

type Secondary = {
  title: string;
  description: string;
  tag: string;
  video?: string;
  poster?: string;
};

const primary: Primary[] = [
  {
    number: "01",
    title: "Solfilm til bil",
    tagline: "Komfort, beskyttelse, uttrykk",
    description:
      "Jeg monterer solfilm på bil for deg som ønsker mindre varme, mindre innsyn og et penere uttrykk. Jeg hjelper deg å velge riktig filmtype, slik at resultatet passer både bilen og bruken din.",
    points: ["Mindre varme", "Mindre innsyn", "Penere uttrykk"],
    image: "/brand/pics_work/ferarri_side.webp",
    alt: "Bil med solfilm montert av Simon",
    href: "/solfilm-bil",
  },
  {
    number: "02",
    title: "Solfilm til bygg",
    tagline: "Bolig, kontor, næringsbygg",
    description:
      "Jeg monterer solfilm på bolig, kontor, butikk og næringsbygg. Det gir mindre varme, mindre innsyn og bedre komfort — uten at du må bytte vinduer eller sette opp tung solskjerming.",
    points: ["Reduserer varme", "Demper innsyn", "Bolig & næring"],
    image: "/brand/pics_work/stainless_steel_office_building.webp",
    alt: "Næringsbygg med solfilm",
    href: "/solfilm-bygg",
  },
];

const secondary: Secondary[] = [
  {
    title: "Lakkbeskyttelse / PPF",
    description:
      "Transparent beskyttelsesfilm som beskytter lakken mot steinsprut, slitasje og småskader. Jobber jevnlig med Mercedes AMG, Porsche og Ferrari.",
    tag: "XPEL-godkjent",
  },
  {
    title: "Lyktefolie",
    description:
      "Klar eller sotet variant for et mer tilpasset uttrykk — og beskyttelse mot riper og steinsprut.",
    tag: "Klar / Sotet",
  },
  {
    title: "Dronebefaring",
    description:
      "Enkel og effektiv befaring av tak, fasade og vanskelig tilgjengelige områder med drone. Tryggere og billigere enn lift.",
    tag: "Tak & solcelle",
    video: "/brand/videoes/drone.mp4",
    poster: "/brand/videoes/drone-poster.webp",
  },
  {
    title: "Trykk på klær",
    description:
      "Trykk på arbeidstøy, profilklær og T-skjorter til bedrifter, lag og privatpersoner.",
    tag: "Bedrift & privat",
  },
  {
    title: "Kurs i solfilm",
    description:
      "For deg som vil lære faget. Praktisk kurs hvor du får hands-on opplæring av meg.",
    tag: "Praktisk",
  },
];

const ease = [0.23, 1, 0.32, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.07 },
  }),
};

// Primary cards enter from alternating sides — first card from left, second
// from right — to break the monotony of stacked fade-ups elsewhere.
const primaryCardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -48 : 48,
    y: 12,
    scale: 0.96,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.95, ease, delay: i * 0.12 },
  }),
};

function PrimaryCard({ s, i }: { s: Primary; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 18 });
  const sry = useSpring(ry, { stiffness: 220, damping: 18 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Max ~7deg tilt — subtle, premium.
    ry.set(px * 14);
    rx.set(-py * 10);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.a
      ref={ref}
      key={s.number}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={primaryCardVariants}
      href={s.href}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        // clip-path reliably clips the scaling image to the rounded shape even
        // while the card is 3D-transformed — overflow:hidden fails here and
        // also flattens the 3D tilt.
        clipPath: "inset(0 round 2rem)",
        ...(enabled
          ? {
              rotateX: srx,
              rotateY: sry,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }
          : {}),
      }}
      className="group relative isolate flex aspect-[4/5] flex-col justify-end rounded-[2rem] border border-line bg-bg-card transition-[border-color] duration-300 hover:border-accent/40 sm:aspect-[4/3]"
    >
      <Image
        src={s.image}
        alt={s.alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
        style={{ transitionTimingFunction: "var(--ease-out)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/45 transition-[background-color] duration-500 group-hover:bg-black/35" />

      <div className="absolute left-6 top-6 z-10 flex w-[calc(100%-3rem)] items-center justify-between lg:left-8 lg:top-8 lg:w-[calc(100%-4rem)]">
        <span className="font-mono text-xs text-text/80 lg:text-sm">
          {s.number}
        </span>
        <span
          aria-hidden
          className="font-mono text-sm text-text/80 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:text-accent"
          style={{ transitionTimingFunction: "var(--ease-out)" }}
        >
          ↗
        </span>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <h3
          className="font-display text-3xl font-medium leading-tight tracking-tight transition-colors group-hover:text-accent lg:text-5xl"
          style={{ transitionDuration: "260ms", transitionTimingFunction: "var(--ease-out)" }}
        >
          {s.title}
        </h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text/70 lg:text-[11px]">
          {s.tagline}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {s.points.map((p) => (
            <li
              key={p}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-bg/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text backdrop-blur-md"
            >
              <span
                aria-hidden
                className="size-1 rounded-full bg-accent"
              />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}

export function Services() {
  return (
    <section
      id="tjenester"
      className="relative w-full bg-bg px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Section header */}
        <div className="mb-10 grid grid-cols-1 gap-10 lg:mb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              <span>Tjenester</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02]"
            >
              Det jeg{" "}
              <span className="font-display-italic text-text-muted">
                tilbyr.
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="max-w-sm text-balance leading-relaxed text-text-muted lg:col-span-4 lg:col-start-9"
          >
            Hovedfokuset mitt er solfilm — til bil, bolig og næringsbygg. I
            tillegg gjør jeg noen praktiske tilleggsjobber.
          </motion.p>
        </div>

        {/* Primary services — two big cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {primary.map((s, i) => (
            <PrimaryCard key={s.number} s={s} i={i} />
          ))}
        </div>

        {/* Secondary services */}
        <div className="mt-14 lg:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-10 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted lg:mb-12"
          >
            <span className="h-px w-8 bg-line-strong" />
            <span>Andre tjenester</span>
          </motion.div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-4">
            {secondary.map((s, i) =>
              s.video ? (
                <motion.div
                  key={s.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -4 }}
                  viewport={{ once: true, margin: "-60px" }}
                  variants={cardVariants}
                  className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl border border-line bg-bg-card transition-colors duration-300 hover:border-accent/40 md:col-span-2 md:row-span-2 lg:min-h-[260px]"
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={s.poster}
                    aria-label={s.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                    style={{ transitionTimingFunction: "var(--ease-out)" }}
                  >
                    <source src={s.video} type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-black/45 transition-[background-color] duration-500 group-hover:bg-black/30" />
                  <AnimatedBorder radius={16} />
                  <div className="relative z-10 p-6 lg:p-7">
                    <h3 className="font-display text-xl font-medium leading-tight text-text transition-colors duration-300 group-hover:text-accent lg:text-2xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text/85">
                      {s.description}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-bg/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur-md">
                      <span className="size-1 rounded-full bg-accent" />
                      {s.tag}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={s.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -4 }}
                  viewport={{ once: true, margin: "-60px" }}
                  variants={cardVariants}
                  className="group relative rounded-2xl border border-line bg-bg-card/40 p-6 transition-colors duration-300 hover:bg-bg-card md:col-span-2 lg:p-7"
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                >
                  <AnimatedBorder radius={16} />
                  <h3
                    className="font-display text-xl font-medium leading-tight transition-colors duration-300 group-hover:text-accent lg:text-2xl"
                    style={{ transitionTimingFunction: "var(--ease-out)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {s.description}
                  </p>
                  <div
                    className="mt-5 inline-block rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent"
                    style={{ transitionTimingFunction: "var(--ease-out)" }}
                  >
                    {s.tag}
                  </div>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
