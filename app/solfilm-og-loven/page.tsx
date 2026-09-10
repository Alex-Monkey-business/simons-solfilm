import type { Metadata } from "next";
import Link from "next/link";
import { SubPageHeader } from "@/components/SubPageHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Er solfilm lovlig i Norge? — Simons Solfilm",
  description:
    "Forskriften tillater ikke påklebet solfilm på frontruta eller sidevinduene foran. Bakover gjelder ikke det forbudet. Her er hva paragrafen faktisk sier, ordrett, med lenke til kilden.",
  alternates: { canonical: "/solfilm-og-loven" },
};

const LOVDATA_31_3 = "https://lovdata.no/forskrift/1994-10-04-918/%C2%A731-3";
const LOVDATA_31_2 =
  "https://lovdata.no/dokument/SF/forskrift/1994-10-04-918/%C2%A731-2";

// Spørsmålene under er de samme som står som synlig tekst på sida — ingenting
// i schemaet som ikke leseren også ser.
const sporsmal = [
  {
    q: "Er solfilm lovlig i Norge?",
    a: "På bakruta og de bakre sidevinduene: ja. På frontruta og sidevinduene foran: nei. Kjøretøyforskriften tillater ikke påklebet eller påsprøytet film på noen del av rutene føreren skal ha sikt gjennom.",
  },
  {
    q: "Hvorfor kan jeg ikke få film foran?",
    a: "Fordi forskriften skiller mellom farget glass og påklebet film. Svakt farget glass er godtatt som solfilter innenfor en standard, men film som limes eller sprayes på er ikke tillatt på rutene føreren ser gjennom — uansett hvor lys den er.",
  },
  {
    q: "Bilen min kom med mørke ruter fra fabrikken. Er det ulovlig?",
    a: "Nei. Det er farget glass, ikke påklebet film, og vurderes etter kravene til glasset da bilen ble godkjent. Forbudet mot film gjelder det som legges på i ettertid.",
  },
  {
    q: "Hvor mørk kan filmen bak være?",
    a: "Forbudet i paragrafen gjelder rutene føreren skal ha sikt gjennom, altså foran. Bakover er ikke det samme forbudet. Men velger du helt tett film bak, mister du sikt i innerspeilet — det er en sikkerhetsvurdering vi tar per bil, ikke en paragraf.",
  },
  {
    q: "Kan du sjekke bilen min før vi bestemmer noe?",
    a: "Ja. Send meg et bilde av bilen, så sier jeg hva som er mulig, og du får svaret før du bestemmer deg.",
  },
];

export default function SolfilmOgLovenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${site.url}/solfilm-og-loven#faq`,
        mainEntity: sporsmal.map((s) => ({
          "@type": "Question",
          name: s.q,
          acceptedAnswer: { "@type": "Answer", text: s.a },
        })),
      },
    ],
  };

  return (
    <>
      <SubPageHeader />

      <main id="innhold" className="bg-bg">
        <section className="w-full px-6 pt-32 lg:px-10 lg:pt-40">
          <div className="mx-auto max-w-[1280px]">
            <span
              aria-hidden
              className="mb-7 block h-px w-16 bg-accent lg:mb-9"
            />
            <h1 className="max-w-3xl font-display text-[clamp(2.75rem,7.5vw,6rem)] font-normal leading-[1] text-text">
              Er solfilm lovlig?
            </h1>
            <p className="mt-8 max-w-xl text-balance text-base leading-relaxed text-text-muted lg:text-lg">
              Kort svar: bakover ja, foran nei. Forskriften tillater ikke
              påklebet film på rutene føreren skal ha sikt gjennom. Under står
              paragrafen ordrett, så du kan lese den selv i stedet for å tro på
              meg.
            </p>
          </div>
        </section>

        {/* Svaret først, paragrafen etterpå. Den som lurer på om det er lov
            skal ikke måtte lese seg gjennom en forskrift for å finne ut av
            det — og den som vil kontrollere svaret skal finne kilden rett
            under det. */}
        <section className="w-full px-6 pt-16 lg:px-10 lg:pt-24">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-2xl">
              <div className="flex flex-col">
                <div className="border-t border-line py-7 first:border-t-0 first:pt-0">
                  <h2 className="font-display text-xl font-medium lg:text-2xl">
                    Frontrute og sidevinduer foran
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    Ikke tillatt. Forskriften er tydelig: film som limes eller
                    sprayes på er ikke tillatt på noen del av rutene føreren
                    skal ha sikt gjennom. Det gjelder uansett hvor lys filmen
                    er, så det finnes ingen lovlig variant å be om her.
                  </p>
                </div>

                <div className="border-t border-line py-7">
                  <h2 className="font-display text-xl font-medium lg:text-2xl">
                    Bakrute og bakre sidevinduer
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    Her gjelder ikke det forbudet, og det er derfor de fleste
                    solfilmjobber på bil gjøres bakover. Det er også der
                    effekten sitter: mindre varme i baksetet, mindre innsyn, og
                    interiør som ikke bleker.
                  </p>
                </div>

                <div className="border-t border-line py-7">
                  <h2 className="font-display text-xl font-medium lg:text-2xl">
                    Farget glass er ikke det samme som film
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    Forskriften skiller mellom de to. Svakt farget glass godtas
                    som solfilter innenfor en oppgitt standard — det er glasset
                    bilen ble godkjent med. Forbudet gjelder film som legges på
                    i ettertid. Derfor kan en bil ha mørkere ruter foran fra
                    fabrikken enn det som er tillatt å montere i ettertid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-2xl">
              <h2 className="font-display text-xl font-medium lg:text-2xl">
                Paragrafen, ordrett
              </h2>
              <blockquote className="mt-5 border-l-2 border-accent pl-5 text-base leading-relaxed text-text">
                «Som solfilter godtas svakt farget glass som ikke gir større
                reduksjon av lysgjennomslipp enn angitt i den amerikanske
                standarden ASA Z-26.1 – 1966, July 15 1966. Andre former for
                solfilter som f.eks. påsprøytet eller påklebet film tillates
                ikke på noen del av vinduene som fører skal ha sikt gjennom
                (frontvindu og sidevinduer foran).»
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                Kjøretøyforskriften{" "}
                <Link
                  href={LOVDATA_31_3}
                  className="-my-3 -mx-1 inline-flex min-h-[44px] items-center px-1 underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  § 31-3
                </Link>
                . For biler godkjent etter EU-reglene gjelder{" "}
                <Link
                  href={LOVDATA_31_2}
                  className="-my-3 -mx-1 inline-flex min-h-[44px] items-center px-1 underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  § 31-2
                </Link>
                , som viser til direktiv 92/22/EØF. Forbudet mot påklebet film
                foran er det samme.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-text-muted">
                Dette er et sammendrag av forskriften slik den står, ikke
                juridisk rådgivning. Det er Statens vegvesen som vurderer
                kjøretøyet ved kontroll. Er du i tvil, les paragrafen i lenka
                over, eller ta kontakt hvis du vil snakke gjennom bilen din.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full px-6 pb-20 lg:px-10 lg:pb-28">
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-medium lg:text-3xl">
                Spørsmål jeg får
              </h2>
              <div className="mt-6 flex flex-col">
                {sporsmal.map((s) => (
                  <div key={s.q} className="border-t border-line py-7">
                    <h3 className="font-display text-lg font-medium lg:text-xl">
                      {s.q}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-muted">
                      {s.a}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Button href={site.phone.href}>Ring {site.phone.display}</Button>
                <Link
                  href="/solfilm-bil"
                  className="inline-flex min-h-[44px] items-center px-1 text-base underline underline-offset-4"
                >
                  Solfilm til bil
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
