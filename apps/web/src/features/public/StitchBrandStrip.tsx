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
      className="sf-stitch-brand-strip relative overflow-hidden border-t border-border-subtle/80 bg-white py-6"
      aria-label="SmartFarm signature"
    >
      <div className="sf-stitch-marquee flex w-max">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center gap-8 pr-8"
            aria-hidden={group === 1 ? 'true' : undefined}
          >
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
        ))}
      </div>
    </section>
  );
}
