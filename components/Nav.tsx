"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { label: "Tjenester", href: "#tjenester" },
  { label: "Jobber", href: "#galleri" },
  { label: "Om", href: "#om" },
  { label: "Kontakt", href: "#kontakt" },
];

const ease = [0.23, 1, 0.32, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // On a phone the call button in the hero and the one up here are the same
  // action a couple of centimetres apart. This one earns its place only once
  // the hero's has scrolled away, so the threshold is measured from that
  // button rather than guessed.
  const [ctaBottom, setCtaBottom] = useState(560);
  const [pastCta, setPastCta] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
    setPastCta(v > ctaBottom);
  });

  useEffect(() => {
    const measure = () => {
      const el = document.querySelector<HTMLElement>(
        'main section:first-of-type a[href^="tel:"]',
      );
      if (el) {
        const r = el.getBoundingClientRect();
        setCtaBottom(r.bottom + window.scrollY - 24);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Body scroll lock + Esc to close
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.15 }}
        className="fixed inset-x-0 top-4 z-50 px-4 lg:top-6 lg:px-8"
      >
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-full border px-4 py-2.5 lg:px-6 lg:py-3 ${
            scrolled || open
              ? "border-line-strong bg-bg/80 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
          style={{
            transition:
              "background-color 300ms var(--ease-out), border-color 300ms var(--ease-out)",
          }}
        >
          <motion.a
            href="#"
            onClick={() => setOpen(false)}
            aria-label="Simons Solfilm — til toppen"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
            className="inline-flex origin-left items-center"
          >
            <Image
              src="/brand/logo-wordmark.svg"
              alt="Simons Solfilm"
              width={1010}
              height={320}
              priority
              className="h-12 w-auto sm:h-14"
            />
          </motion.a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text"
                style={{ transition: "color 220ms var(--ease-out)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+4797474347"
              className={`press items-center gap-2 rounded-full bg-text px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bg hover:bg-accent sm:inline-flex ${
                pastCta ? "inline-flex" : "hidden"
              }`}
              style={{
                transition:
                  "background-color 220ms var(--ease-out), transform 160ms var(--ease-out)",
              }}
            >
              <span className="size-1.5 rounded-full bg-accent" />
              <span className="hidden sm:inline">974 74 347</span>
              <span className="sm:hidden">Ring</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Lukk meny" : "Åpne meny"}
              aria-expanded={open}
              className="press inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-text md:hidden"
              style={{ transition: "border-color 220ms var(--ease-out)" }}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 right-0 h-px bg-current ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                  style={{ transition: "all 280ms var(--ease-out)" }}
                />
                <span
                  className={`absolute left-0 right-0 h-px bg-current ${
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                  style={{ transition: "all 280ms var(--ease-out)" }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ y: -16 }}
              animate={{ y: 0 }}
              exit={{ y: -16 }}
              transition={{ duration: 0.4, ease, delay: 0.05 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-full flex-col justify-between px-6 pb-12 pt-32"
            >
              <ul className="flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      ease,
                      delay: 0.1 + i * 0.05,
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="press flex items-center justify-between border-b border-line py-5 font-display text-3xl font-medium text-text hover:text-accent"
                      style={{ transition: "color 220ms var(--ease-out)" }}
                    >
                      <span>{link.label}</span>
                      <span
                        aria-hidden
                        className="font-mono text-base text-text-faint"
                      >
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.4 }}
                className="flex flex-col gap-3"
              >
                <a
                  href="tel:+4797474347"
                  onClick={() => setOpen(false)}
                  className="press inline-flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-4 text-base font-medium tracking-tight text-bg"
                >
                  <span>Ring meg</span>
                  <span className="font-mono text-sm">974 74 347</span>
                </a>
                <div className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
                  Simons Solfilm · Hegdal industriområde · Larvik
                </div>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
