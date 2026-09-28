const items = [
  "DEGUSTASI 7 BABAK",
  "FINE DINING",
  "WINE CELLAR",
  "PRIVATE DINING",
  "SEJAK 2009",
  "MICHELIN GUIDE",
  "CHEF SIGNATURE",
  "BAHAN PREMIUM",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-serif text-2xl font-light tracking-[0.2em] text-cream/70 italic md:px-12 md:text-3xl">
            {item}
          </span>
          <span className="h-2 w-2 rotate-45 border border-gold/60" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-gold/10 bg-coal py-6">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
