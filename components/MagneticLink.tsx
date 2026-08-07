"use client";

import {
  HTMLMotionProps,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

type Props = HTMLMotionProps<"a"> & {
  strength?: number; // 0..1, how strongly the button follows the cursor
  radius?: number; // px — active radius around the button
};

const springCfg = { stiffness: 220, damping: 18, mass: 0.5 };

export function MagneticLink({
  children,
  strength = 0.35,
  radius = 140,
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Desktop only — touch and trackpad-without-hover skip the magnetic pull.
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(mq.matches && !rm.matches);
    const onChange = () => setEnabled(mq.matches && !rm.matches);
    mq.addEventListener("change", onChange);
    rm.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      rm.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const handler = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        x.set(0);
        y.set(0);
        return;
      }
      const falloff = 1 - dist / radius;
      x.set(dx * strength * falloff);
      y.set(dy * strength * falloff);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener("pointermove", handler);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", handler);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, radius, strength, x, y]);

  return (
    <motion.a
      ref={ref}
      style={enabled ? { x: sx, y: sy } : undefined}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
