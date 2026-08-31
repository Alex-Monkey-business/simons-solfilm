"use client";

import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * Seksjonenes åpningsslag.
 *
 * Før var dette en 64 px aksentstrek, identisk i alle seks seksjonene. Luften
 * mellom seksjonene var alt rikelig — målt 240-272 px mot 24-64 px inne i en
 * seksjon — så problemet var aldri avstand. Problemet var at hver seksjon
 * åpnet helt likt, så ingenting sa hvor du var eller hvor mange deler siden
 * har.
 *
 * Streken går derfor tvers over sida nå: aksenten beholder de første 64 px,
 * resten er samme hårstrek som kontaktradene og seksjonsskillene ellers
 * bruker. Nummeret i høyre ende er det ene overskriften ikke kan si selv —
 * derfor er det ikke en gjeninnføring av eyebrow-merkelappene som ble fjernet
 * for å slutte å gjenta overskriften.
 */
export function SectionRule({
  number,
  total,
  className = "",
}: {
  number: number;
  total: number;
  className?: string;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    // Utløseren sitter på YTTERSTE container med vilje. Aksentsegmentet er
    // scaleX(0) inne i en h-px overflow-hidden-boks, altså null areal — og et
    // element uten areal utløser aldri IntersectionObserver, som aldri
    // starter animasjonen. Vranglås: målt på 390 px sto alle seks
    // aksentsegmentene på scaleX(0) for alltid, mens desktop slapp unna fordi
    // elementene var i synsfeltet ved montering. Containeren her har både
    // bredde og høyde (den rommer nummeret), så den kan ikke kollapse.
    // Samme familie som «amount, not margin»-notatet i Gallery.tsx.
    <motion.div
      initial="hidden"
      whileInView="vis"
      viewport={{ once: true, amount: 0 }}
      className={`relative flex items-center gap-4 ${className}`}
    >
      <div className="relative h-px flex-1 overflow-hidden">
        <span aria-hidden className="absolute inset-0 bg-line-strong" />
        <motion.span
          aria-hidden
          variants={{ hidden: { scaleX: 0 }, vis: { scaleX: 1 } }}
          transition={{ duration: 0.9, ease }}
          className="absolute left-0 top-0 h-px w-16 origin-left bg-accent"
        />
      </div>
      <motion.span
        variants={{ hidden: { opacity: 0 }, vis: { opacity: 1 } }}
        transition={{ duration: 0.6, ease, delay: 0.25 }}
        className="shrink-0 font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint"
      >
        {pad(number)}
        <span className="text-text-faint/50"> / {pad(total)}</span>
      </motion.span>
    </motion.div>
  );
}
