import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PublicHomeHero } from './PublicHomeHero';
import { STITCH_ASSETS } from './stitchAssets';

function renderHero() {
  return render(<PublicHomeHero />);
}

describe('PublicHomeHero', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-motion');
    document.documentElement.removeAttribute('data-motion-reduced');
  });

  it('uses the approved Stitch image, copy and in-page CTAs', () => {
    const { container } = renderHero();

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'The intelligence behind better dairy farming.',
    );
    expect(screen.getByText('Smarter dairy farm management')).not.toBeNull();
    expect(
      screen.getByText(/Bring animal care, milk production, daily operations, and farm management/),
    ).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Explore SmartFarm' }).getAttribute('href')).toBe(
      '#features',
    );
    expect(screen.getByRole('link', { name: 'See How It Works' }).getAttribute('href')).toBe(
      '#how-it-works',
    );

    const image = screen.getByRole('img', {
      name: 'Cinematic dairy pasture with authentic grazing herd in morning light',
    });
    expect(image.getAttribute('src')).toBe(STITCH_ASSETS.heroPasture);
    expect(image.className).toContain('animate-cinematic');
    expect(container.querySelector('canvas')).toBeNull();
    expect(screen.queryByText(/Oakview|Live Operational Overview/i)).toBeNull();
    expect(screen.getByText(/Illustrative design preview — not live farm data/)).not.toBeNull();
  });

  it('falls back to the ACR-002 static motif when the external image fails', () => {
    renderHero();

    fireEvent.error(
      screen.getByRole('img', {
        name: 'Cinematic dairy pasture with authentic grazing herd in morning light',
      }),
    );

    expect(document.querySelector('.sf-hero__static-motif')).not.toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });
});
