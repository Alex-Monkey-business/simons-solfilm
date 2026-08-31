import type { Metadata } from "next";
import { SubPageHeader } from "@/components/SubPageHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "XPEL — folien jeg bruker | Simons Solfilm",
  description:
    "Jeg monterer XPEL både som solfilm og lakkbeskyttelse, og holder kurs for dem. Kort om hva XPEL er, og om Superior Car Care-produktene du kan prøve på verkstedet i Larvik.",
  alternates: { canonical: "/xpel" },
};

const XPEL_URL = "https://www.xpel.com/";

// Simons egne ord fra Instagram, kortet ned til én linje per produkt. Ikke
// omskrevet til noe han ikke har sagt: hver linje er hans setning strammet,
// ikke en ny påstand. Produktnavnene står som de står på flaskene han selger
// — Superior Car Care er XPELs eget navn på serien.
type CareProduct = { name: string; body: string };
type CareGroup = { label: string; products: CareProduct[] };

const careGroups: CareGroup[] = [
  {
    label: "Vask",
    products: [
      {
        name: "Wash Solution",
        body: "Shampo som gir god glid, lukter godt og får bilen skinnende ren.",
      },
      {
        name: "Foam Soap",
        body: "Høyskummende shampo for skumkanon. Løser opp fastgrodd skitt på lakk, felger og motorrom.",
      },
      {
        name: "Waterless Wash",
        body: "Vasker uten slange eller bøtte. Kapsler inn partiklene så du unngår swirls, og etterlater en hydrofobisk hinne.",
      },
      {
        name: "Iron Remover",
        body: "Løser opp bremsestøv og flyverust som har brent seg fast. pH-nøytral, trygg på både lakk og PPF. Blir lilla når den virker.",
      },
    ],
  },
  {
    label: "Interiør og glass",
    products: [
      {
        name: "Interior Cleaner",
        body: "Fjerner smuss og flekker uten å trekke ut de naturlige oljene i materialene. Ingen striper eller skjolder.",
      },
      {
        name: "Glass Cleaner",
        body: "Skinnende rene vinduer, speil og skjermer uten skjolder — også dusjveggen hjemme.",
      },
    ],
  },
  {
    label: "Lakk og film",
    products: [
      {
        name: "Ceramic Boost",
        body: "Mikrotynt keramisk lag som frastøter vann og gir dypere farge. Alene som spray-coating, eller oppå en coating du har.",
      },
      {
        name: "Detail Spray",
        body: "Tar lett støv og fingeravtrykk for en rask shine. Fungerer også som glidemiddel når du clay\u2019er.",
      },
      {
        name: "PPF Cleaner",
        body: "Trekker ut tjære, olje og insektsyre som har satt seg i folien, og gjenoppretter den klare looken den hadde som ny.",
      },
      {
        name: "Water Spot Remover",
        body: "Løser opp vannflekker og kalk etter regn, hardt springvann eller vask.",
      },
    ],
  },
  {
    label: "Utstyr",
    products: [
      {
        name: "Mikrofiberklut",
        body: "Suger opp vannet etter vasken i ett drag. Lofri og ripefri.",
      },
      {
        name: "Vaskehanske",
        body: "Holder på masse såpevann. Fibrene kapsler inn skitten og løfter den vekk fra lakken.",
      },
      {
        name: "Vaskebøtte",
        body: "Rist i bunnen skiller skitten fra vannet. Polstret lokk du kan sitte på, og hjul.",
      },
    ],
  },
];

export default function XpelPage() {
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
              Folien jeg bruker.
            </h1>
            <p className="mt-8 max-w-xl text-balance text-base leading-relaxed text-text-muted lg:text-lg">
              Jeg monterer XPEL både som solfilm og lakkbeskyttelse. Her er det
              korte om hva det er.
            </p>
          </div>
        </section>

        <section className="w-full px-6 py-20 lg:px-10 lg:py-32">
          {/* No 12-column grid here: there is no second column of content, and
              an empty five-column gutter reads as a layout that lost its other
              half rather than as air. A measure is the right container. */}
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-2xl">
              <div className="flex flex-col">
                <div className="border-t border-line py-7 first:border-t-0 first:pt-0">
                  <h2 className="font-display text-xl font-medium lg:text-2xl">
                    Hva XPEL er
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    En amerikansk produsent av beskyttelsesfilm. De lager
                    lakkbeskyttelse, vindusfilm og keramiske belegg, og selger
                    gjennom montører som har vært gjennom opplæringen deres.
                  </p>
                </div>

                <div className="border-t border-line py-7">
                  <h2 className="font-display text-xl font-medium lg:text-2xl">
                    Hvorfor monteringen betyr like mye
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    En film er ikke bedre enn den som legger den. Kanter som
                    slipper, bobler under folien eller skjæremerker i lakken
                    ødelegger resultatet uansett hvor god folien er. Derfor gjør
                    jeg hele jobben selv, fra start til slutt — og jeg holder
                    kurs for XPEL, så det er faget jeg lærer bort til andre
                    montører.
                  </p>
                </div>

                <div className="border-t border-line py-7">
                  <h2 className="font-display text-xl font-medium lg:text-2xl">
                    Hva jeg bruker den til
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    Solfilm på rutene, lakkbeskyttelse på lakken.
                    Lakkbeskyttelsen er gjennomsiktig film som tar steinsprut,
                    slitasje og småskader for lakken. Jeg jobber jevnlig med
                    Mercedes AMG, Porsche og Ferrari.
                  </p>
                </div>
              </div>

              <a
                href={XPEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-10 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-text-muted hover:text-text"
                style={{ transition: "color 220ms var(--ease-out)" }}
              >
                <span>xpel.com</span>
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* Bilpleien er ikke en tjeneste han utfører — den står på hylla i
            lokalet. Derfor: navnene som står på flaskene, og Simons egne ord
            fra Instagram kortet til én linje. Ingen priser og ingen kjøp-knapp;
            handlingen er å komme innom.
            Ingen bilder her ennå med vilje. Simons oppstillingsbilde er
            KI-generert og flasketypografien renner når den blir stor nok til å
            lese. XPELs ekte packshots ligger klare i
            _image-source/bilpleie/xpel-packshots/ (transparent PNG fra
            brand.xpel.com) — seks av tretten. Resten hentes fra
            forhandlerportalen, så settes de inn som én rad. */}
        <section
          id="bilpleie"
          className="w-full scroll-mt-28 px-6 pb-20 lg:px-10 lg:pb-32"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="max-w-2xl">
              <span aria-hidden className="mb-7 block h-px w-16 bg-accent lg:mb-9" />
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.05]">
                Bilpleie på hylla.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-muted lg:text-lg">
                Som montør av XPELs solfilm og PPF har jeg fått inn Superior
                Car Care-produktene deres. Jeg selger dem ikke på nett — står
                du på Hegdal er det bare å komme innom og teste dem ut.
              </p>

              <div className="mt-14 flex flex-col gap-12 lg:mt-16">
                {careGroups.map((group) => (
                  <div key={group.label}>
                    <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                      {group.label}
                    </div>
                    <div className="mt-2 flex flex-col">
                      {group.products.map((product) => (
                        <div
                          key={product.name}
                          className="border-t border-line py-6 first:border-t-0 last:pb-0"
                        >
                          <h3 className="font-display text-lg font-medium lg:text-xl">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-base leading-relaxed text-text-muted">
                            {product.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-6 pb-28 lg:px-10 lg:pb-40">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col items-start justify-between gap-8 rounded-[var(--r-card)] border border-line bg-bg-card p-8 md:flex-row md:items-center lg:p-12">
              <div>
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight">
                  Lurer du på om det passer bilen din?
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                  Send meg et bilde, så får du pris raskt.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button href={site.phone.href} variant="primary">
                  <span>Ring meg</span>
                  <span aria-hidden>→</span>
                </Button>
                <Button href="/#kontakt" variant="secondary">
                  <span>Kontakt</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
