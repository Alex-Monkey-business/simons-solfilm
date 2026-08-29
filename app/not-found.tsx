import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { LogoMark } from "@/components/LogoMark";
import { site } from "@/lib/site";

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

      <p className="mt-12 inline-flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[0.22em] text-text-muted">
        <span className="size-1.5 rounded-full bg-accent" />
        <span>404</span>
      </p>

      <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-normal leading-[1.05] text-text">
        Denne siden{" "}
        <span className="font-display-italic text-text-muted">finnes ikke.</span>
      </h1>

      <p className="mt-6 max-w-md text-balance leading-relaxed text-text-muted">
        Lenken er nok utdatert, eller så har jeg flyttet på noe. Gå til
        forsiden — eller ring meg, så finner vi ut av det.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href={site.phone.href} variant="primary" className="group">
          <span>Ring meg</span>
          <span aria-hidden>{site.phone.display}</span>
        </Button>
        <Button href="/" variant="secondary">
          <span aria-hidden className="text-text-muted">
            ←
          </span>
          <span>Til forsiden</span>
        </Button>
      </div>
    </main>
  );
}
