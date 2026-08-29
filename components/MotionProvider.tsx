"use client";

import { MotionConfig } from "framer-motion";

// The CSS block in globals.css only reaches CSS transitions and keyframes.
// Framer Motion drives its own values through rAF and inline styles, so it
// needs telling separately — `reducedMotion="user"` drops transforms while
// keeping opacity, across every motion component in the tree.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
