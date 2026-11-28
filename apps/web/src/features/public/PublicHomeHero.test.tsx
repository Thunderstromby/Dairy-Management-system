import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { PublicHomeHero } from './PublicHomeHero';
import { STITCH_ASSETS } from './stitchAssets';

function renderHero() {
  return render(
    <HashRouter>
      <PublicHomeHero />
    </HashRouter>,
  );
}

describe('PublicHomeHero', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-motion');
    document.documentElement.removeAttribute('data-motion-reduced');
  });

  it('uses the approved Stitch image, copy and in-page CTAs', () => {
    const { container } = renderHero();

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'Every farm deserves a smarter tomorrow.',
    );
    expect(screen.getByText('Smarter dairy farm management')).not.toBeNull();
    expect(
      screen.getByText(/From animal care to milk production, bring everything that matters/),
    ).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Explore SmartFarm' }).getAttribute('href')).toBe(
      '#features',
    );
    expect(screen.getByRole('link', { name: 'Dashboard Preview' }).getAttribute('href')).toBe(
      '#/public/dashboard-preview',
    );

    const image = screen.getByRole('img', {
      name: 'Golden pasture with grazing Holsteins in warm sunset light',
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
        name: 'Golden pasture with grazing Holsteins in warm sunset light',
      }),
    );

    expect(document.querySelector('.sf-hero__static-motif')).not.toBeNull();
    expect(screen.queryByRole('img')).toBeNull();
  });
});
