import type { Metadata } from "next";
import { ServiceDetail } from "@/components/ServiceDetail";
import { serviceDetails } from "@/components/serviceDetails";

export const metadata: Metadata = {
  title: "Solfilm til bygg & bolig i Larvik — Simons Solfilm",
  description:
    "Solfilm til bolig, kontor og næringsbygg i Larvik og hele Vestfold. Mindre varme, mer privatliv og bedre inneklima — uten å bytte vinduer.",
};

export default function SolfilmByggPage() {
  return <ServiceDetail data={serviceDetails["solfilm-bygg"]} />;
}
