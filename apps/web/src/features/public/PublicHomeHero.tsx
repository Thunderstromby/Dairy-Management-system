import { ArrowDown, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { StaticHeroMotif } from './StaticHeroMotif';
import { scrollToSection } from './scrollToSection';
import { STITCH_ASSETS } from './stitchAssets';

export function PublicHomeHero() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-end overflow-hidden bg-deep-forest pb-20 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 h-full w-full select-none overflow-hidden">
        {imageFailed ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <StaticHeroMotif />
          </div>
        ) : (
          <img
            src={STITCH_ASSETS.heroPasture}
            alt="Golden pasture with grazing Holsteins in warm sunset light"
            className="animate-cinematic h-full w-full object-cover object-[70%_center] md:object-center"
            onError={() => setImageFailed(true)}
          />
        )}

        {/* Localized scrims only: text sits bottom-left, navbar sits top. The photograph stays visible. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/65 via-black/35 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 pt-32 lg:px-12">
        <div className="max-w-4xl">
          <div className="reveal-line-1 mb-4 flex items-center gap-3">
            <span className="inline-block h-[2px] w-8 bg-harvest-gold" />
            <span className="font-inter text-xs font-semibold uppercase tracking-[0.16em] text-harvest-gold sm:text-sm">
              Smarter dairy farm management
            </span>
          </div>

          <h1
            className="reveal-line-2 mb-7 font-manrope text-[40px] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[48px] md:text-[64px] lg:text-[80px]"
            style={{ textShadow: 'rgba(0, 0, 0, 0.35) 0px 2px 24px' }}
          >
            Every farm deserves a<br className="hidden sm:inline" /> smarter tomorrow.
          </h1>

          <p className="reveal-line-3 mb-10 max-w-[520px] font-inter text-[17px] font-normal leading-[1.6] text-white/90 sm:text-[18px]">
            From animal care to milk production, bring everything that matters to your farm together
            in one simple, connected place.
          </p>

          <div className="reveal-line-3 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#features"
              onClick={(event) => scrollToSection(event, 'features')}
              className="group inline-flex items-center justify-center rounded-lg bg-pasture-green px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-deep-forest/40 transition-all duration-200 hover:scale-[1.02] hover:bg-[#2c6346] focus:ring-2 focus:ring-harvest-gold"
            >
              Explore SmartFarm
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="ml-2.5 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#how-it-works"
              onClick={(event) => scrollToSection(event, 'how-it-works')}
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/20"
            >
              See How It Works
            </a>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-white/15 pt-6 font-inter text-xs uppercase tracking-wider text-white/60 sm:mt-20">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-pasture-green" />
            <span>Illustrative design preview — not live farm data</span>
          </div>
          <a
            href="#about"
            onClick={(event) => scrollToSection(event, 'about')}
            className="group flex items-center gap-2 transition-colors hover:text-white"
          >
            <span>Scroll to explore</span>
            <ArrowDown
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
