"use client";

import { useEffect } from "react";
import { meldEvent, startSporing } from "@/lib/sporing";

// Hva et klikk på en kontaktlenke betyr. Eventnavnet er kanalen, så
// dashbordet kan gruppere rett på `name` uten å lese props.
function kanal(href: string): string | null {
  if (href.startsWith("tel:")) return "ring";
  if (href.startsWith("sms:")) return "sms";
  if (href.startsWith("mailto:")) return "epost";
  if (href.includes("google.com/maps")) return "kart";
  return null;
}

// Hvor på siden lenka står: nav, footer, toppen (første seksjon) eller
// nærmeste seksjon med id. Aldri lenketeksten — sporingen lagrer ikke innhold.
function plass(a: Element): string {
  if (a.closest("header, nav")) return "nav";
  if (a.closest("footer")) return "footer";
  const seksjon = a.closest("section");
  if (seksjon && seksjon === document.querySelector("section")) return "topp";
  return seksjon?.id || a.closest("[id]")?.id || "innhold";
}

// Siden er en statisk eksport uten server, så sporingen må starte i
// nettleseren. startSporing beskytter seg selv mot dobbel montering.
export function Sporing() {
  useEffect(() => {
    startSporing({ prosjekt: "simonssolfilm", feil: true });

    // Ett lyttepunkt for hele dokumentet i stedet for en håndterer per knapp,
    // så nye kontaktlenker telles uten at noen må huske det.
    function vedKlikk(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const navn = kanal(a.getAttribute("href") || "");
      if (!navn) return;
      meldEvent(navn, { side: location.pathname, plass: plass(a) });
    }
    document.addEventListener("click", vedKlikk, { capture: true });
    return () => document.removeEventListener("click", vedKlikk, { capture: true });
  }, []);
  return null;
}
