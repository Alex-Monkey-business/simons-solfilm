import Link from "next/link";
import type { ReactNode } from "react";

/**
 * One button, two roles.
 *
 * The shape system is borrowed from Wispr Flow and nothing else is: buttons
 * are 12px rectangles, badges stay full pills, cards stay 2rem. Shape tells
 * you what a thing does before you read it — which only works if buttons and
 * badges stop being the same rounded blob.
 *
 * The 2px border is the other half of it. In that system every interactive
 * element carries a defined edge rather than floating as a bare fill; here the
 * edge is drawn in our own palette (accent-deep on accent, line-strong on
 * transparent), so the geometry travels and the colour does not.
 */
type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const base =
  "press inline-flex items-center justify-center gap-2.5 font-medium tracking-tight " +
  "rounded-[var(--r-btn)] border-2 transition-[background-color,border-color,color] " +
  "duration-[220ms] ease-[var(--ease-out)]";

const variants: Record<Variant, string> = {
  // The one action the whole site is built around.
  primary:
    "bg-accent border-accent-deep text-bg hover:bg-accent-warm hover:border-accent",
  // Same geometry, same border weight — only the fill differs. That kinship is
  // the point: they read as one family, not two decisions.
  // Filled, not transparent — the reference system's outlined button carries a
  // real fill, and on this site the secondary sits over hero photography where
  // a transparent one would ride whatever is behind it.
  secondary:
    "bg-bg-card/90 border-line-strong text-text hover:border-text hover:bg-bg-elev",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-4 text-sm lg:text-base",
  sm: "px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em]",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className = "",
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cn = buttonClass({ variant, size, className });

  // Internal routes go through Next so navigation stays client-side; tel:,
  // mailto: and outbound links are plain anchors.
  const isInternal = href.startsWith("/") && !external;

  if (isInternal) {
    return (
      <Link href={href} className={cn} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={cn}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
