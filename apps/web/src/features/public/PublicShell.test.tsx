import { cleanup, render, screen, within } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { PublicFooter } from './PublicFooter';
import { PublicNavbar } from './PublicNavbar';
import { STITCH_ASSETS } from './stitchAssets';

function renderShell() {
  return render(
    <HashRouter>
      <PublicNavbar />
      <PublicFooter />
    </HashRouter>,
  );
}

describe('public shell', () => {
  afterEach(() => {
    cleanup();
  });

  it('uses the Stitch navigation and footer on every approved public page', () => {
    window.location.hash = '#/public/home';
    renderShell();

    const nav = screen.getByRole('navigation', { name: 'Public navigation' });

    expect(within(nav).getByRole('link', { name: 'Home' }).getAttribute('href')).toBe(
      '#/public/home',
    );
    expect(within(nav).getByRole('link', { name: 'How It Works' }).getAttribute('href')).toBe(
      '#/public/how-it-works',
    );
    expect(within(nav).queryByRole('link', { name: 'Benefits' })).toBeNull();
    expect(screen.getByRole('link', { name: "Let's Talk" }).getAttribute('href')).toBe(
      '#/public/contact',
    );
    expect(
      screen.getByText(/The intelligence behind better dairy farming\. Connecting herd care/),
    ).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Connect with our team →' })).not.toBeNull();

    const logos = screen.getAllByRole('img', { name: 'SmartFarm Logo' });
    expect(logos).toHaveLength(2);
    expect(logos.every((logo) => logo.getAttribute('src') === STITCH_ASSETS.logo)).toBe(true);
  });

  it('exposes every approved public page through the footer', () => {
    window.location.hash = '#/public/about';
    renderShell();

    const expected = [
      ['Home', '#/public/home'],
      ['About SmartFarm', '#/public/about'],
      ['Features', '#/public/features'],
      ['How It Works', '#/public/how-it-works'],
      ['Benefits', '#/public/benefits'],
      ['Dashboard Preview', '#/public/dashboard-preview'],
      ['Contact', '#/public/contact'],
    ] as const;

    for (const [label, href] of expected) {
      const links = screen.getAllByRole('link', { name: label });
      expect(links.some((link) => link.getAttribute('href') === href)).toBe(true);
    }
  });
});
