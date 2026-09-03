import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MotionProvider } from "@/components/MotionProvider";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simons Solfilm — Solfilm, lakkbeskyttelse & drone i Larvik",
  description:
    "Simons Solfilm drives av Simon Rønning i Larvik. Solfilm til bil og bygg, lakkbeskyttelse (PPF), lyktefolie og bilpleie fra XPEL. 100 % anbefaling på Facebook.",
  metadataBase: new URL(site.url),
  // Google Search Console, verifisert via HTML-tag fordi DNS ligger hos
  // Uniweb/one.com uten at vi har innlogging (sep 2026). Token er knyttet
  // til Alex' Google-konto; Simon legges til som eier inne i Search Console.
  verification: { google: "vdyUgtobH5hE8gwfV9QtO11FZmrWYyaEvTFLI2gThTw" },
  // No title/description here on purpose: Next falls back to each page's own
  // title and description, so the service pages share correctly too.
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Simons Solfilm",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Porsche 911 med solfilm i Simons verksted i Larvik",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
  },
};

// Everything here is taken from the page itself — nothing invented. Opening
// hours are deliberately absent ("hverdager, etter avtale" has no schema
// equivalent), and so is aggregateRating: Google disallows a business marking
// up its own review scores.
// Én graf, ikke løse blokker: WebSite gir Google sidenavnet (den gamle
// oppføringen het «Simon's Solfilm Larvik»), LocalBusiness er bedriften, og
// Person er Simon — folk søker på navnet hans, og det sto ingen steder på
// den nye siden. foundingDate 2008 er fra Simons eget gamle nettsted
// («Firmaet ble startet i 2008»); bekreft med ham ved anledning.
const businessId = `${site.url}/#business`;
const personId = `${site.url}/#simon`;

const localBusiness = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: "Simons Solfilm",
      alternateName: ["Simon's Solfilm", "Simons Solfilm Larvik"],
      inLanguage: "nb-NO",
      publisher: { "@id": businessId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Simon Rønning",
      jobTitle: "Innehaver og montør",
      worksFor: { "@id": businessId },
      knowsAbout: [
        "Solfilm til bil",
        "Solfilm til bygg",
        "Lakkbeskyttelse (PPF)",
        "Lyktefolie",
        "XPEL",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: "Simons Solfilm",
      alternateName: "Simon's Solfilm",
      description:
        "Solfilm til bil, bolig og næringsbygg i Larvik. Lakkbeskyttelse (PPF), lyktefolie, bilpleieprodukter fra XPEL, dronebefaring og trykk på klær. Drives av Simon Rønning.",
      url: site.url,
      image: `${site.url}/og.jpg`,
      logo: `${site.url}/brand/logo-wordmark.svg`,
      telephone: site.phone.e164,
      email: site.email,
      founder: { "@id": personId },
      employee: { "@id": personId },
      foundingDate: "2008",
      brand: { "@type": "Brand", name: "XPEL" },
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address.street,
        postalCode: site.address.postal,
        addressLocality: site.address.city,
        addressRegion: "Vestfold",
        addressCountry: "NO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.address.lat,
        longitude: site.address.lng,
      },
      hasMap: site.address.maps,
      areaServed: [
        { "@type": "City", name: "Larvik" },
        { "@type": "AdministrativeArea", name: "Vestfold" },
      ],
      sameAs: [
        site.social.instagram,
        site.social.facebook,
        site.social.youtube,
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Tjenester",
        itemListElement: [
          ["Solfilm til bil", "/solfilm-bil"],
          ["Solfilm til bygg", "/solfilm-bygg"],
          ["Lakkbeskyttelse / PPF", "/lakkbeskyttelse"],
          ["Lyktefolie", "/lakkbeskyttelse"],
          ["Bilpleieprodukter fra XPEL", "/bilpleie"],
          ["Dronebefaring", "/#tjenester"],
          ["Trykk på klær", "/#tjenester"],
        ].map(([name, path]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, url: `${site.url}${path}` },
        })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-text">
        <a href="#innhold" className="skip-link">
          Hopp til innhold
        </a>
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      </body>
    </html>
  );
}
