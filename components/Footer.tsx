import { LogoMark } from "./LogoMark";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/simonssolfilm/" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100054592143676",
  },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-bg px-6 pb-10 pt-16 lg:px-10 lg:pb-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="rounded-3xl border border-line bg-bg-card/40 px-6 py-6 lg:px-8 lg:py-7">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <LogoMark className="h-6 w-auto" color="var(--accent)" />
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
                Simons Solfilm · Larvik
              </div>
            </div>

            <div className="flex items-center gap-6">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-text"
                  style={{ transition: "color 220ms var(--ease-out)" }}
                >
                  {s.label}
                </a>
              ))}
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
              © {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
