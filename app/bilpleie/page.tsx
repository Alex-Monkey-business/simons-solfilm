import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SubPageHeader } from "@/components/SubPageHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bilpleie fra XPEL i Larvik — Simons Solfilm",
  description:
    "XPELs Superior Car Care-serie står på hylla i verkstedet mitt på Hegdal i Larvik. Vask, interiør, glass, lakkpleie og utstyr. Jeg selger den ikke på nett — kom innom og test.",
  alternates: { canonical: "/bilpleie" },
};

// Simons egne ord fra Instagram, kortet ned til én linje per produkt. Ikke
// omskrevet til noe han ikke har sagt: hver linje er hans setning strammet,
// ikke en ny påstand. Produktnavnene står som de står på flaskene han selger
// — Superior Car Care er XPELs eget navn på serien.
type CareProduct = { name: string; body: string; img?: string; alt?: string };
type CareGroup = { label: string; products: CareProduct[] };

const careGroups: CareGroup[] = [
  {
    label: "Vask",
    products: [
      {
        name: "Wash Solution",
        body: "Shampo som gir god glid, lukter godt og får bilen skinnende ren.",
        img: "wash-solution",
        alt: "Flaske XPEL Wash Solution",
      },
      {
        name: "Foam Soap",
        body: "Høyskummende shampo for skumkanon. Løser opp fastgrodd skitt på lakk, felger og motorrom.",
        img: "foam-soap",
        alt: "Flaske XPEL Foam Soap",
      },
      {
        name: "Waterless Wash",
        body: "Vasker uten slange eller bøtte. Kapsler inn partiklene så du unngår swirls, og etterlater en hydrofobisk hinne.",
        img: "waterless-wash",
        alt: "Flaske XPEL Waterless Wash",
      },
      {
        name: "Iron Remover",
        body: "Løser opp bremsestøv og flyverust som har brent seg fast. pH-nøytral, trygg på både lakk og PPF. Blir lilla når den virker.",
        img: "iron-remover",
        alt: "Sprayflaske XPEL Iron Remover",
      },
    ],
  },
  {
    label: "Interiør og glass",
    products: [
      {
        name: "Interior Cleaner",
        body: "Fjerner smuss og flekker uten å trekke ut de naturlige oljene i materialene. Ingen striper eller skjolder.",
        img: "interior-cleaner",
        alt: "Sprayflaske XPEL Interior Cleaner",
      },
      {
        name: "Glass Cleaner",
        body: "Skinnende rene vinduer, speil og skjermer uten skjolder — også dusjveggen hjemme.",
        img: "glass-cleaner",
        alt: "Sprayflaske XPEL Glass Cleaner",
      },
    ],
  },
  {
    label: "Lakk og film",
    products: [
      {
        name: "Ceramic Boost",
        body: "Mikrotynt keramisk lag som frastøter vann og gir dypere farge. Alene som spray-coating, eller oppå en coating du har.",
        img: "ceramic-boost",
        alt: "Sprayflaske XPEL Ceramic Boost",
      },
      {
        name: "Detail Spray",
        body: "Tar lett støv og fingeravtrykk for en rask shine. Fungerer også som glidemiddel når du clay\u2019er.",
        img: "detail-spray",
        alt: "Flaske XPEL Detail Spray",
      },
      {
        name: "PPF Cleaner",
        body: "Trekker ut tjære, olje og insektsyre som har satt seg i folien, og gjenoppretter den klare looken den hadde som ny.",
        img: "ppf-cleaner",
        alt: "Sprayflaske XPEL PPF Cleaner",
      },
      {
        name: "Water Spot Remover",
        body: "Løser opp vannflekker og kalk etter regn, hardt springvann eller vask.",
        img: "water-spot-remover",
        alt: "Sprayflaske XPEL Water Spot Remover",
      },
    ],
  },
  {
    label: "Utstyr",
    products: [
      {
        name: "Mikrofiberklut",
        body: "Suger opp vannet etter vasken i ett drag. Lofri og ripefri.",
        img: "mikrofiberklut",
        alt: "Gul XPEL mikrofiberklut",
      },
      {
        name: "Vaskehanske",
        body: "Holder på masse såpevann. Fibrene kapsler inn skitten og løfter den vekk fra lakken.",
        img: "vaskehanske",
        alt: "XPEL Premium Wash Mitt i svart og hvitt",
      },
      {
        name: "Vaskebøtte",
        body: "Rist i bunnen skiller skitten fra vannet. Polstret lokk du kan sitte på, og hjul.",
        img: "vaskebotte",
        alt: "XPEL vaskebøtte-system med rist og lokk",
      },
    ],
  },
];

// Produktlista som strukturerte data, så «hvor får jeg XPEL-bilpleie i
// Larvik» kan svares med denne sida. Bare navn og tekst som alt står på sida.
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${site.url}/bilpleie#produkter`,
  name: "XPEL Superior Car Care hos Simons Solfilm",
  itemListElement: careGroups
    .flatMap((g) => g.products)
    .map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.body,
        brand: { "@type": "Brand", name: "XPEL" },
        ...(p.img
          ? { image: `${site.url}/brand/xpel-care/${p.img}.webp` }
          : {}),
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStoreOnly",
          seller: { "@id": `${site.url}/#business` },
        },
      },
    })),
};

export default function BilpleiePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <SubPageHeader />

      <main id="innhold" className="bg-bg">
        {/* SIDENS EGET INNHOLD. Bilpleien er ikke en tjeneste han utfører — den står på hylla i
            lokalet. Derfor: navnene som står på flaskene, og Simons egne ord
            fra Instagram kortet til én linje. Ingen priser og ingen kjøp-knapp;
            handlingen er å komme innom.
            Bildene er XPELs egne packshots, ikke Simons KI-bilder — de var
            fine på Instagram, men flasketypografien renner når den blir stor
            nok til å lese. Kildene ligger i _image-source/bilpleie/: seks
            transparente fra brand.xpel.com, seks fra butikkens BigCommerce-CDN
            der den hvite studiobakgrunnen er slått ut med flomfyll fra
            bildekanten (ikke terskel — terskel punkterer den hvite teksten på
            selve flaska). Alle skalert til samme høyde i kilden.
            Hansken er den ene som MÅ komme transparent fra kilden: den har
            hvite frynser mot hvit bakgrunn, så et utslag ville spist fibrene.
            BigCommerce-varianten har ekte alfa på frynsekanten. */}
        <section className="w-full px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-32">
          <div className="mx-auto max-w-[1280px]">
            <div>
              <span aria-hidden className="mb-7 block h-px w-16 bg-accent lg:mb-9" />
              <h1 className="max-w-3xl font-display text-[clamp(2.75rem,7.5vw,6rem)] font-normal leading-[1] text-text">
                Bilpleie på hylla.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted lg:text-lg">
                Som montør av XPELs solfilm og PPF har jeg fått inn Superior
                Car Care-produktene deres. Jeg selger dem ikke på nett — står
                du på Hegdal er det bare å komme innom og teste dem ut.
              </p>

              <div className="mt-14 flex flex-col gap-12 lg:mt-16">
                {careGroups.map((group) => (
                  <div key={group.label}>
                    {/* h2, ikke div: sida gikk fra h1 rett til tretten h3. */}
                    <h2 className="font-mono text-[12px] font-normal uppercase tracking-[0.2em] text-text-faint">
                      {group.label}
                    </h2>
                    <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
                      {group.products.map((product) => (
                        <div
                          key={product.name}
                          className="flex items-start gap-5 border-t border-line py-6 first:border-t-0 lg:gap-6 lg:[&:nth-child(2)]:border-t-0"
                        >
                          {/* Fast boks med object-contain, ikke fast bredde:
                              flaskene er høye og smale, kluten og bøtta brede.
                              Boksen begrenser begge akser, så hver ting fyller
                              den aksen den er størst i og ingenting dominerer
                              raden. Bildene er transparente PNG-packshots fra
                              XPEL, så de står rett på bakgrunnen uten ramme. */}
                          <div className="flex h-28 w-16 shrink-0 items-center justify-center lg:h-36 lg:w-24">
                            {product.img ? (
                              <Image
                                src={`/brand/xpel-care/${product.img}.webp`}
                                alt={product.alt ?? product.name}
                                width={160}
                                height={160}
                                sizes="(max-width: 1024px) 64px, 96px"
                                className="max-h-full max-w-full object-contain"
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-display text-lg font-medium lg:text-xl">
                              {product.name}
                            </h3>
                            <p className="mt-2 text-base leading-relaxed text-text-muted">
                              {product.body}
                            </p>
                          </div>
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
                  Usikker på hva du trenger?
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">
                  Ring meg, så finner vi ut av det. Er du innom verkstedet kan
                  du prøve dem på egen bil før du kjøper.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button href={site.phone.href} variant="primary">
                  <span>Ring meg</span>
                  <span aria-hidden>→</span>
                </Button>
                <Button href="/xpel" variant="secondary">
                  <span>Om XPEL</span>
                </Button>
              </div>
            </div>

            {/* Sida var en blindvei: eneste utganger var telefon og XPEL.
                Samme radform som «Andre tjenester» på tjenestesidene. Labelen
                er «Tjenester» uten «andre» — bilpleie er ikke en tjeneste, så
                de to under er ikke «de andre», de er tjenestene. */}
            <div className="mt-14 lg:mt-20">
              <div className="mb-2 font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                Tjenester
              </div>
              {[
                { href: "/lakkbeskyttelse", title: "Lakkbeskyttelse og lyktefolie" },
                { href: "/solfilm-bil", title: "Solfilm til bil" },
              ].map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="contact-row group relative flex items-baseline justify-between gap-6 py-7"
                >
                  <span className="absolute inset-x-0 top-0 h-px bg-line-strong" />
                  <span
                    className="font-display text-2xl font-medium text-text group-hover:text-accent lg:text-3xl"
                    style={{ transition: "color 220ms var(--ease-out)" }}
                  >
                    {s.title}
                  </span>
                  <span
                    aria-hidden
                    className="contact-arrow shrink-0 font-mono text-sm text-text-faint"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
