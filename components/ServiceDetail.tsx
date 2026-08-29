"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonClass } from "./Button";
import { Footer } from "./Footer";
import { LogoMark } from "./LogoMark";
import { serviceDetails } from "./serviceDetails";
import type { ServiceDetail as ServiceDetailData } from "./serviceDetails";
import { site } from "@/lib/site";

const ease = [0.23, 1, 0.32, 1] as const;

export function ServiceDetail({ data }: { data: ServiceDetailData }) {
  // The other service page. Without this the only way off this page was the
  // back link or the phone number.
  const sibling = Object.values(serviceDetails).find(
    (s) => s.slug !== data.slug,
  );

  return (
    <>
      {/* Sub-page top bar — anchor nav doesn't apply here, so keep it simple */}
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

      <main id="innhold" className="bg-bg">
        {/* Hero */}
        <section className="relative w-full overflow-hidden px-6 pt-32 lg:px-10 lg:pt-40">
          <div className="mx-auto max-w-[1280px]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.2em] text-text-muted"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              <span>{data.eyebrow}</span>
            </motion.div>

            <h1 className="max-w-3xl font-display text-[clamp(2.75rem,7.5vw,6rem)] font-normal leading-[1] text-text">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.2 }}
                className="block"
              >
                {data.title}{" "}
                <span className="font-display-italic text-accent">
                  {data.titleAccent}
                </span>
                .
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
              className="mt-8 max-w-xl text-balance text-base leading-relaxed text-text-muted lg:text-lg"
            >
              {data.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.45 }}
              className="relative mt-14 aspect-[16/10] w-full overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card md:aspect-[21/9]"
            >
              <Image
                src={data.heroImage}
                alt={data.heroAlt}
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
                className="object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-14 max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight lg:mb-20">
              Derfor solfilm.
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {data.benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease, delay: (i % 2) * 0.08 }}
                  className="rounded-[var(--r-card)] border border-line bg-bg-card p-7 lg:p-9"
                >
                  <h3 className="font-display text-xl font-medium lg:text-2xl">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    {b.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Film types + specs */}
        <section className="w-full px-6 pb-28 lg:px-10 lg:pb-40">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="mb-10 font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight">
                Filmtyper jeg jobber med.
              </h2>
              <div className="flex flex-col">
                {data.filmTypes.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                    className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:gap-8"
                  >
                    <h3 className="font-display text-lg font-medium sm:w-1/3 sm:shrink-0 lg:text-xl">
                      {f.name}
                    </h3>
                    <p className="text-base leading-relaxed text-text-muted">
                      {f.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-[var(--r-card)] border border-line bg-bg-card p-7 lg:p-8">
                  <div className="mb-6 font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                    Kort fortalt
                  </div>
                  <dl className="flex flex-col">
                    {data.specs.map((sp) => (
                      <div
                        key={sp.label}
                        className="flex items-baseline justify-between gap-4 border-t border-line py-3.5 first:border-t-0 first:pt-0"
                      >
                        <dt className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-faint">
                          {sp.label}
                        </dt>
                        <dd className="text-right text-sm text-text">
                          {sp.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="w-full bg-bg-card/30 px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="mb-14 font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight lg:mb-20">
              Slik gjør jeg det.
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.process.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                  className="rounded-[var(--r-card)] border border-line bg-bg p-6 lg:p-7"
                >
                  <div className="font-mono text-sm text-accent">{p.step}</div>
                  <h3 className="mt-4 font-display text-lg font-medium lg:text-xl">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-base leading-relaxed text-text-muted">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-12">
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight lg:col-span-4">
              Vanlige spørsmål.
            </h2>
            <div className="flex flex-col lg:col-span-7 lg:col-start-6">
              {data.faq.map((item, i) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                  className="border-t border-line py-7 first:border-t-0 first:pt-0"
                >
                  <h3 className="font-display text-lg font-medium lg:text-xl">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    {item.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full px-6 pb-28 lg:px-10 lg:pb-40">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col items-start justify-between gap-8 rounded-[var(--r-card)] border border-line bg-bg-card p-8 md:flex-row md:items-center lg:p-12">
              <div>
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-medium leading-tight">
                  Ring meg, så tar vi en prat.
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

            {sibling ? (
              <Link
                href={`/${sibling.slug}`}
                className="contact-row group relative mt-14 flex items-baseline justify-between gap-6 py-7 lg:mt-20"
              >
                <span className="absolute inset-x-0 top-0 h-px bg-line-strong" />
                <span>
                  <span className="block font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
                    Neste tjeneste
                  </span>
                  <span
                    className="mt-2 block font-display text-2xl font-medium text-text group-hover:text-accent lg:text-3xl"
                    style={{ transition: "color 220ms var(--ease-out)" }}
                  >
                    {sibling.title} {sibling.titleAccent}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="contact-arrow shrink-0 font-mono text-sm text-text-faint"
                >
                  →
                </span>
              </Link>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
