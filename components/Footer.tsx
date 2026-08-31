import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { site } from "@/lib/site";

const pages = [
  { label: "Solfilm til bil", href: "/solfilm-bil" },
  { label: "Solfilm til bygg", href: "/solfilm-bygg" },
  { label: "XPEL", href: "/xpel" },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-bg px-6 pb-12 pt-20 lg:px-10 lg:pb-14 lg:pt-28">
      <div className="mx-auto max-w-[1280px]">
        {/* No box — a hairline is enough to close the page. Wayfinding and
            the legal line, nothing else: this footer sits under a contact
            block on every page it appears on — the full section on the front
            page, a Ring meg CTA on the three subpages — so a Følg and a
            Kontakt column here only repeated the rows directly above them.
            The address stays because it is identity, not an action, and it is
            the one place carrying the postcode. */}
        <div className="h-px w-full bg-line-strong" />

        <div className="flex flex-col gap-10 pt-10 sm:flex-row sm:justify-between lg:pt-12">
          <div>
            <LogoMark className="h-7 w-auto" color="var(--accent)" />
            <address className="mt-5 text-sm not-italic leading-relaxed text-text-muted">
              {site.address.street}
              <br />
              {site.address.postal} {site.address.city}
            </address>
          </div>

          <nav aria-label="Tjenester">
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
              Tjenester
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="link-underline text-sm text-text-muted hover:text-text"
                    style={{ transition: "color 220ms var(--ease-out)" }}
                  >
                    {p.label}
                  </Link>
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
