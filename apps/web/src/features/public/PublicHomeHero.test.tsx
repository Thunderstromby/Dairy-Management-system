import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MotionProvider } from '../../motion/MotionProvider';
import { PublicHomeHero } from './PublicHomeHero';
import { StaticHeroMotif } from './StaticHeroMotif';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

const observers: IntersectionObserverStub[] = [];

vi.mock('./HeroMotif', () => ({
  default: () => <div data-testid="lazy-motif" />,
}));

class IntersectionObserverStub {
  private readonly callback: IntersectionObserverCallback;
  private readonly targets: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observers.push(this);
  }

  observe(target: Element) {
    this.targets.push(target);
  }

  unobserve(target: Element) {
    const index = this.targets.indexOf(target);

    if (index >= 0) {
      this.targets.splice(index, 1);
    }
  }

  disconnect() {
    this.targets.length = 0;
  }

  trigger() {
    const entries = this.targets.map(
      (target) => ({ target, isIntersecting: true }) as IntersectionObserverEntry,
    );
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

function setMediaState(state: Record<string, boolean>) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: state[query] ?? false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }));
}

function renderHero() {
  return render(
    <MotionProvider>
      <PublicHomeHero />
    </MotionProvider>,
  );
}

describe('PublicHomeHero', () => {
  beforeEach(() => {
    observers.length = 0;
    setMediaState({});
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.removeAttribute('data-motion');
    document.documentElement.removeAttribute('data-motion-reduced');
    document.documentElement.removeAttribute('data-pointer-effects');
  });

  it('keeps approved Stitch copy and CTAs in HTML with the static motif on coarse pointers', () => {
    setMediaState({ [REDUCED_MOTION_QUERY]: false, [FINE_POINTER_QUERY]: false });

    renderHero();

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'The intelligence behind better dairy farming.',
    );
    expect(screen.getByText('Smarter dairy farm management')).not.toBeNull();
    expect(
      screen.getByText(/Bring animal care, milk production, daily operations, and farm management/),
    ).not.toBeNull();
    expect(screen.getByRole('button', { name: 'Explore SmartFarm' })).not.toBeNull();
    expect(screen.getByRole('link', { name: 'See How It Works' })).not.toBeNull();
    expect(screen.getByText(/Illustrative design preview — not live farm data/)).not.toBeNull();
    expect(document.querySelector('.sf-hero__static-motif')).not.toBeNull();
    expect(screen.queryByTestId('lazy-motif')).toBeNull();
    expect(screen.queryByRole('status')).toBeNull();
    expect(document.querySelector('canvas')).toBeNull();
    expect(document.querySelector('img')).toBeNull();
    expect(screen.queryByText(/Oakview|Live Operational Overview/i)).toBeNull();
  });

  it('uses the static motif under reduced motion and never loads the scene', () => {
    setMediaState({ [REDUCED_MOTION_QUERY]: true, [FINE_POINTER_QUERY]: true });

    renderHero();

    expect(document.documentElement.dataset.motionReduced).toBe('true');
    expect(document.querySelector('.sf-hero__static-motif')).not.toBeNull();
    expect(screen.queryByTestId('lazy-motif')).toBeNull();
    expect(document.querySelector('canvas')).toBeNull();
  });

  it('renders an explicit loading state for a pending decorative visual', () => {
    render(<StaticHeroMotif loading />);

    expect(screen.getByRole('status').textContent).toBe('Loading visual…');
    expect(document.querySelector('.sf-hero__static-motif')).not.toBeNull();
  });

  it('lazy-loads the scene only after the hero intersects on fine pointers', async () => {
    setMediaState({ [REDUCED_MOTION_QUERY]: false, [FINE_POINTER_QUERY]: true });

    renderHero();

    expect(document.querySelector('.sf-hero__static-motif')).not.toBeNull();
    expect(screen.queryByTestId('lazy-motif')).toBeNull();

    act(() => {
      observers.forEach((observer) => observer.trigger());
    });

    expect(await screen.findByTestId('lazy-motif')).not.toBeNull();
    expect(document.querySelector('canvas')).toBeNull();
  });
});
