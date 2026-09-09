"use client";

import { useEffect } from "react";
import { startSporing } from "@/lib/sporing";

// Siden er en statisk eksport uten server, så sporingen må starte i
// nettleseren. startSporing beskytter seg selv mot dobbel montering.
export function Sporing() {
  useEffect(() => {
    startSporing({ prosjekt: "simonssolfilm", feil: true });
  }, []);
  return null;
}
