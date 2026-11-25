import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { PublicFooter } from './PublicFooter';
import { PublicNavbar } from './PublicNavbar';
import { STITCH_ASSETS } from './stitchAssets';

function renderShell() {
  return render(
    <>
      <PublicNavbar />
      <PublicFooter />
    </>,
  );
}

describe('public shell', () => {
  afterEach(() => {
    cleanup();
  });

  it('uses the approved Stitch navigation and footer copy on Home', () => {
    window.location.hash = '#/public/home';
    renderShell();

    const nav = screen.getByRole('navigation', { name: 'Public navigation' });

    expect(within(nav).getByRole('link', { name: 'Home' })).not.toBeNull();
    expect(within(nav).getByRole('link', { name: 'How It Works' })).not.toBeNull();
    expect(within(nav).queryByRole('link', { name: 'Benefits' })).toBeNull();
    expect(screen.getByRole('link', { name: "Let's Talk" })).not.toBeNull();
    expect(
      screen.getByText(/The intelligence behind better dairy farming\. Connecting herd care/),
    ).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Connect with our team →' })).not.toBeNull();

    const logos = screen.getAllByRole('img', { name: 'SmartFarm Logo' });
    expect(logos).toHaveLength(2);
    expect(logos.every((logo) => logo.getAttribute('src') === STITCH_ASSETS.logo)).toBe(true);
  });

  it('keeps the canonical navigation and footer copy on inner public pages', () => {
    window.location.hash = '#/public/about';
    renderShell();

    const nav = screen.getByRole('navigation', { name: 'Public navigation' });

    expect(within(nav).getByRole('link', { name: 'Benefits' })).not.toBeNull();
    expect(within(nav).getByRole('link', { name: 'Dashboard Preview' })).not.toBeNull();
    expect(screen.getAllByRole('link', { name: 'Contact Us' })[0].getAttribute('href')).toBe(
      '#/public/contact',
    );
    expect(screen.queryByRole('link', { name: "Let's Talk" })).toBeNull();
  });
});
