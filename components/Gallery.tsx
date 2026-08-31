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
import { useEffect, useRef, useState } from "react";
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
// The detail line must not restate the label sitting above it in the same
// frame — four of the six opened with the words already in the pill. It says
// where the film went, or what it does for whoever uses the thing.
const items: Item[] = [
  {
    src: "/brand/pics_work/porche_behind.webp",
    alt: "Sølvgrå Porsche 911 i Simons verksted med orange SS-logo på vegg",
    label: "Solfilm + PPF",
    caption: "Porsche 911",
    detail: "Rutene tonet, fronten beskyttet mot steinsprut.",
    href: "/solfilm-bil",
    className: "md:col-span-7 md:row-span-2 md:aspect-auto",
    priority: true,
  },
  {
    src: "/brand/pics_work/ferarri_side.webp",
    alt: "Rød Ferrari F12 i sideprofil foran Simons Solfilm-banner",
    label: "Solfilm",
    caption: "Ferrari F12",
    detail: "Tonet uten at bilen mister linjene.",
    href: "/solfilm-bil",
    className: "md:col-span-5 md:aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/blue_mercedes.webp",
    alt: "Blå Mercedes AMG ferdig montert med solfilm under XPEL-skilt",
    label: "Solfilm + PPF",
    caption: "Mercedes AMG",
    detail: "Film på rutene, XPEL på lakken.",
    href: "/solfilm-bil",
    className: "md:col-span-5 md:aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/dumper_tinted.webp",
    alt: "Volvo A45 dumper med solfilm på førerhuset",
    label: "Solfilm",
    caption: "Volvo A45",
    detail: "Bedre å sitte i under lange skift.",
    href: "/solfilm-bil",
    className: "md:col-span-5 md:aspect-[4/3]",
  },
  {
    src: "/brand/pics_work/tinted_winter_garden_sanden.webp",
    alt: "Leilighetsbygg med mørktonede innglassede balkonger",
    label: "Innsynsfilm",
    caption: "Leilighetsbygg",
    detail: "Privatliv uten å miste lyset.",
    href: "/solfilm-bygg",
    className: "md:col-span-7 md:aspect-auto",
  },
  {
    src: "/brand/pics_work/stainless_steel_office_building.webp",
    alt: "Næringsbygg med solfilm — Simons servicebil parkert foran",
    label: "Solfilm",
    caption: "Mobilt oppmøte",
    detail: "Jeg kommer ut til deg.",
    href: "/solfilm-bygg",
    className: "md:col-span-12 md:aspect-[21/9]",
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
      // amount, not margin: a -60px inset meant the card peeking 42px into
      // the rail never counted as in view, so it sat at opacity 0 and the
      // only hint that the row scrolls was invisible.
      viewport={{ once: true, amount: 0.12 }}
      variants={zoomOnEnter ? undefined : cardVariants}
      transition={zoomOnEnter ? { duration: 0.9, ease } : undefined}
      className={`tile group relative aspect-[4/3] w-[72vw] max-w-[420px] shrink-0 snap-start overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card md:w-auto md:max-w-none md:shrink ${item.className}`}
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
      {/* 20%, not 35%. Nothing sits on the bare photo any more, so the veil
          only has to seat the image against the page — the work shows
          brighter than it did. */}
      <div className="tile-scrim pointer-events-none absolute inset-0 bg-black/20" />

      {/* One solid plate, and nothing else on the photo. Set straight on the
          image, the title measured 2.6-3.3:1 against the brightest band
          behind it on every desktop tile — under the 4.5 it needs — and no
          veil dark enough to fix that leaves a portfolio worth looking at.
          The category pill that used to sit top-left folds in here, so each
          photo carries one object instead of three.
          The detail line is gone: hidden until hover on a pointer device, so
          most people never read it, and worse than the title on a phone. It
          survives in the link's accessible name, where it is actually used. */}
      <figcaption className="pointer-events-none absolute bottom-4 left-4 z-10 flex max-w-[calc(100%-2rem)] items-end gap-4 rounded-[var(--r-lg)] border border-white/10 bg-bg/75 px-4 py-3 backdrop-blur-md lg:bottom-5 lg:left-5 lg:px-5 lg:py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-text-muted">
            <span className="size-1 shrink-0 rounded-full bg-accent" />
            {item.label}
          </div>
          <div className="mt-1 font-display text-xl font-medium leading-tight text-text lg:text-2xl">
            {item.caption}
          </div>
        </div>
        <span
          aria-hidden
          className="tile-arrow shrink-0 pb-1 font-mono text-xs text-text-muted"
        >
          ↗
        </span>
      </figcaption>
    </motion.figure>
  );
}

export function Gallery() {
  // The rail needs a visible sign that it scrolls. 42px of the next photo is
  // not enough on its own — a dark frame edge reads as page background. This
  // is the same hairline the section headings and contact rows use, with the
  // travelled part in the accent.
  const railRef = useRef<HTMLDivElement>(null);
  const [rail, setRail] = useState({ width: 1, offset: 0 });
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      const span = el.scrollWidth - el.clientWidth;
      setRail({
        width: el.clientWidth / el.scrollWidth,
        offset: span > 0 ? el.scrollLeft / span : 0,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

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
          number={2}
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

        {/* A rail on a phone, the composed grid from md up. Stacked full
            width, the six tiles ran 1560px — 21% of the whole page, the
            largest section on the site. At 80vw each photo is 234px tall
            against the 257px it had stacked, so nothing is smaller; six of
            them just occupy one row instead of six. Every source frame is
            4:3, so the rail crops nothing. 72vw rather than 80: at 80 the
            next photo showed 42px, which is a sliver you read as background
            when its edge happens to be dark. At 72 it is 73px on a 390px
            screen — a recognisable piece of the next card. */}
        {/* overflow-y-hidden is not decoration: with only overflow-x set, the
            browser computes the other axis to auto as well, and the rail
            became a scroll box in both directions — 24px of vertical slack
            you could drag inside the carousel. */}
        <div
          ref={railRef}
          className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto overflow-y-hidden px-6 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-12 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
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

        {/* Tumben var bg-accent på full bredde, altså samme form og farge som
            seksjonsstreken rett under: aksent til venstre på en hårstrek. På
            390 px måler tumben ~72 px og aksentsegmentet 64 — de var
            uskillelige, og indikatoren leste som en seksjonsgrense.
            Aksenten betyr «ny seksjon starter her». En rulleindikator er
            posisjon, ikke merkevare, så den er nøytral nå. Sporet er også
            trukket inn til 40 % og sentrert, så silhuetten skiller seg fra en
            strek som går tvers over. */}
        <div
          aria-hidden
          className="relative mx-auto mt-6 h-0.5 w-2/5 overflow-hidden rounded-full bg-line md:hidden"
        >
          <div
            className="absolute inset-y-0 rounded-full bg-text-muted"
            style={{
              width: `${rail.width * 100}%`,
              left: `${rail.offset * (100 - rail.width * 100)}%`,
              transition: "left 90ms linear",
            }}
          />
        </div>
      </div>
    </section>
  );
}
