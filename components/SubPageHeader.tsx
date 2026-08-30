import Link from "next/link";
import { LogoMark } from "./LogoMark";
import { buttonClass } from "./Button";
import { site } from "@/lib/site";

/**
 * The top bar every sub-page shares. Anchor navigation does not apply off the
 * front page, so this is deliberately just a way back and a way to call.
 */
export function SubPageHeader() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 lg:top-6 lg:px-8">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between rounded-full border border-line-strong bg-bg/80 px-4 py-2.5 backdrop-blur-xl lg:px-6 lg:py-3">
        <Link
          href="/"
          aria-label="Simons Solfilm — til forsiden"
          className="press inline-flex items-center gap-3"
        >
          <LogoMark
            color="var(--color-accent, #FE7818)"
            className="h-6 w-auto sm:h-7"
          />
          <span className="hidden font-mono text-[12px] uppercase tracking-[0.2em] text-text-muted sm:inline">
            ← Tilbake
          </span>
        </Link>

        <a
          href={site.phone.href}
          className={buttonClass({ variant: "primary", size: "sm" })}
        >
          <span className="hidden sm:inline">{site.phone.display}</span>
          <span className="sm:hidden">Ring</span>
        </a>
      </div>
    </header>
  );
}
