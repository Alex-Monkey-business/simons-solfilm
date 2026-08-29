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
  // NOTE: Qualitative specs only — no fabricated numbers. Simon should confirm
  // exact VLT %, varmeavvisning og garantitid for filmtypene han faktisk bruker.
  specs: { label: string; value: string }[];
  process: { step: string; title: string; body: string }[];
  faq: { q: string; a: string }[];
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
        body: "Personvernsfilm gir deg privatliv mot innsyn uten at du mister dagslyset.",
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
        name: "Frostet personvernfilm",
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
      { label: "Personvern", value: "Frostet film i stort utvalg" },
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
        body: "Vi finner riktig film for behovet — varmedemping, personvern eller dekor.",
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
        q: "Mister jeg dagslyset med personvernfilm?",
        a: "Nei. Frostet personvernfilm demper innsyn, men slipper fortsatt inn lyset.",
      },
      {
        q: "Må jeg bytte vinduer?",
        a: "Nei — filmen monteres på de vinduene du allerede har, og er en rimeligere løsning enn nye vinduer.",
      },
    ],
  },
};
