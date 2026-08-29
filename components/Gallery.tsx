"use client";

import {
  MotionValue,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Item = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  detail: string;
  className: string;
  priority?: boolean;
};

const items: Item[] = [
  {
    src: "/brand/pics_work/porche_behind.webp",
    alt: "Sølvgrå Porsche 911 i Simons verksted med orange SS-logo på vegg",
    label: "Premium",
    caption: "Porsche 911",
    detail: "Solfilm og lakkbeskyttelse — diskret beskyttelse på premium-bil.",
    className: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto",
    priority: true,
  },
  {
    src: "/brand/pics_work/ferarri_side.webp",
    alt: "Rød Ferrari F12 i sideprofil foran Simons Solfilm-banner",
    label: "Premium",
    caption: "Ferrari F12",
    detail: "Solfilm montert på en premium-bil.",
    className: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/blue_mercedes.webp",
    alt: "Blå Mercedes AMG ferdig montert med solfilm under XPEL-skilt",
    label: "Personbil",
    caption: "Mercedes AMG",
    detail: "Solfilm og XPEL-godkjent folie for varig kvalitet.",
    className: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/dumper_tinted.webp",
    alt: "Volvo A45 dumper med solfilm på førerhuset",
    label: "Anleggsmaskin",
    caption: "Volvo A45",
    detail: "Solfilm i førerhuset — bedre komfort under lange skift.",
    className: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/tinted_winter_garden_sanden.webp",
    alt: "Leilighetsbygg med mørktonede innglassede balkonger",
    label: "Borettslag",
    caption: "Leilighetsbygg",
    detail:
      "Mørktonet innglasset balkong — privatliv uten å miste lyset.",
    className: "md:col-span-7 aspect-[16/10] md:aspect-auto",
  },
  {
    src: "/brand/pics_work/stainless_steel_office_building.webp",
    alt: "Næringsbygg med solfilm — Simons servicebil parkert foran",
    label: "Næringsbygg",
    caption: "Mobilt oppmøte",
    detail: "Næringskunder dekket i hele Vestfold — jeg kommer ut til deg.",
    className: "md:col-span-12 aspect-[21/9]",
  },
];

const ease = [0.23, 1, 0.32, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease,
      delay: i * 0.07,
    },
  }),
};

function HeroCard({
  item,
  skewY,
}: {
  item: Item;
  skewY: MotionValue<number>;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // Image scales 1.12 → 1 as the card enters viewport — a "zoom-into-focus"
  // moment that breaks the uniform fade-up rhythm elsewhere in the gallery.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease }}
      className={`group lift relative overflow-hidden rounded-3xl border border-line bg-bg-card ${item.className}`}
    >
      <motion.div style={{ scale: imgScale, skewY }} className="absolute inset-0">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
          className="object-cover"
          style={{ transition: "transform 1200ms var(--ease-out)" }}
          priority={item.priority}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-black/35 transition-[background-color] duration-500" />

      <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur-md">
        <span className="size-1 rounded-full bg-accent" />
        {item.label}
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6 lg:p-7">
        <div className="min-w-0 flex-1">
          <div className="font-display text-xl font-medium leading-tight text-text lg:text-2xl">
            {item.caption}
          </div>
          <p
            data-detail
            className="mt-1.5 max-w-md text-sm leading-snug text-text/85 lg:mt-2"
          >
            {item.detail}
          </p>
        </div>
        <span
          className="shrink-0 font-mono text-xs text-text"
          style={{ transition: "transform 320ms var(--ease-out), color 320ms ease" }}
        >
          ↗
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Gallery() {
  // Scroll-velocity → subtle skewY on every image. Fast scroll leans the
  // images, idle scroll returns to 0. Smoothed by spring so it never jitters.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
    mass: 0.5,
  });
  const skewY = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    [3, 0, -3],
    { clamp: true },
  );

  return (
    <section
      id="galleri"
      className="relative w-full bg-bg px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
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
              <span>Utvalgte prosjekter</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.02]"
            >
              Noen{" "}
              <span className="font-display-italic text-text-muted">
                jobber jeg har gjort.
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
            Biler, anleggsmaskiner, leilighetsbygg og innglassede balkonger —
            litt av hvert.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-5">
          {items.map((item, i) =>
            i === 0 ? (
              <HeroCard key={item.src} item={item} skewY={skewY} />
            ) : (
            <motion.figure
              key={item.src}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className={`group lift relative overflow-hidden rounded-3xl border border-line bg-bg-card ${item.className}`}
            >
              <motion.div style={{ skewY }} className="absolute inset-0">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
                  className="object-cover"
                  style={{
                    transition: "transform 1200ms var(--ease-out)",
                  }}
                  priority={item.priority}
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-black/35 transition-[background-color] duration-500" />

              <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text backdrop-blur-md">
                <span className="size-1 rounded-full bg-accent" />
                {item.label}
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6 lg:p-7">
                <div className="min-w-0 flex-1">
                  <div className="font-display text-xl font-medium leading-tight text-text lg:text-2xl">
                    {item.caption}
                  </div>
                  <p
                    data-detail
                    className="mt-1.5 max-w-md text-sm leading-snug text-text/85 lg:mt-2"
                  >
                    {item.detail}
                  </p>
                </div>
                <span
                  className="shrink-0 font-mono text-xs text-text"
                  style={{ transition: "transform 320ms var(--ease-out), color 320ms ease" }}
                >
                  ↗
                </span>
              </figcaption>
            </motion.figure>
            ),
          )}
        </div>
      </div>

      {/* Hover behaviour — gated for real pointers; mobile shows detail always */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .group:hover > img,
          .group:hover [data-img] {
            transform: scale(1.04);
          }
          .group:hover .absolute.inset-0[class*="bg-black"] {
            background-color: rgba(0, 0, 0, 0.22);
          }
          .group:hover figcaption span:last-child {
            transform: translate(2px, -2px);
            color: var(--accent);
          }
          [data-detail] {
            opacity: 0;
            transform: translateY(6px);
            transition: opacity 360ms var(--ease-out), transform 360ms var(--ease-out);
          }
          .group:hover [data-detail] {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
