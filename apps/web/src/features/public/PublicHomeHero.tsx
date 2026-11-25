import { ArrowDown, ArrowRight } from 'lucide-react';
import { Component, Suspense, lazy, type ReactNode } from 'react';
import { ParallaxLayer } from '../../motion/ParallaxLayer';
import { PointerAura } from '../../motion/PointerAura';
import { WordStagger } from '../../motion/WordStagger';
import { useInView } from '../../motion/useInView';
import { useMotionEnvironment } from '../../motion/useMotionEnvironment';
import { StaticHeroMotif } from './StaticHeroMotif';
import { scrollToSection } from './scrollToSection';
import './public-home-hero.css';

const LazyHeroMotif = lazy(() => import('./HeroMotif'));

type MotifBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

class MotifBoundary extends Component<MotifBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function PublicHomeHero() {
  const { pointerEffectsEnabled } = useMotionEnvironment();
  const { ref, visible } = useInView<HTMLElement>('160px 0px', 0.01);
  const shouldLoadScene = pointerEffectsEnabled && visible;

  return (
    <section ref={ref} id="hero" className="sf-hero" aria-labelledby="hero-title">
      <PointerAura className="sf-hero__aura" />

      <div className="sf-hero__backdrop" aria-hidden="true">
        <span className="sf-hero__gradient" />
        <ParallaxLayer depth="far" className="sf-hero__organic-layer">
          <span className="sf-hero__organic" />
        </ParallaxLayer>
        <div className="sf-hero__visual">
          <MotifBoundary fallback={<StaticHeroMotif />}>
            <Suspense fallback={<StaticHeroMotif loading />}>
              {shouldLoadScene ? <LazyHeroMotif /> : <StaticHeroMotif />}
            </Suspense>
          </MotifBoundary>
        </div>
      </div>

      <div className="sf-hero__inner">
        <div className="sf-hero__content">
          <p className="sf-hero__eyebrow">Smarter dairy farm management</p>
          <h1 id="hero-title" className="sf-hero__title">
            <WordStagger text="The intelligence behind better dairy farming." />
          </h1>
          <p className="sf-hero__description">
            Bring animal care, milk production, daily operations, and farm management together with
            one connected platform built for modern dairy farms.
          </p>
          <div className="sf-hero__actions">
            <a
              className="sf-button sf-button--hero-primary"
              href="#features"
              onClick={(event) => scrollToSection(event, 'features')}
            >
              Explore SmartFarm <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              className="sf-button sf-button--hero-secondary"
              href="#how-it-works"
              onClick={(event) => scrollToSection(event, 'how-it-works')}
            >
              See How It Works
            </a>
          </div>
        </div>

        <div className="sf-hero__footer">
          <span className="sf-hero__illustrative">
            <span className="sf-hero__footer-mark" aria-hidden="true" />
            Illustrative design preview — not live farm data
          </span>
          <a href="#about" onClick={(event) => scrollToSection(event, 'about')}>
            Scroll to explore <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
