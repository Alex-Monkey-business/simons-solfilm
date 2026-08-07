// Accent stroke that draws itself around a rounded card on group-hover.
// pathLength={1} normalises the perimeter so the dash animation works at any
// size. Place inside a `group relative` element.
export function AnimatedBorder({ radius = 16 }: { radius?: number }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
      fill="none"
    >
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx={radius}
        stroke="var(--accent)"
        strokeWidth="1.5"
        pathLength={1}
        className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[900ms] ease-out group-hover:[stroke-dashoffset:0]"
      />
    </svg>
  );
}
