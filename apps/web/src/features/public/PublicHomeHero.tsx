import { Component, Suspense, lazy, type ReactNode } from 'react';
import { MagneticButton } from '../../motion/MagneticButton';
import { ParallaxLayer } from '../../motion/ParallaxLayer';
import { PointerAura } from '../../motion/PointerAura';
import { WordStagger } from '../../motion/WordStagger';
import { useInView } from '../../motion/useInView';
import { useMotionEnvironment } from '../../motion/useMotionEnvironment';
import { StaticHeroMotif } from './StaticHeroMotif';
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
    <section ref={ref} id="home" className="sf-hero" aria-labelledby="home-title">
      <PointerAura className="sf-hero__aura" />
      <ParallaxLayer depth="far" className="sf-hero__backdrop">
        <span className="sf-hero__organic" />
      </ParallaxLayer>

      <div className="sf-hero__inner">
        <div className="sf-hero__content">
          <p className="sf-hero__eyebrow">Smart dairy management</p>
          <h1 id="home-title" className="sf-hero__title">
            <WordStagger text="Manage your dairy farm with clarity." />
          </h1>
          <p className="sf-hero__description">
            Organize animals, milk production, inventory and daily operations.
          </p>
          <div className="sf-hero__actions">
            <MagneticButton
              className="sf-button sf-button--primary"
              onClick={() => {
                window.location.hash = '#contact';
              }}
            >
              Contact Us
            </MagneticButton>
            <a className="sf-button sf-button--secondary" href="#features">
              Explore Features
            </a>
          </div>
        </div>

        <div className="sf-hero__visual">
          <MotifBoundary fallback={<StaticHeroMotif />}>
            <Suspense fallback={<StaticHeroMotif loading />}>
              {shouldLoadScene ? <LazyHeroMotif /> : <StaticHeroMotif />}
            </Suspense>
          </MotifBoundary>
        </div>
      </div>
    </section>
  );
}
