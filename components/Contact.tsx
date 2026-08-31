"use client";

import { motion } from "framer-motion";
import { SectionRule } from "./SectionRule";
import { site } from "@/lib/site";

const ease = [0.23, 1, 0.32, 1] as const;

const PHONE_DISPLAY = site.phone.display;

// Ingen strek over radene. Hver rad har en mono-label i versaler og 102 px
// luft — labelen markerer alt radstarten, så streken sa det samme to ganger.
// En strek fortjener plassen når den markerer en grense øyet ikke kan slutte
// seg til selv. Fire stablede rader er ikke det.
const links = [
  // Every row is `what it is / the identifier`. Telefon er nå en rad som de
  // andre, ikke et 730x380-kort: tallet i kortet var 80 px høyt, så 79 % av
  // kortet var tomt — og nummeret står alt tre steder på sida (nav-knappen,
  // hero-CTA-en og her). Regelen over er dessuten grunnen: «Telefon /
  // 974 74 347» ER what-it-is / the-identifier. Kortet var unntaket.
  {
    label: "Telefon",
    value: PHONE_DISPLAY,
    href: site.phone.href,
    external: false,
  },
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
      // py-28, ikke py-40. Luften var dimensjonert for telefonkortet og
      // portrettet; uten dem hadde seksjonen 320 px luft rundt 845 px
      // innhold (0,38 mot sidens norm 0,15-0,21).
      // Asymmetrisk med vilje: footeren legger selv til 112 px topppadding,
      // så en like stor bunnpadding her ga 224 px mellom siste rad og
      // footerlogoen. Toppen beholder sin luft mot seksjonsstreken.
      className="relative w-full bg-bg px-6 pb-8 pt-16 lg:px-10 lg:pb-12 lg:pt-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <SectionRule number={6} total={6} className="mb-7 lg:mb-9" />
        {/* Overskrift og liste side om side. Da lista lå UNDER overskriften
            sto begge i kolonne 1-7 og kolonne 8-12 var tom — 45 % av bredden
            ubrukt, som leste som mer luft enn noe vertikalt gap. */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">

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



          {/* Google routes visitors the long way round because the access
              road is not in its map data. The coordinates put the pin in the
              right place; the note under Adresse does the rest, because no
              link can. */}
          <div className="lg:col-span-5 lg:col-start-8">
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
                    className="link-underline is-boxed inline-flex min-h-[44px] items-center px-2 text-base text-text hover:text-accent lg:text-lg"
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
