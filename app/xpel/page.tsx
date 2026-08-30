import type { Metadata } from "next";
import { SubPageHeader } from "@/components/SubPageHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "XPEL — folien jeg bruker | Simons Solfilm",
  description:
    "Jeg monterer XPEL både som solfilm og lakkbeskyttelse, og holder kurs for dem. Kort om hva XPEL er, og om bilpleieproduktene du kan prøve på verkstedet.",
  alternates: { canonical: "/xpel" },
};

const XPEL_URL = "https://www.xpel.com/";

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
              Jeg monterer XPEL både som solfilm og lakkbeskyttelse — og
              holder kurs for dem. Her er det korte om hva det er.
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
                    Både solfilm og lakkbeskyttelse. Lakkbeskyttelsen er
                    gjennomsiktig film som tar steinsprut, slitasje og
                    småskader for lakken. Jeg jobber jevnlig med Mercedes AMG,
                    Porsche og Ferrari.
                  </p>
                </div>
              </div>

                <div className="border-t border-line py-7">
                  <h2 className="font-display text-xl font-medium lg:text-2xl">
                    Bilpleieproduktene står på verkstedet
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    Jeg har fått inn XPEL sine bilpleieprodukter — vask,
                    interiør og lakkpleie. Jeg selger dem ikke på nett, men står
                    du på Hegdal er det bare å komme innom og prøve dem.
                  </p>
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
