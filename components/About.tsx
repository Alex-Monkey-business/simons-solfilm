"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionRule } from "./SectionRule";
import { VideoTile } from "./VideoTile";
import { boligVideo } from "./serviceDetails";

const ease = [0.23, 1, 0.32, 1] as const;

export function About() {
  return (
    <section
      id="om"
      // py-24, ikke py-40. Seksjonen hadde 320 px luft rundt 435 px innhold —
      // forholdet 0,74 mot sidens norm på 0,15-0,21, altså fire ganger. Den
      // leste som en tom flate mellom to fulle. 192 px total er samme
      // absolutte luft som Før/etter og Anmeldelser, så rytmen holder.
      className="relative w-full bg-bg px-6 py-16 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px]">
        <SectionRule number={4} total={6} className="mb-7 lg:mb-9" />
      </div>
      <div className="mx-auto mb-14 max-w-[1280px] lg:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
          className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal leading-[1.02]"
          >
          Om meg og{" "}
          <span className="font-display-italic text-text-muted">
            verkstedet.
          </span>
        </motion.h2>
      </div>

      {/* Mobil: portrett, tekst, video, tall — i den rekkefølgen. Videoen
          kommer rett etter avsnittet som sier at Simon kommer hjem til folk,
          og viser nettopp det. Fra lg ligger video og portrett sammen i
          venstre kolonne, og teksten til høyre. `contents` løser opp de to
          kolonnene på mobil, så `order` kan flette innholdet; fra lg er de
          vanlige kolonner igjen.

          Mellom lg og xl (1024–1279 px, typisk iPad liggende) får venstre
          kolonne seks spor og videoen 260 px. Med fem spor og 300 px ble det
          bare 41 px igjen til portrettet på 1024. Fra xl er det plass til
          oppsettet med luft mellom kolonnene. */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-y-12 lg:grid-cols-12 lg:items-start lg:gap-12">
        <div className="contents lg:col-span-6 lg:mt-12 lg:flex lg:items-end lg:gap-5 xl:col-span-5">
          {/* Det første ekte opptaket av Simon i denne seksjonen. Portrettet
              ved siden av er en illustrasjon. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="order-3 w-full max-w-[420px] lg:order-none lg:w-[260px] lg:shrink-0 xl:w-[300px]"
          >
            <VideoTile video={boligVideo} />
          </motion.div>


          {/* Portrettet flyttet hit fra Kontakt. Der var det dekor ved siden
              av et telefonnummer; her er det motivet — seksjonen heter «Om meg
              og verkstedet». Det gir også kolonnen masse: Om hadde sidens
              tynneste innhold (luft:innhold 0,44 mot normen 0,15-0,21), og en
              overskrift pluss ett tall balanserte ikke tre avsnitt. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="relative order-1 mt-10 lg:order-none lg:mt-0 lg:min-w-0 lg:flex-1"
          >
            <div className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-[var(--r-card)] border border-line bg-bg-card lg:max-w-[220px]">
              {/* Illustrasjon, ikke foto — Alex vil bytte til et ekte
                  telefonbilde av Simon når det finnes (2. sep). Interim-
                  alternativet som ble vist lokalt: porche_behind.webp med
                  objectPosition 78% 50%, stående utsnitt mot logoveggen. */}
              <Image
                src="/brand/simon-transparent.webp"
                alt="Simon — håndverkeren bak Simons Solfilm"
                fill
                sizes="(min-width: 1024px) 220px, 100vw"
                className="object-cover object-bottom"
              />
            </div>
          </motion.div>

        </div>

        <div className="contents lg:col-span-6 lg:col-start-7 lg:block">
          <div className="order-2 space-y-7 text-lg leading-relaxed text-text-muted lg:order-none lg:text-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.8, ease }}
              className="text-text"
            >
              Jeg heter Simon Rønning og gjør jobben selv, fra start til
              slutt. Jeg holder også kurs for XPEL, så det er faget jeg lærer bort til andre montører.
              Verkstedet mitt holder til i et nytt bygg på Hegdal industriområde
              i Larvik.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-180px" }}
              transition={{ duration: 0.8, ease }}
            >
              Jeg er nøye med detaljene — fra valg av film til den siste
              kanten. For meg handler det om å gi ærlige råd, finne
              riktig løsning og levere noe jeg kan stå inne for.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-240px" }}
              transition={{ duration: 0.8, ease }}
            >
              Du har kontakt med meg hele veien, og jeg gjør monteringen selv.
              Trenger du at jeg kommer hjem eller ut på en
              byggeplass, ordner jeg det — næringskunder kjører jeg ut til over
              hele Vestfold.
            </motion.p>
          </div>

          {/* Tilbake i kolonnen. I full bredde med hårstrek over fikk tallet
              samme vekt som seksjonsstrekene og leste som en EGEN seksjon —
              verre enn problemet det løste. Dinglingen var mest et symptom på
              py-40, og den er strammet til py-24.

              One number, not a list. It began as four rows, then three. Each
              of the others said something the paragraphs beside it already
              said with more in them — the workshop's address, which is also
              in the contact list and the footer, and the area covered, which
              the last paragraph states as a promise rather than a fact. What
              is left is the one thing the prose never says. */}
          {/* Raden er utløseren, ikke streken — se notatet i Services.tsx. */}
          <motion.div
            initial="hidden"
            whileInView="vis"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: { opacity: 0, y: 10 }, vis: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="relative order-4 py-6 lg:order-none lg:mt-14"
          >
            <motion.span
              aria-hidden
              variants={{ hidden: { scaleX: 0 }, vis: { scaleX: 1 } }}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-line"
            />
            <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-text-faint">
              Erfaring
            </div>
            <div className="mt-2 font-display text-4xl font-normal leading-none text-text lg:text-5xl">
              20+ år
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
