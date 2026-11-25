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
  // Where the subject sits when the tile's shape differs from the photo's.
  // Only set where the default centre crop would cut the car.
  position?: string;
  // The day the job was posted. Drives the «Ny» badge.
  added?: string;
};

// Two shapes from md up: a full-width frame that opens and closes the grid,
// and thirds in between. Eight tiles then fall into 1 + 3 + 3 + 1.
const wide = "md:col-span-12 md:aspect-[21/9]";
const third = "md:col-span-4 md:aspect-[7/8]";

// A job stays «Ny» for about four months. After that the badge is a claim
// nobody maintains, so it removes itself instead of waiting for an edit.
const FRESH_DAYS = 120;

function useFreshLabel(added?: string) {
  const [label, setLabel] = useState<string | null>(null);
  // Decided after mount: the page is built once and served for months, so
  // "today" at build time is the wrong day to compare against.
  useEffect(() => {
    if (!added) return;
    const then = new Date(added);
    const days = (Date.now() - then.getTime()) / 86_400_000;
    if (days >= 0 && days < FRESH_DAYS) {
      setLabel(
        new Intl.DateTimeFormat("nb-NO", { month: "long", year: "numeric" }).format(then),
      );
    }
  }, [added]);
  return label;
}

// Labels describe the job, not a tier. Two tiles both saying "Premium" was a
// claim the photos had to carry on their own; "Solfilm + PPF" is just true.
// The detail line must not restate the label sitting above it in the same
// frame — four of the six opened with the words already in the pill. It says
// where the film went, or what it does for whoever uses the thing.
// The two newest carry Simon's own line from the post instead of one written
// for him — it is how he talks about the job.
const items: Item[] = [
  {
    src: "/brand/pics_work/corvette_orange.webp",
    alt: "Oransje Corvette med tonede ruter utenfor verkstedet på Hegdal",
    label: "Solfilm + lyktefolie",
    caption: "Corvette",
    detail: "«En rå Corvette må jo ha litt solfilm og lyktefolie.»",
    href: "/solfilm-bil",
    className: wide,
    position: "center 52%",
    added: "2026-09-11",
  },
  {
    src: "/brand/pics_work/urus_white.webp",
    alt: "Hvit Lamborghini Urus med tonede ruter utenfor verkstedet",
    label: "Solfilm",
    caption: "Lamborghini Urus",
    detail: "«Er ikke Lamborghini uten litt solfilm!»",
    href: "/solfilm-bil",
    className: third,
    position: "center 47%",
    added: "2026-09-07",
  },
  {
    src: "/brand/pics_work/porche_behind.webp",
    alt: "Sølvgrå Porsche 911 i Simons verksted med orange SS-logo på vegg",
    label: "Solfilm + PPF",
    caption: "Porsche 911",
    detail: "Rutene tonet, fronten beskyttet mot steinsprut.",
    href: "/solfilm-bil",
    className: third,
  },
  {
    src: "/brand/pics_work/ferarri_side.webp",
    alt: "Rød Ferrari F12 i sideprofil foran Simons Solfilm-banner",
    label: "Solfilm",
    caption: "Ferrari F12",
    detail: "Tonet uten at bilen mister linjene.",
    href: "/solfilm-bil",
    className: third,
  },
  {
    src: "/brand/pics_work/blue_mercedes.webp",
    alt: "Blå Mercedes AMG ferdig montert med solfilm under XPEL-skilt",
    label: "Solfilm + PPF",
    caption: "Mercedes AMG",
    detail: "Film på rutene, XPEL på lakken.",
    href: "/solfilm-bil",
    className: third,
  },
  {
    src: "/brand/pics_work/dumper_tinted.webp",
    alt: "Volvo A45 dumper med solfilm på førerhuset",
    label: "Solfilm",
    caption: "Volvo A45",
    detail: "Bedre å sitte i under lange skift.",
    href: "/solfilm-bil",
    className: third,
  },
  {
    src: "/brand/pics_work/tinted_winter_garden_sanden.webp",
    alt: "Leilighetsbygg med mørktonede innglassede balkonger",
    label: "Innsynsfilm",
    caption: "Leilighetsbygg",
    detail: "Privatliv uten å miste lyset.",
    href: "/solfilm-bygg",
    className: third,
  },
  {
    src: "/brand/pics_work/stainless_steel_office_building.webp",
    alt: "Næringsbygg med solfilm — Simons servicebil parkert foran",
    label: "Solfilm",
    caption: "Mobilt oppmøte",
    detail: "Jeg kommer ut til deg.",
    href: "/solfilm-bygg",
    className: wide,
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
  const freshLabel = useFreshLabel(item.added);
  const fullWidth = item.className === wide;

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
      // Two layouts in one element. On the rail it is a card: the photo in a
      // 4:3 frame with the text underneath. From md up the photo fills the
      // tile and the text becomes a plate on top of it.
      className={`tile group relative flex w-[72vw] max-w-[420px] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card md:block md:w-auto md:max-w-none md:shrink ${item.className}`}
    >
      <Link
        href={item.href}
        className="absolute inset-0 z-20"
        aria-label={`${item.caption} — ${item.detail}`}
      />
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden md:absolute md:inset-0 md:aspect-auto">
      <motion.div
        style={zoomOnEnter ? { scale: imgScale, skewY } : { skewY }}
        className="absolute inset-0"
      >
        {/* No preload: the gallery starts a full screen below the hero, and
            the lead photo should not compete with it for the first paint. */}
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={
            fullWidth
              ? "(max-width: 767px) 72vw, (max-width: 1360px) 100vw, 1200px"
              : "(max-width: 767px) 72vw, (max-width: 1360px) 33vw, 400px"
          }
          className="tile-img object-cover"
          style={item.position ? { objectPosition: item.position } : undefined}
        />
      </motion.div>
      {/* 20%, not 35%. Nothing sits on the bare photo any more, so the veil
          only has to seat the image against the page — the work shows
          brighter than it did. */}
      <div className="tile-scrim pointer-events-none absolute inset-0 bg-black/20" />
      {freshLabel ? (
        <div className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-bg md:left-4 md:top-4">
          <span className="tile-new-dot size-1.5 shrink-0 rounded-full bg-bg" />
          {/* The month only from md up. On the rail the card is 230px wide on
              a small phone, and the full label ran past its edge. */}
          <span>
            Ny<span className="hidden md:inline"> · {freshLabel}</span>
          </span>
        </div>
      ) : null}
      </div>

      {/* One solid plate, and nothing else on the photo. Set straight on the
          image, the title measured 2.6-3.3:1 against the brightest band
          behind it on every desktop tile — under the 4.5 it needs — and no
          veil dark enough to fix that leaves a portfolio worth looking at.
          The category pill that used to sit top-left folds in here, so each
          photo carries one object instead of three.
          The detail line is back, and always visible. It was dropped when it
          only showed on hover — most people never saw it, and a phone never
          did. Now it has room: under the photo on the rail, inside the plate
          from md up. */}
      <figcaption className="pointer-events-none flex flex-1 flex-col px-5 pb-5 pt-4 md:absolute md:bottom-4 md:left-4 md:z-10 md:block md:max-w-[min(calc(100%-2rem),32rem)] md:rounded-[var(--r-lg)] md:border md:border-white/10 md:bg-bg/75 md:px-4 md:py-3 md:backdrop-blur-md lg:bottom-5 lg:left-5 lg:px-5 lg:py-4">
        <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-text-muted">
          <span className="size-1 shrink-0 rounded-full bg-accent" />
          {item.label}
        </div>
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <span
            className={`font-display text-xl font-medium leading-tight text-text ${zoomOnEnter ? "lg:text-4xl" : "lg:text-2xl"}`}
          >
            {item.caption}
          </span>
          <span
            aria-hidden
            className="tile-arrow shrink-0 font-mono text-xs text-text-muted"
          >
            ↗
          </span>
        </div>
        {/* Hidden between md and lg. Three across on a tablet, a tile is about
            240px wide and the plate with this line covered 43% of the photo —
            the car on two of them. */}
        <p
          className={`mt-1.5 text-sm leading-snug text-text-muted md:hidden lg:block ${zoomOnEnter ? "lg:mt-2.5 lg:text-base" : ""}`}
        >
          {item.detail}
        </p>
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
  const [activeIndex, setActiveIndex] = useState(0);
  const move = (direction: number) => {
    const el = railRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(items.length - 1, activeIndex + direction));
    const card = el.children[next] as HTMLElement;
    const first = el.children[0] as HTMLElement;
    el.scrollTo({
      left: card.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      const span = el.scrollWidth - el.clientWidth;
      const first = el.children[0] as HTMLElement;
      const step = (el.children[1] as HTMLElement).offsetLeft - first.offsetLeft;
      setActiveIndex(span > 0 && el.scrollLeft >= span - 2
        ? items.length - 1
        : Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / (step || 1)))));
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
            against the 257px it had stacked, so nothing is smaller; they
            just occupy one row instead of one each. On the rail every photo
            sits in a 4:3 frame with its text underneath, so nothing covers
            the work. 72vw rather than 80: at 80 the
            next photo showed 42px, which is a sliver you read as background
            when its edge happens to be dark. At 72 it is 73px on a 390px
            screen — a recognisable piece of the next card. */}
        {/* overflow-y-hidden is not decoration: with only overflow-x set, the
            browser computes the other axis to auto as well, and the rail
            became a scroll box in both directions — 24px of vertical slack
            you could drag inside the carousel. */}
        <div
          ref={railRef}
          id="prosjektbilder"
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

        {/* Position and two text buttons, nothing else. The first cut had
            arrow glyphs in round buttons and a «Sveip for flere jobber» hint;
            arrows are icons in a site that has none, and the counter already
            says there is more. */}
        <div className="mt-4 flex items-center justify-between gap-4 md:hidden">
          <p className="text-sm text-text-muted" aria-live="polite" aria-atomic="true">
            {activeIndex + 1} / {items.length}
          </p>
          <div className="-mr-3 flex">
            <button
              type="button"
              aria-controls="prosjektbilder"
              disabled={activeIndex === 0}
              onClick={() => move(-1)}
              className="min-h-[44px] px-3 text-sm text-text transition-colors hover:text-accent disabled:text-text-faint disabled:opacity-60"
            >
              Forrige
            </button>
            <button
              type="button"
              aria-controls="prosjektbilder"
              disabled={activeIndex === items.length - 1}
              onClick={() => move(1)}
              className="min-h-[44px] px-3 text-sm text-text transition-colors hover:text-accent disabled:text-text-faint disabled:opacity-60"
            >
              Neste
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
