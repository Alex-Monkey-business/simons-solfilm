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
import Link from "next/link";
import { useRef } from "react";
import { SectionHeading } from "./SectionHeading";

type Item = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  detail: string;
  href: string;
  className: string;
  priority?: boolean;
};

// Labels describe the job, not a tier. Two tiles both saying "Premium" was a
// claim the photos had to carry on their own; "Solfilm + PPF" is just true.
const items: Item[] = [
  {
    src: "/brand/pics_work/porche_behind.webp",
    alt: "Sølvgrå Porsche 911 i Simons verksted med orange SS-logo på vegg",
    label: "Solfilm + PPF",
    caption: "Porsche 911",
    detail: "Solfilm og lakkbeskyttelse — diskret beskyttelse på premium-bil.",
    href: "/solfilm-bil",
    className: "md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto",
    priority: true,
  },
  {
    src: "/brand/pics_work/ferarri_side.webp",
    alt: "Rød Ferrari F12 i sideprofil foran Simons Solfilm-banner",
    label: "Solfilm",
    caption: "Ferrari F12",
    detail: "Solfilm montert på en premium-bil.",
    href: "/solfilm-bil",
    className: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/blue_mercedes.webp",
    alt: "Blå Mercedes AMG ferdig montert med solfilm under XPEL-skilt",
    label: "Solfilm + PPF",
    caption: "Mercedes AMG",
    detail: "Solfilm og XPEL-godkjent folie for varig kvalitet.",
    href: "/solfilm-bil",
    className: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/dumper_tinted.webp",
    alt: "Volvo A45 dumper med solfilm på førerhuset",
    label: "Solfilm",
    caption: "Volvo A45",
    detail: "Solfilm i førerhuset — bedre å sitte i under lange skift.",
    href: "/solfilm-bil",
    className: "md:col-span-5 aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/tinted_winter_garden_sanden.webp",
    alt: "Leilighetsbygg med mørktonede innglassede balkonger",
    label: "Innsynsfilm",
    caption: "Leilighetsbygg",
    detail: "Mørktonet innglasset balkong — privatliv uten å miste lyset.",
    href: "/solfilm-bygg",
    className: "md:col-span-7 aspect-[16/10] md:aspect-auto",
  },
  {
    src: "/brand/pics_work/stainless_steel_office_building.webp",
    alt: "Næringsbygg med solfilm — Simons servicebil parkert foran",
    label: "Solfilm",
    caption: "Mobilt oppmøte",
    detail: "Næringskunder i hele Vestfold — jeg kommer ut til deg.",
    href: "/solfilm-bygg",
    className: "md:col-span-12 aspect-[21/9]",
  },
];

const ease = [0.23, 1, 0.32, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay: i * 0.07 },
  }),
};

function Tile({
  item,
  skewY,
  zoomOnEnter = false,
  index = 0,
}: {
  item: Item;
  skewY: MotionValue<number>;
  zoomOnEnter?: boolean;
  index?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  // Only the lead tile zooms into focus — a single accent, not a tic.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <motion.figure
      ref={ref}
      custom={index}
      initial={zoomOnEnter ? { opacity: 0 } : "hidden"}
      whileInView={zoomOnEnter ? { opacity: 1 } : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      variants={zoomOnEnter ? undefined : cardVariants}
      transition={zoomOnEnter ? { duration: 0.9, ease } : undefined}
      className={`tile group relative overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card ${item.className}`}
    >
      <Link
        href={item.href}
        className="absolute inset-0 z-20"
        aria-label={`${item.caption} — ${item.detail}`}
      />
      <motion.div
        style={zoomOnEnter ? { scale: imgScale, skewY } : { skewY }}
        className="absolute inset-0"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 800px"
          className="tile-img object-cover"
          priority={item.priority}
        />
      </motion.div>
      <div className="tile-scrim pointer-events-none absolute inset-0 bg-black/35" />

      <div className="pointer-events-none absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg/40 px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.18em] text-text backdrop-blur-md">
        <span className="size-1 rounded-full bg-accent" />
        {item.label}
      </div>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6 lg:p-7">
        <div className="min-w-0 flex-1">
          <div className="font-display text-xl font-medium leading-tight text-text lg:text-2xl">
            {item.caption}
          </div>
          <p
            data-detail
            className="mt-1.5 max-w-md text-base leading-snug text-text/85 lg:mt-2"
          >
            {item.detail}
          </p>
        </div>
        <span aria-hidden className="tile-arrow shrink-0 font-mono text-xs text-text">
          ↗
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Gallery() {
  // Scroll velocity leans every image a degree or two, then settles. Spring-
  // smoothed so it never jitters.
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 400,
    mass: 0.5,
  });
  const skewY = useTransform(smoothVelocity, [-2500, 0, 2500], [3, 0, -3], {
    clamp: true,
  });

  return (
    <section
      id="galleri"
      className="relative w-full bg-bg px-6 py-16 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          className="mb-12 lg:mb-16"
          support={
            <>
              Biler, anleggsmaskiner, leilighetsbygg og innglassede balkonger —
              litt av hvert.
            </>
          }
        >
          Jobber jeg har gjort.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-5">
          {items.map((item, i) => (
            <Tile
              key={item.src}
              item={item}
              index={i}
              skewY={skewY}
              zoomOnEnter={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
