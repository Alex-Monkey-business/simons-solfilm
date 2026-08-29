import Link from "next/link";
import { LogoMark } from "./LogoMark";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/simonssolfilm/" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100054592143676",
  },
];

const pages = [
  { label: "Solfilm til bil", href: "/solfilm-bil" },
  { label: "Solfilm til bygg", href: "/solfilm-bygg" },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-bg px-6 pb-12 pt-20 lg:px-10 lg:pb-14 lg:pt-28">
      <div className="mx-auto max-w-[1280px]">
        {/* No box — a hairline is enough to close the page. The two service
            pages live here too, so they are reachable from anywhere. */}
        <div className="h-px w-full bg-line-strong" />

        <div className="grid grid-cols-2 gap-10 pt-10 md:grid-cols-4 lg:pt-12">
          <div className="col-span-2 md:col-span-1">
            <LogoMark className="h-7 w-auto" color="var(--accent)" />
            <address className="mt-5 text-sm not-italic leading-relaxed text-text-muted">
              Hegdalveien 65c
              <br />
              3261 Larvik
            </address>
          </div>

          <nav aria-label="Tjenester">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
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

          <nav aria-label="Sosiale medier">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              Følg
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm text-text-muted hover:text-text"
                    style={{ transition: "color 220ms var(--ease-out)" }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              Kontakt
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href="tel:+4797474347"
                  className="link-underline text-sm text-text-muted hover:text-text"
                  style={{ transition: "color 220ms var(--ease-out)" }}
                >
                  974 74 347
                </a>
              </li>
              <li>
                <a
                  href="mailto:post@simonssolfilm.no"
                  className="link-underline text-sm text-text-muted hover:text-text"
                  style={{ transition: "color 220ms var(--ease-out)" }}
                >
                  post@simonssolfilm.no
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <span>Simons Solfilm · Larvik</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
