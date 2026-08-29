"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/lib/site";

const ease = [0.23, 1, 0.32, 1] as const;

const PHONE_DISPLAY = site.phone.display;

const links = [
  {
    label: "E-post",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    label: "Instagram",
    value: "@simonssolfilm",
    href: site.social.instagram,
    external: true,
  },
  {
    label: "Facebook",
    value: "Simons Solfilm",
    href: site.social.facebook,
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="kontakt"
      className="relative w-full bg-bg px-6 py-20 lg:px-10 lg:py-40"
    >
      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
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
              andre. Usikker? Slå på tråden, send en SMS eller bare et bilde, så
              tar vi det derfra.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative lg:col-span-5 lg:-mt-12"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card">
              <Image
                src="/brand/simon-transparent.webp"
                alt="Simon — håndverkeren bak Simons Solfilm"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-bottom"
              />
              {/* Solid knock-back behind the caption — the address sat on his
                  shirt with nothing behind it and barely read. */}
              <div className="absolute inset-x-0 bottom-0 bg-bg/70 px-5 py-4 backdrop-blur-sm lg:px-7 lg:py-5">
                <div className="font-mono text-[12px] uppercase tracking-[0.22em] text-text-faint">
                  Simon
                </div>
                <a
                  href={site.address.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press link-underline mt-1 inline-block font-display text-xl font-medium text-text hover:text-accent lg:text-2xl"
                  style={{ transition: "color 220ms var(--ease-out)" }}
                >
                  {site.address.street}, {site.address.city}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* The heaviest object on the page, and the only box left in this
              section. That is the point — it is the one thing to press. */}
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.25 }}
            href={site.phone.href}
            className="press lift group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card p-8 lg:col-span-7 lg:min-h-[300px] lg:p-12"
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
            <div className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.22em] text-text-muted">
              <span>Hverdager · Etter avtale</span>
              <span
                aria-hidden
                className="text-accent transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-out)" }}
              >
                →
              </span>
            </div>
          </motion.a>

          {/* Three hairline rows, no boxes. */}
          <div className="lg:col-span-5">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: 0.35 + i * 0.09 }}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="contact-row group relative flex items-baseline justify-between gap-4 py-6"
              >
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
