import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";
import { serviceDetails } from "@/components/serviceDetails";

export const metadata: Metadata = {
  title: "Solfilm til bil i Larvik — Simons Solfilm",
  description:
    "Solfilm til bil i Larvik. Mindre varme, mer privatliv og et penere uttrykk. Metallisert film, presis montering. Send meg et bilde, så fikser jeg et tilbud.",
  alternates: { canonical: "/solfilm-bil" },
};

export default function SolfilmBilPage() {
  return <ServiceDetail data={serviceDetails["solfilm-bil"]} />;
}
