const items = [
  "Solfilm bil",
  "Solfilm bygg",
  "Lakkbeskyttelse (PPF)",
  "Lyktefolie",
  "Takbefaring med drone",
  "Mobilt oppmøte",
  "Verksted i Larvik",
];

export function ServiceStrip() {
  const repeated = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-line bg-bg-card py-6">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl uppercase tracking-tight text-text lg:text-3xl">
              {item}
            </span>
            <span className="text-accent" aria-hidden>
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
