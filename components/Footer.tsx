import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { site } from "@/lib/site";

// Labelen over lista het «Tjenester», men XPEL er et merke og Bilpleie er en
// vare — den var alt feil med tre rader. «Sider» er det ene som er sant for
// alle fem, og det lukker spørsmålet om hvor bilpleien skulle høre: den er
// ikke en tjeneste, den er en side.
const pages = [
  { label: "Solfilm til bil", href: "/solfilm-bil" },
  { label: "Solfilm til bygg", href: "/solfilm-bygg" },
  { label: "Lakkbeskyttelse og lyktefolie", href: "/lakkbeskyttelse" },
  { label: "Bilpleie", href: "/bilpleie" },
  { label: "XPEL", href: "/xpel" },
];

// Ingen ikoner: merkelogoer er ikoner, og de er utelatt her med vilje.
// Navnene bærer seg selv i tekst.
const socials = [
  { label: "Instagram", href: site.social.instagram },
  { label: "Facebook", href: site.social.facebook },
  { label: "YouTube", href: site.social.youtube },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-bg px-6 pb-12 pt-20 lg:px-10 lg:pb-14 lg:pt-28">
      <div className="mx-auto max-w-[1280px]">
        {/* No box — a hairline is enough to close the page. The address stays
            because it is identity, not an action, and it is the one place
            carrying the postcode.

            Følg-kolonnen sto her før og ble fjernet fordi den gjentok radene
            rett over. Det holdt bare for FORSIDEN: de fire undersidene har
            ingen kontaktseksjon, bare en «Ring meg»-CTA, så der fantes de
            sosiale lenkene ikke i det hele tatt. Fire av fem sider uten dem
            er et større problem enn ett duplikat på den femte. Kontakt-
            kolonnen kommer ikke tilbake — telefonnummeret står i headeren på
            hver enkelt side. */}
        <div className="h-px w-full bg-line-strong" />

        {/* Rad først på md, ikke sm. Tre kolonner (adresse, Sider, Følg) mot to
            hadde 640 px å dele på, og «Lakkbeskyttelse og lyktefolie» er den
            lengste labelen på hele sida. Stablet under 768 px er riktig for en
            footer uansett. */}
        <div className="flex flex-col gap-10 pt-10 md:flex-row md:justify-between md:gap-12 lg:pt-12">
          <div>
            <LogoMark className="h-7 w-auto" color="var(--accent)" />
            <address className="mt-5 text-sm not-italic leading-relaxed text-text-muted">
              {site.address.street}
              <br />
              {site.address.postal} {site.address.city}
            </address>
          </div>

          <nav aria-label="Sider">
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
              Sider
            </div>
            {/* gap-0 fordi hver rad nå er 44 px høy for treffområdets
                skyld — den innebygde luften erstatter gapet, så listen ser
                like tett ut som før. */}
            <ul className="mt-2 flex flex-col">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="link-underline is-boxed -mx-2 inline-flex min-h-[44px] items-center px-2 text-sm text-text-muted hover:text-text"
                    style={{ transition: "color 220ms var(--ease-out)" }}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Følg">
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
              Følg
            </div>
            <ul className="mt-2 flex flex-col">
              {socials.map((sm) => (
                <li key={sm.href}>
                  <a
                    href={sm.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline is-boxed -mx-2 inline-flex min-h-[44px] items-center px-2 text-sm text-text-muted hover:text-text"
                    style={{ transition: "color 220ms var(--ease-out)" }}
                  >
                    {sm.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <span>Simons Solfilm · Larvik</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
