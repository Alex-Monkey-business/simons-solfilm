export type ServiceDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  benefits: { title: string; body: string }[];
  filmTypes: { name: string; body: string }[];
  // «Filmtyper jeg jobber med.» er riktig for de tre solfilm- og
  // lakkbeskyttelsesflatene, men overskriften er ikke universell — en dør som
  // en dag selger noe som ikke er film trenger sin egen. Valgfri: uten den
  // faller malen tilbake til standardoverskriften.
  benefitsHeading?: string;
  filmTypesHeading?: string;
  // NOTE: Qualitative specs only — no fabricated numbers. Simon should confirm
  // exact VLT %, varmeavvisning og garantitid for filmtypene han faktisk bruker.
  specs: { label: string; value: string }[];
  process: { step: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
  // Kryss-lenke til en flate som IKKE er en dør. Lakkbeskyttelse trenger å
  // peke på bilpleieproduktene, men de er en vare på hylla og hører ikke i
  // filmtype-lista — der ville de lest som noe han monterer.
  related?: {
    label: string;
    title: string;
    body: string;
    href: string;
    cta: string;
  };
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "solfilm-bil": {
    slug: "solfilm-bil",
    eyebrow: "Tjeneste",
    title: "Solfilm til",
    titleAccent: "bil",
    intro:
      "Jeg legger solfilm på bil for deg som vil ha mindre varme, et interiør som holder seg og et penere uttrykk. Vi finner filmtypen sammen — tilpasset bilen, bruken din og hvor mørkt du vil ha det. Send meg gjerne et bilde av bilen, så får du pris raskt.",
    heroImage: "/brand/pics_work/blue_mercedes.webp",
    heroAlt: "Bil med solfilm montert av Simon",
    benefits: [
      {
        title: "Mindre varme",
        body: "Metallisert film tar mye av varmen og demper blendingen — bedre for både folk, hund og utstyr i baksetet.",
      },
      {
        title: "Beskyttelse mot innsyn",
        body: "Vanskeligere for tyver å se det dyre verktøyet i firmabilen eller stereoanlegget i privatbilen.",
      },
      {
        title: "Skåner interiøret",
        body: "Filmen demper UV-strålingen som falmer og sprekker dashbord, seter og interiør over tid.",
      },
      {
        title: "Penere uttrykk",
        body: "Tonede ruter gir bilen et mer helhetlig og forseggjort uttrykk — montert med rene kanter og uten bobler.",
      },
    ],
    filmTypes: [
      {
        name: "Metallisert solfilm",
        body: "Hovedvalget mitt for bil — reduserer varme effektivt og holder seg pent over tid.",
      },
      {
        name: "Mørkhetsgrad etter ønske",
        body: "Fra lett tonet til helt mørkt. Vi velger en grad som passer bilen og holder seg innenfor regelverket på frontrutene.",
      },
      {
        name: "UV-beskyttelse",
        body: "Filmen demper UV-strålingen, som skåner interiøret mot falming og sprekker.",
      },
    ],
    specs: [
      { label: "Filmtype", value: "Metallisert solfilm" },
      { label: "Varmeavvisning", value: "Reduserer varme merkbart" },
      { label: "UV-beskyttelse", value: "Demper UV-strålingen" },
      { label: "Montering", value: "På verkstedet i Larvik" },
      { label: "Garanti", value: "Kontakt meg for vilkår" },
    ],
    process: [
      {
        step: "01",
        title: "Send bilde + få tilbud",
        body: "Send meg et bilde av bilen og si litt om hva du ønsker, så gir jeg deg pris raskt.",
      },
      {
        step: "02",
        title: "Lever bilen",
        body: "Du leverer bilen på verkstedet — mange leverer på kvelden og henter dagen etter.",
      },
      {
        step: "03",
        title: "Presis montering",
        body: "Jeg gjør jobben selv, fra start til slutt. Rene kanter, ingen bobler.",
      },
      {
        step: "04",
        title: "Klar til bruk",
        body: "Du henter en bil med mindre varme, mindre blending og et penere uttrykk.",
      },
    ],
    faq: [
      {
        q: "Hvor mørk film kan jeg ha?",
        a: "På bakruter og bakvinduer kan du gå så mørkt du vil. Frontruter og førerruter har egne krav — jeg veileder deg slik at det blir lovlig.",
      },
      {
        q: "Hvor lang tid tar det?",
        a: "De fleste biler gjøres på en dag. Mange leverer på kvelden og henter dagen etter.",
      },
      {
        q: "Holder filmen seg over tid?",
        a: "Ja — med riktig film og ryddig montering holder solfilmen seg pen i mange år.",
      },
    ],
    // Solfilm-kunden er den samme bilen som kjøper bilpleie, og han er
    // alt på verkstedet når han henter. Bygg-sida får ikke dette — annen
    // kunde.
    related: {
      label: "Bilpleie",
      title: "Produktene står på hylla",
      body: "XPELs Superior Car Care-serie står i samme lokale — vask, interiør, glass og lakkpleie. Jeg selger den ikke på nett, men henter du bilen er det bare å teste.",
      href: "/bilpleie",
      cta: "Se produktene",
    },
  },
  "solfilm-bygg": {
    slug: "solfilm-bygg",
    eyebrow: "Tjeneste",
    title: "Solfilm til",
    titleAccent: "bygg",
    intro:
      "Jeg legger solfilm på bolig, kontor, butikk og næringsbygg. Det gir mindre varme, mindre innsyn og bedre komfort — uten at du må bytte vinduer eller sette opp tung solskjerming. Næringskunder kjører jeg ut til over hele Vestfold.",
    heroImage: "/brand/pics_work/stainless_steel_office_building.webp",
    heroAlt: "Næringsbygg med solfilm",
    benefits: [
      {
        title: "Reduserer varme",
        body: "Solfilm demper varmen fra sola, så det blir jevnere inne — i stua, i kontorlandskapet og på møterommet.",
      },
      {
        title: "Demper innsyn",
        body: "Frostet film demper innsyn uten at du mister dagslyset.",
      },
      {
        title: "Mindre blending",
        body: "Skjermer mot sol som blender på skjermen og arbeidsplassen.",
      },
      {
        title: "Slipper å bytte vinduer",
        body: "Rimeligere enn nye vinduer eller utvendig solskjerming, og monteres på glasset du allerede har.",
      },
    ],
    filmTypes: [
      {
        name: "Solfilm / varmedempende film",
        body: "Demper varmen fra sola og jevner ut temperaturen i bolig og næringsbygg.",
      },
      {
        name: "Frostet innsynsfilm",
        body: "Stort utvalg — gir privatliv på balkong, bad, møterom og fasade uten å miste lyset.",
      },
      {
        name: "Dekor- og UV-film",
        body: "Dekorfilm med mønster, samt UV-film som beskytter interiør og verdier mot falming.",
      },
    ],
    specs: [
      { label: "Bruksområder", value: "Bolig, kontor, butikk, næringsbygg" },
      { label: "Varmeavvisning", value: "Reduserer varme merkbart" },
      { label: "Innsyn", value: "Frostet film i stort utvalg" },
      { label: "Montering", value: "Hos deg / på byggeplass" },
      { label: "Dekningsområde", value: "Hele Vestfold" },
    ],
    process: [
      {
        step: "01",
        title: "Befaring eller bilde",
        body: "Jeg kan komme på befaring, eller du sender meg bilder og mål — så gir jeg deg pris.",
      },
      {
        step: "02",
        title: "Vi velger film",
        body: "Vi finner riktig film for behovet — varmedemping, innsyn eller dekor.",
      },
      {
        step: "03",
        title: "Montering på stedet",
        body: "Jeg kommer ut og monterer på glasset som står der. Ryddig, og uten at dere må flytte ut.",
      },
      {
        step: "04",
        title: "Bedre inneklima",
        body: "Mindre varme, mer privatliv, og bedre å være i.",
      },
    ],
    faq: [
      {
        q: "Kommer du ut til oss?",
        a: "Ja. Privatkunder i nærområdet og næringskunder over hele Vestfold — jeg kommer ut og monterer på stedet.",
      },
      {
        q: "Mister jeg dagslyset med innsynsfilm?",
        a: "Nei. Frostet film demper innsyn, men slipper fortsatt inn lyset.",
      },
      {
        q: "Må jeg bytte vinduer?",
        a: "Nei — filmen monteres på de vinduene du allerede har, og er en rimeligere løsning enn nye vinduer.",
      },
    ],
  },
  "lakkbeskyttelse": {
    slug: "lakkbeskyttelse",
    eyebrow: "Tjeneste",
    title: "Lakkbeskyttelse og",
    titleAccent: "lyktefolie",
    intro:
      "Jeg legger gjennomsiktig film på lakken som tar steinsprut, slitasje og småskader, og folie på lyktene i klar eller sotet variant. Jeg bruker XPEL og holder kurs for dem, så det er faget jeg lærer bort til andre montører. Send meg gjerne et bilde av bilen, så får du pris raskt.",
    heroImage: "/brand/pics_work/porche_behind.webp",
    heroAlt: "Porsche 911 i Simons verksted med lakkbeskyttelse på fronten",
    benefits: [
      {
        title: "Tar støtene for lakken",
        body: "Steinsprut fra veien, slitasje og småskader treffer filmen i stedet for lakken.",
      },
      {
        title: "Skal ikke synes",
        body: "Filmen er gjennomsiktig. Den skal bare ligge der og ta imot, uten å endre farge eller uttrykk.",
      },
      {
        title: "Lyktene også",
        body: "Klar folie beskytter mot riper og steinsprut. Sotet gir et mer tilpasset uttrykk.",
      },
      {
        title: "Monteringen er halve jobben",
        body: "En film er ikke bedre enn den som legger den. Kanter som slipper eller skjæremerker i lakken ødelegger resultatet uansett hvor god folien er — derfor gjør jeg hele jobben selv.",
      },
    ],
    // Overskriften over lista. «Filmtyper jeg jobber med» er sant, men denne
    // døra dekker to ulike steder på bilen — lakken og lyktene — og da sier
    // «det jeg legger på bilen» mer med de samme ordene.
    benefitsHeading: "Derfor lakkbeskyttelse.",
    filmTypesHeading: "Det jeg legger på bilen.",
    filmTypes: [
      {
        name: "Lakkbeskyttelse (PPF)",
        body: "Gjennomsiktig film på lakken. Jeg jobber jevnlig med Mercedes AMG, Porsche og Ferrari.",
      },
      {
        name: "Lyktefolie, klar",
        body: "Beskytter lyktene mot riper og steinsprut uten å endre uttrykket.",
      },
      {
        name: "Lyktefolie, sotet",
        body: "Gir et mer tilpasset uttrykk. Vi finner en grad som holder seg innenfor regelverket.",
      },
    ],
    specs: [
      { label: "Film", value: "XPEL lakkbeskyttelse" },
      { label: "Lyktefolie", value: "Klar eller sotet" },
      { label: "Omfang", value: "Vi avtaler hva som dekkes" },
      { label: "Montering", value: "På verkstedet i Larvik" },
      { label: "Garanti", value: "Kontakt meg for vilkår" },
    ],
    process: [
      {
        step: "01",
        title: "Send bilde + få tilbud",
        body: "Send meg et bilde av bilen og si hva du vil beskytte, så gir jeg deg pris raskt.",
      },
      {
        step: "02",
        title: "Vi avtaler omfanget",
        body: "Front, hele bilen eller bare lyktene — vi finner ut hva som er verdt det for din bil og bruk.",
      },
      {
        step: "03",
        title: "Lever bilen",
        body: "Bilen må være ren og tørr før filmen legges. Vi avtaler tid som passer deg.",
      },
      {
        step: "04",
        title: "Presis montering",
        body: "Jeg gjør jobben selv, fra start til slutt. Rene kanter, ingen bobler, ingen skjæremerker i lakken.",
      },
    ],
    faq: [
      {
        q: "Synes filmen etterpå?",
        a: "Lakkbeskyttelsen er gjennomsiktig og skal ikke synes når den er lagt riktig. Lyktefolie i sotet variant er ment å synes — det er hele poenget med den.",
      },
      {
        q: "Kan jeg vaske bilen som normalt?",
        a: "Ja. Det finnes egne produkter for å vaske film — jeg har XPELs PPF Cleaner på hylla, og kan vise deg hvordan du bruker den.",
      },
      {
        q: "Hvor mye av bilen bør jeg beskytte?",
        a: "Det avhenger av bilen og hvordan du kjører den. Mange tar fronten, som er der steinsprutet treffer. Ring meg, så gir jeg deg et ærlig råd.",
      },
      {
        q: "Er sotet lyktefolie lovlig?",
        a: "Det er grenser for hvor mye lys lyktene kan miste. Jeg veileder deg slik at det blir lovlig — si hva du ser for deg, så finner vi en grad som går.",
      },
    ],
    related: {
      label: "Bilpleie",
      title: "Produktene står på hylla",
      body: "XPELs Superior Car Care-serie — vask, interiør, glass og lakkpleie, inkludert PPF Cleaner til filmen. Jeg selger den ikke på nett, men står du på Hegdal er det bare å komme innom og teste.",
      href: "/bilpleie",
      cta: "Se produktene",
    },
  },
};
