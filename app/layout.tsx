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
    "Lokal håndverker i Larvik. Solfilm til bil, bygg og hytte. Lakkbeskyttelse (PPF), lyktefolie og takbefaring med drone. 100% anbefaling på Facebook.",
  metadataBase: new URL(site.url),
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
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Simons Solfilm",
  description:
    "Solfilm til bil, bolig og næringsbygg i Larvik. Lakkbeskyttelse (PPF), lyktefolie, dronebefaring og trykk på klær.",
  url: site.url,
  image: `${site.url}/og.jpg`,
  telephone: site.phone.e164,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postal,
    addressLocality: site.address.city,
    addressCountry: "NO",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Vestfold" },
  sameAs: [
    site.social.instagram,
    site.social.facebook,
    site.social.youtube,
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tjenester",
    itemListElement: [
      "Solfilm til bil",
      "Solfilm til bygg",
      "Lakkbeskyttelse / PPF",
      "Lyktefolie",
      "Dronebefaring",
      "Trykk på klær",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
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
