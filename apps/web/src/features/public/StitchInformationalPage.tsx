import { AppLink } from '../../app/AppLink';

const PLACEHOLDER_BODY =
  "We're preparing the information for this page. Please check back for updates or contact the SmartFarm team for more details.";

/**
 * Static informational surface approved under ACR-007. The heading and lead
 * copy are ported from the owner-supplied Stitch exports; no legal claim,
 * external asset or live-status indicator is introduced.
 */
export function StitchInformationalPage({ title, image }: { title: string; image?: string }) {
  return (
    <>
      <section className="relative overflow-hidden bg-deep-forest pb-24 pt-32 text-white sm:pb-28 sm:pt-36">
        <div
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          aria-hidden="true"
        >
          {image ? (
            <>
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover object-[65%_center] md:object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/95 via-deep-forest/80 to-deep-forest/30" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-deep-forest via-deep-forest/90 to-deep-forest/40" />
          )}
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-12">
          <span className="mb-5 inline-block font-inter text-xs font-bold uppercase tracking-[0.22em] text-harvest-gold">
            SmartFarm Information
          </span>
          <h1 className="font-serif-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <span className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-inter text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-harvest-gold" aria-hidden="true" />
            Coming Soon
          </span>
          <p className="mx-auto mt-7 max-w-2xl font-inter text-base leading-relaxed text-white/80 sm:text-lg">
            {PLACEHOLDER_BODY}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <AppLink
              href="#/public/home"
              className="inline-flex items-center justify-center rounded-lg bg-pasture-green px-7 py-3.5 font-inter text-sm font-semibold text-white shadow-lg shadow-deep-forest/30 transition-colors hover:bg-[#2c6346] focus:ring-2 focus:ring-harvest-gold"
            >
              Back to Home
            </AppLink>
            <AppLink
              href="#/public/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-7 py-3.5 font-inter text-sm font-semibold text-white transition-colors hover:bg-white/20 focus:ring-2 focus:ring-harvest-gold"
            >
              Contact SmartFarm
            </AppLink>
          </div>
        </div>
      </section>

      <section className="bg-warm-ivory py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <span className="mb-3 block font-inter text-xs font-bold uppercase tracking-[0.2em] text-pasture-green">
            Approved public pages
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-deep-forest sm:text-3xl">
            Continue exploring SmartFarm
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary-text">
            Review the platform overview, the module list and the illustrative workspace preview.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'About SmartFarm', href: '#/public/about' },
              { label: 'Features', href: '#/public/features' },
              { label: 'Dashboard Preview', href: '#/public/dashboard-preview' },
            ].map((item) => (
              <AppLink
                key={item.href}
                href={item.href}
                className="rounded-full border border-border-subtle bg-white px-5 py-2.5 font-inter text-sm font-semibold text-deep-forest transition-colors hover:border-pasture-green"
              >
                {item.label}
              </AppLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
