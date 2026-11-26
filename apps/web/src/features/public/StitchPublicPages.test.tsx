import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StitchAboutPage } from './StitchAboutPage';
import { StitchBenefitsPage } from './StitchBenefitsPage';
import { StitchContactPage } from './StitchContactPage';
import { StitchDashboardPreviewPage } from './StitchDashboardPreviewPage';
import { StitchFeaturesPage } from './StitchFeaturesPage';
import { StitchHowItWorksPage } from './StitchHowItWorksPage';

const PAGES = [
  {
    name: 'About',
    component: <StitchAboutPage />,
    heading: 'Better understanding. Better connected dairy farming.',
  },
  {
    name: 'Features',
    component: <StitchFeaturesPage />,
    heading: 'Everything your dairy farm needs to stay connected.',
  },
  {
    name: 'How It Works',
    component: <StitchHowItWorksPage />,
    heading: 'A clearer way to manage your farm',
  },
  {
    name: 'Benefits',
    component: <StitchBenefitsPage />,
    heading: 'More clarity across the work that keeps your farm moving.',
  },
  {
    name: 'Dashboard preview',
    component: <StitchDashboardPreviewPage />,
    heading: 'A clearer view of your dairy farm management.',
  },
  {
    name: 'Contact',
    component: <StitchContactPage />,
    heading: "Let's talk about better-connected dairy farm management.",
  },
] as const;

describe('Stitch public pages', () => {
  const originalScrollIntoView = Object.getOwnPropertyDescriptor(
    Element.prototype,
    'scrollIntoView',
  );
  let scrollIntoView: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    scrollIntoView = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: scrollIntoView,
    });
  });

  afterEach(() => {
    cleanup();
    if (originalScrollIntoView) {
      Object.defineProperty(Element.prototype, 'scrollIntoView', originalScrollIntoView);
    } else {
      Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
    }
    window.location.hash = '#/public/home';
  });

  it.each(PAGES)('renders the $name page hero', ({ component, heading }) => {
    const { container } = render(component);

    expect(screen.getByRole('heading', { level: 1, name: heading })).not.toBeNull();
    expect(container.querySelector('canvas')).toBeNull();
    expect(screen.queryByText(/Oakview|Highland|RFID|IoT|live telemetry/i)).toBeNull();
    expect(screen.queryByText(/11,480 L|412 Cows|Active Herd/i)).toBeNull();
    expect(screen.queryByText(/Marquee|autoplay/i)).toBeNull();
  });

  it('keeps the illustrative label on the dashboard preview', () => {
    render(<StitchDashboardPreviewPage />);

    expect(screen.getByText(/Demonstration interface only/i)).not.toBeNull();
    expect(screen.getAllByText(/Illustrative — not live data/i).length).toBeGreaterThan(0);
  });

  it('keeps the inquiry form local-draft only', () => {
    render(<StitchContactPage />);

    expect(screen.getByRole('button', { name: 'Submit Inquiry' })).not.toBeNull();
    expect(
      screen.getByText(/saves a local draft in this prototype; it does not send email/i),
    ).not.toBeNull();
  });

  it.each([
    {
      name: 'Features',
      hash: '#/public/features',
      component: <StitchFeaturesPage />,
      label: 'Explore the Platform',
      sectionId: 'modules',
    },
    {
      name: 'How It Works',
      hash: '#/public/how-it-works',
      component: <StitchHowItWorksPage />,
      label: 'Explore the Process',
      sectionId: 'process',
    },
    {
      name: 'Contact',
      hash: '#/public/contact',
      component: <StitchContactPage />,
      label: 'Go to Inquiry Form',
      sectionId: 'inquiry-form',
    },
  ])(
    'scrolls the $name hero CTA to its section without changing pages',
    ({ hash, component, label, sectionId }) => {
      window.location.hash = hash;
      const { container } = render(component);
      const cta = screen
        .getAllByRole('link', { name: label })
        .find((link) => link.getAttribute('href') === `#${sectionId}`);

      expect(cta).not.toBeNull();
      expect(container.querySelector(`#${sectionId}`)).not.toBeNull();

      fireEvent.click(cta!);

      expect(window.location.hash).toBe(hash);
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
    },
  );
});
