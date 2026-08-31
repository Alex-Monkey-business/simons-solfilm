"use client";

import { motion } from "framer-motion";
import { SectionRule } from "./SectionRule";
import Image from "next/image";
import { site } from "@/lib/site";

const ease = [0.23, 1, 0.32, 1] as const;

const PHONE_DISPLAY = site.phone.display;

const links = [
  // Every row is `what it is / the identifier`. A texting row broke that
  // twice over: a phone number is already textable, and it sits in 80px serif
  // directly above, so the row carried an instruction where a value belongs.
  // The hero keeps an explicit Send SMS button for anyone who wants it there.
  {
    label: "Adresse",
    value: `${site.address.street}, ${site.address.city}`,
    href: site.address.maps,
    external: true,
    // Footnote to this row, not to the list. It used to sit at the bottom
    // behind its own rule, which read as a section about driving that arrived
    // from nowhere. It only ever explained this one link.
    note: "Veien inn er privat, men åpen for alle — kjør inn fra Hegdalveien. Google sender deg av og til rundt kvartalet.",
  },
  {
    label: "E-post",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
];

// The three social rows each had a value that was the label again — a handle
// nobody types and, on Facebook, the company name. Adresse and E-post keep
// theirs because those are worth copying. These three only need a name, so
// they share one row.
const socials = [
  { label: "Instagram", href: site.social.instagram },
  { label: "Facebook", href: site.social.facebook },
  { label: "YouTube", href: site.social.youtube },
];

export function Contact() {
  return (
    <section
      id="kontakt"
      className="relative w-full bg-bg px-6 py-20 lg:px-10 lg:py-40"
    >
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <SectionRule number={6} total={6} className="mb-7 lg:mb-9" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease, delay: 0.08 }}
              className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-normal leading-[1]"
            >
              Ta kontakt, så{" "}
              <span className="font-display-italic text-accent">fikser</span>{" "}
              jeg det.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.15 }}
              className="mt-8 max-w-md text-balance text-lg leading-relaxed text-text-muted"
            >
              Fortell meg hva du trenger hjelp med — bil, bygg eller noe av det
              andre.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            // Ingen negativ toppmarg. Løftet på -48 px var laget da
            // seksjonsstreken lå inne i venstre kolonne og ikke gikk under
            // bildet. Nå går streken tvers over sida, og portrettet dekket
            // nummeret «06 / 06» med 22 x 12 px. Streken er et systemelement
            // som er likt i alle seks seksjonene, så løftet viker.
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card">
              <Image
                src="/brand/simon-transparent.webp"
                alt="Simon — håndverkeren bak Simons Solfilm"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-bottom"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* The heaviest object on the page, and the only box left in this
              section. That is the point — it is the one thing to press.
              justify-between belongs to the tall desktop card only: on a
              phone it tore the three lines apart and parked the meta line
              closer to the SMS row below than to the number it describes.
              self-start stops the grid stretching the card to the height of
              the links column — 743px of card with justify-between left a
              264px void on either side of the number. The height is set
              here rather than taken from the links column: matching that
              column is what produced the 743px card in the first place. */}
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            href={site.phone.href}
            className="press lift group relative flex flex-col justify-start gap-6 overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card p-8 lg:col-span-7 lg:min-h-[380px] lg:justify-between lg:gap-0 lg:self-start lg:p-12"
          >
            <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-muted">
              Ring meg
            </div>
            {/* Animated as one block, deliberately. A per-character stagger
                looked good on desktop but left digits stuck at opacity 0 on a
                phone — and a phone number missing a digit is worse than no
                animation at all. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="font-display text-[clamp(2.25rem,6vw,5rem)] font-normal leading-none tracking-tight text-text"
            >
              {PHONE_DISPLAY}
            </motion.div>
            {/* No hours line. "Hverdager · Etter avtale" said two things that
                cancel each other out, and neither was a fact anyone here had
                checked. If Simon has real opening hours they belong here — as
                the hours they actually are. */}
            <div className="flex items-center justify-end font-mono text-[12px] uppercase tracking-[0.22em] text-text-muted">
              <span
                aria-hidden
                className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-out)" }}
              >
                →
              </span>
            </div>
          </motion.a>

          {/* Google routes visitors the long way round because the access
              road is not in its map data. The coordinates put the pin in the
              right place; the note under Adresse does the rest, because no
              link can. */}
          <div className="lg:col-span-5">
            {links.map((l, i) => (
              <div key={l.label}>
                <motion.a
                  initial="hidden"
                  whileInView="vis"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={{ hidden: { opacity: 0, y: 12 }, vis: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease, delay: 0.35 + i * 0.09 }}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  className="contact-row group relative flex items-baseline justify-between gap-4 py-6"
                >
                  <motion.span
                    aria-hidden
                    variants={{ hidden: { scaleX: 0 }, vis: { scaleX: 1 } }}
                    transition={{ duration: 0.8, ease, delay: 0.4 + i * 0.09 }}
                    className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
                  />
                  <div>
                    <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-faint">
                      {l.label}
                    </div>
                    <div
                      className="mt-1.5 text-base text-text group-hover:text-accent lg:text-lg"
                      style={{ transition: "color 220ms var(--ease-out)" }}
                    >
                      {l.value}
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className="contact-arrow shrink-0 font-mono text-sm text-text-faint"
                  >
                    {l.external ? "↗" : "→"}
                  </span>
                </motion.a>
                {l.note ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.09 }}
                    className="-mt-3 pb-6 text-sm leading-relaxed text-text-faint"
                  >
                    {l.note}
                  </motion.p>
                ) : null}
              </div>
            ))}

            <motion.div
              initial="hidden"
              whileInView="vis"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: { opacity: 0, y: 12 }, vis: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease, delay: 0.53 }}
              className="relative py-4"
            >
              <motion.span
                aria-hidden
                variants={{ hidden: { scaleX: 0 }, vis: { scaleX: 1 } }}
                transition={{ duration: 0.8, ease, delay: 0.58 }}
                className="absolute inset-x-0 top-0 h-px origin-left bg-line-strong"
              />
              <div className="pt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-text-faint">
                Følg
              </div>
              {/* -mx-2 pulls the padded hit areas back onto the row's left
                  edge, so each link clears 44px without the text drifting
                  out of line with the rows above. */}
              <div className="-mx-2 mt-0.5 flex flex-wrap">
                {socials.map((sm) => (
                  <a
                    key={sm.label}
                    href={sm.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex min-h-[44px] items-center px-2 text-base text-text hover:text-accent lg:text-lg"
                    style={{ transition: "color 220ms var(--ease-out)" }}
                  >
                    {sm.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
