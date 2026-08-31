"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionRule } from "./SectionRule";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * Replaces the six identical eyebrow pills. Each section still gets an entry
 * beat, but it is a hairline that draws itself rather than a label repeating
 * what the heading already says.
 */
export function SectionHeading({
  children,
  support,
  className = "",
  number,
  total = 6,
}: {
  children: ReactNode;
  support?: ReactNode;
  className?: string;
  number?: number;
  total?: number;
}) {
  return (
    <div className={className}>
      {number ? <SectionRule number={number} total={total} className="mb-7 lg:mb-9" /> : null}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div className="lg:col-span-7">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
          className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal leading-[1.02] text-balance"
        >
          {children}
        </motion.h2>
      </div>
      {support ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="max-w-sm text-balance leading-relaxed text-text-muted lg:col-span-4 lg:col-start-9"
        >
          {support}
        </motion.p>
      ) : null}
      </div>
    </div>
  );
}
