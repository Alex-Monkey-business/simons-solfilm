import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";

export const metadata: Metadata = {
  title: "Fant ikke siden — Simons Solfilm",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="innhold"
      className="flex min-h-[100svh] flex-col items-center justify-center bg-bg px-6 py-24 text-center"
    >
      <LogoMark
        color="var(--color-accent, #FE7818)"
        className="h-10 w-auto sm:h-12"
      />

      <p className="mt-12 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
        <span className="size-1.5 rounded-full bg-accent" />
        <span>404</span>
      </p>

      <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.05] text-text">
        Denne siden{" "}
        <span className="font-display-italic text-text-muted">finnes ikke.</span>
      </h1>

      <p className="mt-6 max-w-md text-balance leading-relaxed text-text-muted">
        Lenken er nok utdatert, eller så har jeg flyttet på noe. Gå til
        forsiden — eller ring meg, så finner vi ut av det.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href="tel:+4797474347"
          className="press group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-medium tracking-tight text-bg hover:bg-accent-warm"
          style={{ transition: "background-color 220ms var(--ease-out)" }}
        >
          <span>Ring meg</span>
          <span aria-hidden>974 74 347</span>
        </a>
        <Link
          href="/"
          className="press inline-flex items-center justify-center gap-3 rounded-full border border-line-strong px-7 py-4 text-sm font-medium tracking-tight text-text hover:border-text"
          style={{
            transition:
              "border-color 220ms var(--ease-out), transform 160ms var(--ease-out)",
          }}
        >
          <span aria-hidden className="text-text-muted">
            ←
          </span>
          <span>Til forsiden</span>
        </Link>
      </div>
    </main>
  );
}
