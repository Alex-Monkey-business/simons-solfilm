"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";

type Primary = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  href: string;
};

type Secondary = {
  title: string;
  description: string;
  tag: string;
  href?: string;
};

// No photography here on purpose. Both of these images also carry the gallery
// further down, and running them twice within one screen of scroll made the
// site look thinner than it is. The gallery owns the pictures; these two are
// doors.
const primary: Primary[] = [
  {
    number: "01",
    title: "Solfilm til bil",
    tagline: "Personbil, firmabil, anleggsmaskin",
    description:
      "Jeg monterer solfilm på bil for deg som vil ha mindre varme, mindre innsyn og et penere uttrykk. Vi finner filmtypen som passer bilen og måten du bruker den på.",
    points: ["Mindre varme", "Mindre innsyn", "Penere uttrykk"],
    href: "/solfilm-bil",
  },
  {
    number: "02",
    title: "Solfilm til bygg",
    tagline: "Bolig, kontor, næringsbygg",
    description:
      "Jeg monterer solfilm på bolig, kontor, butikk og næringsbygg. Mindre varme og mindre innsyn — uten at du må bytte vinduer eller henge opp tung solskjerming.",
    points: ["Reduserer varme", "Demper innsyn", "Bolig & næring"],
    href: "/solfilm-bygg",
  },
];

const secondary: Secondary[] = [
  {
    title: "Lakkbeskyttelse / PPF",
    description:
      "Usynlig film som tar støtene for lakken — steinsprut, slitasje og småskader. Jobber jevnlig med Mercedes AMG, Porsche og Ferrari.",
    tag: "XPEL-godkjent",
    href: "/xpel",
  },
  {
    title: "Lyktefolie",
    description:
      "Klar eller sotet variant for et mer tilpasset uttrykk — og beskyttelse mot riper og steinsprut.",
    tag: "Klar / Sotet",
  },
  {
    title: "Trykk på klær",
    description:
      "Trykk på arbeidstøy, profilklær og T-skjorter til bedrifter, lag og privatpersoner.",
    tag: "Bedrift & privat",
  },
  // Tittelen må være en TING, ikke en tjeneste. «Bilpleie» blant
  // «Lakkbeskyttelse» og «Lyktefolie» leser som noe han utfører, og det gjør
  // han ikke — han selger serien fra lokalet. Tittelen bærer varen, taggen
  // bærer rollen.
  {
    title: "Bilpleieprodukter",
    description:
      "XPELs Superior Car Care-serie står på hylla i verkstedet — vask, interiør, glass og lakkpleie. Kom innom og test.",
    tag: "Forhandler",
    href: "/bilpleie",
  },
];

const ease = [0.23, 1, 0.32, 1] as const;

function ServiceDoor({ s, i }: { s: Primary; i: number }) {
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
    // Half the tilt the photo cards used — with no image to anchor it, more
    // than this reads as a gimmick.
    ry.set(px * 7);
    rx.set(-py * 5);
  };

  return (
    <motion.a
      ref={ref}
      custom={i}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease, delay: i * 0.12 }}
      href={s.href}
      onPointerMove={handleMove}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={
        enabled
          ? {
              rotateX: srx,
              rotateY: sry,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }
          : undefined
      }
      className="door group relative flex min-h-[300px] flex-col justify-between rounded-[var(--r-card)] border border-line bg-bg-card p-8 md:min-h-[420px] lg:min-h-[480px] lg:p-10"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-text-faint lg:text-sm">
          {s.number}
        </span>
        <span
          aria-hidden
          className="door-arrow font-mono text-sm text-text-faint"
        >
          ↗
        </span>
      </div>

      <div>
        <h3 className="font-display text-4xl font-medium leading-[1.05] tracking-tight lg:text-6xl">
          {s.title}
        </h3>
        {/* Solid accent rule that draws itself on hover — the only thing that
            moves apart from the arrow. */}
        <span
          aria-hidden
          className="door-rule mt-5 block h-px w-full origin-left bg-accent"
        />
        <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
          {s.description}
        </p>
        <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
          {s.points.join(" · ")}
        </p>
      </div>
    </motion.a>
  );
}

export function Services() {
  return (
    <section
      id="tjenester"
      className="relative w-full bg-bg px-6 py-16 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        {/* No support line here. The other two sections that use one carry a
            fact their heading cannot — what kinds of jobs, what you are
            looking at. This one said "Mest solfilm — til bil, bolig og
            næringsbygg", which is the hero headline word for word one screen
            further up, and then "så gjør jeg en del annet ved siden av",
            which is the label on the subsection right below. Two big doors
            and the small cards under "Utenom solfilm" already rank the
            work; a sentence saying so out loud was the layout talking about
            itself. */}
        <SectionHeading number={1} className="mb-12 lg:mb-16">
          Det jeg gjør.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {primary.map((s, i) => (
            <ServiceDoor key={s.number} s={s} i={i} />
          ))}
        </div>

        {/* «Andre tjenester» ble feil da Bilpleieprodukter kom inn i lista:
            fire av fem er tjenester, den siste er en vare han har på hylla.
            «Utenom solfilm» er det ene som er sant for alle fem — de to store
            dørene over ER solfilm, disse er ikke — og det bærer informasjon i
            stedet for å være en samlesekk.

            Den korte 32 px-streken til venstre for labelen står med vilje,
            selv om seksjonsstreken går tvers over med aksent og nummer. En
            underoverskrift SKAL se annerledes ut enn en seksjonsoverskrift;
            det er hierarkiet, ikke et avvik. */}
        <div className="mt-16 lg:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
            className="mb-8 inline-flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.2em] text-text-muted lg:mb-10"
          >
            <span className="h-px w-8 bg-line-strong" />
            <span>Utenom solfilm</span>
          </motion.div>

          {/* Drone gets the one moving image in this section — a wide, short
              band rather than a fifth identical box. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease }}
            className="group relative flex min-h-[200px] items-end overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card lg:min-h-[240px]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/brand/videoes/drone-poster.webp"
              aria-hidden
              tabIndex={-1}
              className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              <source src="/brand/videoes/drone.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-black/50 transition-[background-color] duration-500 group-hover:bg-black/40" />
            <div className="relative z-10 flex w-full flex-col justify-between gap-4 p-7 md:flex-row md:items-end lg:p-9">
              <div>
                <h3 className="font-display text-2xl font-medium leading-tight lg:text-3xl">
                  Dronebefaring
                </h3>
                <p className="mt-3 max-w-md text-base leading-relaxed text-text/85">
                  Befaring av tak, fasade og steder du ikke kommer til. Tryggere
                  og billigere enn lift.
                </p>
              </div>
              <div className="shrink-0 font-mono text-[12px] uppercase tracking-[0.2em] text-text/90">
                Tak &amp; solcelle
              </div>
            </div>
          </motion.div>

          {/* The remaining four were five identical boxes. They are a list —
              so they read as a list now, with the rule drawing in per row. */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
            {secondary.map((s, i) => (
              // Raden er utløseren, ikke streken. En h-px med scaleX(0) har
              // null areal, og et element uten areal gir aldri
              // IntersectionObserver noe å måle terskelen mot — så streken
              // ble aldri animert inn. På mobil sto den på scaleX(0) for
              // alltid; desktop slapp unna fordi raden var i synsfeltet ved
              // montering. Variants lar raden, som har både bredde og høyde,
              // drive streken.
              <motion.div
                key={s.title}
                initial="hidden"
                whileInView="vis"
                viewport={{ once: true, margin: "-60px" }}
                variants={{ hidden: { opacity: 0, y: 14 }, vis: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease, delay: (i % 2) * 0.08 }}
                className="relative py-7 lg:py-8"
              >
                <motion.span
                  aria-hidden
                  variants={{ hidden: { scaleX: 0 }, vis: { scaleX: 1 } }}
                  transition={{
                    duration: 0.8,
                    ease,
                    delay: 0.1 + (i % 2) * 0.08,
                  }}
                  className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
                />
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-xl font-medium leading-tight lg:text-2xl">
                    {s.title}
                  </h3>
                  {s.href ? (
                    <Link
                      href={s.href}
                      // -my-3 sammen med min-h-[44px]: treffområdet vokser til
                      // 44 px, men den grafiske plasseringen står stille, så
                      // grunnlinja mot h3-en ikke flytter seg. Samme grep som
                      // de sosiale lenkene i Contact alt bruker.
                      className="link-underline -my-3 inline-flex shrink-0 items-center font-mono text-[12px] uppercase tracking-[0.18em] text-text-muted hover:text-accent min-h-[44px]"
                      style={{ transition: "color 220ms var(--ease-out)" }}
                    >
                      {s.tag} ↗
                    </Link>
                  ) : (
                    <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.18em] text-text-faint">
                      {s.tag}
                    </span>
                  )}
                </div>
                <p className="mt-3 max-w-md text-base leading-relaxed text-text-muted">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
