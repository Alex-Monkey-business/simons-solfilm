import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import styles from "./Services.module.css";

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h18m-5-5 5 5-5 5" />
    </svg>
  );
}

export function Services() {
  return (
    <section id="tjenester" className="relative w-full bg-bg px-6 py-16 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading number={1} className="mb-10 lg:mb-16">Det jeg gjør.</SectionHeading>

        <div className={styles.grid}>
          <Link href="/solfilm-bil" className={`${styles.card} ${styles.car}`}>
            <div className={styles.art} aria-hidden="true">
              <span className={styles.label}>Bil</span>
              <span className={styles.glass} /><span className={styles.glass} /><span className={styles.glass} />
            </div>
            <div className={styles.copy}>
              <h3>Solfilm til <em>bil.</em></h3>
              <p>Mindre varme og innsyn. Jeg hjelper deg å velge film som passer bilen din.</p>
              <div className={styles.action}>Se mulighetene <Arrow /></div>
            </div>
          </Link>

          <Link href="/solfilm-bygg" className={`${styles.card} ${styles.building}`}>
            <span className={styles.glassDetail} aria-hidden="true" />
            <div className={styles.copy}>
              <h3>Solfilm til<br /><em>bolig og bygg.</em></h3>
              <p>Mindre varme, blending eller innsyn — med film på vinduene du allerede har.</p>
              <div className={styles.action}>Finn riktig film <Arrow /></div>
            </div>
          </Link>

          <Link href="/lakkbeskyttelse" className={`${styles.card} ${styles.ppf}`}>
            <span className={styles.peel} aria-hidden="true" />
            <div className={styles.copy}>
              <h3>Lakkbeskyttelse<br />og lyktefolie.</h3>
              <p>Et beskyttende lag på bilens utsatte flater.</p>
              <div className={styles.action}>Se hva du kan beskytte <Arrow /></div>
            </div>
          </Link>

          <Link href="/bilpleie" className={styles.shop}>
            <div><h3>Bilpleie på verkstedet.</h3><p>Vask, glass og lakkpleie fra XPEL.</p></div>
            <Arrow />
          </Link>
        </div>

        {/* XPEL dekker bilproduktene, ikke solfilm til bygg. */}
        <Link href="/xpel" className="link-underline is-boxed mt-5 inline-flex min-h-[44px] items-center gap-3 font-mono text-[12px] uppercase tracking-[0.15em] text-text-muted hover:text-accent">
          Alt til bilen er XPEL <span aria-hidden="true">→</span>
        </Link>

        <div className={styles.other}>
          <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-muted">Andre tjenester</div>
          <div className={styles.otherGrid}>
            <div className={styles.row}>
              <h3>Dronebefaring</h3>
              <p>Oversikt over tak, fasade og steder som er vanskelige å komme til.</p>
            </div>
            <div className={styles.row}>
              <h3>Trykk på klær</h3>
              <p>Arbeidstøy og profilklær til bedrift og privat.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
