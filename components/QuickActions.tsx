"use client";

import { motion } from "framer-motion";
import { buttonClass } from "./Button";
import { site } from "@/lib/site";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * SMS, e-post and directions were an underlined word inside a sentence and a
 * link buried further down the page. Those read as text you have to notice,
 * not as things you can do. Same geometry as every other button on the site,
 * one step quieter than the call button so it does not compete with it.
 */
const actions = [
  {
    label: "Send SMS",
    href: `sms:${site.phone.e164}`,
    icon: (
      <path d="M3 5.5h12v7.5H8.5L5 16v-3H3z" fill="none" strokeWidth="1.4" />
    ),
  },
  {
    label: "E-post",
    href: `mailto:${site.email}`,
    icon: (
      <>
        <rect x="2.5" y="4.5" width="13" height="9.5" rx="1" fill="none" strokeWidth="1.4" />
        <path d="M2.5 6l6.5 4.5L15.5 6" fill="none" strokeWidth="1.4" />
      </>
    ),
  },
  {
    label: "Veibeskrivelse",
    href: site.address.maps,
    external: true,
    icon: (
      <>
        <path d="M9 2.5c2.5 0 4.5 2 4.5 4.5 0 3.2-4.5 8-4.5 8S4.5 10.2 4.5 7c0-2.5 2-4.5 4.5-4.5z" fill="none" strokeWidth="1.4" />
        <circle cx="9" cy="7" r="1.6" fill="none" strokeWidth="1.4" />
      </>
    ),
  },
];

export function QuickActions({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {actions.map((a, i) => (
        <motion.a
          key={a.label}
          href={a.href}
          {...(a.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 1.05 + i * 0.07 }}
          className={buttonClass({
            variant: "secondary",
            size: "sm",
            className: "min-h-[44px] gap-2",
          })}
        >
          <svg
            viewBox="0 0 18 18"
            aria-hidden
            className="size-[15px] shrink-0 stroke-current"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {a.icon}
          </svg>
          <span>{a.label}</span>
        </motion.a>
      ))}
    </div>
  );
}
