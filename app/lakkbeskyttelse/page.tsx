import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";
import { serviceDetails } from "@/components/serviceDetails";

export const metadata: Metadata = {
  title: "Lakkbeskyttelse og lyktefolie i Larvik — Simons Solfilm",
  description:
    "Lakkbeskyttelse (PPF) og lyktefolie i Larvik. Gjennomsiktig film som tar steinsprut og slitasje for lakken. XPEL-montør som holder kurs for merket. Send meg et bilde, så får du pris.",
  alternates: { canonical: "/lakkbeskyttelse" },
};

export default function LakkbeskyttelsePage() {
  return <ServiceDetail data={serviceDetails["lakkbeskyttelse"]} />;
}
