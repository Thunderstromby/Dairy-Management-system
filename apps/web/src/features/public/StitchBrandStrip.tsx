const BRAND_ITEMS = [
  'SMART FARM',
  'SMART FARM',
  'SMART FARM',
  'SMART FARM',
  'SMART FARM',
  'SMART FARM',
] as const;

export function StitchBrandStrip() {
  return (
    <section
      className="sf-stitch-brand-strip overflow-hidden border-t border-border-subtle/80 bg-white py-6"
      aria-label="SmartFarm signature"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-6 md:justify-between lg:px-12">
        {BRAND_ITEMS.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="font-heading text-xs font-extrabold uppercase tracking-[0.28em] text-[#245C45] sm:text-sm">
              {item}
            </span>
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                index % 2 === 0 ? 'bg-harvest-gold' : 'bg-pasture-green'
              }`}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
