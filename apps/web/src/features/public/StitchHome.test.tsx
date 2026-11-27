import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { MotionProvider } from '../../motion/MotionProvider';
import { StitchHomePage } from './StitchHome';
import { STITCH_ASSETS } from './stitchAssets';

function renderHome() {
  return render(
    <MotionProvider>
      <StitchHomePage />
    </MotionProvider>,
  );
}

describe('Stitch homepage structure', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the approved Stitch section order and copy', () => {
    renderHome();

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Every farm deserves a smarter tomorrow.',
      }),
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Better farm management starts with better-connected information.',
      }),
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Every part of your farm. Better connected.' }),
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Meet the platform behind smarter dairy management.',
      }),
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', { level: 2, name: 'A clearer way to manage your farm.' }),
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Built for the realities of dairy-farm management.',
      }),
    ).not.toBeNull();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Ready to bring more clarity to your dairy operation?',
      }),
    ).not.toBeNull();
  });

  it('switches the five approved capability tabs', async () => {
    const user = userEvent.setup();
    renderHome();

    expect(
      screen.getByRole('heading', { level: 3, name: 'Animal Records, Profiles & Health History' }),
    ).not.toBeNull();

    await user.click(screen.getByRole('tab', { name: '02. Milk Production' }));

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Milk Production Records & Bulk Tank Tracking',
      }),
    ).not.toBeNull();
    expect(
      screen.getByRole('tab', { name: '02. Milk Production' }).getAttribute('aria-selected'),
    ).toBe('true');
  });

  it('uses the approved Stitch images and no fake live metric or animated marquee', () => {
    const { container } = renderHome();
    const imageSources = screen.getAllByRole('img').map((image) => image.getAttribute('src'));

    expect(imageSources).toContain(STITCH_ASSETS.heroPasture);
    expect(imageSources).toContain(STITCH_ASSETS.aboutPasture);
    expect(container.querySelector('canvas')).toBeNull();
    expect(screen.queryByText(/Live Operational Overview|Oakview|Herd Sync/i)).toBeNull();
    expect(screen.queryByText(/11,480 L|4\.28%|\+\$11\.84|Active Herd: 412 Cows/i)).toBeNull();
    expect(container.querySelector('.sf-stitch-brand-strip')).toBeNull();
    expect(container.querySelector('.marquee-track')).toBeNull();
  });
});
