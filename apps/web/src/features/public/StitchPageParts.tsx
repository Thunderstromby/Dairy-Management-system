import { AppLink } from '../../app/AppLink';
import type { ReactNode } from 'react';
import { scrollToHref } from './scrollToSection';

type StitchPageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image?: string;
};

export function StitchPageHero({
  eyebrow,
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image,
}: StitchPageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-deep-forest pb-24 pt-32 text-white sm:pb-28 sm:pt-36">
      {image ? (
        <div
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover object-[65%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-forest/95 via-deep-forest/75 to-deep-forest/25" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-deep-forest/60 to-transparent" />
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-r from-deep-forest via-deep-forest/90 to-deep-forest/40"
          aria-hidden="true"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="max-w-3xl">
          <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.22em] text-harvest-gold">
            {eyebrow}
          </span>
          <h1 className="font-serif-display text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {body}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <AppLink
              href={primaryHref}
              onClick={(event) => scrollToHref(event, primaryHref)}
              className="inline-flex items-center justify-center rounded-lg bg-pasture-green px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-deep-forest/30 transition-all duration-200 hover:scale-[1.02] hover:bg-[#2c6346] focus:ring-2 focus:ring-harvest-gold"
            >
              {primaryLabel}
            </AppLink>
            <AppLink
              href={secondaryHref}
              onClick={(event) => scrollToHref(event, secondaryHref)}
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 focus:ring-2 focus:ring-harvest-gold"
            >
              {secondaryLabel}
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-12 max-w-3xl">
      <span className="mb-3 block text-xs font-bold uppercase tracking-[0.2em] text-pasture-green">
        {eyebrow}
      </span>
      <h2 className="font-heading text-3xl font-extrabold leading-tight text-deep-forest sm:text-4xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base leading-relaxed text-secondary-text">{body}</p> : null}
    </div>
  );
}

export function NeutralVisual({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-border-subtle bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-heading text-base font-bold text-deep-forest">{title}</h3>
        <span className="rounded-full bg-sage-mist px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-deep-forest">
          Illustrative — not live data
        </span>
      </div>
      {children ?? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl bg-warm-ivory text-sm text-muted-text">
          Awaiting approved content
        </div>
      )}
    </div>
  );
}

export function StitchCTASection({
  eyebrow = 'Direct Farm Consultation',
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden bg-warm-ivory py-24 text-deep-charcoal sm:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-pasture-green/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-7">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-pasture-green">
            {eyebrow}
          </span>
          <h2 className="mb-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-deep-forest sm:text-5xl">
            {title}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-secondary-text sm:text-lg">
            {body}
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-4 lg:col-span-5 lg:pt-12">
          <AppLink
            href="#/public/contact"
            className="inline-flex items-center justify-center rounded-lg bg-pasture-green px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pasture-green/20 transition-all duration-200 hover:scale-[1.02] hover:bg-[#2c6346] focus:ring-2 focus:ring-pasture-green"
          >
            Contact SmartFarm
          </AppLink>
          <AppLink
            href="#/public/features"
            className="inline-flex items-center justify-center rounded-lg border border-deep-forest bg-white px-7 py-3.5 text-sm font-semibold text-deep-forest shadow-sm transition-colors hover:bg-sage-mist/40 focus:ring-2 focus:ring-pasture-green"
          >
            Explore the Platform
          </AppLink>
        </div>
      </div>
    </section>
  );
}
