"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ease = [0.23, 1, 0.32, 1] as const;

const links = [
  {
    label: "E-post",
    value: "post@simonssolfilm.no",
    href: "mailto:post@simonssolfilm.no",
    external: false,
  },
  {
    label: "Instagram",
    value: "@simonssolfilm",
    href: "https://www.instagram.com/simonssolfilm/",
    external: true,
  },
  {
    label: "Facebook",
    value: "Simons Solfilm",
    href: "https://www.facebook.com/profile.php?id=100054592143676",
    external: true,
  },
];

export function Contact() {
  return (
    <section
      id="kontakt"
      className="relative w-full bg-bg px-6 py-14 lg:px-10 lg:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header row with portrait */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="mb-8 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              <span>Kontakt</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-medium leading-[1]"
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
              className="mt-6 max-w-md text-balance text-lg leading-relaxed text-text-muted"
            >
              Fortell meg hva du trenger hjelp med — bil, bygg eller en av
              tilleggsjobbene. Usikker? Slå på tråden, send en SMS eller bare
              et bilde, så tar vi det derfra.
            </motion.p>
          </div>

          {/* Simon portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="relative lg:col-span-5 lg:-mt-12"
          >
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-line bg-bg-card">
              <Image
                src="/brand/simon-transparent.webp"
                alt="Simon — håndverkeren bak Simons Solfilm"
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="object-cover object-bottom"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-faint">
                  Simon · grunnlegger
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Hegdalveien+65c+3261+Larvik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press link-underline mt-1 inline-block font-display text-xl font-medium text-text hover:text-accent lg:text-2xl"
                  style={{ transition: "color 220ms var(--ease-out)" }}
                >
                  Hegdalveien 65c, Larvik
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Phone card — big primary CTA */}
          <motion.a
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease, delay: 0.3 }}
            href="tel:+4797474347"
            className="press lift group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[2rem] border border-line bg-bg-card p-8 lg:col-span-7 lg:min-h-[300px] lg:p-12"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
              Ring meg
            </div>
            <div className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-none tracking-tight text-text">
              974 74 347
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
              <span>Hverdager · Etter avtale</span>
              <span
                aria-hidden
                className="text-accent"
                style={{ transition: "transform 320ms var(--ease-out)" }}
              >
                →
              </span>
            </div>
          </motion.a>

          {/* Other contact methods */}
          <div className="grid grid-cols-1 gap-3 lg:col-span-5">
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.08 }}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="press lift group flex items-center justify-between gap-4 rounded-2xl border border-line bg-bg-card/40 px-6 py-5"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-faint">
                    {l.label}
                  </div>
                  <div
                    className="mt-1.5 text-base text-text group-hover:text-accent lg:text-lg"
                    style={{ transition: "color 220ms var(--ease-out)" }}
                  >
                    {l.value}
                  </div>
                </div>
                <span className="font-mono text-sm text-text-muted">
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
