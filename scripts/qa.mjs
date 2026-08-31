/**
 * QA-runde for simonssolfilm.no.
 *
 *   npm run qa                 -> http://localhost:3300  (start dev først)
 *   npm run qa:prod            -> https://simonssolfilm.no
 *   node scripts/qa.mjs <url>  -> hva du vil
 *
 * Hver sjekk her fanget en ekte bug 31. aug 2026. De er ikke teoretiske:
 * kommentaren over hver sjekk sier hva den fant.
 *
 * Avslutter med kode 1 hvis noe feiler, så den kan gate en deploy.
 */
import { chromium } from "playwright-core";

const BASE = (process.argv[2] || "http://localhost:3300").replace(/\/$/, "");
const WIDTHS = [320, 360, 390, 430, 768, 1024, 1440];

// Streker som SKAL stå på scaleX(0) i ro. .door-rule er hover-/focus-styrt i
// globals.css og verifisert 0 -> 1 på hover.
const HOVER_DRIVEN = ["door-rule"];

const results = [];
function check(navn, ok, detalj) {
  results.push({ navn, ok, detalj });
  const merke = ok ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m";
  console.log(`${merke} ${navn}${detalj ? "  \x1b[2m" + detalj + "\x1b[0m" : ""}`);
}

/** Ruller gjennom hele sida i små steg. Nødvendig: alt som animeres inn med
 *  whileInView er usynlig for målingene før det har vært i synsfeltet. */
async function scrollAll(page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 280) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(130);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

async function hentSider() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) return ["/"];
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname || "/")
    .map((p) => (p === "" ? "/" : p));
  return [...new Set(paths)];
}

const browser = await chromium.launch();
console.log(`\nQA mot ${BASE}\n${"─".repeat(56)}`);

const sider = await hentSider();
console.log(`\x1b[2msider fra sitemap: ${sider.join(", ")}\x1b[0m\n`);

// ── 1. Alle sider svarer, og ingen request feiler ────────────────────────────
// Fanget: ingenting ennå, men det er sjekken som fanger en død bildesti etter
// at noe er flyttet ut av public/.
{
  const daarlige = [];
  const statuser = [];
  for (const path of sider) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on("response", (r) => {
      if (r.status() >= 400) daarlige.push(`${path} ${r.status()} ${r.url()}`);
    });
    const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
    statuser.push(`${path} ${res.status()}`);
    await scrollAll(page);
    await page.close();
  }
  check("alle sider svarer 200", statuser.every((s) => s.endsWith("200")), statuser.join(" · "));
  check("ingen feilende requests", daarlige.length === 0, daarlige.slice(0, 3).join(" | ") || "0 stk");
}

// ── 2. Ingen vannrett overflyt ───────────────────────────────────────────────
// Fanget: galleri-gridet der max-w-[420px] fra swipe-raden aldri ble nullet på
// desktop. scrollX er fasit, ikke scrollWidth.
{
  const feil = [];
  for (const w of WIDTHS) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await scrollAll(page);
    const ov = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    if (ov > 0) feil.push(`${w}px: +${ov}`);
    await page.close();
  }
  check(`ingen vannrett overflyt (${WIDTHS.length} bredder)`, feil.length === 0, feil.join(", ") || WIDTHS.join("/"));
}

// ── 3. Fastlåste hårstreker ──────────────────────────────────────────────────
// Fanget: TI streker i Tjenester, Om, Anmeldelser og Kontakt som aldri hadde
// vært synlige på mobil. En h-px med scaleX(0) har null areal og utløser aldri
// IntersectionObserver, så animasjonen startet aldri. Ren mobilbug.
{
  const feil = [];
  for (const w of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await scrollAll(page);
    const stuck = await page.evaluate((hoverDriven) => {
      const ut = [];
      document.querySelectorAll("main *, footer *").forEach((e) => {
        const cs = getComputedStyle(e);
        if (cs.height !== "1px") return;
        if (!cs.transform.startsWith("matrix(0")) return;
        const cls = (e.className || "").toString();
        if (hoverDriven.some((h) => cls.includes(h))) return;
        ut.push(cls.slice(0, 44));
      });
      return ut;
    }, HOVER_DRIVEN);
    stuck.forEach((s) => feil.push(`${w}px ${s}`));
    await page.close();
  }
  check("ingen fastlåste hårstreker", feil.length === 0, feil.slice(0, 4).join(" | ") || "0 stk");
}

// ── 4. Treffområder ≥ 44 px ──────────────────────────────────────────────────
// Fanget: fem lenker på 18 px. Koden brukte min-h-[44px] i Contact alt, men de
// fem var glemt.
{
  const feil = [];
  for (const path of sider) {
    for (const w of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width: w, height: 900 } });
      await page.goto(BASE + path, { waitUntil: "networkidle" });
      await scrollAll(page);
      const smaa = await page.evaluate(() =>
        [...document.querySelectorAll("main a, footer a")]
          .filter((a) => {
            const r = a.getBoundingClientRect();
            return r.height > 0 && (r.height < 44 || r.width < 44);
          })
          .map((a) => `${(a.textContent || "").trim().slice(0, 18)} ${Math.round(a.getBoundingClientRect().width)}x${Math.round(a.getBoundingClientRect().height)}`)
      );
      smaa.forEach((s) => feil.push(`${path} ${w}px ${s}`));
      await page.close();
    }
  }
  check("alle lenker ≥ 44 px", feil.length === 0, feil.slice(0, 4).join(" | ") || "0 for små");
}

// ── 5. Understreken klemmer teksten ──────────────────────────────────────────
// Fanget: link-underline::after ligger på bottom: -3px av ELEMENTETS boks. Er
// lenka gjort 44 px høy for treffområdets skyld, faller streken til bunnen av
// boksen. .is-boxed retter det. Tre lenker hadde bug-en live før den ble funnet.
{
  const feil = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await scrollAll(page);
  const rader = await page.evaluate(() =>
    [...document.querySelectorAll(".link-underline")].map((e) => {
      const box = e.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(e);
      const tr = range.getBoundingClientRect();
      const bottomPx = parseFloat(getComputedStyle(e, "::after").bottom);
      return {
        t: (e.textContent || "").trim().slice(0, 18),
        avstand: Math.round(box.bottom - bottomPx - tr.bottom),
      };
    })
  );
  rader.forEach((r) => {
    if (r.avstand > 8) feil.push(`${r.t} ${r.avstand}px under teksten`);
  });
  check(`understrek klemmer teksten (${rader.length} lenker)`, feil.length === 0, feil.slice(0, 4).join(" | ") || "alle ≤ 8 px");
  await page.close();
}

// ── 6. Ingen usynlige kort ───────────────────────────────────────────────────
// Fanget: ville fanget seksjonsbåndene som ble forkastet — de flatet kortene
// fordi kort og seksjon fikk samme bakgrunn.
{
  const feil = [];
  for (const path of sider) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await scrollAll(page);
    const flate = await page.evaluate(() =>
      [...document.querySelectorAll('[class*="bg-bg-card"]')]
        .filter((el) => {
          const me = getComputedStyle(el).backgroundColor;
          let par = el.parentElement;
          while (par && getComputedStyle(par).backgroundColor === "rgba(0, 0, 0, 0)")
            par = par.parentElement;
          return par && getComputedStyle(par).backgroundColor === me;
        })
        .map((el) => (el.className || "").toString().slice(0, 36))
    );
    flate.forEach((f) => feil.push(`${path} ${f}`));
    await page.close();
  }
  check("ingen kort med samme farge som flaten under", feil.length === 0, feil.slice(0, 3).join(" | ") || "0 stk");
}

// ── 7. Seksjonssystemet: numre, like brede streker, ingen kollisjon ───────────
// Fanget: About og Contact hadde streken inne i en kolonne (505 og 730 px mot
// 1280), og portrettet dekket «06 / 06» med 22 x 12 px.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await scrollAll(page);
  const d = await page.evaluate(() => {
    const numre = [];
    const kollisjoner = [];
    document.querySelectorAll("main > section").forEach((sec) => {
      const num = [...sec.querySelectorAll(".font-mono")].find((e) =>
        /^\d\d\s*\/\s*\d\d$/.test(e.textContent.replace(/\s+/g, " ").trim())
      );
      if (!num) return;
      const rule = num.parentElement;
      const rr = rule.getBoundingClientRect();
      numre.push({ nr: num.textContent.replace(/\s+/g, " ").trim(), b: Math.round(rr.width) });
      sec.querySelectorAll("img, h1, h2, p, video, [class*=bg-bg-card]").forEach((e) => {
        if (rule.contains(e) || e.contains(rule)) return;
        const er = e.getBoundingClientRect();
        if (!er.width || !er.height) return;
        const ox = Math.min(rr.right, er.right) - Math.max(rr.left, er.left);
        const oy = Math.min(rr.bottom, er.bottom) - Math.max(rr.top, er.top);
        if (ox > 1 && oy > 1) kollisjoner.push(`${e.tagName} ${Math.round(ox)}x${Math.round(oy)}`);
      });
    });
    return { numre, kollisjoner };
  });
  const bredder = [...new Set(d.numre.map((n) => n.b))];
  check(`seksjonsnumre finnes (${d.numre.length} stk)`, d.numre.length > 0, d.numre.map((n) => n.nr).join(" "));
  check("alle seksjonsstreker like brede", bredder.length === 1, bredder.join("/") + " px");
  check("ingenting kolliderer med seksjonsstreken", d.kollisjoner.length === 0, d.kollisjoner.slice(0, 3).join(" | ") || "0 stk");
  await page.close();
}

// ── 8. Luft-til-innhold per seksjon ──────────────────────────────────────────
// Fanget: Om lå på 0,74 mot sidens norm 0,15-0,27 og leste som en tom flate
// mellom to fulle. Bruk denne framfor å gjette på padding.
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await scrollAll(page);
  const rader = await page.evaluate(() =>
    [...document.querySelectorAll("main > section")].map((s) => {
      const cs = getComputedStyle(s);
      const luft = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const h = s.getBoundingClientRect().height;
      return { id: s.id || "(uten id)", f: +(luft / (h - luft)).toFixed(2) };
    })
  );
  const utenfor = rader.filter((r) => r.f > 0.45 || r.f < 0.08);
  check(
    "luft:innhold innenfor 0,08-0,45",
    utenfor.length === 0,
    rader.map((r) => `${r.id} ${r.f}`).join(" · ")
  );
  await page.close();
}

await browser.close();

const feilet = results.filter((r) => !r.ok);
console.log("─".repeat(56));
if (feilet.length) {
  console.log(`\x1b[31m${feilet.length} av ${results.length} sjekker feilet\x1b[0m\n`);
  process.exit(1);
}
console.log(`\x1b[32malle ${results.length} sjekker passerte\x1b[0m\n`);
